"""
Layout of schemas of tables to be created
"""

# pylint: disable= E1101, C0413, R0903, W0603, W1508, E1136, R0913

from sqlalchemy import ForeignKey, Column, Integer, Float, String, Date
from sqlalchemy.orm import relationship
from app import DB


class Users(DB.Model):
    """
    User table to store different users in the app.
    """
    __tablename__ = "user_info"

    user_id = Column(String, unique=True, nullable=False, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)

    transactions = relationship("Transaction",
                                backref="user",
                                cascade="all, delete-orphan")

    def __init__(self, user_id, email, first_name, last_name):
        self.user_id = user_id
        self.email = email
        self.first_name = first_name
        self.last_name = last_name

    def __repr__(self):
        return "<UserID %r>" % self.user_id

    def __str__(self):
        return "UserID: {}, Email: {}".format(self.user_id, self.email)


class Transaction(DB.Model):
    """
    Transactions table for users to add their transactions.
    """
    __tablename__ = "transactions"

    # user_id of the user entering transaction
    user_id = Column(String, ForeignKey("user_info.user_id",
                                        ondelete="CASCADE"))

    # type of transaction
    transaction_type = Column(String, nullable=False)

    # the cost of the transaction
    amount = Column(Float, unique=False, nullable=False)

    # date of transaction (datetime.date object); in form: YYYY-MM-DD
    date = Column(Date, unique=False)

    # location/origin of the transaction
    location = Column(String, nullable=False)

    # a short description of the transaction
    description = Column(String, nullable=False)

    # id of the transaction, supposed to be autoincrement according to user's list of transactions
    transaction_id = Column(Integer,
                            nullable=False,
                            primary_key=True,
                            autoincrement=True)

    user_info = relationship("Users",
                             primaryjoin=user_id == Users.user_id,
                             back_populates="transactions")

    def __init__(self, user_id, transaction_type, amount, date, location,
                 description):
        self.user_id = user_id
        self.transaction_type = transaction_type
        self.amount = amount
        self.date = date
        self.location = location
        self.description = description

    def __repr__(self):
        return "<TransactionID %r>" % self.transaction_id

    def __str__(self):
        return f"ID -> {self.transaction_id}: User {self.user_id} had {self.transaction_type}" \
               f" from {self.location} for amount {self.amount} on {self.date}"
