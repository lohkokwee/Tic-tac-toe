from flask import Blueprint, request, jsonify, session
from extensions import db, bcrypt
from models.User import User

authenticate_bp = Blueprint("authenticate", __name__, url_prefix = '/authenticate')

@authenticate_bp.route("/", methods = ["POST"])
def authenticate_user():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorised."}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorised."}), 401

    session["used_id"] = user.id

    return jsonify({
        "user": user.json(),
        "message": "Successfully logged in."
    })

def authenticate_session():
    user_id = session.get("used_id")
    if user_id is None:
        return False
    
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return False

    return user
    
@authenticate_bp.route("/@me")
def get_current_user():
    user_id = session.get("used_id")
    if user_id is None:
        return jsonify({"error": "Unauthorised."}), 401

    user = User.query.filter_by(id=user_id).first()
    if user is None:
        # There's user id but unable to find user.
        return jsonify({"error": "Internal Server Error."}), 500

    return jsonify({
        "user": user.json(),
        "message": "Get current user."
    }, 200)