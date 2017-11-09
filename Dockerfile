#dockerfile 
FROM alpine:3.6
MAINTAINER e2r5
COPY . /opt
RUN apk add --update git nodejs nodejs-npm
WORKDIR /opt
RUN npm install
ENTRYPOINT node microPayment.js
EXPOSE 8001
