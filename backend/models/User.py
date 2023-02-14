from extensions import db
from models import Record

def get_uuid():
    return uuid4().hex # Returns hexed unique user id

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key = True, unique = True)
    email = db.Column(db.String(360), unique = True)
    password = db.Column(db.Text, nullable = False)

    challenger_records = db.relationship('Record', backref = 'challenger', lazy = True, foreign_keys='Record.challenger_id')
    opponent_records = db.relationship('Record', backref = 'opponent', lazy = True, foreign_keys='Record.opponent_id')

    def json(self):
        return {
            "id": self.id,
            "email": self.email,
            "challenger_records": list(map(lambda x: x.json(), self.challenger_records)),
            "opponent_records": list(map(lambda x: x.json(), self.opponent_records))
        }
