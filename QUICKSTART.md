# 🚀 빠른 시작 가이드

## GitHub Pages로 배포하기 (5분 완성!)

### 1️⃣ GitHub Repository 만들기
1. https://github.com 로그인
2. 우측 상단 `+` → `New repository`
3. 이름: `holdem-calculator` (또는 원하는 이름)
4. Public 선택
5. `Create repository` 클릭

### 2️⃣ Repository 이름 설정
`vite.config.js` 파일 열고 수정:
```javascript
base: '/holdem-calculator/', // 여러분의 repository 이름으로!
```

### 3️⃣ 코드 업로드

**GitHub Desktop 사용 (추천):**
1. GitHub Desktop 다운로드: https://desktop.github.com/
2. Repository Clone
3. 이 폴더의 모든 파일 복사
4. Commit & Push

**또는 명령어:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/holdem-calculator.git
git branch -M main
git push -u origin main
```

### 4️⃣ 배포!

**Windows:**
```bash
deploy.bat 더블클릭
```

**Mac/Linux:**
```bash
./deploy.sh
```

**또는 명령어:**
```bash
npm install
npm run deploy
```

### 5️⃣ GitHub Pages 설정
1. GitHub Repository → Settings
2. 좌측 Pages 메뉴
3. Branch: `gh-pages` 선택
4. Save

### 6️⃣ 완성!
1-2분 후 다음 주소에서 확인:
```
https://YOUR_USERNAME.github.io/holdem-calculator/
```

---

## 🔧 로컬 테스트

```bash
npm install
npm run dev
```
→ http://localhost:5173 접속

---

## 📝 업데이트하기

코드 수정 후:
```bash
git add .
git commit -m "Update"
git push
npm run deploy
```

또는 `deploy.bat` (Windows) / `./deploy.sh` (Mac/Linux) 실행

---

## 💡 체크리스트

- [ ] GitHub repository 생성
- [ ] `vite.config.js`의 base 경로 수정
- [ ] GitHub에 코드 업로드
- [ ] `npm run deploy` 실행
- [ ] GitHub Pages 설정
- [ ] 사이트 확인

---

**더 자세한 내용은 README.md를 참고하세요!**
