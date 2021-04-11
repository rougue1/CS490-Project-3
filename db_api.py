# delete
# add user
# add expense
# get users
# get expenses for a user - sort by date (most recent)
# delete by transactionID
# update - optional

from datetime import date as dt
from app import DB
import models

DB.create_all()
session = DB.session()


def addUser(user_id, email, first_name, last_name):
    to_add = models.Users(user_id, email, first_name, last_name)
    session.add(to_add)
    session.commit()


def addTransaction(user_id, transaction_type, amount, date, location,
                   description, transaction_id):
    # expenses = models.Expenses.query.all()

    # for expense in expenses:
    #     print(expense.user_id)

    to_add = models.Transaction(user_id, transaction_type, amount, dt.today(),
                                location, description, transaction_id)
    session.add(to_add)
    session.commit()


# expenses = session.query(models.Expenses).all()

# for expense in expenses:
#     print(expense)
