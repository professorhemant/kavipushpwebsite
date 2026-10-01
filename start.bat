@echo off
echo Starting Kavipushp Website...
echo.

cd /d "%~dp0backend"
if not exist .env (
    copy .env.example .env
    echo [INFO] Created backend/.env from .env.example - please fill in your values
)
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
)

cd /d "%~dp0frontend"
if not exist .env (
    copy .env.example .env
    echo [INFO] Created frontend/.env from .env.example
)
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
)

echo.
echo Starting backend on http://localhost:5000
cd /d "%~dp0backend"
start "Kavipushp Backend" cmd /k "node server.js"

timeout /t 2 /nobreak >nul

echo Starting frontend on http://localhost:3000
cd /d "%~dp0frontend"
start "Kavipushp Frontend" cmd /k "npm run dev"

echo.
echo Both servers started!
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo Admin:    http://localhost:3000/admin
echo.
pause
