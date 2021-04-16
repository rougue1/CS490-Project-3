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

    # You HAVE to call the constructor before accessing any other functions

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

    def get(self):
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

    def addTransaction(self, transaction_type, amount, date, location,
                       description):
        '''
        Method to add a transaction for the user.
        All values are needed.
        '''

        if isinstance(date, str):
            if '-' in date:
                date = date.replace('-', '/')
                date = datetime.datetime.strptime(
                    date, "%Y/%m/%d").strftime("%m/%d/%Y")
            else:
                date = datetime.datetime.strptime(date, "%m/%d/%Y")
        to_add = models.Transaction(self.user_id, transaction_type, amount,
                                    date, location, description)
        session.add(to_add)
        session.commit()

    def editTransaction(self, transaction_id, *args, **kwargs):
        '''
        Method to edit a transaction for a user.
        transaction_id is needed as to know which transaction to edit.
        Other variables are optional, but follow order:
            transaction_type, amount, date, location and description.
        Method allows setting specific things too, like:
            transaction_type=
            ...
        '''

        # dont do anything if nothing to edit
        if len(args) == len(kwargs) == 0:
            return

        args = list(args)  # since tuple does not have extend()
        to_edit = session.query(models.Transaction).filter(
            models.Transaction.transaction_id == transaction_id,
            models.Transaction.user_id == self.user_id).first()
        if to_edit is not None:

            # get pre-existing values for later
            transaction_info = [
                to_edit.transaction_type, to_edit.amount, to_edit.date,
                to_edit.location, to_edit.description
            ]
            # if not enough arguments are passed in, use the pre-existing values
            args.extend(transaction_info[len(args):])
            to_edit.transaction_type, to_edit.amount, to_edit.date, to_edit.location, to_edit.description = args

            if len(kwargs) != 0:
                # using dict.get(key, default) so that if the key DNE, it gets default value
                to_edit.transaction_type = kwargs.get("transaction_type",
                                                      to_edit.transaction_type)
                to_edit.amount = round(kwargs.get("amount", to_edit.amount), 2)
                to_edit.date = kwargs.get("date", to_edit.date)
                to_edit.location = kwargs.get("location", to_edit.location)
                to_edit.description = kwargs.get("description",
                                                 to_edit.description)
            session.commit()

    def removeTransaction(self, transaction_id):
        '''
        Method to remove a transaction.
        transaction_id is needed to know which specific transaction to remove.
        '''

        # match user id and transaction id to remove
        to_remove = session.query(models.Transaction).filter(
            models.Transaction.transaction_id == transaction_id,
            models.Transaction.user_id == self.user_id).first()
        if to_remove is not None:
            session.delete(to_remove)
            session.commit()
