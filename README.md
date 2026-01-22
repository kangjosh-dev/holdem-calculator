# 홀덤 정산 프로그램 - GitHub Pages 배포 가이드

실시간 세션 관리 기능이 있는 홀덤 정산 계산기입니다.

## 🚀 GitHub Pages로 배포하기

### 1단계: GitHub에 Repository 만들기

1. **GitHub 로그인** (https://github.com)

2. **새 Repository 만들기**
   - 우측 상단 `+` 버튼 클릭 → `New repository`
   - Repository 이름: `holdem-calculator` (원하는 이름으로 변경 가능)
   - Public 선택
   - `Create repository` 클릭

### 2단계: 프로젝트 설정 수정

**중요!** `vite.config.js` 파일을 열고 `base` 경로를 수정하세요:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/holdem-calculator/', // 여기를 여러분의 repository 이름으로 변경!
})
```

예시:
- Repository 이름이 `my-holdem` → `base: '/my-holdem/'`
- Repository 이름이 `poker-calc` → `base: '/poker-calc/'`

### 3단계: 코드 업로드

#### 방법 1: GitHub Desktop 사용 (추천 - 초보자용)

1. **GitHub Desktop 다운로드**
   - https://desktop.github.com/

2. **Repository Clone**
   - GitHub Desktop에서 `File` → `Clone Repository`
   - 방금 만든 repository 선택
   - 저장할 위치 선택

3. **파일 복사**
   - 이 프로젝트의 모든 파일을 cloned 폴더에 복사

4. **Commit & Push**
   - GitHub Desktop에서 변경사항 확인
   - 좌측 하단에 커밋 메시지 입력: "Initial commit"
   - `Commit to main` 클릭
   - 상단 `Push origin` 클릭

#### 방법 2: Git 명령어 사용

```bash
# 1. 이 폴더에서 Git 초기화
git init

# 2. 모든 파일 추가
git add .

# 3. 커밋
git commit -m "Initial commit"

# 4. GitHub repository 연결 (아래 URL을 본인 것으로 변경!)
git remote add origin https://github.com/YOUR_USERNAME/holdem-calculator.git

# 5. 메인 브랜치로 설정
git branch -M main

# 6. Push
git push -u origin main
```

### 4단계: GitHub Pages 설정

1. **GitHub Repository 페이지로 이동**
   - https://github.com/YOUR_USERNAME/holdem-calculator

2. **Settings 메뉴 클릭**
   - Repository 상단의 `Settings` 탭

3. **Pages 설정**
   - 좌측 메뉴에서 `Pages` 클릭
   - Source: `Deploy from a branch` 선택
   - Branch: `gh-pages` 선택, 폴더는 `/ (root)` 선택
   - `Save` 클릭

### 5단계: 배포 실행

컴퓨터에서 다음 명령어 실행:

```bash
# 패키지 설치 (최초 1회만)
npm install

# 배포
npm run deploy
```

완료! 🎉

### 6단계: 사이트 확인

배포 후 1-2분 기다린 뒤 다음 주소로 접속:
```
https://YOUR_USERNAME.github.io/holdem-calculator/
```

예시:
- GitHub ID가 `jay123` → `https://jay123.github.io/holdem-calculator/`

---

## 🔧 로컬에서 테스트하기

배포 전에 로컬에서 테스트하려면:

```bash
# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

---

## 📝 업데이트 배포하기

코드를 수정한 후 다시 배포:

```bash
# 1. 변경사항 커밋
git add .
git commit -m "Update features"
git push

# 2. 다시 배포
npm run deploy
```

---

## 🎯 특징

- ✅ 세션별 게임 기록 관리
- ⏱️ 각 세션별 독립적인 타이머
- 👥 플레이어 추가/삭제
- 🧮 자동 정산 계산
- 🔄 세션 초기화 기능
- 📱 반응형 디자인

---

## 💡 문제 해결

### "gh-pages branch not found" 에러
→ 처음 배포 시 자동으로 생성됩니다. 다시 한 번 `npm run deploy` 실행

### 404 Page Not Found
→ `vite.config.js`의 `base` 경로가 올바른지 확인

### 페이지가 비어있음
→ 브라우저 개발자 도구(F12)에서 콘솔 에러 확인

### 배포 후 업데이트가 안 보임
→ 브라우저 캐시 삭제 (Ctrl+Shift+R 또는 Cmd+Shift+R)

---

## 🌐 커스텀 도메인 사용하기 (선택사항)

1. 도메인 구매 (예: GoDaddy, Namecheap)
2. DNS 설정에서 CNAME 레코드 추가
3. GitHub Pages Settings에서 Custom domain 입력

---

## 📚 추가 리소스

- **Vite 문서**: https://vitejs.dev/
- **React 문서**: https://react.dev/
- **GitHub Pages 문서**: https://docs.github.com/en/pages
- **Tailwind CSS**: https://tailwindcss.com/

---

## 🤝 기여하기

버그 리포트나 기능 제안은 Issues에 올려주세요!

---

## 📄 라이선스

MIT License

---

즐거운 홀덤 게임 되세요! 🃏♠️♥️♣️♦️
