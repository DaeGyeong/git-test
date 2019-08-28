from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from rest_framework_swagger.views import get_swagger_view
from . import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^auth/', include('rest_auth.urls')),
    url(r'^auth/account/', include('rest_auth.registration.urls')),

    
    
    url(r'^books/', include('books.urls', namespace='books')),
    url(r'^users/', include('users.urls', namespace='users')),
    url(r'^board/', include('board.urls', namespace='board')),






    url('^api/docs', get_swagger_view(title='API Document')),


    

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    url(r'^', views.ReactAppView.as_view()),
]