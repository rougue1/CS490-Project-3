"""
    Getting income and expenses for line charts
"""

# pylint: disable= C0103, R0914
from datetime import datetime, timedelta
import pandas as pd


def groupData(data_expense):
    now = datetime.now()
    df = pd.DataFrame(data_expense)

    today = datetime.today()
    week_prior = today - timedelta(weeks=1)

    dfd = df[(df['date'] <= pd.to_datetime('now'))
             & (df['date'] >= pd.to_datetime('now') - pd.offsets.Day(7))]

    dfm = df[(df['date'] <= pd.to_datetime('now'))
             & (df['date'] >= pd.to_datetime('now') - pd.DateOffset(months=1))]

    dfy = df[df['date'].dt.year == now.year]

    df.date = pd.to_datetime(df.date)
    dgd = dfd.groupby(pd.Grouper(key='date',
                                 freq='1D')).sum()  # groupby each 1 Day
    dgm = dfm.groupby(pd.Grouper(key='date',
                                 freq='1W')).sum()  # groupby each 1 Week
    dgy = dfy.groupby(pd.Grouper(key='date',
                                 freq='1M')).sum()  # groupby each 1 Month

    dgd.index = dgd.index.strftime('%A')
    dgm.index = dgm.index.strftime('%d %b')
    dgy.index = dgy.index.strftime('%B')

    dd = dgd.to_dict()['amount']
    dm = dgm.to_dict()['amount']
    dy = dgy.to_dict()['amount']

    dd_lable = []
    dd_data = []
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
        dd_lable.append(d)
        dd_data.append(dd[d])

    return {
        "days": {
            "labels": dd_lable,
            "data": dd_data
        },
        "month": {
            "labels": dm_lable,
            "data": dm_data
        },
        "year": {
            "labels": dy_lable,
            "data": dy_data
        }
    }


def get_chart_data(transactions):
    data_expense = {"amount": [], "date": []}
    data_income = {"amount": [], "date": []}

    for transaction in transactions:
        if (transaction["type"] == "Expense"):
            data_expense["amount"].append(transaction['amount'])
            data_expense["date"].append(pd.to_datetime(transaction['date']))

        elif (transaction["type"] == "Income"):
            data_income["amount"].append(transaction['amount'])
            data_income["date"].append(pd.to_datetime(transaction['date']))

    if len(data_expense["amount"]) > 0 and len(data_income["amount"]) > 0:
        expense_chart = groupData(data_expense)
        income_chart = groupData(data_income)

    if len(data_expense["amount"]) == 0:
        expense_chart = []
        income_chart = groupData(data_income)

    if len(data_income["amount"]) == 0:
        income_chart = []
        expense_chart = groupData(data_expense)

    return {"line": [expense_chart, income_chart]}
