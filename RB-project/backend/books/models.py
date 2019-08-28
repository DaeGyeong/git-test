from django.db import models


class ItBestSeller(models.Model):
    title = models.CharField(max_length=150, blank=True, null=True)
    img = models.ImageField(null=True)
    time = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'BestSeller_IT'


class MovieRank(models.Model):
    title = models.CharField(max_length=150, blank=True, null=True)
    img = models.ImageField(null=True)
    time = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'MovieRank_Torrent'