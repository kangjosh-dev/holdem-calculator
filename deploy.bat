@echo off
echo ========================================
echo GitHub Pages 배포 시작
echo ========================================
echo.

echo Node.js 설치 확인 중...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [오류] Node.js가 설치되어 있지 않습니다.
    echo Node.js를 설치하세요: https://nodejs.org
    pause
    exit /b 1
)

echo.
echo 패키지 설치 확인 중...
if not exist "node_modules" (
    echo 패키지를 설치합니다...
    call npm install
    if %errorlevel% neq 0 (
        echo [오류] 패키지 설치에 실패했습니다.
        pause
        exit /b 1
    )
)

echo.
echo 빌드 및 배포 중...
echo (이 작업은 1-2분 걸릴 수 있습니다)
call npm run deploy

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo 배포 완료!
    echo.
    echo 1-2분 후 다음 주소에서 확인하세요:
    echo https://YOUR_USERNAME.github.io/holdem-calculator/
    echo ========================================
    echo.
) else (
    echo.
    echo [오류] 배포에 실패했습니다.
    echo README.md의 문제 해결 섹션을 참고하세요.
    echo.
)

pause
