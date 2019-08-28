from django.conf.urls import url
from . import views



urlpatterns = [
    url(
        regex = r'^$',
        view = views.Users.as_view(),
        name = 'AllUsers'
    ),
    url(
        regex = r'^search$',
        view = views.Search.as_view(),
        name = 'UserSearch'
    ),
    url(
        regex = r'^(?P<username>\w+)$',
        view = views.UserProfile.as_view(),
        name = 'UserProfile'
    ),
    url(
        regex = r'^(?P<username>\w+)/password$',
        view = views.ChangePassword.as_view(),
        name='ChangePassword'
    ),
]