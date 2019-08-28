- Centos 7  collectd & plugin 설치
```sh
yum install collectd -y
yum install collectd-virt -y
yum install collectd-write_prometheus -y


cat << EOF > /etc/collectd.d/log.conf
LoadPlugin "logfile"
<Plugin "logfile">
  LogLevel "info"
  File "/var/log/collectd.log"
  Timestamp true
</Plugin>
EOF


cat << EOF > /etc/collectd.d/libvirt.conf
LoadPlugin virt
<Plugin virt>
  Connection "qemu:///system"
  ExtraStats "cpu_util disk disk_err domain_state pcpu perf vcpupin"
#  HostnameFormat "name"
  HostnameFormat "uuid"
</Plugin>
EOF


cat << EOF > /etc/collectd.d/write_prometheus.conf
LoadPlugin write_prometheus
<Plugin write_prometheus>
  Port "9103"
</Plugin>
EOF
```
