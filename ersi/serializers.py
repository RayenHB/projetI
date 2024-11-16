from rest_framework import serializers
from .models import User, Prestatire, Client, Service

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'nom', 'prenom', 'email', 'password', 'role', 'tel', 'adresse']

class PrestatireSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='user')

    class Meta:
        model = Prestatire
        fields = ['user_id', 'presentation', 'photo']

class ClientSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='user')

    class Meta:
        model = Client
        fields = ['user_id', 'partenaire', 'genre']

class ServiceSerializer(serializers.ModelSerializer):
    prestataire = PrestatireSerializer()

    class Meta:
        model = Service
        fields = ['id', 'designation', 'description', 'prestataire']
