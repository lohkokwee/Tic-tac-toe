from flask import request
import json
from flask_socketio import emit
from extensions import socketio
from models.User import User

online_users = set()

@socketio.on('connect')
def connect():
    print(f"=== Client ({request.sid}) connected ===")

@socketio.on('indicate_online')
def indicate_online(user):
    print(f"=== Connecting user, data: {user} ===")
    online_users.add(user["id"])
    print(f"=== Currently online: {list(online_users)} ===")

@socketio.on('indicate_offline')
def indicate_online(user):
    print(f"=== Disconnecting user, data: {user} ===")
    online_users.remove(user["id"])
    print(f"=== Currently online: {list(online_users)} ===")

@socketio.on('challenge')
def challenge(data):
    print(f"=== Challenge data: {data} ===")
    user_id = data["user_id"]
    user = User.query.filter_by(id = user_id).first()
    opponent_email = data["opponent_email"]
    opponent = User.query.filter_by(email=opponent_email).first()

    if opponent is None or opponent.id not in online_users:
        emit(f"opponent_unavailable_{user_id}", {}, broadcast = True)
        return

    opponent_id = opponent.id
    print(user.json())
    emit(f"incoming_challenge_{opponent_id}", user.json(), broadcast = True)

@socketio.on('reject')
def reject(data):
    print(f"=== Rejecting, {data} ===")
    emit('challenge_rejected', data, broadcast = True)

@socketio.on('accept')
def reject(data):
    print(f"=== Accepting, {data} ===")
    emit('challenge_accepted', data, broadcast = True)
    