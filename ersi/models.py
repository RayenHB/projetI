from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import AbstractUser,Group, Permission


class User(AbstractUser):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    role = models.CharField(max_length=50)
    tel = models.CharField(max_length=15)
    adresse = models.TextField()

    
    
    def __str__(self):
        return self.nom


class Prestatire(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    Service = models.TextField()
    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return self.user.nom


class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    partenaire = models.CharField(max_length=100)
    genre = models.CharField(max_length=50)

    def __str__(self):
        return self.user.nom


class Service(models.Model):
    description = models.TextField()
    photo = models.ImageField(upload_to='photos/')
    prestataire = models.ForeignKey(Prestatire, on_delete=models.CASCADE, related_name='services')

    def __str__(self):
        return self.description
