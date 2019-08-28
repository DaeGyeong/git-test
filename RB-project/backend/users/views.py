from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers


class Users(APIView):

    def get(self, request, format=None):
        users = models.User.objects.all()
        serializer = serializers.UserAllSerializer(users, many=True)

        return Response(data = serializer.data, status = status.HTTP_200_OK)


class UserProfile(APIView):

    def get_user(self, username):
        try:
            user = models.User.objects.get(username = username)
        except models.User.DoesNotExist:
            user = None
        
        return user


    def get(self, request, username, format=None):
        user = self.get_user(username)

        if user is None:
            return Response(status = status.HTTP_404_NOT_FOUND)
        
        serializer = serializers.UserAllSerializer(user)
        
        return Response(data = serializer.data, status = status.HTTP_200_OK)

    
    def put(self, request, username, format=None):
        req_user = request.user
        print("request User : ", req_user)
        user = self.get_user(username)

        if user is None:
            return Response(status = status.HTTP_404_NOT_FOUND)
        
        elif user.username != req_user.username:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

        else:
            serializer = serializers.UserAllSerializer(
                user, data = request.data, partial=True
            )

            if serializer.is_valid():
                serializer.save()
                return Response(
                    data = serializer.data, status = status.HTTP_200_OK
                )
            else:
                return Response(data = serializer.data, status = status.HTTP_400_BAD_REQUEST)


class Search(APIView):

    def get(self, request, format=None):
        username = request.query_params.get('username', None)

        if username is not None:
            users = models.User.objects.filter(username__istartswith = username)
            serializer = serializers.UserAllSerializer(users, many=True)

            return Response(data = serializer.data, status = status.HTTP_200_OK)
        
        else:
            return Response(status = status.HTTP_400_BAD_REQUEST)


class ChangePassword(APIView):

    def put(self, request, username, format=None):
        user = request.user

        if user.username == username:
            current_password = request.data.get('current_password', None)

            if current_password is not None:
                password_match = user.check_password(current_password)

                if password_match:
                    new_password = request.data.get('new_password', None)

                    if new_password is not None:
                        user.set_password(new_password)
                        user.save()
                        return Response(status = status.HTTP_200_OK)

                    else:
                        return Response(status = status.HTTP_400_BAD_REQUEST)
                    
                else:
                    return Response(status = status.HTTP_400_BAD_REQUEST)
            
            else:
                return Response(status = status.HTTP_400_BAD_REQUEST)
        
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)
