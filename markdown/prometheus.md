- Centos 7 prometheus 설치
- "--web.listen-address=0.0.0.0:9999" 옵션으로 포트 바인딩 변경 가능

```sh
mkdir /mon
cd /mon
wget https://github.com/prometheus/prometheus/releases/download/v2.11.1/prometheus-2.11.1.linux-amd64.tar.gz
tar xvfz prometheus-*.tar.gz
ln -s prometheus-2.11.1.linux-amd64 prometheus
cd prometheus

cat << EOF > /etc/systemd/system/prometheus.service
[Unit]
Description=Prometheus Server
Documentation=https://prometheus.io/docs/introduction/overview/
After=network-online.target

[Service]
Restart=on-failure

ExecStart=/mon/prometheus/prometheus \
  --config.file=/mon/prometheus/prometheus.yml \
  --storage.tsdb.path=/mon/prometheus/data \
  --storage.tsdb.retention.time=365d

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable prometheus
systemctl start prometheus

mv /mon/prometheus/prometheus.yml /mon/prometheus/prometheus.yml.bak

cat << EOF > /mon/prometheus/prometheus.yml
global:
  scrape_interval:     60s # By default, scrape targets every 15 seconds.
  external_labels:
    monitor: 'codelab-monitor'

scrape_configs:
  - job_name: 'prometheus'

    scrape_interval:    60s

    static_configs:
      - targets: ['localhost:9103', 'localhost:65534']
EOF

```
