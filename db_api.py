"""
Class that communicates with the DB. Abstraction so that app.py doesn't
get overloaded with code.
"""
import datetime
import models
from app import DB
# import sqlalchemy as sa


DB.create_all()
session = DB.session()


def convert_to_datetime_obj(date):
    """
    Function that converts a string to a datetime object,
    following proper format.
    """

    if isinstance(date, str):
        if '-' in date:
            date = date.replace('-', '/')
            date = datetime.datetime.strptime(
                date, "%Y/%m/%d").strftime("%m/%d/%Y").date()
        else:
            date = datetime.datetime.strptime(date, "%m/%d/%Y").date()
    return date


def get_the_user_info(full_name, transactions):
    """
    Unmocked getting user info function
    """
    total_balance = 0
    total_income = 0
    total_expense = 0
    for transaction in transactions:
        if transaction['transaction_type'] == 'Income':
            total_balance += transaction['amount']
            total_income += transaction['amount']
        else:
            total_balance -= transaction['amount']
            total_expense += transaction['amount']
    return {
        "full_name": full_name,
        "balance": round(total_balance, 2),
        "income": round(total_income, 2),
        "expense": round(total_expense, 2)
    }


def get_user_info(full_name, transactions):
    """
        Getting the user info
    """
    return get_the_user_info(full_name, transactions)


class DBQuery:
    """
    Class that allows communication with the DB.
    A DBQuery object is a user, and the methods deal with the user's transactions.
    Initialized with data returned from GoogleLogin.
    """
    user_id = ''
    email = ''
    first_name = ''
    last_name = ''

    def __init__(self, user_id: str, email: str, first_name: str,
                 last_name: str):
        """
        Initialize the user with data that comes from GoogleLogin.
        Creates the user if not already created.
        """
        self.user_id = user_id
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.add()

    def __str__(self):
        """
        Print all needed info of a user on printing of object.
        """
        info = self.get_info()
        return "Full Name: {}\nBalance: {}\nIncome: {}\nExpense: {}".format(
            info["full_name"], info["balance"], info["income"],
            info["expense"])

    def get_info(self):
        """
        Method to get the full name, total balance, total income,
        and total expenses of a user.
        """
        transactions = session.query(
            models.Users).filter_by(user_id=self.user_id).first().transactions
        info = []
        for transaction in transactions:
            info.append({
                'transaction_type': transaction.transaction_type,
                'amount': transaction.amount
            })
        full_name = self.first_name + ' ' + self.last_name
        user_info = get_user_info(full_name, info)
        return user_info

    def add(self):
        """
        Method to add a user.
        Adds all user info to user_info table if the user isn't already there.
        Since the DBQuery is initialized with all needed data, this method
        is just to abstract/split the code to add a user.
        """
        user = session.query(
            models.Users).filter_by(user_id=self.user_id).first()
        if user is None:
            to_add = models.Users(self.user_id, self.email, self.first_name,
                                  self.last_name)
            session.add(to_add)
            session.commit()

    def remove(self):
        """
        Method to remove the user.
        Removing user will cause cascade to transactions so
        all transactions dealing with a user also get deleted.
        """
        user = session.query(models.Users).filter_by(user_id=self.user_id)
        user.delete()
        session.commit()

    def get_transactions(self):
        """
        Method to get all transactions of a user.
        """
        transactions = session.query(
            models.Users).filter_by(user_id=self.user_id).first().transactions
        transactions.sort(key=lambda x: convert_to_datetime_obj(x.date))

        transactions_list = [{
            "id": transaction.transaction_id,
            "type": transaction.transaction_type,
            "amount": transaction.amount,
            "date": transaction.date,
            "location": transaction.location,
            "category": transaction.category,
            "description": transaction.description
        } for transaction in transactions]
        return transactions_list

    def get_transaction_categories(self):
        """
            Getting transactions by category
        """
        transactions = session.query(
            models.Users).filter_by(user_id=self.user_id).first().transactions
        user_categories = []
        user_categories = list(
            set([transaction.category for transaction in transactions]))
        return user_categories

    def add_transaction(self, transaction_type: str, amount: float, date: str,
                        location: str, category: str, description: str):
        """
        Method to add a transaction for the user.
        All values are needed.
        """
        date = convert_to_datetime_obj(date)
        to_add = models.Transaction(self.user_id, transaction_type, amount,
                                    date, location, category, description)
        session.add(to_add)
        session.commit()

    def edit_transaction(self, transaction_id, *args, **kwargs):
        """
        Method to edit a transaction for a user.
        transaction_id is needed as to know which transaction to edit.
        Other variables are optional, but follow order:
            transaction_type, amount, date, location, category and description.
        Method allows setting specific things too, like:
            transaction_type=
        """
        if len(args) == len(kwargs) == 0:
            return
        args = list(args)  # since tuple does not have extend()
        print(args)
        to_edit = session.query(models.Transaction).filter(
            models.Transaction.transaction_id == transaction_id,
            models.Transaction.user_id == self.user_id).first()
        if to_edit is not None:
            if len(args) != 7:
                transaction_info = [
                    to_edit.transaction_type, to_edit.amount, to_edit.date,
                    to_edit.location, to_edit.category, to_edit.description
                ]
                args.extend(transaction_info[len(args):])
            args[2] = convert_to_datetime_obj(args[2])
            [
                to_edit.transaction_type, to_edit.amount, to_edit.date,
                to_edit.location, to_edit.category, to_edit.description
            ] = args
            if len(kwargs) != 0:
                to_edit.transaction_type = kwargs.get("transaction_type",
                                                      to_edit.transaction_type)
                to_edit.amount = round(kwargs.get("amount", to_edit.amount), 2)
                to_edit.date = kwargs.get("date", to_edit.date)
                to_edit.location = kwargs.get("location", to_edit.location)
                to_edit.category = kwargs.get("category", to_edit.category)
                to_edit.description = kwargs.get("description",
                                                 to_edit.description)

            session.commit()

    def remove_transaction(self, transaction_id):
        """
        Method to remove a transaction.
        transaction_id is needed to know which specific transaction to remove.
        """
        to_remove = session.query(models.Transaction).filter(
            models.Transaction.transaction_id == transaction_id,
            models.Transaction.user_id == self.user_id).first()
        if to_remove is not None:
            session.delete(to_remove)
            session.commit()
