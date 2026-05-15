@echo off
chcp 65001 >nul
title رفع المشروع إلى gaid-68/Ed0
cd /d "%~dp0"

set REPO=https://github.com/gaid-68/Ed0.git
set LOG=%~dp0_push_log.txt

echo ============================================================
echo   رفع EduPilot إلى: %REPO%
echo ============================================================
echo.

where git >nul 2>&1
if errorlevel 1 (
  echo [خطأ] ثبّت Git من: https://git-scm.com/download/win
  pause
  exit /b 1
)

if not exist .git (
  git init
  git branch -M main
)

git remote remove origin 2>nul
git remote add origin "%REPO%"

echo إضافة الملفات ^(بدون .env و node_modules^)...
git add .
git reset HEAD .env 2>nul
git reset HEAD .env.local 2>nul
git reset HEAD _push_log.txt 2>nul
git reset HEAD _do_push.bat 2>nul

echo.
echo الملفات التي سترفع:
git status --short
echo.

git commit -m "EduPilot: full project upload" 2>nul
if errorlevel 1 (
  echo ملاحظة: لا يوجد تغييرات جديدة أو commit موجود مسبقاً.
)

echo.
echo جاري الرفع إلى GitHub... ^(قد يطلب تسجيل الدخول^)
echo.
git push -u origin main > "%LOG%" 2>&1
type "%LOG%"

if errorlevel 1 (
  echo.
  echo [فشل الرفع] الأسباب الشائعة:
  echo   1) لم تسجّل دخول GitHub - جرّب: gh auth login
  echo   2) أو استخدم Git Credential Manager عند ظهور نافذة الدخول
  echo   3) تأكد أن المستودع Ed0 موجود وعندك صلاحية الكتابة
  echo.
  echo السجل محفوظ في: _push_log.txt
  pause
  exit /b 1
)

echo.
echo ============================================================
echo   تم الرفع بنجاح!
echo   https://github.com/gaid-68/Ed0
echo ============================================================
pause
