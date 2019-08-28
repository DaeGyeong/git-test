from bs4 import BeautifulSoup
import urllib.request, urllib.parse
import datetime, os, sys
from django.conf import settings
from books.models import MovieRank


'''
    토렌트 영화 인기 순위
    업데이트는 PUT으로  
'''
def WeekMovieRank():

    today = datetime.datetime.today().strftime('%Y%m%d')

    import requests

    url = "https://yts.am/api/v2/list_movies.json?sort_by=download_count&limit=4"

    res = requests.get(url)
    
    values = res.json()['data']['movies']
    

    path = '/movies/' + today + '/'
    
    media_path = settings.MEDIA_ROOT + path

    if not os.path.exists(media_path):
        os.makedirs(media_path)
        

    for value in values:
        title = value['title']
        img = value['medium_cover_image']

        opener=urllib.request.build_opener()
        opener.addheaders=[('User-Agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
        urllib.request.install_opener(opener)
        img = urllib.request.urlretrieve(img, media_path + title +'.png')
        MovieRank(title=title, img=path + title +'.png').save()
