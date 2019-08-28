from rest_framework import serializers
from . import models


class UserAllSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = (
            'id',
            'username',
            'gender',
            'phone',
            'email',
            'name',
            'website',
            'user_image',
            'is_superuser',
            'is_staff',
            'last_login',
            'date_joined'
        )

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = (
            'id',
            'username',
            'phone',
            'email',
            'name',
            'user_image'
        )