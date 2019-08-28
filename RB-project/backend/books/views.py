from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import serializers, best, movie
from .models import ItBestSeller, MovieRank


class BestSellerIT(APIView):
    permission_classes = (AllowAny,)
    
    def get(self, request, format=None):
        try:
            pBoard = ItBestSeller.objects.all().order_by('-time')[:10]
        except:
            return Response(status = status.HTTP_404_NOT_FOUND)

        serializer = serializers.BestSellerITSerializer(pBoard, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def put(self, request, format=None):

        best.BestSeller()

        return Response(status=status.HTTP_201_CREATED)


class WeeklyMovieRank(APIView):
    permission_classes = (AllowAny, )
    def get(self, request):
        try:
            movie = MovieRank.objects.all().order_by('-time')[:4]
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.MovieRankSerializer(movie, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        movie.WeekMovieRank()

        return Response(status=status.HTTP_200_OK)