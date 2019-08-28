from flask_restplus import Api
from flask import Blueprint

from app.main.controller.billing_controller import api as billing_ns

# blueprint = Blueprint('api', __name__, url_prefix='/api')
blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='FLASK RESTPLUS API',
          version='1.0',
          description='Billing API',
          doc='/docs'
          )


api.add_namespace(billing_ns, path='/billing')
