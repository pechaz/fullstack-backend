# development stage
FROM node:18-alpine as base

WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json ./

COPY ./src ./src

RUN ls -a

RUN yarn install --pure-lockfile && yarn compile