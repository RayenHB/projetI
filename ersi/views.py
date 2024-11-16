# views.py

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import User, Prestatire, Client, Service
from .serializers import UserSerializer, PrestatireSerializer, ClientSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.http import HttpResponse, HttpResponseRedirect

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
