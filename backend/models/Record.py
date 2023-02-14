from extensions import db
from uuid import uuid4

def init_state():
    return [['' for i in range(3)] for j in range(3)]

class Record(db.Model):
    __tablename__ = "records"
    id = db.Column(db.Integer, primary_key = True, unique = True)
    challenger_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable = False)
    opponent_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable = False)
    state = db.Column(db.JSON, nullable=False, default = init_state())
    moves = db.Column(db.Integer, default = 0)

    def json(self):
        return {
            "game_id": self.id,
            "user_id": self.challenger_id,
            "opponent_id": self.opponent_id,
            "state": self.state,
            "moves": self.moves
        }
