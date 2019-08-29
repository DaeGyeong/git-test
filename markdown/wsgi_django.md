# Centos 7 django + mod_wsgi + apache

```
echo 'root:PASSWORD' |chpasswd

yum install -y httpd
yum install -y https://centos7.iuscommunity.org/ius-release.rpm
yum install -y python36u python36u-libs python36u-devel python36u-pip python36u-mod_wsgi.x86_64
rpm -ivh https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
yum install -y mysql-community-devel
ln -s /bin/pip3.6 /bin/pip
pip install  --upgrade pip

sed -i 's/Require all denied/Require all granted/g' /etc/httpd/conf/httpd.conf

cat << 'EOF' > /etc/httpd/conf.d/django.conf
WSGIScriptAlias  / /web/django/config/wsgi.py
WSGIPythonPath /web/django
WSGIDaemonProcess testPython lang='ko_KR.UTF-8' locale='ko_KR.UTF-8'
<Directory /web/django/config>
<Files wsgi.py>
Require all granted
</Files>
</Directory>

Alias /static /web/django/staticfiles
<Directory /web/django/staticfiles>
    Require all granted
</Directory>
EOF

mkdir /logs
chown apache:root /logs
chmod 770 /logs

```
