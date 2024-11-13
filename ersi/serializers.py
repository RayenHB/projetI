
from rest_framework import serializers
from .models import User, Prestatire, Client, Service

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'nom', 'prenom', 'email', 'password', 'role', 'tel', 'adresse']

class PrestatireSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Prestatire
        fields = ['user', 'presentation', 'photo']

class ClientSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Client
        fields = ['user', 'partenaire', 'genre']

class ServiceSerializer(serializers.ModelSerializer):
    prestataire = PrestatireSerializer()

    class Meta:
        model = Service
        fields = ['id', 'designation', 'description', 'prestataire']
