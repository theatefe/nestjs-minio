@echo off

docker-compose -f docker-compose up -d
timeout /t 10
cd service1
call yarn install  
start cmd /k yarn start:dev