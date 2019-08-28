- [kubespray](https://github.com/kubernetes-sigs/kubespray)
  - ansible 설치 필요
  - ssh-copy-id 이용하여 호스트들에 key 배포
  - node 3대가 필수로 필요하다

```sh
git clone https://github.com/kubernetes-sigs/kubespray.git
pip install -r requirements.txt

cp -rfp inventory/sample inventory/mycluster

declare -a IPS=(192.168.0.1 192.168.0.2 192.168.0.3)
CONFIG_FILE=inventory/mycluster/hosts.yml python3 contrib/inventory_builder/inventory.py ${IPS[@]}
# contrib/inventory_builder/inventory.py -> main() ip 입력

inventory/mycluster/group_vars/all/all.yml
inventory/mycluster/group_vars/k8s-cluster/k8s-cluster.yml
# config 수정
# 네이버클라우드는 지정되지 않은 사설 ip는 drop시키는 경우가 있음
# -> kube_service_addresses: 172.16.0.0/13
# -> kube_pods_subnet: 172.24.0.0/13


ansible-playbook -i inventory/mycluster/hosts.yml --become --become-user=root cluster.yml

```
