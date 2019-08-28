from bs4 import BeautifulSoup
import urllib.request, urllib.parse
import datetime, os, sys
from django.conf import settings
from books.models import ItBestSeller


'''
    Navrer Books 컴퓨터/IT 관련 베스트셀러 top10 리스트
    매주 월요일 업데이트 
    -> 월요일 저녁업데이트 예정
'''
def BestSeller():

    today = datetime.datetime.today().strftime('%Y%m%d')

    url = "https://book.naver.com/category/index.nhn?cate_code=280"
    html = urllib.request.urlopen(url)

    bsObject = BeautifulSoup(html, "html.parser")

    ol = bsObject.find('ol', {'id': 'bestseller_list'})

    rank = ol.find_all('img')
    ranks = {}

    for i in rank:
        # print(i.get('src'))
        try:
            i['onerror']
            ranks[i['alt']] = i['src']
        except:
            pass

    path = '/books/' + today + '/'
    media_path = settings.MEDIA_ROOT + path

    if not os.path.exists(media_path):
        os.makedirs(media_path)

    print(media_path)

    for k, v in ranks.items():
        # print(f'{k} -- {v}')
        v = v.split('&')
        img = urllib.request.urlretrieve(v[0], media_path + k +'.png')

        ItBestSeller(title=k, img=path + k +'.png').save()

