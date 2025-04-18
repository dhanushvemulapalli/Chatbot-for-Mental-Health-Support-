from django.urls import path
from .views import decrypt_view, Hello, get_quote, login_view, logout_view, check_session, check_user_type, anonymous_chat_view, signup_view, encrypt_view, store_in_redis, update_user_profile, import_resources, start_chat_session, end_chat_session, get_user_chat_sessions, generate_chat_pdf

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
    path('store-redis/',store_in_redis),
    path('update-user-profile/',update_user_profile),  # Assuming you have a user profile update view
    path('import-resources/', import_resources),  # Assuming you have a resource import view
    path('start-chat-session/', start_chat_session),  # Assuming you have a chat session start view
    path('end-chat-session/', end_chat_session),  # Assuming you have a chat session end view
    path('get-user-chat-history/', get_user_chat_sessions),  # Assuming you have a chat history view
    path('get-chat-pdf/<str:session_id>/', generate_chat_pdf),  # Assuming you have a chat history view with session_id
]
