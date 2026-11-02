#!/usr/bin/env bash
set -euo pipefail

echo "[+] Building ArchiveNode"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

apt-get update
echo "iptables-persistent iptables-persistent/autosave_v4 boolean false" | debconf-set-selections
echo "iptables-persistent iptables-persistent/autosave_v6 boolean false" | debconf-set-selections
DEBIAN_FRONTEND=noninteractive apt-get install -y openssh-server sudo iptables-persistent

hostnamectl set-hostname archive-node

id -u archadmin >/dev/null 2>&1 || useradd -m -s /bin/bash archadmin
echo "archadmin:ReturnVault-Sync-2026!" | chpasswd
passwd -u archadmin >/dev/null 2>&1 || true

sed -i 's/^#\?PasswordAuthentication .*/PasswordAuthentication yes/' /etc/ssh/sshd_config
sed -i 's/^#\?KbdInteractiveAuthentication .*/KbdInteractiveAuthentication yes/' /etc/ssh/sshd_config
sed -i 's/^#\?ChallengeResponseAuthentication .*/ChallengeResponseAuthentication yes/' /etc/ssh/sshd_config
mkdir -p /etc/ssh/sshd_config.d
cat >/etc/ssh/sshd_config.d/00-returndesk-password-auth.conf <<'SSHD'
PasswordAuthentication yes
KbdInteractiveAuthentication yes
ChallengeResponseAuthentication yes
UsePAM yes
SSHD
sshd -t

mkdir -p /srv/archive/incoming /srv/archive/tmp /var/backups/returndesk /home/archadmin/bin
chown -R archadmin:archadmin /srv/archive /home/archadmin/bin
chmod 0755 /home/archadmin/bin

cat >/usr/local/bin/archive-maint <<'SCRIPT'
#!/usr/bin/env bash
set -e
export PATH=/home/archadmin/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

echo "[*] Checking archive queue..."
tar -czf /var/backups/returndesk/returns.tgz /srv/archive/incoming 2>/dev/null || true

echo "[*] Cleaning temporary manifests..."
cleanup-manifests /srv/archive/tmp
SCRIPT

cat >/usr/local/bin/cleanup-manifests <<'SCRIPT'
#!/usr/bin/env bash
target="${1:-/srv/archive/tmp}"
find "$target" -type f -mtime +7 -delete 2>/dev/null || true
SCRIPT

chown root:root /usr/local/bin/archive-maint /usr/local/bin/cleanup-manifests
chmod 0755 /usr/local/bin/archive-maint /usr/local/bin/cleanup-manifests

cat >/etc/sudoers.d/archive-maint <<'SUDOERS'
archadmin ALL=(root) NOPASSWD: /usr/local/bin/archive-maint
SUDOERS
chmod 0440 /etc/sudoers.d/archive-maint

echo "4d7f9b2a6c1e83d5f0a7429b8e6c13d0" > /home/archadmin/local.txt
chown archadmin:archadmin /home/archadmin/local.txt
chmod 0644 /home/archadmin/local.txt
echo "f66a821948f7089ad7e78d15ff773c34" > /root/proof.txt
chmod 0600 /root/proof.txt

systemctl enable --now ssh
systemctl restart ssh

iptables -F INPUT
iptables -I INPUT 1 -i lo -j ACCEPT
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -p icmp -j ACCEPT
iptables -A INPUT -j DROP
netfilter-persistent save || true

ln -sf /dev/null /root/.bash_history
ln -sf /dev/null /home/archadmin/.bash_history
rm -rf /root/.cache /home/archadmin/.cache
find /var/log -type f -exec truncate -s 0 {} \;

echo "[+] ArchiveNode build complete"
