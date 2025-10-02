@echo off
echo Démarrage de Mirror3D en mode développement...

echo.
echo Installation des dépendances backend...
cd "Back-end Mirror"
call npm install

echo.
echo Démarrage du backend...
start "Backend Mirror3D" cmd /k "npm start"

cd ..
timeout /t 3 /nobreak > nul

echo.
echo Installation des dépendances frontend...
cd "Front-end Mirror"
call npm install

echo.
echo Démarrage du frontend...
start "Frontend Mirror3D" cmd /k "npm run dev"

echo.
echo Les deux serveurs sont en cours de démarrage...
echo Backend: http://localhost:4000
echo Frontend: http://localhost:5173
echo API Health: http://localhost:4000/api/health
pause
