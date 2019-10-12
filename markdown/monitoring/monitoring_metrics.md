```
메트릭

* cpu ( % )
[user] : 사용자가 사용중인 사용률
[system] : 시스템이 사용중인 사용률
[nice] : 프로세스 우선순위를 기반으로 사용되는 사용률(사용자 공간에서 사용됨)
[idle] : 아무 일도 하지 않는 여유률
[wait] : 입출력을 기다리는 프로세스 사용률
[hi(interrupt)] : 하드웨어 인터럽트 사용률
[si(softirq)] : 소프트웨어 인터럽트 사용률
[steal] : 가상화 환경에서 손실률

* memory ( byte | % )
[buffered] : I / O 버퍼링에 사용되는 메모리
[cached] : 디스크 캐싱에 사용 된 메모리
[free] : 사용 가능한 메모리
[used] : 시스템에서 사용중인 메모리
[slab_recl]  : 커널 오브젝트의 SLAB 할당에 사용되는 메모리 바이트
[slab_unrecl] :재생할 수없는 커널 객체의 SLAB 할당에 사용되는 메모리

* disk ( write | read )
[disk_octets] : 디스크에서 읽기/쓰기 바이트 수
[disk_ops] : 디스크 읽기/쓰기 조작의 수
[disk_time] : 읽기/쓰기 작업을 수행하는 데 걸린 평균 시간
[disk_merged] : 단일 물리적 디스크 액세스 작업으로 병합 된 디스크 읽기/쓰기 수

* interface ( rx | tx )
[if_packets] : 인터페이스에서 송신/수신 된 패킷 수
[if_octets] : 인터페이스에서 송신/수신 한 바이트 수
[if_errors] : 인터페이스의 송신/수신 오류 수
[if_dropped] : 인터페이스에 의해 드랍된 송신/수신 패킷 수

* df ( byte | % )
[free] : 디스크 여유 공간
[reserved] : 예약 된 디스크 공간
[used] : 사용 된 디스크 공간

* load ( % )
[load_longterm] : 지난 15 분 동안 코어 당 평균 CPU로드
[load_midterm] : 지난 5 분 동안 코어 당 평균 CPU로드
[load_shortterm] : 마지막 1 분 동안 코어 당 평균 CPU로드
```


```
임계치

* cpu
[현재사용률] : total(100%) - idle 사용률
[현재사용률] : system + user + io wait 사용률
[임계치] : 경고 - 85% // 위험 - 90%

* memory
[현재사용률] : used
[임계치] : 경고 - 80% // 위험 - 90%

* disk
[현재사용률] : 사용량 & IO Usage
[임계치] : 경고 - 90% // 위험 - 95%

* network
[임계치] : bps / pps 단위로 지정

```
