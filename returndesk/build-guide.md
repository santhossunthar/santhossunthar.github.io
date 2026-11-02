# Build Guide for ReturnDesk: Dead Letter Queue

## Status

**NTP**: Off  
**Firewall**: On  
**Updates**: Off after build  
**ICMP**: On  
**IPv6**: Off recommended  
**AV or Security**: Off

## Overview

This is a two-machine standalone chain challenge.

## Learning Objectives

ReturnDesk is designed to teach a complete external-to-internal Linux attack chain:

- Discovering unlinked build metadata and using it to retrieve an exposed release artifact.
- Identifying secrets leaked through packaged application source.
- Understanding why Flask signed client-side sessions are only as strong as the secrecy of `FLASK_SECRET_KEY`.
- Abusing unsafe YAML deserialization from an authenticated admin workflow to gain code execution.
- Escalating privileges through a writable script executed by a root-owned `systemd` timer.
- Pivoting from a compromised public host into an internal-only machine by recovering credentials from process memory.
- Exploiting unsafe `PATH` handling in a sudo-allowed maintenance script.

### Machine 1

**OS**: Ubuntu 22.04 LTS  
**Hostname**: returndesk-web  
**Network**: External lab network and internal archive network  
**External Ports**: 22/tcp, 80/tcp  
**Vulnerability 1**: Source artifact disclosure through inferred release path  
**Vulnerability 2**: Flask session forgery with leaked secret key  
**Vulnerability 3**: Unsafe YAML deserialization in an admin import feature  
**Vulnerability 4**: Writable root-executed reconciliation script  
**Pivot**: ArchiveNode SSH credentials recoverable from root-owned process memory  
**Low Priv Username**: returndesk  
**Low Priv Password**: ReturnsPortal731!  
**Web Admin Username**: ops-admin  
**Web Admin Password**: R3turnDesk-v9Qp7Lx2-T6m  
**Location of local.txt**: /home/returndesk/local.txt  
**Value of local.txt**: 8a12c9f94f3295a86e7b61fb0df0a6c5  
**Location of proof.txt**: /root/proof.txt  
**Value of proof.txt**: d88ef01c4a98b68b49f4f2d39209c822

### Machine 2

**OS**: Ubuntu 22.04 LTS  
**Hostname**: archive-node  
**Network**: Internal archive network only  
**Internal Ports**: 22/tcp  
**Vulnerability 5**: PATH hijacking through sudo-allowed archive maintenance script  
**Admin Username**: archadmin  
**Admin Password**: ReturnVault-Sync-2026!  
**Location of local.txt**: /home/archadmin/local.txt  
**Value of local.txt**: 4d7f9b2a6c1e83d5f0a7429b8e6c13d0  
**Location of proof.txt**: /root/proof.txt  
**Value of proof.txt**: f66a821948f7089ad7e78d15ff773c34

## Required Settings

### returndesk-web

**CPU**: 1 CPU  
**Memory**: 2 GB  
**Disk**: 15 GB  
**NIC 1**: External lab network  
**NIC 2**: Internal archive network

### archive-node

**CPU**: 1 CPU  
**Memory**: 1 GB  
**Disk**: 12 GB  
**NIC 1**: Internal archive network only

## Network Layout

Suggested addressing:

| Host | Interface | IP |
| --- | --- | --- |
| returndesk-web | External | DHCP or reviewer-assigned |
| returndesk-web | Internal | 10.10.20.10/24 |
| archive-node | Internal | 10.10.20.20/24 |

The attacker should only be able to reach `returndesk-web` directly. `archive-node` should be reachable from `returndesk-web` over the internal network.

## Platform-Neutral Deployment Requirements

Deployment teams may use any virtualization, cloud, or image-building process as long as the following final state is preserved:

- `returndesk-web` has one attacker-reachable interface and one internal archive-network interface.
- `archive-node` has only the internal archive-network interface and is not directly reachable from the attacker network.
- The internal IP addresses match the service configuration, or the same values are updated consistently in the build artifacts before deployment. In particular, `returndesk-web/archive-sync-agent.py` expects ArchiveNode at `10.10.20.20`.
- The attacker can reach only `22/tcp` and `80/tcp` on `returndesk-web`.
- `returndesk-web` can reach `archive-node` on `22/tcp`.
- Outbound traffic from `returndesk-web` permits TCP/80 and TCP/443 for reverse shells and permits SSH to `10.10.20.20`.
- Do not patch or harden the intentional vulnerabilities after running the build scripts.

## Build Guide

1. Install Ubuntu 22.04 LTS on both machines.
2. Configure the internal network before running the build scripts.
3. On `archive-node`, upload or copy the `archive-node` artifact directory to `/root`.
4. On `archive-node`, run:

```bash
cd /root/archive-node
chmod +x build-archive.sh
./build-archive.sh
```

5. On `returndesk-web`, upload or copy the `returndesk-web` artifact directory to `/root`.
6. On `returndesk-web`, run:

```bash
cd /root/returndesk-web
chmod +x build-web.sh
./build-web.sh
```

7. Confirm `returndesk-web` can reach `archive-node`:

```bash
ping -c 2 10.10.20.20
nc -zv 10.10.20.20 22
```

8. Confirm the attacker can browse `http://RETURNDESK_WEB_IP/`.

## Reviewer Notes

- Do not expose `archive-node` to the attacker network.
- The source archive is not listed in `robots.txt` and is not linked from the homepage. The intended discovery path is API fuzzing to `/api/build-info`, then direct retrieval of `/releases/returndesk-2026.04.1.tar.gz`.
- The ArchiveNode credential is intentionally stored in the memory of `archive-sync-agent`, which runs as root on `returndesk-web` and periodically pushes dead-letter return manifests into `/srv/archive/incoming` on `archive-node`.
- The final privilege escalation on `archive-node` must use PATH hijacking against `/usr/local/bin/archive-maint`.
