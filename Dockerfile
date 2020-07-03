FROM node:13.5-alpine

#update
RUN apk add --update nodejs

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

#Install app dependencies
COPY . .
RUN npm install

EXPOSE 5000

#Bundle app source
CMD ["npm", "start"]
