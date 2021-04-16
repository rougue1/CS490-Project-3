'''
Our server file
'''
# disabling some of the errors
# pylint: disable= E1101, C0413, R0903, W0603, W1508

import os
import operator  # for reordering the scores table
from flask import Flask, send_from_directory, json
from flask import request, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from db_api import *
import datetime

load_dotenv(find_dotenv())  # This is to load your env variables from .env

APP = Flask(__name__, static_folder='./build/static')
# Point SQLAlchemy to your Heroku database
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB = SQLAlchemy(APP)
# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues

DB.create_all()

USER = ''


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    '''
    Starting point
    '''
    return send_from_directory('./build', filename)


@APP.route('/login', methods=['POST'])
def login():
    '''
    Login function obtains user info
    '''
    global USER
    user_info = request.json
    if user_info:
        USER = DBQuery(user_info['userInfo']['GoogleId'],
                       user_info['userInfo']['Email'],
                       user_info['userInfo']['FirstName'],
                       user_info['userInfo']['LastName'])

        return jsonify(200)
    return jsonify(400)


@APP.route('/add', methods=['POST'])
def add():
    '''
    Add income or expense
    '''
    global USER
    user_info = request.json
    if user_info:
        base = user_info['formDataObj']
        USER.addTransaction(
            base['type'],
            base['amount'],
            base['date'],
            base['location'],
            base['description'],
        )
        return jsonify(200)
    return jsonify(400)

@APP.route('/update', methods=['POST'])
def update():
    '''
    Update income or expense
    '''
    global USER
    data = request.json

    if data:
        transaction_id = data["id_data"]
        USER.editTransaction(transaction_id,
            base['type'],
            base['amount'],
            correct_date,
            base['location'],
            base['description'],
        )
        print (jsonify(200))   
        return jsonify(200)
    return jsonify(400)

@APP.route('/home', methods=['Get'])
def home():
    '''
    Get transactions for a user
    '''
    global USER
    transactions = USER.getTransactions()
    return jsonify(transactions)


@APP.route('/userInfo', methods=['Get'])
def userInfo():
    '''
    Get a users full info
    '''
    global USER
    user_info = USER.get()
    return jsonify(user_info)

@APP.route('/delete', methods=['Post'])
def deleteInfo():
    '''
    Delete a transaction
    '''
    global USER
    data = request.json
    if data:
        transaction_id = data["id_data"]
        USER.removeTransaction(transaction_id)
        return jsonify(200)
    return jsonify(400)


if __name__ == "__main__":
    APP.run(
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
