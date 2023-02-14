from flask import Blueprint, request, jsonify
from extensions import db
from models.Record import Record
from services.authenticate import authenticate_session

record_bp = Blueprint("record", __name__, url_prefix = '/record')

@record_bp.route("/get_all", methods = ["GET"])
def get_all_records():
    authorised_user = authenticate_session()
    if not authorised_user:
        return jsonify({"error": "Unauthorised."}), 401

    records = Record.query.all()
    return jsonify({
        "records": list(map(lambda x: x.json(), records)),
        "message": "Get all records."
    })

@record_bp.route("/get_current_user")
def get_current_user_records():
    authorised_user = authenticate_session()
    if not authorised_user:
        return jsonify({"error": "Unauthorised."}), 401

    records = Record.query.filter(
        (Record.challenger_id == authorised_user.id) 
        | (Record.opponent_id == authorised_user.id)
    ).all()
    
    return jsonify({
        "records": list(map(lambda x: x.json(), records)),
        "message": "Get user records."
    })

def create_new_record(challenger_id, opponent_id):
    authorised_user = authenticate_session()
    if not authorised_user:
        return False

    new_record = Record(challenger_id = challenger_id, opponent_id = opponent_id)
    db.session.add(new_record)
    db.session.commit()
    return new_record

@record_bp.route("/", methods = ["POST"])
def post_new_record():
    authorised_user = authenticate_session()
    if not authorised_user:
        return jsonify({"error": "Unauthorised."}), 401

    data = request.get_json()
    challenger_id = data.get("challenger_id", None)
    opponent_id = data.get("opponent_id", None)

    if challenger_id is None or opponent_id is None or challenger_id == opponent_id:
        return jsonify({"error": "Invalid parameters."}), 400

    new_record = create_new_record(challenger_id, opponent_id)

    if not new_record:
        return jsonify({"error": "Unauthorised."}), 401

    return jsonify({
        "record": new_record.json(),
        "message": "Successfully created."
    })

def update_record_state(record_id, update_state):
    authorised_user = authenticate_session()
    if not authorised_user:
        return False

    record = Record.query.filter(Record.id == record_id).first()
    try:
        record.state = update_state
        record.moves += 1
        db.session.commit()
    except:
        return False

    return record

@record_bp.route("/update_state", methods = ["PUT"])
def post_record_state():
    authorised_user = authenticate_session()
    if not authorised_user:
        return jsonify({"error": "Unauthorised."}), 401

    data = request.get_json()
    record_id = data.get("record_id", None)
    update_state = data.get("update_state", None)
    challenger_id = data.get("challenger_id", None)
    opponent_id = data.get("opponent_id", None)

    if record_id is None or update_state is None or challenger_id is None or opponent_id is None:
        return jsonify({"error": "Invalid parameters."}), 400

    updated_record = update_record_state(record_id, update_state)

    if not updated_record:
        return jsonify({"error": "Error updating record."}), 500

    return jsonify({
        "record": updated_record.json(),
        "message": "Successfully updated."
    })