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
  SERVER=/home/visible/app/packages/@visi/web-server \
  GOOGLE_APPLICATION_CREDENTIALS=/home/visible/credentials/google-application.json \
  PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

EXPOSE ${PORT}
WORKDIR ${SERVER}

RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  freetype-dev \
  harfbuzz \
  ca-certificates \
  ttf-freefont \
  yarn

RUN addgroup -S visible \
  && adduser -S -g visible visible \
  && mkdir -p /home/visible/Downloads \
  && mkdir -p ${SERVER}/static \
  && mkdir -p ${SERVER}/logs \
  && mkdir -p /home/visible/credentials \
  && chown -R visible:visible /home/visible/

COPY --from=build \
  ${ROOT}/package.json \
  ${ROOT}/yarn.lock \
  ${ROOT}/lerna.json \
  ${ROOT}/
COPY --from=build ${ROOT}/node_modules ${ROOT}/node_modules

COPY --from=build \
  ${SERVER}/package.json \
  ${SERVER}/ormconfig.js \
  ${SERVER}/
COPY --from=build ${SERVER}/dist ${SERVER}/dist

USER visible
VOLUME ["/home/visible/app/packages/@visi/web-server/logs", "/home/visible/app/packages/@visi/web-server/static", "/home/visible/credentials" ]
ENTRYPOINT [ "node", "./dist/index.js" ]
