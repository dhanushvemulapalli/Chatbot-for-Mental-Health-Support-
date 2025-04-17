from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils.crypto_utils import decrypt_data, encrypt_data
from .models import User
import requests
import os
import json
import uuid
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate, login

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


@api_view(['POST'])
def encrypt_view(request):
    plaintext = request.data.get("plaintext")
    passphrase = os.getenv("ENCRYPTION_PASSPHRASE")

    if not plaintext or not passphrase:
        return Response({"status": "error", "message": "Missing plaintext or passphrase"}, status=400)

    try:
        encrypted_text = encrypt_data(plaintext, passphrase)
        return Response({"status": "success", "cipher": encrypted_text})
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

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            input_password_hash = data.get('password')  # hashed from frontend

            if not username or not input_password_hash:
                return JsonResponse({'message': 'Username and password are required'}, status=400)

            # Find user
            user = User.objects(username=username).first()
            if not user:
                return JsonResponse({'message': 'Invalid credentials'}, status=401)

            # Compare the hashes directly
            if input_password_hash == user.password:
                # Set session
                request.session['user'] = {
                    'username': user.username,
                    'emailaddress': user.email_address
                }
                return JsonResponse({'message': 'Login successful', 'loggedIn': True})
            else:
                return JsonResponse({'message': 'Invalid credentials'}, status=401)

        except Exception as e:
            return JsonResponse({'message': f'Error: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Only POST allowed'}, status=405)


def check_session(request):
    user = request.session.get('user')
    if user:
        return JsonResponse({'loggedIn': True, 'user': user})
    return JsonResponse({'loggedIn': False}, status=401)

def logout_view(request):
    request.session.flush()
    return JsonResponse({'message': 'Logged out'})


def anonymous_chat_view(request):
    if not request.session.session_key:
        request.session.create()  # ensures a session is created
    request.session['is_anonymous'] = True

    # Store data like:
    request.session['mood'] = 'neutral'

    return JsonResponse({
        'session_id': request.session.session_key,
        'message': 'Anonymous session started',
    })

def check_user_type(request):
    # Check if user is authenticated via Django's authentication system
    if request.user.is_authenticated:
        return JsonResponse({'type': 'logged-in', 'user': request.user.username})
    
    # Check if the session contains user data (for custom authentication via sessions)
    user = request.session.get('user')
    if user:
        return JsonResponse({'type': 'logged-in', 'user': user['username']})
    
    # Check if it's an anonymous session
    elif request.session.get('is_anonymous'):
        return JsonResponse({'type': 'anonymous'})
    
    # Otherwise, return unknown
    else:
        return JsonResponse({'type': 'unknown'}, status=401)



@csrf_exempt  # Disable CSRF for simplicity (you may want to secure this in production)
def signup_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            passwordhash = data.get('passwordhash')
            email = data.get('emailaddress')

            # Basic validation
            if not username or not passwordhash or not email:
                return JsonResponse({'error': 'All fields are required'}, status=400)

            # Check if user exists
            if User.objects(username=username).first() or User.objects(email_address=email).first():
                return JsonResponse({'error': 'Username or email already exists'}, status=409)

            # Create the user
            user = User(
                user_id=str(uuid.uuid4()),
                username=username,
                password=passwordhash,
                email_address=email,
                login_attempts=0
            )
            user.save()

            return JsonResponse({'message': 'User created successfully'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid HTTP method'}, status=405)