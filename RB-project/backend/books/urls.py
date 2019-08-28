from django.conf.urls import url
from . import views


urlpatterns = [
    url(
        regex = r'^it$',
        view = views.BestSellerIT.as_view(),
        name = 'BestSellerIT'
    ),    
    url(
        regex = r'^movie$',
        view = views.WeeklyMovieRank.as_view(),
        name = 'BestSellerIT'
    ),
]