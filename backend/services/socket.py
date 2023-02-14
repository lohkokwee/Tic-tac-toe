from flask import request
from flask_socketio import emit
from extensions import socketio
from models.User import User

online_users = set()

@socketio.on('connect')
def connect():
    print(f"=== Client ({request.sid}) connected ===")

@socketio.on('indicate_online')
def indicate_online(user):
    online_users.add(user["user"]["id"])
    print(f"=== Currently online: {list(online_users)} ===")

@socketio.on('challenge')
def challenge(data):
    user = data["user"]
    opponent = data["opponent"]
    opponent_id = User.query.filter_by(email=opponent).first().id

    if opponent_id in online_users:
        emit('opponent_unavailable')
    # else:
        # Create game record
        # Begin challenge