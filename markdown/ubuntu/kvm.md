### kvm

```sh
apt-get update
apt-get dist-upgrade

# kvm 세팅
egrep -c '(vmx|svm)' /proc/cpuinfo

apt-get install qemu-kvm libvirt-bin ubuntu-vm-builder bridge-utils -y
apt-get install virt-manager -y

# virt-manager

# ssh
sed -e '/PermitRootLogin/s/^/#/g' -i /etc/ssh/sshd_config
cat << EOF >> /etc/ssh/sshd_config
PermitRootLogin yes
EOF

systemctl restart sshd.service

# vnc
apt install xfce4 xfce4-goodies tightvncserver -y

# 패스워드 설정
vncserver

vncserver -kill :1
mv ~/.vnc/xstartup ~/.vnc/xstartup.bak

cat << EOF > ~/.vnc/xstartup
#!/bin/bash
xrdb $HOME/.Xresources
startxfce4 &
EOF

chmod +x ~/.vnc/xstartup


cat << EOF > /etc/systemd/system/vncserver@.service
[Unit]
Description=Start TightVNC server at startup
After=syslog.target network.target

[Service]
Type=forking
User=root
PAMName=login
PIDFile=$HOME/.vnc/%H:%i.pid
ExecStartPre=-/usr/bin/vncserver -kill :%i > /dev/null 2>&1
ExecStart=/usr/bin/vncserver -depth 24 -geometry 1280x800 :%i
ExecStop=/usr/bin/vncserver -kill :%i

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable vncserver@1.service
vncserver -kill :1
systemctl start vncserver@1
systemctl status vncserver@1

```
