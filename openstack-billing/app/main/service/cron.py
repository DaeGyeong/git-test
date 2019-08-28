# openstack token
# openstack token issue |grep id |awk '{print $4}'|head -n 1

# Billing
# curl -X GET IP:PORT/billing/crond?sync=billing -H "X-Auth-Token: $token" -v
