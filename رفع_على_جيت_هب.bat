@echo off
chcp 65001 >nul
title رفع EduPilot على GitHub
cd /d "%~dp0"

echo.
echo ============================================================
echo           رفع مشروع EduPilot على GitHub
echo ============================================================
echo.

REM --- تحقق من Git ---
where git >nul 2>&1
if errorlevel 1 (
  echo  X  Git غير مثبت. ثبّته من: https://git-scm.com/download/win
  pause
  exit /b 1
)

REM --- تحقق أن .env لن يُرفع ---
if not exist .gitignore (
  echo  X  ملف .gitignore غير موجود.
  pause
  exit /b 1
)
findstr /i "^\.env" .gitignore >nul 2>&1
if errorlevel 1 (
  echo  X  أضف .env إلى .gitignore قبل الرفع!
  pause
  exit /b 1
)

if not exist .git (
  echo [1] تهيئة Git...
  git init
  git branch -M main
) else (
  echo [1] Git موجود مسبقاً.
)

echo.
echo [2] إضافة الملفات (بدون .env)...
git add .
git reset HEAD .env 2>nul

echo.
echo [3] الملفات الجاهزة للرفع:
git status --short
echo.

findstr /i "\.env" .gitignore >nul
git diff --cached --name-only 2>nul | findstr /i "^\.env$" >nul
if not errorlevel 1 (
  echo  X  تحذير: ملف .env ضمن الملفات المضافة! أوقف الرفع وأزلّه.
  pause
  exit /b 1
)
echo  OK  ملف .env غير مضاف للرفع.
echo.

set /p DOPUSH=هل تريد عمل commit الآن؟ (y/n): 
if /i not "%DOPUSH%"=="y" (
  echo تم الإعداد فقط. لاحقاً: git commit -m "..." ثم git push
  pause
  exit /b 0
)

git commit -m "EduPilot: Supabase integration and backend setup"
if errorlevel 1 (
  echo  !  لا يوجد تغييرات جديدة أو فشل commit.
)

echo.
echo [4] ربط GitHub...
echo.
echo  اختر طريقة:
echo    A) عندك مستودع جاهز على GitHub (انسخ رابطه)
echo    B) إنشاء مستودع جديد عبر gh (يتطلب: gh auth login)
echo.
set /p MODE=اكتب A أو B: 

if /i "%MODE%"=="B" (
  where gh >nul 2>&1
  if errorlevel 1 (
    echo  X  ثبّت GitHub CLI من: https://cli.github.com/
    pause
    exit /b 1
  )
  set /p REPONAME=اسم المستودع (مثال EduPilot): 
  if "%REPONAME%"=="" set REPONAME=EduPilot
  gh repo create %REPONAME% --public --source=. --remote=origin --push
  if errorlevel 1 (
    echo  X  فشل الإنشاء. جرّب: gh auth login
    pause
    exit /b 1
  )
  echo.
  echo  تم الرفع بنجاح!
  pause
  exit /b 0
)

set REPOURL=https://github.com/gaid-68/Ed0.git
echo  المستودع: %REPOURL%

git remote remove origin 2>nul
git remote add origin "%REPOURL%"
git push -u origin main

if errorlevel 1 (
  echo.
  echo  X  فشل push. تأكد من:
  echo     - تسجيل الدخول لـ GitHub
  echo     - المستودع موجود على GitHub
  echo     - الصلاحيات للكتابة
) else (
  echo.
  echo  تم الرفع بنجاح!
)

echo.
pause
