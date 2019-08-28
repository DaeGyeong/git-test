from django.conf.urls import url
from . import views



urlpatterns = [
    url(
        regex = r'^public$',
        view = views.PublicBoard.as_view(),
        name = 'PublicBoard'
    ),
    url(
        regex = r'^public/(?P<board_id>\d+)$',
        view = views.GetPublicBoard.as_view(),
        name = 'getPublic'
    ),
    url(
        regex = r'^public/(?P<board_id>\d+)/comments$',
        view = views.CommentOnBoard.as_view(),
        name = 'Comments'
    ),
    url(
        regex = r'^public/(?P<board_id>\d+)/comment/(?P<comment_id>\d+)$',
        view = views.CommentOnBoard.as_view(),
        name = 'Comments'
    ),
    
]