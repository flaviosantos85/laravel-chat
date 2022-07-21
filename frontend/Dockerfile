FROM node:alpine

COPY . /var/www/html/frontend

WORKDIR /var/www/html/frontend

RUN apk update && apk add --update npm\
 && npm install 

EXPOSE 3000 

CMD npm start