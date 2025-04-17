# models.py
from mongoengine import Document, StringField, IntField, DateTimeField
from datetime import datetime

class User(Document):
    user_id = StringField(max_length=36, unique=True, required=True)  # Unique ID
    username = StringField(max_length=50, unique=True, required=True)  # Unique username
    password = StringField(max_length=256, required=True)  # Encrypted password hash
    email_address = StringField(max_length=100, unique=True, required=True)  # Unique email address
    last_login_date = DateTimeField(default=None)  # Timestamp of last login
    login_attempts = IntField(default=0, required=True)  # Number of consecutive failed login attempts
    
    # Optional: Custom method to display the user info in a friendly format
    def __str__(self):
        return f"User {self.username} (ID: {self.user_id})"
