from rest_framework import serializers
from .models import User, Prestatire, Client, Service
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'nom', 'prenom', 'email', 'password', 'role', 'tel', 'adresse']
    def create(self, validated_data):
        # Hash the password before saving
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

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
