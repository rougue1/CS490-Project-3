# delete
# add user
# add expense
# get users
# get expenses for a user - sort by date (most recent)
# delete by transactionID
# update - optional

from datetime import date as dt
import models
from app import DB

DB.create_all()
session = DB.session()


class DBQuery:
    user_id = ""
    email = ""
    first_name = ""
    last_name = ""

    # You HAVE to call the constructor before accessing any other functions
    def __init__(self, user_id, email, first_name, last_name):
        self.user_id = user_id
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.add()

    def add(self):
        user = session.query(models.Users).filter_by(
            user_id=self.user_id).first()
        if not user:
            to_add = models.Users(self.user_id, self.email,
                                  self.first_name, self.last_name)
            session.add(to_add)
            session.commit()

    def remove(self):
        user = session.query(models.Users).filter_by(user_id=self.user_id)
        user.delete()
        session.commit()

    def addTransaction(self, transaction_type, amount, date, location,
                       description, transaction_id):
        # expenses = models.Expenses.query.all()

        # for expense in expenses:
        #     print(expense.user_id)

        to_add = models.Transaction(self.user_id, transaction_type, amount, dt.today(),
                                    location, description, transaction_id)
        session.add(to_add)
        session.commit()

    def getTransactions(self):
        transactions = session.query(models.Users).filter_by(
            user_id=self.user_id).first().transactions
        for transaction in transactions:
            print(transaction)
