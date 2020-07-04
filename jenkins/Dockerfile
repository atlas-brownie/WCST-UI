FROM node:12.0-stretch-slim AS builder
ENV APP=/var/www

# Install Chromium
RUN apt-get update && apt-get install --no-install-recommends --no-install-suggests -y software-properties-common && apt install -y chromium
ENV CHROME_BIN=chromium

# Create app directory
RUN mkdir -p $APP
WORKDIR $APP

# Install app dependencies
COPY package*.json $APP/

RUN npm install

# this should build in /dist/angui
COPY . $APP

# docker build -t hellofront -f Dockerfile  .
# docker run -p 8080:80 -d --name hellofront hellofront

# to inspect
# docker run -it -p 8080:80  hellofront /bin/bash

