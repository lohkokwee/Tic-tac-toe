from flask import Blueprint, request, jsonify
from extensions import db, bcrypt
from models.User import User

authenticate_bp = Blueprint("authenticate", __name__)

@authenticate_bp.route("/authenticate", methods = ["POST"])
def authenticate_user():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorised."}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorised."}), 401

    return jsonify({
        "user": user.json(),
        "message": "Successfully logged in."
    })