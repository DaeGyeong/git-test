from rest_framework import serializers
from . import models
from users.serializers import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)

    class Meta:
        model = models.Comment
        fields = ('__all__')


class PublicBoardSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True)

    class Meta:
        model = models.PublicBoard
        fields = ('__all__')


class PublicBoardPostSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)

    class Meta:
        model = models.PublicBoard
        fields = ('__all__')