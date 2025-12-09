# Assets Directory

이 폴더는 포트폴리오에서 사용되는 기타 자산 파일들을 저장합니다.

## 권장 구조

```
assets/
├── documents/         # 문서 파일들
│   ├── resume.pdf
│   ├── portfolio.pdf
│   └── certificates/
├── fonts/             # 커스텀 폰트 (필요시)
│   ├── custom-font.woff2
│   └── custom-font.woff
├── data/              # JSON 데이터 파일들
│   ├── projects.json
│   ├── skills.json
│   └── experience.json
└── favicon/           # 파비콘 파일들
    ├── favicon.ico
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    └── apple-touch-icon.png
```

## 사용 예시

### JSON 데이터 로드
```javascript
// 프로젝트 데이터 로드
fetch('assets/data/projects.json')
    .then(response => response.json())
    .then(data => {
        // 프로젝트 데이터 처리
    });
```

### 문서 다운로드 링크
```html
<a href="assets/documents/resume.pdf" download class="download-link">
    이력서 다운로드
</a>
```

### 파비콘 설정
```html
<link rel="icon" type="image/x-icon" href="assets/favicon/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-touch-icon.png">
```
