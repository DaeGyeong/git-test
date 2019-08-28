from flask_restplus import Namespace, fields

class BillingDto:
    api = Namespace('billing', description='billing related operations')
    sync = api.model('sync', {})
    base = api.model('base', {
            'flavor_id': fields.Integer(required=True, description='flavor ID'),
            'flavor_name': fields.String(readonly=True, description='flavor Name'),
            'cpu': fields.Integer(readonly=True, description='instance vpus'),
            'mem': fields.Integer(readonly=True, description='instance memory MB'),
            'cost': fields.Integer(required=True, description='billing charge'),
    })
    billing = api.model('billing', {
        'user': fields.String(readonly=True, description='user ID'),
        'project': fields.String(readonly=True, description='project ID'),
        'month': fields.Integer(required=True, description='Monthly Charge'),
        'year': fields.Integer(required=True, description='Yearly Charge'),
        'cost': fields.Integer(readonly=True, description='Charge'),
        'vm_created': fields.DateTime(readonly=True, description='instance created time'),
        'vm_terminated': fields.DateTime(readonly=True, description='instance terminated time'),
        'vm_status': fields.String(readonly=True, description='instance state'),
        'vm_vcpu': fields.Integer(readonly=True, description='instance vcpu'),
        'vm_mem': fields.Integer(readonly=True, description='instance mem'),
        'vm_name': fields.String(readonly=True, description='instance display name'),
    })
