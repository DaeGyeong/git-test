from app.main import db

class Billing(db.Model):
    __tablename__ = 'billing'

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(255), nullable=False)
    project = db.Column(db.String(255), nullable=False)
    month = db.Column(db.Integer, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    cost = db.Column(db.Integer)
    vm_uuid = db.Column(db.String(36), nullable=False)
    vm_flavor_id = db.Column(db.Integer, nullable=False)
    vm_created = db.Column(db.DateTime, nullable=False)
    vm_terminated = db.Column(db.DateTime)
    vm_name = db.Column(db.String(255))
