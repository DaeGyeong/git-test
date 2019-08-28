## Domain
```
DNS = Freenom
SSL = CloudFlare
```


## Django 1.11
```
.env.json 파일에서 중요한 설정값 가져온다.
 ex) SECRET_KEY & MYSQL
```

## Django Rest Framework 3.9
```
POST    /auth/login/    - 로그인
GET     /auth/logout/   - 로그아웃
POST    /auth/account/  - 계정생성

GET     /books/it       - 네이버 컴퓨터/IT 책(yes24) top10 
PUT     /books/it       - 크롤링으로 새로운 데이터 갱신
GET     /books/movie    - 토렌트 영화 인기 순위
PUT     /books/movie    - 토렌트 영화 인기 순위 갱신

GET     /users/               - 모든 유저 (향후 최근 가입 5명만 노출 예정)
GET     /users/[username]     - 유저명 해당하는 정보
PUT     /users/[username]     - 해당유저 정보 수정

GET     /board/public         - public 게시판 모든 정보
POST    /board/public         - public 게시판 생성
GET     /board/public/[boardId]    - id(게시판)값 에 맞는 게시판 정보(+ 댓글)
PUT     /board/public/[boardId]    - 해당 게시판 정보 수정
DELETE  /board/public/[boardId]    - 해당 게시판 정보 삭제

POST    /board/public/[boardId]/comments        - 해당 게시판에 댓글 생성
PUT     /board/public/[boardId]/comment/[commentId]     - 해당 게시판 댓글 수정
DELETE  /board/public/[boardId]/comment/[commentId]     - 해당 게시판 댓글 삭제

```

## Django Rest auth && allauth
```
기본 인증 사용
```

## Dajngo Restframework JWT
```
Json Web Token을 Django RestFramework에 적용
로그인 / 계정생성 / 메인페이지 api 제외하고는 토큰인증
```

## Django Rest Swagger
```
API Docs
```

## WSGI
```
WSGIPassAuthorization On
apache 에서 auth header를 인식하지 못하여 발생
```
