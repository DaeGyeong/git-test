from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers


class PublicBoard(APIView):
    def get(self, request, format=None):
        try:
            pBoard = models.PublicBoard.objects.all()
        except:
            return Response(status = status.HTTP_404_NOT_FOUND)

        serializer = serializers.PublicBoardSerializer(pBoard, many=True)

        return Response(data=serializer.data)


    def post(self, request, format=None):
        user = request.user

        serializer = serializers.PublicBoardPostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(creator=user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def get_board(id):
        try:
            pBoard = models.PublicBoard.objects.get(id=id)
        except:
            pBoard = None

        return pBoard


class GetPublicBoard(APIView):
    def get(self, request, board_id, format=None):
        pBoard = get_board(board_id)

        if pBoard is None:
            return Response(status = status.HTTP_404_NOT_FOUND)

        serializer = serializers.PublicBoardSerializer(pBoard)

        return Response(data = serializer.data, status = status.HTTP_200_OK)

    
    def put(self, request, board_id, format=None):
        user = request.user
        pBoard = get_board(board_id)

        if pBoard is None:
            return Response(status = status.HTTP_404_NOT_FOUND)
        
        elif user != pBoard.creator:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
            
        else:
            serializer = serializers.PublicBoardSerializer(pBoard, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(data = serializer.data, status = status.HTTP_200_OK)
            
            else:
                return Response(data = serializer.errors, status = status.HTTP_400_BAD_REQUEST)


    def delete(self, request, board_id, format=None):
        user = request.user
        pBoard = get_board(board_id)

        if pBoard is None:
            return Response(status = status.HTTP_404_NOT_FOUND)

        elif user != pBoard.creator:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        else:
            pBoard.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


def get_comment(id):
        try:
            pComment = models.Comment.objects.get(id=id)
        except:
            pComment = None

        return pComment


class CommentOnBoard(APIView):
    def post(self, request, board_id, format=None):
        print(request.data)
        user = request.user
        pBoard = get_board(board_id)
        
        serializer = serializers.CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(creator=user, board=pBoard)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, board_id, comment_id, format=None):
        
        try:
            models.Comment.objects.get(id = comment_id).delete()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
            
        return Response(status=status.HTTP_204_NO_CONTENT)

    
    def put(self, request, board_id, comment_id, format=None):
        user = request.user

        comment = get_comment(comment_id)

        if comment is None:
            return Response(status = status.HTTP_404_NOT_FOUND)
        
        elif user != comment.creator:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
            
        else:
            serializer = serializers.CommentSerializer(comment, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(data = serializer.data, status = status.HTTP_200_OK)
            
            else:
                return Response(data = serializer.errors, status = status.HTTP_400_BAD_REQUEST)
