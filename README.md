# Zenko Micropayment
## Overview
## Instalation
```
docker swarm init
docker swarm join --token $TOKEN $IP:$PORT
docker stack deploy -c docker-compose.yml zenko
```
## Presentation
```
#term 0
truffle develop
compile
migrate
#term 1 
export GETH_SERVER localhost:9545
node src/microPayment.js
#term 2  s3 directory
export MICROPAYMENT_SERVER=127.0.0.1:8001
npm start
#term 3
export AWS_ACCESS_KEY_ID=accessKey1
export AWS_SECRET_ACCESS_KEY=verySecretKey1
export GETH_SERVER localhost:9545
export ID=$(aws s3api --endpoint http://localhost:8000 list-buckets --query Owner.ID | sed 's|"||g')
node src/zenkoTruffle.js deposit 512
node src/zenkoTruffle.js balance 
aws s3 --endpoint http://localhost:8000 mb s3://bucket1
aws s3 --endpoint http://localhost:8000 cp README.md s3://bucket1/readme
node src/zenkoTruffle.js balance 
```
