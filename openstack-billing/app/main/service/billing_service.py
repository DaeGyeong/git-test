from app.main.model.flavor import Flavor
from app.main.model.instances import Instance
from app.main.model.base import Base
from app.main.model.billing import Billing
from app.main import db
from flask import abort
import datetime

def save(data):
    db.session.add(data)
    db.session.commit()

def delete(obj):
    db.session.query(obj).delete()
    db.session.commit()

def BaseData(flavor):
    data = {
        'flavor_id': flavor.flavorid,
    }
    return data

def TimeZone(change):
    if change is None:
        return None
    change = str(change).split()
    date = change[0].split('-')
    time = change[1].split(':')
    time[0] = str(int(time[0]) + 9)

    date = '-'.join(date)
    time = ':'.join(time)
    return datetime.datetime.strptime(date + ' ' + time, '%Y-%m-%d %H:%M:%S')


class SyncService:
    @staticmethod
    def sync_flavor(type=None):
        if type is not None:
            data = BaseData(type)
            new_base = Base(**data)
            save(new_base)
            return

        query = Flavor.query.all()

        if Flavor.query.count() == Base.query.count():
            return 'same'

        for flavor in query:
            base = Base.query.filter_by(flavor_id=flavor.flavorid).first()
            if base is None:
                data = BaseData(flavor)
                new_base = Base(**data)
                save(new_base)
        return 'diff'

    @staticmethod
    def sync_instance():
        now = datetime.datetime.now()
        instances = Instance.query.all()
        for instance in instances:
            month = int(now.strftime('%m'))
            yaer = int(now.strftime('%Y'))
            billing = Billing.query.filter_by(month=month, year=yaer, vm_uuid=instance.uuid).first()

            if bool(billing):
                if billing.vm_terminated is not None: continue
                if instance.terminated_at is not None:
                    billing.vm_terminated = instance.terminated_at

                hourago = now - datetime.timedelta(hours=1)
                checkTime = now - TimeZone(instance.updated_at)
                base = Base.query.filter_by(flavor_id=instance.instance_type_id).first()
                # 인스턴스가 업데이트 된지 1시간 되었는지 체크
                if hourago < TimeZone(instance.updated_at):
                    # 업데이트 된지 30분 초과 하였는지
                    if int(checkTime.total_seconds()/60) < 30:
                        base = Base.query.filter_by(flavor_id=billing.vm_flavor_id).first()

                    billing.vm_flavor_id = instance.instance_type_id
                billing.cost += base.cost
                db.session.commit()
            else:
                base = Base.query.filter_by(flavor_id=instance.instance_type_id).first()
                data = {
                    'user': instance.user_id,
                    'project': instance.project_id,
                    'month': now.strftime('%m'),
                    'year':  now.strftime('%Y'),
                    'cost': base.cost,
                    'vm_uuid': instance.uuid,
                    'vm_flavor_id': instance.instance_type_id,
                    'vm_created': TimeZone(instance.created_at),
                    'vm_terminated': instance.terminated_at,
                    'vm_name': instance.display_name,
                }
                new_billing = Billing(**data)
                save(new_billing)


class BaseService:
    @staticmethod
    def get_all():
        result = list()
        for flavor in Flavor.query.all():
            base = Base.query.filter_by(flavor_id=flavor.flavorid).first()
            if base is None:
                SyncService.sync_flavor(flavor)
                base = Base.query.filter_by(flavor_id=flavor.flavorid).first()

            data = {
                "flavor_id": base.flavor_id,
                "flavor_name": flavor.name,
                "cpu": flavor.vcpus,
                "mem": flavor.memory_mb,
                "cost": base.cost,
            }
            result.append(data)
        return result

    @staticmethod
    def update(data):
        if data is None:
            return {'result': 'Required parameter is not specified'}, 400
        if data['flavor_id'] is None or data['cost'] is None:
            return {'result': 'Required parameter is not specified'}, 400
        id = data['flavor_id']
        query = Base.query.filter_by(flavor_id=id).update(data)
        if query:
            db.session.commit()
            return {'result': 'Successful', 'data': BaseService.get_all()}, 200
        return {'result': 'Bad Request'}, 400

# 192514506c074667bb573b5ed4faf7c8
# 7bf3951342854ee282fc8f963bc467e2
class BillingService:
    def __init__(self, request):
        self.project = request.get('project', None)
        self.user = request.get('user', None)
        self.year = request.get('year', None)
        self.month = request.get('month', None)
        # self.month = request.getlist('month', None)

    def response(self, bill, instance):
        flavor = Flavor.query.filter_by(flavorid=bill.vm_flavor_id).first()
        data = {
            # 'user': instance.user_id,
            # 'project': instance.project_id,
            'year': bill.year,
            'month': bill.month,
            'cost': bill.cost,
            'vm_created': TimeZone(instance.created_at),
            'vm_terminated': TimeZone(bill.vm_terminated),
            'vm_status': '정상' if bill.vm_terminated is None else '종료',
            'vm_vcpu': flavor.vcpus,
            'vm_mem': flavor.memory_mb,
            'vm_name': instance.display_name
        }
        return data

    def get(self):
        if self.project is None:
            return abort(400, description="project 파라미터는 필수 입니다.")
        if self.year is None:
            return abort(400, description="year 파라미터는 필수 입니다.")
        result = list()
        # 프로젝트별 필터
        if self.project:
            instances = Instance.query.filter_by(project_id=self.project).all()
        if not instances:
            return abort(204, description="프로젝트에 생성된 인스턴스가 없습니다.")
        for instance in instances:
            if self.month is None or not self.month:
                billing = Billing.query.filter_by(vm_uuid=instance.uuid, year=self.year).all()
            else:
                billing = Billing.query.filter_by(vm_uuid=instance.uuid, year=self.year, month=self.month).all()

            if not billing: continue
            for bill in billing:
                result.append(self.response(bill, instance))

        return result
