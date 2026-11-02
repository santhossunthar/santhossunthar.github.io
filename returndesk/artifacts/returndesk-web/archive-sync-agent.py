#!/usr/bin/env python3
import json
import subprocess
import time
from datetime import datetime, timezone
from pathlib import Path


OUTBOX_DIR = Path("/opt/returndesk/archive-outbox")
LOG_FILE = Path("/var/log/returndesk-archive-sync.log")
SYNC_INTERVAL = 30


def log(message):
    timestamp = datetime.now(timezone.utc).isoformat()
    with LOG_FILE.open("a", encoding="utf-8") as handle:
        handle.write(f"{timestamp} {message}\n")


def build_manifest():
    OUTBOX_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now(timezone.utc)
    manifest = {
        "batch_id": f"dlq-{timestamp.strftime('%Y%m%d%H%M%S')}",
        "source": "returndesk-web",
        "queue": "dead-letter",
        "generated_at": timestamp.isoformat(),
        "records": [
            {
                "return_id": "RD-10470",
                "vendor": "Cobalt Home",
                "reason": "archive pending after label timeout",
            },
            {
                "return_id": "RD-10482",
                "vendor": "Northstar Mobile",
                "reason": "supervisor review exceeded reconciliation window",
            },
        ],
    }

    path = OUTBOX_DIR / f"{manifest['batch_id']}.json"
    path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    return path


def push_manifest(path, archive_host, archive_user, archive_password):
    destination = f"{archive_user}@{archive_host}:/srv/archive/incoming/"
    command = [
        "sshpass",
        "-p",
        archive_password,
        "scp",
        "-o",
        "StrictHostKeyChecking=no",
        "-o",
        "UserKnownHostsFile=/tmp/returndesk-archive-known-hosts",
        "-o",
        "PreferredAuthentications=keyboard-interactive,password",
        "-o",
        "KbdInteractiveAuthentication=yes",
        "-o",
        "PasswordAuthentication=yes",
        "-o",
        "NumberOfPasswordPrompts=2",
        "-o",
        "PubkeyAuthentication=no",
        str(path),
        destination,
    ]
    subprocess.run(command, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, text=True)


def main():
    archive_host = "10.10.20.20"
    archive_user = "archadmin"
    archive_password = "ReturnVault-Sync-2026!"
    sync_token = f"ARCHIVE_HOST={archive_host};ARCHIVE_USER={archive_user};ARCHIVE_PASS={archive_password}"

    while True:
        # Keep the token live in process memory for the intended memory-dump pivot.
        _ = sync_token.encode()
        try:
            manifest = build_manifest()
            push_manifest(manifest, archive_host, archive_user, archive_password)
            log(f"synced {manifest.name} to {archive_host}:/srv/archive/incoming")
        except Exception as exc:
            log(f"sync failed: {exc}")
        time.sleep(SYNC_INTERVAL)


if __name__ == "__main__":
    main()
