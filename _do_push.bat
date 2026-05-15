@echo off
cd /d "%~dp0"
set LOG=%~dp0_push_log.txt
echo === PUSH START %DATE% %TIME% === > "%LOG%"

where git >> "%LOG%" 2>&1
if errorlevel 1 (
  echo GIT NOT FOUND >> "%LOG%"
  exit /b 1
)

if not exist .git (
  git init >> "%LOG%" 2>&1
  git branch -M main >> "%LOG%" 2>&1
)

git remote remove origin >> "%LOG%" 2>&1
git remote add origin https://github.com/gaid-68/Ed0.git >> "%LOG%" 2>&1

git add . >> "%LOG%" 2>&1
git reset HEAD .env >> "%LOG%" 2>&1
git reset HEAD .env.local >> "%LOG%" 2>&1

echo === STAGED === >> "%LOG%"
git diff --cached --name-only >> "%LOG%" 2>&1

git commit -m "EduPilot: full project with Supabase setup" >> "%LOG%" 2>&1

git push -u origin main >> "%LOG%" 2>&1
echo EXIT_CODE=%ERRORLEVEL% >> "%LOG%"
echo === DONE === >> "%LOG%"
