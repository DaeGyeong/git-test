```
mkdir /mon
cd /mon
yum install java -y

# elasticsearch
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.4.2.rpm
yum install elasticsearch-6.4.2.rpm -y

# kibana
wget https://artifacts.elastic.co/downloads/kibana/kibana-6.4.2-x86_64.rpm
yum install kibana-6.4.2-x86_64.rpm -y

# logstash
wget https://artifacts.elastic.co/downloads/logstash/logstash-6.4.2.rpm
yum install logstash-6.4.2.rpm -y

cat << EOF >> /etc/elasticsearch/elasticsearch.yml
network.host: 0.0.0.0
EOF

cat << EOF >> /etc/kibana/kibana.yml
server.host: 0.0.0.0
elasticsearch.url : http://localhost:9200
EOF

systemctl enable elasticsearch
systemctl enable kibana
systemctl enable logstash

systemctl start elasticsearch
systemctl start kibana
systemctl start logstash

```
