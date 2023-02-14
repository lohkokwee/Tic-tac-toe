from flask import Blueprint, request, jsonify
from extensions import db
from models.User import User
from services.authenticate import authenticate_session

user_bp = Blueprint("user", __name__, url_prefix = '/user')

@user_bp.route("/get_all", methods = ["GET"])
def get_all_users():
    authorised_user = authenticate_session()
    if not authorised_user:
        return jsonify({"error": "Unauthorised."}), 401

    users = User.query.all()
    if len(users) == 0:
        return jsonify({"error": "Unable to retrieve users."}), 500
    
    return jsonify({
        "users": list(map(lambda x: x.json(), users)),
        "message": "Successfully retrieved."
    })