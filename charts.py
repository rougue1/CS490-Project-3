import os
from flask import Flask, send_from_directory
from flask import request, jsonify
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from db_api import *
from datetime import datetime, timedelta
import pandas as pd
load_dotenv(find_dotenv())

APP = Flask(__name__, static_folder="./build/static")
APP.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
APP.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
DB = SQLAlchemy(APP)
DB.create_all()
USER = ''

# USER = DBQuery("109613092934114349003",
#               "ahirpara2000@gmail.com",
#               "Aman",
#               "Hirpara")

def groupData(data_expense):
    now = datetime.now()
    df = pd.DataFrame(data_expense)

    # dfw=df[df['date'].dt.month == now.month]
    
    today = datetime.today()
    week_prior =  today - timedelta(weeks=1)
    
    dfd = df[df['date'] >= week_prior]
    # print(dfw)
    dfm=df[df['date'].dt.year == now.year]
    #dfw=df
    df.date = pd.to_datetime(df.date)
    dgd = dfd.groupby(pd.Grouper(key='date', freq='1D')).sum() # groupby each 1 week
    dgm = dfm.groupby(pd.Grouper(key='date', freq='1M')).sum() # groupby each 1 month
    dgy = df.groupby(pd.Grouper(key='date', freq='1Y')).sum() # groupby each 1 Year
    # print(dgw)
    dgd.index = dgd.index.strftime('%A')
    dgm.index = dgm.index.strftime('%B')
    dgy.index = dgy.index.strftime('%Y')
    
    dd = dgd.to_dict()['amount']
    dm = dgm.to_dict()['amount']
    dy = dgy.to_dict()['amount']

    dw_lable = []
    dw_data = []
    dm_lable = []
    dm_data = []
    dy_lable = []
    dy_data = []
    
    for d in dy:
        dy_lable.append(d)
        dy_data.append(dy[d])
    
    for d in dm:
        dm_lable.append(d)
        dm_data.append(dm[d])
        
    for d in dd:
        dw_lable.append(d)
        dw_data.append(dd[d])

    return [dw_lable, dw_data, dm_lable, dm_data, dy_lable, dy_data]


             
             
# print(USER.get_transactions())
def get_chart_data(transactions):
    now = datetime.now()
    
    data_expense = {"amount": [], "date": []}
    data_income = {"amount": [], "date": []}
    
    for transaction in transactions:
        if(transaction["type"] == "Expense"):
            data_expense["amount"].append(transaction['amount'])
            data_expense["date"].append(pd.to_datetime(transaction['date']))
        
        elif(transaction["type"] == "Income"):
            data_income["amount"].append(transaction['amount'])
            data_income["date"].append(pd.to_datetime(transaction['date']))
    
    if len(data_expense["amount"]) > 0 and len(data_income["amount"]) > 0:
        expense_chart = groupData(data_expense)
        income_chart = groupData(data_income)
        
    return [expense_chart, income_chart]
'''
    Email: "ahirpara2000@gmail.com"
    FirstName: "Aman"
    FullName: "Aman Hirpara"
    GoogleId: "109613092934114349003"
    LastName: "Hirpara"
'''
              
#get_chart_data(USER.get_transactions())