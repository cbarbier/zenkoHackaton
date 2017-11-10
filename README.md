# Zenko Micropayment
## Overview
## Instalation
```
docker swarm init
docker swarm join --token $TOKEN $IP:$PORT
docker stack deploy -c docker-compose.yml zenko
```
## Prez
```
truffle develop
compile
migrate
exit
export GETH_SERVER localhost:9545
node src/microPayment.js
export ID=$(aws s3api --endpoint http://localhost:8000 list-buckets --query Owner.ID)
node src/zenkoTruffle.js deposit $ID 512
node src/zenkoTruffle.js balance $ID
#aws put
node src/zenkoTruffle.js balance $ID
```
