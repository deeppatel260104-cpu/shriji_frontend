@echo off
cd C:\shrijistudiowebsite\backend
pm2 start server.js --name shrijiphoto-backend
pm2 save
pm2 list
exit