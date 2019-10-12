```sh
mkdir /mon
cd /mon
git clone https://github.com/openstack-exporter/openstack-exporter.git
cd openstack-exporter/
make common-build

cat << EOF > cloud.yml
clouds:
  main:
    auth:
      username: 'ADMIN_ID'
      password: 'ADMIN_PASS'
      project_name: 'ADMIN_PROJECT'
      project_domain_name: 'Default'
      user_domain_name: 'Default'
      auth_url: 'http://IP:PORT/v3'
      verify: False
    region_name: RegionOne
    identity_api_version: 3
    identity_interface: internal
EOF
./openstack-exporter --os-client-config ./cloud.yml main
```
