from app import DB

class Users(DB.Model):
    
    __tablename__ = "userInfo"
    
    user_id = DB.Column(DB.Integer, unique=True, nullable=False, primary_key=True)
    email = DB.Column(DB.String(255), unique=True, nullable=False)
    first_name = DB.Column(DB.String(255), nullable=False)
    last_name = DB.Column(DB.String(255), nullable=False)
    
    def __repr__(self):
        return '<UserID %r>' % self.user_id

    def __str__(self):
        return "UserID: {}, Email: {}".format(self.user_id, self.email)


class Expenses(DB.Model):
    
    __tablename__ = "expenses"
    
    user_id = DB.Column(DB.Integer, unique=True, nullable=False, primary_key=True)
    type = DB.Column(DB.String(255), nullable=False)
    amount = DB.Column(DB.Float, unique=False, nullable=False)
    date = DB.Column(DB.Date, unique=False)
    location = DB.Column(DB.String, nullable=False)
    description = DB.Column(DB.String, nullable=False)
    
    def __repr__(self):
        return '<UserID %r>' % self.user_id

    def __str__(self):
        return f"User {self.user_id} had {self.type} from {self.location} for amount {self.amount} on {self.date}"
    
    
    
    
    