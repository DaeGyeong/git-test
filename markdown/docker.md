### Docker
- 도커 설치
  ```sh
  apt install -y jq

  curl -fsSL https://get.docker.com/ | sh
  usermod -aG docker $USER

  curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose

  docker version
  docker-compose version
  ```

- 기본 명령어
  | 명령어  |  설명  |
  | :----: | ------ |
  | run    | 컨테이너 실행하기 |
  | ps     | 컨테이너 목록 확인하기 |
  | stop   | 컨테이너 중지하기 |
  | rm     | 컨테이너 제거하기 |
  | logs   | 컨테이너 로그보기 |
  | images | 이미지 목록 확인하기 |
  | pull   | 이미지 다운로드하기 |
  | rmi    | 이미지 삭제하기 |


### docker 예제
```sh
# 생성 후 삭제
docker run --rm -it ubuntu:18.04 /bin/sh

# 4567 포트를 서버의 4567포트로 바인딩
docker run -d -p 4567:4567 subicura/docker-workshop-app:1

# 3306 포트로 바인딩하고, mysql 생성 패스워드는 안만들겠다.
docker run -d -p 3306:3306 \
  -e MYSQL_ALLOW_EMPTY_PASSWORD=true \
  --name mysql \
  mysql:5.7

# 컨테이너의 80포트를 서버의 8000포트로 바인딩하고, 워드프레스를 실행
docker run -d -p 8000:80 \
  -e WORDPRESS_DB_HOST=172.17.0.1 \
  -e WORDPRESS_DB_NAME=wp \
  -e WORDPRESS_DB_USER=wp \
  -e WORDPRESS_DB_PASSWORD=wp \
  wordpress
```

### docker 삭제 명령어
```sh
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)
# 사용 되지 않는 도커볼륨 삭제
docker system prune -a
```

### docker 네트워크 예제
```sh
# 네트워크 생성
docker network create app-network

# mysql 생성
docker run -d \
  -e MYSQL_ALLOW_EMPTY_PASSWORD=true \
  --name mysql \
  --network=app-network \
  mysql:5.7

# mysql 접근
docker exec -it mysql mysql
create database wp CHARACTER SET utf8;
grant all privileges on wp.* to wp@'%' identified by 'wp';
flush privileges;
quit

# mysql 연동을 hostname으로만 해줄 수 있다
docker run -d -p 8000:80 \
  --network=app-network \
  -e WORDPRESS_DB_HOST=mysql \
  -e WORDPRESS_DB_NAME=wp \
  -e WORDPRESS_DB_USER=wp \
  -e WORDPRESS_DB_PASSWORD=wp \
  wordpress

# 도커 이름은 DOCKER-NAME 네트워크는 app-network 환경 변수 PORT=8000 DB_ADDR=mysql 로 주겠다
docker run -d --name=DOCKER-NAME --network=app-network -e PORT=8000 -e DB_ADDR=mysql
```
<br/>
### Docker Compose
- Docker Compose 기본 명령어
  | 명령어 | 설명 |
  | :---: | --- |
  | up   | 시작 |
  | stop | 중지 |
  | down | 중지 후 삭제 |
  | ps   | 목록 |
  | logs | 로그보기 |


```sh
# yml로 설정을 저장하고 실행한다.
# docker-compose로 지정 하면 network를 compose 마다 생성한다
mkdir -p ~/docker-test/mysql-wordpress
cd ~/docker-test/mysql-wordpress
cat << EOF > 'docker-compose.yml'
version: '3'
services:
  wordpress:
    image: wordpress
    environment:
      WORDPRESS_DB_HOST: mysql
      WORDPRESS_DB_NAME: wp
      WORDPRESS_DB_USER: wp
      WORDPRESS_DB_PASSWORD: wp
    ports:
      - "8000:80"
    restart: always
  mysql:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: wp
      MYSQL_DATABASE: wp
      MYSQL_USER: wp
      MYSQL_PASSWORD: wp
EOF

docker-compose up -d

# 확인 로스 삭제
docker-compose ps
docker-compose logs -f
docker-compose down
```
