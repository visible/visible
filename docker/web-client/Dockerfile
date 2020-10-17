FROM node:12-alpine AS build
ENV NODE_ENV=production
WORKDIR /home/visible/app

RUN apk add --no-cache git yarn
COPY . /home/visible/app
RUN yarn --frozen-lockfile --production false \
  && yarn cache clean \
  && yarn run build

# Isolate monorepo packages
RUN mv node_modules/@visi node_modules/.tmp \
  && cp -LR node_modules/.tmp node_modules/@visi \
  && rm -rf node_modules/.tmp

FROM node:12-alpine AS production
ENV NODE_ENV=production \
  ROOT=/home/visible/app \
  CLIENT=/home/visible/app/packages/@visi/web-client

EXPOSE ${PORT}
WORKDIR ${CLIENT}

RUN apk add --no-cache \
  yarn

RUN addgroup -S visible \
  && adduser -S -g visible visible \
  && chown -R visible:visible /home/visible/

COPY --from=build \
  ${ROOT}/package.json \
  ${ROOT}/yarn.lock \
  ${ROOT}/lerna.json \
  ${ROOT}/
COPY --from=build ${ROOT}/node_modules ${ROOT}/node_modules

COPY --from=build ${CLIENT}/package.json ${CLIENT}/next.config.js ${CLIENT}/
COPY --from=build ${CLIENT}/public ${CLIENT}/public
COPY --from=build ${CLIENT}/.next ${CLIENT}/.next

USER visible
ENTRYPOINT yarn run next start -p $PORT
