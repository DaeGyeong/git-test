from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female')
    )
    
    name = models.CharField(blank=True, max_length=255)
    website = models.URLField(null=True)
    phone = models.CharField(max_length=50, null=True)
    gender = models.CharField(max_length=50, choices=GENDER_CHOICES, null=True)
    user_image = models.ImageField(null=True)


    def __str__(self):
        return self.username