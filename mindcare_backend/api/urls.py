from django.urls import path
from .views import decrypt_view, Hello, get_quote

urlpatterns = [
    path('decrypt/', decrypt_view),
    path('hello/', Hello),
    path('quote/', get_quote),  # New endpoint for fetching quotes
]
