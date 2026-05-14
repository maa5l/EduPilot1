@echo off
chcp 65001 >nul
title EduPilot - Frontend Only
color 0E
cd /d "%~dp0frontend"

echo.
echo ============================================================
echo       EduPilot - Frontend Only (Offline Mode)
echo ============================================================
echo.

set PYCMD=
where python >nul 2>&1
if not errorlevel 1 set PYCMD=python
if "%PYCMD%"=="" (
  where py >nul 2>&1
  if not errorlevel 1 set PYCMD=py
)

if "%PYCMD%"=="" (
  echo  X  Python is NOT installed.
  echo.
  echo  Please install from https://www.python.org/downloads/
  echo  Make sure to CHECK "Add Python to PATH" during install.
  echo.
  pause
  exit /b 1
)

echo  OK  Starting local HTTP server on port 5500...
echo.
echo  Open in browser:  http://127.0.0.1:5500/
echo.
echo  Press Ctrl+C in this window to stop.
echo ============================================================
echo.

start "" cmd /c "timeout /t 3 /nobreak >nul & start http://127.0.0.1:5500/"
%PYCMD% -m http.server 5500

pause
