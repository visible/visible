FROM node:12-alpine AS build
ARG NODE_ENV=production
WORKDIR /web-server

RUN apk -U upgrade && apk add \
  git \
  yarn \
  && rm -rf /var/cache/apk/*

COPY package.json /web-server

RUN yarn \
 && yarn cache clean

COPY . /web-server
RUN yarn run generate:graphql

FROM node:12-alpine AS production
ARG NODE_ENV=production
ARG WEB_PORT=3000
WORKDIR /web-server

COPY --from=build \
  /web-server/src \
  /web-server/node_modules \
  /web-server/package.json \
  /web-server/ormconfig.js \
  /web-server/

VOLUME [ "./logs" ]
EXPOSE ${WEB_PORT}
CMD yarn start
