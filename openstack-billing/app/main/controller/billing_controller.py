from flask import request
from flask_restplus import Resource

from app.main.service.billing_service import SyncService, BaseService, BillingService
from app.main.util.dto import BillingDto

api = BillingDto.api
sync = BillingDto.sync
base = BillingDto.base
billing = BillingDto.billing

# request.json  -> payload
# request.args  -> parameters

@api.route('/crond')
class BillingSync(Resource):
    @api.doc(response={ 200: 'Sync Successful', 400: 'Bad Request'},
            params={ 'sync': 'Sync Type ( base || billing )' })
    def get(self):
        """ Sync Operations """
        param = request.args.get('sync')
        
        if param =='base':
            SyncService.sync_flavor()
            return {'result': 'sync base'}

        elif param == 'billing':
            SyncService.sync_instance()
            return {'result': 'sync billing'}

        return {'result': 'BAD REQUEST'}, 400


@api.route('/base')
class BillingBase(Resource):
    @api.doc(response={ 200: 'Sync Successful', 400: 'Bad Request'}, params={})
    @api.marshal_list_with(base)
    def get(self):
        """ List all Base data """
        return BaseService.get_all()

    @api.doc(response={ 200: 'Sync Successful', 400: 'Bad Request'}, body=base)
    def put(self):
        """ Charging for Flavor """
        return BaseService.update(request.json)


@api.route('')
class Billing(Resource):
    """ Billing """
    @api.doc(response={ 200: 'Sync Successful', 400: 'Bad Request'},
            params={ 'month': 'Filter MONTH', 'year': 'Filter YEAR' })
    @api.marshal_list_with(billing)
    def get(self):
        """ Response billing information by user or project """
        data = request.args.to_dict()

        response = BillingService(data)
        return response.get()
