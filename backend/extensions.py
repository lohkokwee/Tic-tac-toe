from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_socketio import SocketIO

db = SQLAlchemy()
bcrypt = Bcrypt()
session = Session()
socketio = SocketIO(cors_allowed_origins="*")