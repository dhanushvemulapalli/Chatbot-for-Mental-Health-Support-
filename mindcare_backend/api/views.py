from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils.crypto_utils import decrypt_data, encrypt_data
from .models import User, UserPreference, EmergencyContact, Resource, Message, ChatSession
from mongoengine.queryset.visitor import Q
from datetime import datetime
import requests
import os
import json
import uuid
import re
from django.http import JsonResponse, HttpResponse
from io import BytesIO
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.core.cache import cache
from django.utils.timezone import now  # safer than datetime.utcnow()
from .utils.Chatbot import chatbot, crisis_check, summarize_msg  # Assuming you have a chatbot function in utils/Chatbot.py
from django.core.cache import cache
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

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
            input_password_hash = data.get('passwordhash')  # hashed from frontend

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


@csrf_exempt
def logout_view(request):
    request.session.flush()
    return JsonResponse({'message': 'Logged out'})


@csrf_exempt
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
    """
    Handles user signup. Expects a JSON payload with 'username', 'passwordhash', and 'emailaddress'.
    """
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



@csrf_exempt  # Disable CSRF for simplicity (you may want to secure this in production)
def store_in_redis(request):
    """
    Receives data from a POST request and stores it in Redis.
    Expected POST data format: {'key': 'your_key', 'value': 'your_value', 'ttl': 3600}
    TTL (time to live) is optional and defaults to 1 hour (3600 seconds).
    """
    if request.method == 'POST':
        try:
            # Parse JSON data from request body
            data = json.loads(request.body)
            
            # Extract key, value and ttl (time to live)
            key = data.get('key')
            value = data.get('value')
            ttl = data.get('ttl', 3600)  # Default TTL: 1 hour
            
            if not key or value is None:
                return JsonResponse({'error': 'Both key and value are required'}, status=400)
            
            # Store data in Redis
            cache.set(key, value, timeout=ttl)
            
            return JsonResponse({
                'success': True,
                'message': f'Data stored in Redis with key: {key}',
                'ttl': ttl
            })
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Only POST method is allowed'}, status=405)


@csrf_exempt
def update_user_profile(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST allowed'}, status=405)

    # Check if user is logged in
    session_user = request.session.get('user')
    if not session_user:
        return JsonResponse({'error': 'Not authenticated'}, status=401)

    try:
        data = json.loads(request.body)

        user = User.objects(username=session_user['username']).first()
        if not user:
            return JsonResponse({'error': 'User not found'}, status=404)

        # Update Preferences
        pref_data = data.get('preferences')
        if pref_data:
            user.preferences = UserPreference(
                interaction_mode=pref_data.get('interaction_mode'),
                coping_preferences=pref_data.get('coping_preferences', []),
                resource_preferences=pref_data.get('resource_preferences', []),
                created_date=datetime.utcnow()
            )

        # Update Emergency Contacts
        contacts_data = data.get('emergency_contacts')
        if contacts_data:
            contacts = []
            for c in contacts_data:
                contact = EmergencyContact(
                    name=c.get('name'),
                    phone_number=c.get('phone_number'),
                    email_address=c.get('email_address'),
                    relationship=c.get('relationship')
                )
                contacts.append(contact)
            user.emergency_contacts = contacts

        user.save()
        return JsonResponse({'message': 'User profile updated successfully'})

    except Exception as e:
        return JsonResponse({'error': f'Error: {str(e)}'}, status=500)


@csrf_exempt
def import_resources(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST allowed'}, status=405)

    try:
        body = json.loads(request.body)

        # Accept either a list or { "resources": [...] }
        if isinstance(body, list):
            resources = body
        elif isinstance(body, dict):
            resources = body.get("resources", [])
        else:
            return JsonResponse({'error': 'Invalid JSON structure'}, status=400)

        inserted = 0
        for res in resources:
            generated_id = str(uuid.uuid4())

            # Optional: skip if a resource with same title already exists
            if Resource.objects(title=res["title"]).first():
                continue

            new_res = Resource(
                resource_id=generated_id,
                title=res["title"],
                type=res.get("type", "unknown"),
                content=res.get("description", ""),
                external_link=res.get("link", ""),
                tags=res.get("tags", [])
            )
            new_res.save()
            inserted += 1

        return JsonResponse({"message": f"{inserted} resources inserted."}, status=200)

    except Exception as e:
        return JsonResponse({'error': f'Error: {str(e)}'}, status=500)


def mock_chatbot_response(user_input):

    # For now, simulate that the resource ID is fetched based on input
    response = f"Bot reply to: {user_input}"

    return {
        "response": response,
        "recommended_resource_url": "https://www.youtube.com/results?search_query=cute+dogs+anxiety+reduction"  # Return the external URL
    }

@csrf_exempt
def start_chat_session(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST allowed'}, status=405)

    try:
        data = json.loads(request.body)
        user_message = data.get("message")
        if not user_message:
            return JsonResponse({'error': 'Message is required'}, status=400)

        is_anonymous = request.session.get("is_anonymous", False)

        # Get user if logged in, else set to None for anonymous
        user = None
        session_user = request.session.get('user')
        if session_user:
            user = User.objects(username=session_user['username']).first()
            if not user:
                return JsonResponse({'error': 'User not found'}, status=404)

        # Get or create chat session
        if user:
            session = ChatSession.objects(user=user, end_time=None).order_by('-start_time').first()
        else:
            session_id = request.session.session_key
            session = ChatSession.objects(session_id=session_id, user=None, end_time=None).order_by('-start_time').first()

        if not session:
            session = ChatSession(
                session_id=str(uuid.uuid4()) if user else request.session.session_key,
                user=user,
                start_time=datetime.utcnow(),
                messages=[],
                recommended_resources=[]
            )

        # Store user message
        session.messages.append(Message(content=user_message, sent_by_user=True))

        # Crisis check
        if crisis_check(user_message):
            crisis_response = (
                "I'm really concerned about how you're feeling right now. "
                "It might be best to talk to a mental health professional or doctor as soon as possible. "
                "You're not alone — help is available, and you deserve support."
            )
            session.messages.append(Message(content=crisis_response, sent_by_user=False))
            session.save()

            return JsonResponse({
                "session_id": session.session_id,
                "messages": [
                    {
                        "content": m.content,
                        "sent_by_user": m.sent_by_user,
                        "timestamp": m.timestamp
                    } for m in session.messages
                ],
                "recommended_resources": []
            }, status=200)

        # Build chat history
        chat_history = [
            {
                "role": "user" if m.sent_by_user else "bot",
                "content": m.content
            }
            for m in session.messages
        ]

        # Chatbot response
        bot_output = chatbot(query=user_message, history=chat_history)
        bot_response = bot_output.get("answer", "")
        resource_links = bot_output.get("resources", [])

        resources = []
        resource_objects = []

        for item in resource_links:
            raw_link = item.get("link")
            if not raw_link:
                continue

            clean_link = re.sub(r'.*?\((https?://[^\s)]+)\).*', r'\1', raw_link.strip()).rstrip(').]')
            resource = Resource.objects(external_link=clean_link).first()

            if resource:
                if resource not in session.recommended_resources:
                    session.recommended_resources.append(resource)

                resource_objects.append(resource)

                resources.append({
                    "title": resource.title,
                    "link": resource.external_link,
                    "type": resource.type,
                    "description": resource.content,
                    "tags": resource.tags
                })
            else:
                resources.append({
                    "title": item.get("title", "External Resource"),
                    "link": clean_link,
                    "type": "external",
                    "description": "",
                    "tags": []
                })

        # Add bot message
        session.messages.append(Message(content=bot_response, sent_by_user=False))

        # Save session
        session.save()

        return JsonResponse({
            "session_id": session.session_id,
            "messages": [
                {
                    "content": m.content,
                    "sent_by_user": m.sent_by_user,
                    "timestamp": m.timestamp
                } for m in session.messages
            ],
            "recommended_resources": resources
        }, status=200)

    except Exception as e:
        return JsonResponse({'error': f'Error: {str(e)}'}, status=500)

@csrf_exempt
def end_chat_session(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST allowed'}, status=405)

    try:
        session_user = request.session.get('user')
        is_anonymous = request.session.get('is_anonymous', False)

        session = None
        summary = None

        if session_user:
            # Authenticated user session
            user = User.objects(username=session_user['username']).first()
            if not user:
                return JsonResponse({'error': 'User not found'}, status=404)

            session = ChatSession.objects(user=user, end_time=None).order_by('-start_time').first()

            if session:
                # Summarize the conversation
                conversation = "\n".join([
                    f"{'User' if m.sent_by_user else 'Bot'}: {m.content}" for m in session.messages
                ])
                try:
                    summary = summarize_msg(conversation)
                    session.session_summary = summary
                except Exception as summary_error:
                    print(f"[Summarization Error] {summary_error}")
                    summary = None

        elif is_anonymous:
            session_key = request.session.session_key
            session = ChatSession.objects(session_id=session_key, user=None, end_time=None).order_by('-start_time').first()

            if session:
                # Store all messages into cache
                cache_key = f"anon_chat_{session_key}"
                messages_data = [
                    {
                        "content": m.content,
                        "sent_by_user": m.sent_by_user,
                        "timestamp": m.timestamp.isoformat()
                    }
                    for m in session.messages
                ]
                cache.set(cache_key, messages_data, timeout=60 * 60 * 24)  # 24 hours

        else:
            return JsonResponse({'error': 'Unauthorized'}, status=401)

        if not session:
            return JsonResponse({'message': 'No active chat session found'}, status=200)

        session.end_time = now()
        session.save()

        response_data = {
            'message': 'Chat session ended',
            'session_id': session.session_id,
        }

        if summary:
            response_data['summary'] = summary

        return JsonResponse(response_data, status=200)

    except Exception as e:
        return JsonResponse({'error': f'Error: {str(e)}'}, status=500)

@csrf_exempt
def get_user_chat_sessions(request):
    if request.method != 'GET':
        return JsonResponse({'error': 'Only GET allowed'}, status=405)

    session_user = request.session.get('user')
    if not session_user:
        return JsonResponse({'error': 'Unauthorized'}, status=401)

    try:
        user = User.objects(username=session_user['username']).first()
        if not user:
            return JsonResponse({'error': 'User not found'}, status=404)

        sessions = ChatSession.objects(user=user).order_by('-start_time')

        data = []

        for session in sessions:
            messages = [
                {
                    "content": msg.content,
                    "sent_by_user": msg.sent_by_user,
                    "timestamp": msg.timestamp.isoformat()
                }
                for msg in session.messages
            ]

            session_data = {
                "session_id": session.session_id,
                "start_time": session.start_time.isoformat() if session.start_time else None,
                "end_time": session.end_time.isoformat() if session.end_time else None,
                "summary": session.session_summary,
                "messages": messages
            }

            data.append(session_data)

        return JsonResponse({"sessions": data}, status=200)

    except Exception as e:
        return JsonResponse({'error': f'Error fetching chat sessions: {str(e)}'}, status=500)

@csrf_exempt
def generate_chat_pdf(request, session_id):
    try:
        session = ChatSession.objects(session_id=session_id).first()
        if not session:
            return HttpResponse("Chat session not found", status=404)

        # Create a HttpResponse with PDF content type
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="chat_session_{session_id}.pdf"'

        # Set up PDF
        doc = SimpleDocTemplate(response, pagesize=A4)
        styles = getSampleStyleSheet()
        elements = []

        # Add title with the correct attribute (start_time)
        elements.append(Paragraph(f"Chat Session: {session.start_time}", styles['Title']))
        elements.append(Spacer(1, 12))

        # Add chat messages
        for msg in session.messages:
            role = "User" if msg.sent_by_user else "Bot"
            message = f"<b>{role}:</b> {msg.content}"
            elements.append(Paragraph(message, styles['Normal']))
            elements.append(Spacer(1, 8))

        # Add session summary
        if session.session_summary:
            elements.append(Spacer(1, 20))
            elements.append(Paragraph("<b>Summary:</b>", styles['Heading3']))
            elements.append(Paragraph(session.session_summary, styles['Normal']))

        # Build PDF
        doc.build(elements)
        return response

    except Exception as e:
        return HttpResponse(f"Error: {str(e)}", status=500)
