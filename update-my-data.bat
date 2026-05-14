@echo off
chcp 65001 > nul
title EduPilot - Update My Data
cls

echo ============================================================
echo   EduPilot — تحديث بياناتك الحقيقية
echo ============================================================
echo.
echo  هذا السكربت يقرأ ملف:
echo     Data\my_transcript.txt
echo  ويحدّث الواجهة لتعرض بياناتك أنتِ، لا أي بيانات افتراضية.
echo.
echo ============================================================
echo.

cd /d "%~dp0backend"

echo [1/2] جارٍ التحقق من Python...
python --version > nul 2>&1
if errorlevel 1 (
    py --version > nul 2>&1
    if errorlevel 1 (
        echo.
        echo ❌ Python غير مثبّت — حمّليه من https://www.python.org/downloads/
        echo    وتأكدي من تفعيل "Add Python to PATH" أثناء التثبيت.
        pause
        exit /b 1
    )
    set "PY=py"
) else (
    set "PY=python"
)

echo [2/2] جارٍ تحديث الملفات من بيانتك...
echo.

%PY% -m pip install --quiet pdfplumber PyPDF2 fastapi uvicorn 2> nul

%PY% sync_frontend_data.py
if errorlevel 1 (
    echo.
    echo ❌ فشل التحديث — تأكدي من ملء Data\my_transcript.txt بشكل صحيح.
    pause
    exit /b 1
)

echo.
echo ============================================================
echo   ✅ تم! الآن شغّلي start.bat لرؤية بياناتك على الشاشة.
echo ============================================================
echo.
pause
