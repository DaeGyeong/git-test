from app.main import db

class Base(db.Model):
    __tablename__ = 'base'

    id = db.Column(db.Integer, primary_key=True)
    flavor_id = db.Column(db.Integer)
    cost = db.Column(db.Integer)
