'''
Class that communicates with the DB. Abstraction so that app.py doesn't
get overloaded with code.
'''
import datetime
import models
from app import DB
DB.create_all()
session = DB.session()


def convertToDatetimeObj(d):
    '''
    Function that converts a string to a datetime object,
    following proper format.
    '''
    if isinstance(d, str):
        if '-' in d:
            d = d.replace('-', '/')
            d = datetime.datetime.strptime(
                d, "%Y/%m/%d").strftime("%m/%d/%Y").date()
        else:
            d = datetime.datetime.strptime(d, "%m/%d/%Y").date()
    return d


class DBQuery:
    '''
    Class that allows communication with the DB.
    A DBQuery object is a user, and the methods deal with the user's transactions.
    Initialized with data returned from GoogleLogin.
    '''
    user_id = ""
    email = ""
    first_name = ""
    last_name = ""

    def __init__(self, user_id, email, first_name, last_name):
        '''
        params:
            all are strings
        '''
        self.user_id = user_id
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.add()

    def getInfo(self):
        '''
        Method to get the full name, total balance, total income,
        and total expenses of a user.
        '''
        transactions = session.query(
            models.Users).filter_by(user_id=self.user_id).first().transactions
        full_name = self.first_name + ' ' + self.last_name
        total_balance = 0
        total_income = 0
        total_expense = 0
        for transaction in transactions:
            if transaction.transaction_type == 'Income':
                total_balance += transaction.amount
                total_income += transaction.amount
            else:
                total_balance -= transaction.amount
                total_expense += transaction.amount
        return {
            "full_name": full_name,
            "balance": round(total_balance, 2),
            "income": round(total_income, 2),
            "expense": round(total_expense, 2)
        }

    def add(self):
        '''
        Method to add a user.
        Since the DBQuery is initialized with all needed data, this method
        is just to abstract/split the code to add a user.
        '''
        user = session.query(
            models.Users).filter_by(user_id=self.user_id).first()
        if user is None:
            to_add = models.Users(self.user_id, self.email, self.first_name,
                                  self.last_name)
            session.add(to_add)
            session.commit()

    def remove(self):
        '''
        Method to remove the user.
        Removing user will cause cascade to transactions so
        all transactions dealing with a user also get deleted.
        '''
        user = session.query(models.Users).filter_by(user_id=self.user_id)
        user.delete()
        session.commit()

    def getTransactions(self):
        '''
        Method to get all transactions of a user.
        '''
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
