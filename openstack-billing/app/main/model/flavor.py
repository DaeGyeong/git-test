from app.main import db

class Flavor(db.Model):
    __bind_key__ = 'nova_api'
    __tablename__ = 'flavors'

    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    name = db.Column(db.String(255), nullable=False, unique=True)
    id = db.Column(db.Integer, primary_key=True)
    memory_mb = db.Column(db.Integer, nullable=False)
    vcpus = db.Column(db.Integer, nullable=False)
    swap = db.Column(db.Integer, nullable=False)
    vcpu_weight = db.Column(db.Integer)
    flavorid = db.Column(db.String(255), nullable=False, unique=True)
    rxtx_factor = db.Column(db.Float)
    root_gb = db.Column(db.Integer)
    ephemeral_gb = db.Column(db.Integer)
    disabled = db.Column(db.Integer)
    is_public = db.Column(db.Integer)
    description = db.Column(db.Text)
