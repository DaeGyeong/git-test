```
mkdir /mon
cd /mon
wget https://dl.grafana.com/oss/release/grafana-6.4.2-1.x86_64.rpm
yum install grafana-6.4.2-1.x86_64.rpm -y

# vi /etc/grafana/grafana.ini
# admin/admin
systemctl enable grafana-server.service
systemctl start grafana-server.service
```
