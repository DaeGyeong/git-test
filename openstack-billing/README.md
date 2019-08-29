## OpenStack Isntance Billing

### flavor 단위로 instance 과금을 진행

```sh
pip install -r  requirements.txt

# openstack keystone 인증 하지 않음
[dev]
python manage.py runserver

# openstack keystone 인증
[prod]
python run.py

[test]
source /root/keystonerc_admin
token=`openstack token issue |grep id |awk '{print $4}'|head -n 1`
curl -X GET http://localhost:8888/billing/base -H "X-Auth-Token: $token" -v

# openstack endpoint 생성 & billing user 생성 필수
# openstack service create --name billing --description "OpenStack Billing" billing
# openstack endpoint create --region RegionOne billing admin http://IP:PORT
# openstack endpoint create --region RegionOne billing public http://IP:PORT
# openstack endpoint create --region RegionOne billing internal http://IP:PORT
```
