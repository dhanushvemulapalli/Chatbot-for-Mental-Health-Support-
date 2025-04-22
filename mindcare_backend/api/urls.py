from django.urls import path
from .views import decrypt_view, Hello, get_quote, login_view, logout_view, check_session, check_user_type, anonymous_chat_view, signup_view, encrypt_view, store_in_redis, update_user_profile, import_resources, start_chat_session, end_chat_session, get_user_chat_sessions, generate_chat_pdf, test_cookie, get_user_data, export_resources, send_test_email, check_user_preferences_and_contacts, send_otp, resend_otp, verify_otp, set_new_password

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
    path('export-resources/', export_resources),  # Assuming you have a resource export view
    path('start-chat-session/', start_chat_session),  # Assuming you have a chat session start view
    path('end-chat-session/', end_chat_session),  # Assuming you have a chat session end view
    path('get-user-chat-history/', get_user_chat_sessions),  # Assuming you have a chat history view
    path('get-chat-pdf/<str:session_id>/', generate_chat_pdf),  # Assuming you have a chat history view with session_id
    path('test-cookie/', test_cookie),  # Assuming you have a test cookie view
    path('get-user-data/',get_user_data),
    path('send-mail/',send_test_email),
    path('check-user-preference/',check_user_preferences_and_contacts),  # Assuming you have a user type check view
    path('send-otp/',send_otp),
    path('resend_otp/',resend_otp),
    path('verify-otp/',verify_otp),  # Assuming you have a user type check view
    path('set-new-password/',set_new_password),  # Assuming you have a user type check view
]
