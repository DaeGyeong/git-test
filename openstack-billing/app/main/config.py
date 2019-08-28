import os
import configparser

basedir = os.path.abspath(os.path.dirname(__file__) + '/../..')
configFile = os.path.join(basedir, 'config.ini')

config = configparser.ConfigParser()
config.read(configFile)
env = config['MAIN']['env']

class Config:
    DEBUG = False
    SECRET_KEY = config['MAIN'].get('secret_key')
    config = config[env]
    SQLALCHEMY_DATABASE_URI = config.get('db')
    SQLALCHEMY_BINDS = {
        'nova': config.get('nova'),
        'nova_api': config.get('nova_api'),
    }


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class TestingConfig(Config):
    DEBUG = True
    TESTING = True
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    DEBUG = False


config_by_name = dict(
    dev=DevelopmentConfig,
    test=TestingConfig,
    prod=ProductionConfig
)

key = Config.SECRET_KEY
