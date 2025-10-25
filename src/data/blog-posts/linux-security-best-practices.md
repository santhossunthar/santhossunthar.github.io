---
id: "3"
title: "Linux Security Best Practices for Developers"
date: "2024-01-05"
category: "Security"
tags: ["Linux", "Security", "DevOps"]
readTime: "10 min read"
author: "Santhos Suntharalingam"
featured: true
---

# Linux Security Best Practices for Developers

Essential security practices every developer should know when working with Linux systems.

## 1. User Management

### Create Non-Root Users
Always create and use non-root users for daily tasks.

```bash
# Create a new user
sudo useradd -m -s /bin/bash username
sudo passwd username

# Add user to sudo group
sudo usermod -aG sudo username
```

### Disable Root Login
Disable direct root login via SSH.

```bash
# Edit SSH config
sudo nano /etc/ssh/sshd_config

# Set PermitRootLogin no
PermitRootLogin no

# Restart SSH service
sudo systemctl restart ssh
```

## 2. Firewall Configuration

### UFW (Uncomplicated Firewall)
```bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow ssh

# Allow specific ports
sudo ufw allow 80
sudo ufw allow 443

# Check status
sudo ufw status
```

## 3. System Updates

Keep your system updated regularly.

```bash
# Update package lists
sudo apt update

# Upgrade packages
sudo apt upgrade

# Remove unnecessary packages
sudo apt autoremove
```

## 4. File Permissions

Set proper file permissions for sensitive files.

```bash
# Secure SSH keys
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub

# Secure configuration files
chmod 600 /etc/ssh/sshd_config
```

## 5. Log Monitoring

Monitor system logs for suspicious activity.

```bash
# View authentication logs
sudo tail -f /var/log/auth.log

# View system logs
sudo journalctl -f
```

## Conclusion

Implementing these security practices will significantly improve your Linux system's security posture. Regular maintenance and monitoring are key to maintaining a secure environment.
