# kavya
from mongoengine import (
    Document, EmbeddedDocument,
    StringField, IntField, DateTimeField,
    EmailField, ListField, EmbeddedDocumentField,
    ReferenceField, URLField, BooleanField
)
from datetime import datetime


# ======= Embedded Documents =======

class EmergencyContact(EmbeddedDocument):
    name = StringField(required=True)
    phone_number = StringField()
    email_address = EmailField()
    relationship = StringField()


class UserPreference(EmbeddedDocument):
    interaction_mode = StringField()
    coping_preferences = ListField(StringField())
    resource_preferences = ListField(StringField())  # Or ReferenceField if linking to a Resource model
    created_date = DateTimeField(default=datetime.utcnow)


# ======= Main User Document =======

class User(Document):
    user_id = StringField(max_length=36, unique=True, required=True)
    username = StringField(max_length=50, unique=True, required=True)
    password = StringField(max_length=256, required=True)
    email_address = StringField(max_length=100, unique=True, required=True)
    last_login_date = DateTimeField(default=None)
    login_attempts = IntField(default=0, required=True)

    # New fields based on ERD
    preferences = EmbeddedDocumentField(UserPreference)
    emergency_contacts = ListField(EmbeddedDocumentField(EmergencyContact))

    def __str__(self):
        return f"User {self.username} (ID: {self.user_id})"


# ======= RESOURCE Model =======

class Resource(Document):
    resource_id = StringField(max_length=36, unique=True, required=True)
    title = StringField(required=True)
    type = StringField(required=True)  # e.g., "Article", "Video", "PDF"
    content = StringField()  # Could be text or description
    external_link = URLField()
    tags = ListField(StringField())

    def __str__(self):
        return f"Resource: {self.title}"


# ======= MESSAGE Embedded Document =======

class Message(EmbeddedDocument):
    content = StringField(required=True)
    timestamp = DateTimeField(default=datetime.utcnow)
    sent_by_user = BooleanField(required=True)  # True if sent by user, False if bot

    def __str__(self):
        return f"{'[User]' if self.sent_by_user else '[Bot]'}: {self.content}"


# ======= CHAT SESSION Document =======

class ChatSession(Document):
    session_id = StringField(max_length=36, unique=True, required=True)
    user = ReferenceField('User', required=False, reverse_delete_rule=2)  # CASCADE
    start_time = DateTimeField(default=datetime.utcnow)
    end_time = DateTimeField()
    session_summary = StringField()

    messages = ListField(EmbeddedDocumentField(Message))
    recommended_resources = ListField(ReferenceField(Resource))

    def __str__(self):
        return f"ChatSession ({self.session_id}) for {self.user.username}"