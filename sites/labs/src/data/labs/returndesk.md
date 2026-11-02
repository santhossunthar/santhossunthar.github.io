---
title: "ReturnDesk: Dead Letter Queue"
date: "2026-09-15"
category: "CTF Lab"
difficulty: "Intermediate"
status: "Published"
platform: "Vagrant + VirtualBox"
tags:
  - Vagrant
  - VirtualBox
  - Flask
  - Linux
  - Pivoting
estimatedTime: "2-4 hours"
author: "CTF Labs"
featured: true
repository: "https://github.com/santhossunthar/santhossunthar.github.io/tree/main/returndesk"
slug: "returndesk"
excerpt: "A two-machine Linux CTF lab built around a public ReturnDesk support portal and an internal-only archive node."
---

# ReturnDesk: Dead Letter Queue

ReturnDesk is a two-machine Linux CTF lab built around a realistic support portal and an internal archive node. The challenge starts from the externally reachable `returndesk-web` host and leads into the internal-only `archive-node` host through a chained compromise.

## Before You Start

Install the Lab Manager first:

[Open the Lab Manager setup guide](/setup/)

The Lab Manager installs the local `ctf-labs` command and stores labs under `~/.ctf-labs`. After that, you can manage ReturnDesk and future labs from any terminal.

## Learning Objectives

ReturnDesk is designed to practice a complete external-to-internal Linux attack chain:

1. Discover unlinked build metadata and exposed release artifacts.
2. Review leaked application source and configuration.
3. Understand the risk of signed client-side Flask sessions when secrets are exposed.
4. Exploit unsafe YAML handling in an authenticated admin workflow.
5. Escalate privileges through a writable script executed by a root-owned timer job.
6. Recover internal credentials from process memory.
7. Pivot from the public host into an internal-only archive node.
8. Abuse unsafe `PATH` handling in a sudo-allowed maintenance script.

## Lab Layout

| Machine | Role | Network | Exposed Services |
| --- | --- | --- | --- |
| `returndesk-web` | Public-facing support portal | `192.168.56.20`, `10.10.20.10` | SSH, HTTP |
| `archive-node` | Internal archive host | `10.10.20.20` | SSH from internal network |

The attacker should only be able to directly reach `returndesk-web`. The `archive-node` host is intentionally internal-only and is reached through the challenge path.

## Requirements

Install these tools before deploying ReturnDesk:

| Tool | Purpose |
| --- | --- |
| VirtualBox | Runs the lab virtual machines locally |
| Vagrant | Creates and provisions both machines automatically |
| Git | Downloads the lab repository and checks for updates |
| PowerShell, Bash, or Terminal | Runs the setup command |

Hardware recommendation:

| Resource | Minimum |
| --- | --- |
| RAM | 4 GB free |
| CPU | 2 cores |
| Disk | 30 GB free |
| Network | Internet access for the first pull |

## Deploy With Lab Manager

Pull the latest ReturnDesk files:

```bash
ctf-labs pull returndesk
```

Start both machines:

```bash
ctf-labs up returndesk
```

Open the public web portal:

```text
http://192.168.56.20/
```

Check lab status:

```bash
ctf-labs status returndesk
```

Stop the lab when finished:

```bash
ctf-labs stop returndesk
```

Reset and remove the local VMs:

```bash
ctf-labs destroy returndesk
```

## Pull All Labs

To download every published lab:

```bash
ctf-labs pull all
```

This skips labs that already exist locally with the same version and source commit.

## Manual Vagrant Deployment

If you do not want to use the Lab Manager yet, deploy ReturnDesk manually:

```bash
git clone https://github.com/santhossunthar/santhossunthar.github.io.git
cd santhossunthar.github.io/returndesk
vagrant up
```

Check both machines:

```bash
vagrant status
```

Open the portal in your browser:

```text
http://192.168.56.20/
```

Connect to a machine for validation:

```bash
vagrant ssh returndesk-web
vagrant ssh archive-node
```

Stop the lab:

```bash
vagrant halt
```

Remove the local VMs:

```bash
vagrant destroy -f
```

## Source Package

The lab source is published in the repository under the `returndesk` folder:

[Browse ReturnDesk on GitHub](https://github.com/santhossunthar/santhossunthar.github.io/tree/main/returndesk)

The folder includes the Vagrantfile, build artifacts, and lab metadata. Solution materials may exist in the repository for review and validation, but learners should start from the deployed service instead of reading the walkthrough first.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `ctf-labs` command not found | Reopen the terminal or reload your shell profile |
| `vagrant` command not found | Reopen the terminal or reinstall Vagrant |
| VirtualBox provider error | Confirm VirtualBox is installed and virtualization is enabled in BIOS or UEFI |
| `192.168.56.20` does not load | Confirm the `returndesk-web` VM is running and the host-only adapter was created |
| Internal pivot fails | Confirm `archive-node` is running and `returndesk-web` can reach `10.10.20.20` |
| Provisioning failed midway | Run `vagrant destroy -f`, then rerun `vagrant up` from the `returndesk` folder |
