"""
Our server file
"""
# pylint: disable= E1101, C0413, R0903, W0603, W1508
import os
from flask import Flask, send_from_directory
from flask import request, jsonify
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from db_api import *

load_dotenv(find_dotenv())  # This is to load your env variables from .env
APP = Flask(__name__, static_folder="./build/static")
APP.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
APP.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
DB = SQLAlchemy(APP)
DB.create_all()
USER = ''


@APP.route('/', defaults={"filename": "index.html"})
@APP.route("/<path:filename>")
def index(filename):
    """
    Starting point
    """
    return send_from_directory("./build", filename)


@APP.route("/login", methods=["POST"])
def login():
    """
    Login function obtains user info
    """
    global USER
    user_info = request.json
    if user_info:
        USER = DBQuery(user_info["userInfo"]["GoogleId"],
                       user_info["userInfo"]["Email"],
                       user_info["userInfo"]["FirstName"],
                       user_info["userInfo"]["LastName"])

        return jsonify(200)
    return jsonify(400)


@APP.route("/add", methods=["POST"])
def add():
    """
    Add income or expense
    """
    global USER
    data = request.json["formDataObj"]
    if data:
        USER.add_transaction(data["type"], data["amount"], data["date"],
                             data["location"], data["description"])
        return jsonify(200)
    return jsonify(400)


@APP.route("/update", methods=["POST"])
def update():
    """
    Update income or expense
    """
    global USER
    data = request.json

    if data:
        transaction_id = data["idData"]
        base = data["formDataObj"]
        USER.edit_transaction(
            transaction_id,
            base["type"],
            base["amount"],
            base["date"],
            base["location"],
            base["description"],
        )
        print(jsonify(200))
        return jsonify(200)
    return jsonify(400)


@APP.route("/home", methods=["Get"])
def home():
    """
    Get transactions for a user
    """
    global USER
    return jsonify(USER.get_transactions())


@APP.route("/userInfo", methods=["Get"])
def get_user_info():
    """
    Get a users full info
    """
    global USER
    return jsonify(USER.get_info())


@APP.route("/delete", methods=["Post"])
def delete_transaction():
    """
    Delete a transaction
    """
    global USER
    data = request.json
    if data:
        transaction_id = data["id_data"]
        USER.remove_transaction(transaction_id)
        return jsonify(200)
    return jsonify(400)


if __name__ == "__main__":
    APP.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=8081 if os.getenv("C9_PORT") else int(os.getenv("PORT", 8081)),
    )
