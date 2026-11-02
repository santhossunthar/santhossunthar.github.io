#!/usr/bin/env bash
set -euo pipefail

echo "[+] Building ReturnDesk Web"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

apt-get update
echo "iptables-persistent iptables-persistent/autosave_v4 boolean false" | debconf-set-selections
echo "iptables-persistent iptables-persistent/autosave_v6 boolean false" | debconf-set-selections
DEBIAN_FRONTEND=noninteractive apt-get install -y python3 python3-pip python3-venv nginx gdb openssh-server sshpass iptables-persistent

hostnamectl set-hostname returndesk-web

id -u returndesk >/dev/null 2>&1 || useradd -m -s /bin/bash returndesk
echo "returndesk:ReturnsPortal731!" | chpasswd

mkdir -p /opt/returndesk/app /opt/returndesk/releases /opt/returndesk/jobs /opt/returndesk/bin /opt/returndesk/archive-outbox
cp -r "$SCRIPT_DIR"/app/* /opt/returndesk/app/
cp "$SCRIPT_DIR"/app/.env /opt/returndesk/app/.env
cp "$SCRIPT_DIR"/archive-sync-agent.py /opt/returndesk/bin/archive-sync-agent.py
chmod 0755 /opt/returndesk/bin/archive-sync-agent.py
chmod 0700 /opt/returndesk/archive-outbox

python3 -m venv /opt/returndesk/venv
/opt/returndesk/venv/bin/pip install --upgrade pip
/opt/returndesk/venv/bin/pip install -r /opt/returndesk/app/requirements.txt

mkdir -p /tmp/returndesk-2026.04.1
cp -r /opt/returndesk/app/* /tmp/returndesk-2026.04.1/
cp /opt/returndesk/app/.env /tmp/returndesk-2026.04.1/.env
tar -czf /opt/returndesk/releases/returndesk-2026.04.1.tar.gz -C /tmp returndesk-2026.04.1
rm -rf /tmp/returndesk-2026.04.1

cat >>/opt/returndesk/app/.env <<'ENV'
ADMIN_USERNAME=ops-admin
ADMIN_PASSWORD=R3turnDesk-v9Qp7Lx2-T6m
ENV
chown root:returndesk /opt/returndesk/app/.env
chmod 0640 /opt/returndesk/app/.env
chown -R returndesk:returndesk /opt/returndesk/app/static
chmod 0755 /opt/returndesk/app/static

cat >/etc/systemd/system/returndesk.service <<'SERVICE'
[Unit]
Description=ReturnDesk web portal
After=network.target

[Service]
User=returndesk
WorkingDirectory=/opt/returndesk/app
EnvironmentFile=/opt/returndesk/app/.env
ExecStart=/opt/returndesk/venv/bin/gunicorn --bind 127.0.0.1:8000 app:app
Restart=always

[Install]
WantedBy=multi-user.target
SERVICE

cat >/etc/nginx/sites-available/returndesk <<'NGINX'
server {
    listen 80 default_server;
    server_name _;
    server_tokens off;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/returndesk /etc/nginx/sites-enabled/returndesk
rm -f /etc/nginx/sites-enabled/default

cat >/opt/returndesk/jobs/reconcile.sh <<'JOB'
#!/usr/bin/env bash
date >> /var/log/returndesk-reconcile.log
find /opt/returndesk/app -maxdepth 1 -name '*.py' -type f >/dev/null
JOB
chown returndesk:returndesk /opt/returndesk/jobs/reconcile.sh
chmod 0775 /opt/returndesk/jobs/reconcile.sh

cat >/etc/systemd/system/returndesk-reconcile.service <<'SERVICE'
[Unit]
Description=ReturnDesk reconciliation job

[Service]
Type=oneshot
ExecStart=/opt/returndesk/jobs/reconcile.sh
SERVICE

cat >/etc/systemd/system/returndesk-reconcile.timer <<'TIMER'
[Unit]
Description=Run ReturnDesk reconciliation every minute

[Timer]
OnBootSec=30
OnUnitActiveSec=60
Unit=returndesk-reconcile.service

[Install]
WantedBy=timers.target
TIMER

cat >/etc/systemd/system/archive-sync-agent.service <<'SERVICE'
[Unit]
Description=ReturnDesk archive sync agent
After=network.target

[Service]
User=root
ExecStart=/usr/bin/python3 /opt/returndesk/bin/archive-sync-agent.py
Restart=always

[Install]
WantedBy=multi-user.target
SERVICE

echo "8a12c9f94f3295a86e7b61fb0df0a6c5" > /home/returndesk/local.txt
echo "d88ef01c4a98b68b49f4f2d39209c822" > /root/proof.txt
chown returndesk:returndesk /home/returndesk/local.txt
chmod 0644 /home/returndesk/local.txt
chmod 0600 /root/proof.txt

systemctl daemon-reload
systemctl enable --now ssh returndesk nginx returndesk-reconcile.timer archive-sync-agent
systemctl restart returndesk
systemctl restart archive-sync-agent
systemctl restart nginx

iptables -F INPUT
iptables -F OUTPUT
iptables -I INPUT 1 -i lo -j ACCEPT
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p icmp -j ACCEPT
iptables -A INPUT -j DROP
iptables -I OUTPUT 1 -o lo -j ACCEPT
iptables -A OUTPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -A OUTPUT -p udp --dport 53 -j ACCEPT
iptables -A OUTPUT -p tcp --dport 53 -j ACCEPT
iptables -A OUTPUT -p tcp --dport 80 -j ACCEPT
iptables -A OUTPUT -p tcp --dport 443 -j ACCEPT
iptables -A OUTPUT -p tcp -d 10.10.20.20 --dport 22 -j ACCEPT
iptables -A OUTPUT -p icmp -j ACCEPT
iptables -A OUTPUT -j DROP
netfilter-persistent save || true

ln -sf /dev/null /root/.bash_history
ln -sf /dev/null /home/returndesk/.bash_history
rm -rf /root/.cache /home/returndesk/.cache
find /var/log -type f -exec truncate -s 0 {} \;

echo "[+] ReturnDesk Web build complete"
