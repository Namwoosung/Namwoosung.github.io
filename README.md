# Backend Developer Portfolio

백엔드 개발자를 위한 모던하고 전문적인 포트폴리오 웹사이트입니다.

## 🚀 특징

- **어두운 테마**: 전문적이고 신뢰할 수 있는 디자인
- **반응형 디자인**: 모든 기기에서 최적화된 경험
- **모듈화된 구조**: HTML, CSS, JavaScript 분리
- **동적 콘텐츠**: JSON 데이터 기반 동적 로딩
- **부드러운 애니메이션**: 스크롤 기반 reveal 효과
- **SEO 최적화**: 검색엔진 친화적 구조

## 📁 프로젝트 구조

```
portfolio/
├── index.html              # 메인 HTML 파일
├── css/
│   └── styles.css          # 모든 스타일시트
├── js/
│   └── main.js             # JavaScript 기능
├── images/                 # 이미지 리소스
│   ├── profile/           # 프로필 이미지
│   ├── projects/          # 프로젝트 이미지
│   ├── icons/             # 아이콘 파일
│   └── backgrounds/       # 배경 이미지
├── assets/                # 기타 자산
│   ├── data/              # JSON 데이터 파일
│   │   ├── projects.json  # 프로젝트 데이터
│   │   ├── skills.json    # 기술 스택 데이터
│   │   └── experience.json # 경험 및 자격증 데이터
│   ├── documents/         # 문서 파일 (이력서 등)
│   ├── fonts/             # 커스텀 폰트
│   └── favicon/           # 파비콘 파일
└── README.md              # 프로젝트 설명서
```

## 🛠 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, CSS Variables
- **JavaScript (ES6+)**: 모듈화, 비동기 처리
- **JSON**: 데이터 관리

## 📝 사용법

### 1. 기본 설정

1. 프로젝트를 클론하거나 다운로드합니다.
2. `index.html`을 웹 브라우저에서 열거나 웹 서버에 배포합니다.

### 2. 개인 정보 수정

#### 연락처 정보
`index.html`의 연락처 섹션에서 다음 정보를 수정하세요:
```html
<a href="mailto:your.email@example.com" class="contact-link">
<a href="tel:010-0000-0000" class="contact-link">
<a href="https://github.com/yourusername" class="contact-link">
<a href="https://your-blog.com" class="contact-link">
```

#### 프로젝트 정보
`assets/data/projects.json` 파일을 수정하여 프로젝트 정보를 업데이트하세요:
```json
{
  "id": "project-name",
  "title": "프로젝트 제목",
  "period": "2024.01 - 2024.03",
  "team": "팀 프로젝트 (4명)",
  "description": "프로젝트 설명",
  "technologies": [
    { "name": "Java", "level": "primary" },
    { "name": "Spring Boot", "level": "primary" }
  ],
  "links": [
    { "name": "GitHub", "url": "https://github.com/username/project" }
  ]
}
```

#### 기술 스택
`assets/data/skills.json` 파일을 수정하여 기술 스택을 업데이트하세요:
```json
{
  "languages": [
    { "name": "Java", "level": "primary" },
    { "name": "Python", "level": "primary" }
  ]
}
```

### 3. 이미지 추가

1. `images/` 폴더에 적절한 이미지를 추가합니다.
2. JSON 파일에서 이미지 경로를 참조합니다:
```json
"images": {
  "thumbnail": "images/projects/project1/thumbnail.jpg",
  "screenshots": [
    "images/projects/project1/screenshot1.jpg"
  ]
}
```

### 4. 배포

#### GitHub Pages
1. GitHub 저장소에 코드를 푸시합니다.
2. Settings > Pages에서 소스를 선택합니다.
3. 브랜치를 선택하고 저장합니다.

#### Netlify
1. Netlify에 계정을 생성합니다.
2. "New site from Git"을 선택합니다.
3. GitHub 저장소를 연결합니다.
4. 빌드 설정을 구성합니다.

## 🎨 커스터마이징

### 색상 테마 변경
`css/styles.css`의 CSS 변수를 수정하여 색상을 변경할 수 있습니다:
```css
:root {
    --primary-bg: #0a0a0a;
    --accent-color: #00d4ff;
    --text-primary: #ffffff;
}
```

### 폰트 변경
Google Fonts에서 다른 폰트를 선택하고 `index.html`에서 링크를 업데이트하세요:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### 애니메이션 조정
`css/styles.css`에서 애니메이션 속도를 조정할 수 있습니다:
```css
.scroll-reveal {
    transition: all 0.6s ease-out; /* 속도 조정 */
}
```

## 📱 반응형 디자인

- **데스크톱**: 1200px 이상
- **태블릿**: 768px - 1199px
- **모바일**: 767px 이하

## 🔧 개발 도구

### 로컬 개발 서버
```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server

# PHP
php -S localhost:8000
```

### 브라우저 개발자 도구
- F12를 눌러 개발자 도구를 엽니다.
- Console 탭에서 JavaScript 오류를 확인합니다.
- Network 탭에서 리소스 로딩을 확인합니다.

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 지원

문제가 있거나 질문이 있으시면 이슈를 생성해 주세요.

---

**Happy Coding! 🚀**
