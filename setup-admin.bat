@echo off
echo Creating admin account for Kavipushp...
echo.
set /p EMAIL=Enter admin email:
set /p PASSWORD=Enter admin password:
set /p NAME=Enter your name:

curl -s -X POST http://localhost:5000/api/auth/setup ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"%EMAIL%\",\"password\":\"%PASSWORD%\",\"name\":\"%NAME%\"}"

echo.
echo Done! You can now login at http://localhost:3000/admin
pause
