## REST API (Representational State Transfer)
> 자원을 이름(자원의 표현)으로 구분하여 해당 자원의 상태(정보)를 주고 받는 모든 것을 의미한다.

- HTTP URI => 자원
- HTTP Method => 행위
- MIME Type => 표현 방식

### 규칙
1. URI는 정보의 자원을 표현해야 한다.
  ```
  ex) 정보를 가져오는 URI
      GET /members/show/1     (x)
      GET /members/1          (o)

  ex) 추가하는 URI
      GET /members/insert/2 (x)
      POST /members/2       (o)
  ```
  <br/>

2. 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE)로 표현한다.

  | METHOD | Description |
  | :----: | ---- |
  | POST   | Resource 생성합니다. |
  | GET  	 | Resource 조회합니다. <br /> 조회하고 해당 리소스에 대한 자세한 정보를 가져온다. |
  | PUT	   | Resource 수정합니다. |
  | DELETE | Resource 삭제합니다. |
  <br/>

3. URI 설계시 주의 점
  - 슬래시(/)는 계층 관계를 나타내는 데 사용
  - 하이픈(-)은 URI 가독성을 높이는데 사용
  - 밑줄(\_)은 사용하지 않는다
  - 파일 확장자는 URI에 포함시키지 않는다
  <br/>

4. HTTP Response code

  | Code | Description |
  | :-----: | ---- |
  |   200   |	클라이언트의 요청을 정상적으로 수행함 |
  |   201   |	클라이언트가 어떠한 리소스 생성을 요청, 해당 리소스가 성공적으로 생성됨 |
  |   400   |	클라이언트의 요청이 부적절 할 경우 사용 |
  |   401   |	클라이언트가 인증되지 않은 상태에서 보호된 리소스를 요청했을 때 사용 <br/> ( 로그인 하지 않은 유저가, 로그인했을 경우 사용 가능한 리소스를 요청했을 때 ) |
  |   404   | 클라이언트가 서버에 요청한 리소스를 찾을 수 없는 요청했을 때 사용 |
  |   405   |	클라이언트가 요청한 리소스에서는 사용 불가능한 Method를 이용했을 경우 사용 |
  |   500   |	서버에 문제가 있을 경우 사용하는 응답 코드 |
  <br/>
