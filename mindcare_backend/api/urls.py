from django.urls import path
from .views import decrypt_view, Hello, get_quote, login_view, logout_view, check_session, check_user_type, anonymous_chat_view, signup_view, encrypt_view

urlpatterns = [
    path('decrypt/', decrypt_view),
    path('encrypt/', encrypt_view),
    path('hello/', Hello),
    path('quote/', get_quote),  # New endpoint for fetching quotes
    path('login/', login_view),  # Assuming you have a login view
    path('logout/', logout_view),  # Assuming you have a logout view
    path('check-session/', check_session),  # Assuming you have a session check view
    path('anonymous-chat/',anonymous_chat_view),
    path('check-user-type/', check_user_type),  # Assuming you have a user type check view
    path('signup/',signup_view),  # Assuming you have a signup view
]
