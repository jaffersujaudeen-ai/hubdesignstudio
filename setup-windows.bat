@echo off
echo Installing UN Digital Hub Design Studio dependencies...
npm install
if errorlevel 1 (
  echo Installation failed. Check your Node.js and internet connection.
  pause
  exit /b 1
)
echo.
echo Installation complete. Run "npm run dev" to start the studio.
pause
