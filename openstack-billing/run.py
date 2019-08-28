import os
from app import blueprint
from app.main import create_app, config

env = config.env

app = create_app(env, config.configFile)
app.register_blueprint(blueprint)

app.app_context().push()
print('DEBUG : ' + str(app.debug))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8888)
