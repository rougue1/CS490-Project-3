"""
Our server file
"""
import os
from flask import Flask, send_from_directory
from flask import request, jsonify
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from db_api import *
from datetime import datetime, timedelta

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
                             data["location"], data["category"],
                             data["description"])
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
        transaction_id = data['id']
        base = data['formDataObj']
        print(base["location"])
        USER.edit_transaction(
            transaction_id,
            base["type"],
            base["amount"],
            base["date"],
            base["location"],
            base["category"],
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
    
@APP.route("/chartInfo", methods=["Get"])
def get_chart_info():
    """
    Get chart info
    """
    global USER

    transactions = USER.get_transactions()
    categories = USER.get_transaction_categories()
    # sums = [sum([transaction["amount"] for transaction in transactions if transaction["category"]==category and transaction["type"]=="Expense"]) for category in categories]
    # print(sums)
    
    sums = []
    sum_income = []
    sum_expense_month = []
    sum_income_month = []
    expense_cat = []  
    income_cat = []
    expense_cat_month = []
    income_cat_month = []
    
    print(categories)
    print(transactions)
    
    #removing duplicate categories
    new_categories = []
    for item in categories:
        if item not in new_categories:
            new_categories.append(item)
    
    print(new_categories)
    flag_expense_year = False
    flag_income_year = False
    flag_expense_month = False
    flag_income_month = False
    
    restrict_today = datetime.today().strftime("%Y-%m-%d")
    restrict_today = datetime.date(datetime.strptime(restrict_today,'%Y-%m-%d'))
    past_month = (datetime.today() - timedelta(30)).strftime("%Y-%m-%d")
    past_year = (datetime.today() - timedelta(365)).strftime("%Y-%m-%d")
    past_month = datetime.date(datetime.strptime(past_month, '%Y-%m-%d'))
    past_year = datetime.date(datetime.strptime(past_year, '%Y-%m-%d'))
    
    
    # print(type(datetime_object))
    # print(past_year)
    
    for category in new_categories: #go thru all of the categories
        li_expense_year = []
        li_income_year = []
        li_expense_month = []
        li_income_month = []
        
        for transaction in transactions:
            
            if transaction["category"] == category and transaction["type"] == "Expense" and transaction['date'] >= past_year and transaction['date'] <= restrict_today:
                 print(transaction["date"])
                 flag_expense_year = True
                 print(transaction["type"])
                 li_expense_year.append(transaction["amount"])
                 if category not in expense_cat:
                    expense_cat.append(category)
            
            if transaction["category"] == category and transaction["type"] == "Income" and transaction['date'] >= past_year and transaction['date'] <= restrict_today:
                flag_income_year = True
                li_income_year.append(transaction["amount"])
                if category not in income_cat:
                    income_cat.append(category)
            
            if transaction["category"] == category and transaction["type"] == "Expense" and transaction['date'] >= past_month and transaction['date'] <= restrict_today:
                flag_expense_month = True
                li_expense_month.append(transaction["amount"])
                if category not in expense_cat_month:
                    expense_cat_month.append(category)
                    
            if transaction["category"] == category and transaction["type"] == "Income" and transaction['date'] >= past_month and transaction['date'] <= restrict_today:
                flag_income_month = True
                li_income_month.append(transaction["amount"])
                if category not in income_cat_month:
                    income_cat_month.append(category)
                    
                    
        if flag_expense_year:    
            sums.append(sum(li_expense_year))
            flag_expense_year = False
            
        if flag_income_year:
            sum_income.append(sum(li_income_year))
            flag_income_year = False
            
        if flag_expense_month:
            sum_expense_month.append(sum(li_expense_month))
            flag_expense_month = False
            
        if flag_income_month:
            sum_income_month.append(sum(li_income_month))
            flag_income_month = False
        
        
    print(sums)
    print(expense_cat)
    print(sum_income)
    print(income_cat)
    
                    #expense year , value| income year, value | expense month , values | income month, values
    return jsonify([expense_cat,sums, income_cat, sum_income,  expense_cat_month, sum_expense_month, income_cat_month, sum_income_month])
    # return jsonify({transactions,categories)
    


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
