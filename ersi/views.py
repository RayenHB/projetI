# views.py

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import User, Prestatire, Client, Service
from .serializers import UserSerializer, PrestatireSerializer, ClientSerializer
from rest_framework.authtoken.models import Token
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.backends import ModelBackend
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import check_password





def index():
    HttpResponse('hey')

@api_view(['POST'])
def inscription(request):
    if request.method == 'POST':
        # Serialize and save the User model first
        user_serializer = UserSerializer(data=request.data.get('user'))
        print("Full request data:", request.data)  # Debugging line to check the full request
        if user_serializer.is_valid():
            # Save the User instance
            user = user_serializer.save()

            # Check the role to determine if the user is a prestataire or client
            role = request.data.get('user', {}).get('role', '').lower()
            print(role)

            if role == 'prestataire':
                prestataire_data = request.data.get('prestataire')
                service_type = prestataire_data.get('service')
                
                # Prepare data to save the prestataire
                prestataire_data['user'] = user.id

                if service_type == 'traiteur':
                    # Handle specific service details for 'traiteur'
                    description_traiteur = prestataire_data.get('description_traiteur')
                    photos_traiteur = request.FILES.getlist('photos_traiteur')
                    prestataire = Prestatire.objects.create(
                        user=user,
                        Service=service_type,  # Link to the service
                        is_approved=False  # By default, the account will be pending approval
                    )
                    prestataire.save()
                    print(prestataire)
                    # Create and save the service for 'traiteur'
                    service = Service.objects.create(
                        prestataire=prestataire,
                        description=description_traiteur
                    )
                    service.save()
                    
                    print('Registered as Traiteur')

                elif service_type == 'salle_fetes':
                    # Handle specific service details for 'salle_fetes'
                    description_salle_fetes = prestataire_data.get('description_salle_fetes')
                    photos_salle_fetes = request.FILES.getlist('photos_salle_fetes')

                    prestataire = Prestatire.objects.create(
                        user=user,
                        Service=service_type,  # Link to the service
                        is_approved=False  # By default, the account will be pending approval
                    )
                    prestataire.save()

                    service = Service.objects.create(
                        prestataire=prestataire,
                        description=description_salle_fetes
                    )
                    service.save()

                    
                    print('Registered as Salle des Fêtes')

                # Notify the prestataire about pending approval
                send_mail(
                    'Account Pending Approval',
                    'Your account as a prestataire is awaiting admin approval.',
                    settings.DEFAULT_FROM_EMAIL,
                    [user.email],
                    fail_silently=False,
                )
                    
                return Response({"message": "Prestataire created and pending approval!"}, status=status.HTTP_201_CREATED)

            elif role == 'client':
                print("Handling client registration...")
                client_data = request.data.get('client')
                try:
                   client = Client.objects.create(
                       user=user,
                       partenaire=client_data.get('partenaire'),
                       genre=client_data.get('sexe')
                    )
                   print("Client successfully created.")
                   return Response({"message": "Client created successfully!"}, status=status.HTTP_201_CREATED)
                except Exception as e:
                    print("Error creating client:", e)
                    return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("User serializer errors:", user_serializer.errors)  # Log validation errors
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")
            print(f"Email: {email}")
            print(f"Password: {password}")

            # Authenticate the user
            user = User.objects.filter(email=email).first()
            print(user)
            if user and check_password(password, user.password):
                print("User authenticated successfully:", user)
                login(request, user)
                return JsonResponse({
                    "message": "Login successful",
                    "user": {
                        "id": user.id,
                        "email": user.email,
                        "username": user.nom,
                    }
                }, status=200)
            else:
                print("Invalid credentials")
                return JsonResponse({"message": "Invalid email or password"}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid data format"}, status=400)
    else:
        return JsonResponse({"message": "Only POST requests are allowed"}, status=405)


@api_view(['GET'])
def client(request):
    try:
        
        print(request.user)
        data = {
            "nom": client.user.nom,
            "prenom": client.user.prenom,
            "email": client.user.email,
            "tel": client.user.tel,
           
        }
        print(data)
        return Response(data)
    except Client.DoesNotExist:
        return Response({"error": "Client not found"}, status=404)
    

@api_view(['GET'])
def prestataire(request, id):
    try:
        # Fetch the Prestataire with the given ID
        prestataire = Prestatire.objects.get(id=id)

        # Extract data from the related user fields
        data = {
            "nom": prestataire.user.nom,
            "prenom": prestataire.user.prenom,
            "email": prestataire.user.email,
            "tel": prestataire.user.tel,
            # Add other fields specific to Prestataire if needed
        }
        print(data)

        # Return the data in the response
        return Response(data)
    except Prestatire.DoesNotExist:
        return Response({"error": "Prestataire not found"}, status=404)
