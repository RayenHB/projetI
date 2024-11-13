# views.py

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import User, Prestatire, Client
from .serializers import UserSerializer, PrestatireSerializer, ClientSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token



@api_view(['POST'])
def inscription(request):
    if request.method == 'POST':
        user_serializer = UserSerializer(data=request.data.get('user'))
        if user_serializer.is_valid():
            user = user_serializer.save()  
            
            role = user.role.lower()
            if role == 'prestataire':
                prestataire_data = request.data.get('prestataire')
                prestataire_serializer = PrestatireSerializer(data=prestataire_data)
                if prestataire_serializer.is_valid():
                    # Save prestataire with `is_approved=False`
                    prestataire_serializer.save(user=user, is_approved=False)
                    
                    # Notify user that their account is pending approval
                    send_mail(
                        'Account Pending Approval',
                        'Thank you for registering as a prestataire. Your account is currently on hold and awaiting admin approval.',
                        settings.DEFAULT_FROM_EMAIL,
                        [user.email],
                        fail_silently=False,
                    )
                else:
                    return Response(prestataire_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            elif role == 'client':
                client_data = request.data.get('client')
                client_serializer = ClientSerializer(data=client_data)
                if client_serializer.is_valid():
                    client_serializer.save(user=user)
                else:
                    return Response(client_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Authenticate user based on email and password
    user = authenticate(request, username=email, password=password)
    if user is None:
        return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)
    
    # If user has role "prestataire", ensure they are approved
    if user.role.lower() == 'prestataire':
        try:
            prestataire = Prestatire.objects.get(user=user)
            if not prestataire.is_approved:
                return Response({"error": "Account pending approval by admin"}, status=status.HTTP_403_FORBIDDEN)
        except Prestatire.DoesNotExist:
            return Response({"error": "Prestataire profile not found"}, status=status.HTTP_404_NOT_FOUND)

    # Generate or retrieve token for the user
    token, created = Token.objects.get_or_create(user=user)

    return Response({"token": token.key, "user_id": user.id, "role": user.role}, status=status.HTTP_200_OK)
