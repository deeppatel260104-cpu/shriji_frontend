@echo off

cd /d C:\shrijistudiowebsite

git add .

git commit -m "Auto backup %date% %time%"

git push origin main

exit  