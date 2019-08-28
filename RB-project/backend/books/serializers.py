from rest_framework import serializers
from .models import ItBestSeller, MovieRank


class BestSellerITSerializer(serializers.ModelSerializer):

    class Meta:
        model = ItBestSeller
        fields = ('__all__')


class MovieRankSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieRank
        fields = ('__all__')