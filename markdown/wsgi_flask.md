# Centos 7 flask + mod_wsgi + apache

```
yum install -y https://centos7.iuscommunity.org/ius-release.rpm
yum install -y python36u python36u-libs python36u-devel python36u-pip python36u-mod_wsgi.x86_64


cat << 'EOF' >> /etc/httpd/conf/httpd.conf
include /etc/httpd/conf/billing.conf
EOF


cat << 'EOF' > /etc/httpd/conf/billing.conf
Listen 8888
<VirtualHost *:8888>
     ServerName local_ip
     WSGIScriptAlias / /web/openstack-billing/httpd.wsgi
     <Directory /web/openstack-billing>
                # set permissions as per apache2.conf file
            Options FollowSymLinks
            AllowOverride None
            Require all granted
     </Directory>
</VirtualHost>
EOF
sed -i "s/local_ip/`hostname -I|cut -f 1 -d ' '`/g" /etc/httpd/conf/billing.conf

```
