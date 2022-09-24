# 기능 요구사항

[[https://www.notion.so/de10da88385c4e35bcd28291022d4845?v=4834038f407f49a8937061701386b85b](https://www.notion.so/de10da88385c4e35bcd28291022d4845)](https://www.notion.so/myoungji-graduate/7fdc7768a2264b2fa8966d9cbfefc1d5?v=e9c52a4d057b4da5aedf386bc90d915a)

# project board

- `No Status` : 작업 대기인 이슈
- `ToDo`: 오늘 작업할 이슈
- `InProgress`: 작업중인 이슈
- `Done`: 작업 끝난 이슈 

# workflow

### **Remote 정보**

- upstream: boostcampwm-2022/javascript-p1-cashbook
- origin: seonghunYang/javascript-p1-cashbook

### **브랜치 정보**

- dev: upstream에 PR을 날리는 브랜치
- feature: 작업 브랜치, dev 브랜치를 기준으로 생성, issue단위로 생성하고 개발 완료 후 dev 브랜치에 merge

### **작업 순서**

1. origin에서 dev 브랜치를 기준으로 이슈 단위의 작업을 위한 feature 브랜치 생성
2. 작업이 완료되면 origin dev 브랜치에 merge
3. 매일 저녁 11시 upstream J112 브랜치에 PR
4. upstream 관리자가 PR을 확인 후 merge

# commit convention

- `feat` : 기능 개발
- `fix` : 버그 수정 - 수정 이유와 수정 내역
- `refactor` : 기능 변경이 없는 코드 수정 (예: 변수명 수정) - 수정 이유와 수정 내역
- `test` : 테스트 코드 작성 및 수정
- `docs` : 문서 작성 및 수정
- `build` : 빌드 파일 작성 및 수정
- `style` : 스타일 변경(reformat, indent)
- `setting`: 개발 환경 설정
- `chore` : 단순한 작업 (예: 파일 경로)