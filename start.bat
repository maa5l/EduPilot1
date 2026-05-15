@echo off
chcp 65001 >nul
title EduPilot
color 0B
cd /d "%~dp0"

echo.
echo ============================================================
echo                  EduPilot - تشغيل المشروع
echo ============================================================
echo.

if not exist "dist\index.html" (
  echo  X  مجلد dist غير موجود. المشروع يحتاج dist\index.html
  echo.
  pause
  exit /b 1
)

REM ----- 1) Locate Python -----
echo [1/4] البحث عن Python...
set PYCMD=
where python >nul 2>&1
if not errorlevel 1 set PYCMD=python
if "%PYCMD%"=="" (
  where py >nul 2>&1
  if not errorlevel 1 set PYCMD=py -3
)

if "%PYCMD%"=="" (
  echo.
  echo  X  Python غير مثبت أو غير مضاف لـ PATH.
  echo  ثبّته من: https://www.python.org/downloads/
  echo  وفعّل: Add Python to PATH
  echo.
  pause
  exit /b 1
)

%PYCMD% --version
echo  OK  Python: %PYCMD%
echo.

REM ----- 2) Install dependencies -----
echo [2/4] تثبيت مكتبات الباكند ^(قد يأخذ دقيقة^)...
cd api
%PYCMD% -m pip install -r requirements.txt
set INSTALL_ERR=%errorlevel%
if %INSTALL_ERR% NEQ 0 (
  echo.
  echo  X  فشل تثبيت المكتبات. تحقق من الإنترنت ثم أعد المحاولة.
  echo  انسخ أي رسالة خطأ حمراء من هذه النافذة وأرسلها للدعم.
  cd ..
  pause
  exit /b 1
)

%PYCMD% -c "import fastapi, uvicorn" >nul 2>&1
if errorlevel 1 (
  echo  X  FastAPI لم يُثبّت بشكل صحيح.
  cd ..
  pause
  exit /b 1
)
cd ..
echo  OK  المكتبات جاهزة.
echo.

REM ----- 3) Check port 8000 -----
echo [3/4] التحقق من المنفذ 8000...
netstat -ano | findstr ":8000 " | findstr "LISTENING" >nul 2>&1
if not errorlevel 1 (
  echo  !  المنفذ 8000 مستخدم. أغلق أي نافذة EduPilot قديمة ثم أعد التشغيل.
  echo.
)

REM ----- 4) Start server -----
echo [4/4] تشغيل السيرفر...
echo.
echo   بعد ظهور: Uvicorn running on http://127.0.0.1:8000
echo   افتح المتصفح:  http://127.0.0.1:8000/
echo.
echo   لا تغلق هذه النافذة أثناء الاستخدام.
echo   Ctrl+C لإيقاف السيرفر.
echo ============================================================
echo.

start "" cmd /c "timeout /t 8 /nobreak >nul & start http://127.0.0.1:8000/"

cd api
%PYCMD% main.py
set SERVER_ERR=%errorlevel%
cd ..

echo.
if %SERVER_ERR% NEQ 0 (
  echo  X  توقف السيرفر بخطأ ^(كود %SERVER_ERR%^).
  echo  جرّب من CMD يدوياً:
  echo    cd /d "%~dp0api"
  echo    %PYCMD% main.py
) else (
  echo  السيرفر توقف بشكل طبيعي.
)
echo.
pause
exit /b %SERVER_ERR%
