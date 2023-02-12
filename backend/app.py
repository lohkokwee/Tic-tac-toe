from flask import Flask
from flask_cors import CORS
from config import AppConfig
from extensions import db, bcrypt, session
from models import User
from services import register, authenticate

def create_app():
    app = Flask(__name__)
    app.config.from_object(AppConfig)
    db.init_app(app)
    bcrypt.init_app(app)
    session.init_app(app)
    CORS(app, supports_credentials = True)

    with app.app_context():
        db.create_all()

    @app.route("/")
    def home():
        return "<h1>Tic-Tac-Toe Backend</h1>"

    app.register_blueprint(register.register_bp)
    app.register_blueprint(authenticate.authenticate_bp)
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5001, debug=True)