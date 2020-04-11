FROM node:12-alpine AS build
ARG NODE_ENV=production
WORKDIR /web-client

RUN apk -U upgrade && apk add \
  git \
  yarn \
  && rm -rf /var/cache/apk/*

COPY package.json /web-client

RUN yarn \
 && yarn cache clean

COPY . /web-client
RUN yarn run build

FROM node:12-alpine AS production
ARG NODE_ENV=production
WORKDIR /web-client

COPY --from=build \
  /web-client/.next \
  /web-client/dist \
  /web-client/node_modules \
  /web-client/package.json \
  /web-client/public \
  /web-client/

EXPOSE 3000
CMD yarn start
