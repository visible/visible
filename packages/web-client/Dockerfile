FROM node:12-alpine AS build
ENV NODE_ENV=development
WORKDIR /home

RUN apk add --no-cache \
  git \
  yarn

COPY . /home

RUN yarn --frozen-lockfile \
  && yarn cache clean \
  && yarn run build

FROM node:12-alpine AS production

ENV NODE_ENV=production
WORKDIR /home

RUN apk add --no-cache yarn

COPY --from=build \
  /home/node_modules \
  /home/packages/web-client/.next \
  /home/packages/web-client/dist \
  /home/packages/web-client/public \
  /home/packages/web-client/package.json \
  /home/

VOLUME [ "./logs" ]
EXPOSE ${CLIENT_PORT}
CMD yarn start
