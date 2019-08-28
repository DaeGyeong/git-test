from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app.main.config import config_by_name
# keystone
from flask_keystone import FlaskKeystone
from flask_oslolog import OsloLog
from oslo_config import cfg

key = FlaskKeystone()
log = OsloLog()
db = SQLAlchemy()

def create_app(config_name, config_file):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])
    app.config['RESTPLUS_MASK_SWAGGER'] = False
    db.init_app(app)
    
    if config_file is None:
        return app

    conf = cfg.CONF
    conf(default_config_files=[config_file])
    log.init_app(app)
    key.init_app(app)

    return app
