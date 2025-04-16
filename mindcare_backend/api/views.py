from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils.crypto_utils import decrypt_data, encrypt_data
import requests
import os
@api_view(['POST'])
def decrypt_view(request):
    encrypted_text = request.data.get("cipher")
    passphrase = os.getenv("ENCRYPTION_PASSPHRASE")
    if not encrypted_text or not passphrase:
        return Response({"status": "error", "message": "Missing cipher or passphrase"}, status=400)
    try:
        data = decrypt_data(encrypted_text, passphrase)
        return Response({"status": "success", "data": data})
    except Exception as e:
        return Response({"status": "error", "message": str(e)}, status=400)

@api_view(['GET'])
def Hello(request):
    return Response({"status": "success", "data": "Hello World!"})


@api_view(['GET'])
def get_quote(request):
    """
    Fetch a random quote from ZenQuotes API and return it encrypted.
    """
    try:
        response = requests.get("https://zenquotes.io/api/random")
        response.raise_for_status()

        quote_data = response.json()
        passphrase = os.getenv("ENCRYPTION_PASSPHRASE")
        if not passphrase:
            return Response({"status": "error", "message": "Missing cipher or passphrase"}, status=400)

        # Encrypt the data
        encrypted_data = encrypt_data(quote_data, passphrase)

        return Response({
            "status": "success",
            "encrypted_quote": encrypted_data
        })

    except requests.exceptions.RequestException as e:
        return Response({
            "status": "error",
            "message": "Failed to fetch quote",
            "details": str(e)
        }, status=500)