@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >/dev/null 2>nul
if errorlevel 1 (
  echo.
  echo   Node.js is not installed. Get it free from https://nodejs.org  - LTS version
  echo   Node.js 还没安装，请先到 https://nodejs.org 下载安装 LTS 版本。
  echo.
  start "" https://nodejs.org
  pause
  exit /b
)
start "" /b cmd /c "ping -n 3 127.0.0.1 >/dev/null & start "" http://localhost:8080"
node server.js
pause
