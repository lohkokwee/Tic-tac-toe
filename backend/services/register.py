from flask import Blueprint, request, jsonify
from extensions import db, bcrypt
from models.User import User

register_bp = Blueprint("register", __name__)

@register_bp.route("/register", methods = ["POST"])
def register_user():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "User already exists."}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email = email, password = hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        "user": new_user.json(),
        "message": "Successfully registered."
    })