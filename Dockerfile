#dockerfile 
FROM node:alpine
MAINTAINER e2r5
COPY . /opt
RUN apk add --update git nodejs nodejs-npm
WORKDIR /opt
RUN npm install
RUN npm install -g truffle
RUN truffule compile
ENTRYPOINT truffule migrate && node src/microPayment.js
EXPOSE 8001
