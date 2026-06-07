# Travel Photo Archive

GitHub Pages에 바로 배포할 수 있는 개인 여행 사진 전시용 정적 웹사이트입니다. 서버, 데이터베이스, 로그인, 빌드 과정 없이 `index.html`, `style.css`, `script.js`만으로 동작합니다.

## 로컬에서 실행하는 방법

1. 이 저장소를 컴퓨터에 내려받습니다.
2. `index.html` 파일을 브라우저로 엽니다.
3. 별도 설치나 빌드 명령은 필요하지 않습니다.

## GitHub Pages 배포 방법

GitHub 저장소에서 아래 설정을 확인해 주세요.

1. GitHub 저장소 페이지로 이동합니다.
2. `Settings`로 들어갑니다.
3. 왼쪽 메뉴에서 `Pages`를 엽니다.
4. `Build and deployment` 항목에서 `Source`를 `Deploy from a branch`로 선택합니다.
5. `Branch`를 `main`, 폴더를 `/root`로 선택합니다.
6. `Save`를 누릅니다.

설정 후 보통 몇 분 안에 GitHub Pages 주소가 생성됩니다.

## 새 여행지를 추가하는 방법

`script.js`의 `trips` 배열에 객체 하나를 추가하면 됩니다.

```js
{
  id: "seoul",
  name: "서울",
  region: "Korea",
  date: "2026",
  status: "visited",
  description: "도시의 밤이 좋았던 여행",
  cover: "images/seoul/cover.jpg",
  photos: [
    "images/seoul/01.jpg",
    "images/seoul/02.jpg"
  ]
}
```

`status`는 방문한 곳이면 `"visited"`, 예정된 곳이면 `"planned"`를 사용합니다.

## 새 사진을 추가하는 방법

1. `images/` 안에 여행지 `id`와 같은 이름의 폴더를 만듭니다.
2. 대표 사진은 `cover.jpg`로 넣습니다.
3. 갤러리 사진은 `01.jpg`, `02.jpg`, `03.jpg`처럼 순서대로 넣습니다.
4. `script.js`의 해당 여행지 `photos` 배열에 사진 경로를 추가합니다.

예시:

```js
photos: [
  "images/jeju/01.jpg",
  "images/jeju/02.jpg",
  "images/jeju/03.jpg",
  "images/jeju/04.jpg"
]
```

## 이미지 파일명 규칙

- 대표 사진: `cover.jpg`
- 갤러리 사진: `01.jpg`, `02.jpg`, `03.jpg`
- JPG 또는 WebP 형식을 권장합니다.
- WebP를 사용할 경우 경로도 `images/jeju/01.webp`처럼 바꿔 주세요.

## 권장 이미지 크기

- 긴 변은 1600px 정도를 권장합니다.
- JPG 또는 WebP를 권장합니다.
- 사진 1장당 300KB~1MB 이하를 권장합니다.

## 기본 폴더 구조

```text
.
├── index.html
├── style.css
├── script.js
├── README.md
└── images/
    ├── jeju/
    ├── busan/
    └── tokyo/
```

실제 이미지 파일이 없어도 사이트 레이아웃은 유지되며, 회색 placeholder가 표시됩니다.
