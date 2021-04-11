from app import DB
from sqlalchemy import Column, Integer, Float, String, Date


class Users(DB.Model):
    '''
    User table to store different users in the app.
    '''
    __tablename__ = "user_info"

    user_id = Column(Integer, unique=True, nullable=False, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)

    def __init__(self, user_id, email, first_name, last_name):
        self.user_id = user_id
        self.email = email
        self.first_name = first_name
        self.last_name = last_name

    def __repr__(self):
        return '<UserID %r>' % self.user_id

    def __str__(self):
        return "UserID: {}, Email: {}".format(self.user_id, self.email)


class Transaction(DB.Model):

    __tablename__ = "transactions"

    # user_id of the user entering transaction
    user_id = Column(Integer, nullable=False, unique=False, primary_key=True)
    # type of transaction
    transaction_type = Column(String, nullable=False)
    # the cost of the transaction
    amount = Column(Float, unique=False, nullable=False)
    # date of transaction; in form: YYYY-MM-DD
    date = Column(Date, unique=False)
    # location/origin of the transaction
    location = Column(String, nullable=False)
    # a short description of the transaction
    description = Column(String, nullable=False)
    # id of the transaction, supposed to be autoincrement according to user's list of transactions
    transaction_id = Column(Integer, nullable=False)

    def __init__(self, user_id, type, amount, date, location, description,
                 transaction_id):
        self.user_id = user_id
        self.type = type
        self.amount = amount
        self.date = date
        self.location = location
        self.description = description
        self.transaction_id = transaction_id

    def __repr__(self):
        return '<UserID %r>' % self.user_id

    def __str__(self):
        return f"User {self.user_id} had {self.type} from {self.location} for amount {self.amount} on {self.date}"
