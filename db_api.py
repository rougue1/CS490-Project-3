# delete - DONE
# add user - DONE
# add expense - DONE
# get expenses for a user - sort by date (most recent) - DONE
# delete by transactionID - DONE
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
        user = session.query(
            models.Users).filter_by(user_id=self.user_id).first()
        if user is None:
            to_add = models.Users(self.user_id, self.email, self.first_name,
                                  self.last_name)
            session.add(to_add)
            session.commit()

    def remove(self):
        user = session.query(models.Users).filter_by(user_id=self.user_id)
        user.delete()
        session.commit()

    def addTransaction(self, transaction_type, amount, date, location,
                       description):
        # transaction = session.query(models.Transaction).filter(
        #     models.Transaction.user_id == self.user_id,
        #     models.Transaction.transaction_id == transaction_id).first()
        to_add = models.Transaction(self.user_id, transaction_type, amount,
                                    date, location, description)
        session.add(to_add)
        session.commit()

    def removeTransaction(self, transaction_id):
        # match user id and transaction id to remove
        to_remove = session.query(models.Transaction).filter(
            models.Transaction.transaction_id == transaction_id,
            models.Transaction.user_id == self.user_id).first()
        if to_remove is not None:
            to_remove.delete()
            session.commit()

    def getTransactions(self):
        transactions = session.query(
            models.Users).filter_by(user_id=self.user_id).first().transactions
        transactions.sort(key=lambda x: x.date)
        transactions_list = []
        for transaction in transactions:
            transactions_list.append({
                "id": transaction.transaction_id,
                "type": transaction.transaction_type,
                "amount": transaction.amount,
                "date": transaction.date,
                "location": transaction.location,
                "description": transaction.description
            })
        return transactions_list
