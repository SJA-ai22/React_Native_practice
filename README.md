# React_Native_practice
react native for personal 

초기 세팅
https://www.youtube.com/watch?v=9_WwKN7C6Us&t=9712s 31m 10s~ 


https://docs.expo.dev/build/setup/ -> 3번~ 진행 사이트


0. expo 회원가입
1. 폴더 생성(원하는 프젝명으로)
2. VScode에서 해당 폴더 열기
3. npm install -g expo-cli
4. npx create-expo-app 파일명(ex. my-app)
5. npm install -g eas-cli
6. eas login
	이메일:
	비번:
7. cd 파일명
8. eas build:configure
	- y
	- 윈도우면 Android, 맥이면 all 가능

경희대 도서관 앱 개선 현 진행도
1. 열람실 좌석 예약 -> 1,2,3열람실 -> 좌석 예약
2. 그룹 스터디실 -> 1,2,3,4,5,6실 중 선택 -> 시간 선택
3. 내 자리 -> 예약한 열람실,좌석 정보 표시
4. 도서관 모바일 이용증 -> QR -> 외출/퇴실 중 선택
5. 외출 버튼을 누르면 2시간 타이머가 시작됨
5. 도서관 자리 예약 시 잔여시간 1시간으로 기본 세팅
6. 잔여시간이 59분이하면 연장 알림과 함께 연장 버튼이 나타남
7. GPS를 사용해 도서관 자리가 예약상태인데 위치가 도서관이 아닌 경우, 경고 문구가 뜸