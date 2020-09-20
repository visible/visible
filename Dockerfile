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
  PROJECT=/home/visible/app \
  SERVER=/home/visible/app/packages/@visi/web-server \
  CLIENT=/home/visible/app/packages/@visi/web-client \
  GOOGLE_APPLICATION_CREDENTIALS=/home/visible/credentials/google-application.json \
  PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
EXPOSE ${CLIENT_PORT} ${SERVER_PORT}
WORKDIR /home/visible/app

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
  ${PROJECT}/package.json \
  ${PROJECT}/yarn.lock \
  ${PROJECT}/lerna.json \
  ${PROJECT}/
COPY --from=build ${PROJECT}/node_modules ${PROJECT}/node_modules

COPY --from=build \
  ${SERVER}/package.json \
  ${SERVER}/ormconfig.js \
  ${SERVER}/
COPY --from=build ${SERVER}/dist ${SERVER}/dist

COPY --from=build ${CLIENT}/package.json ${CLIENT}/next.config.js ${CLIENT}/
COPY --from=build ${CLIENT}/public ${CLIENT}/public
COPY --from=build ${CLIENT}/.next ${CLIENT}/.next

USER visible
VOLUME ["/home/visible/app/packages/@visi/web-server/logs", "/home/visible/app/packages/@visi/web-server/static", "/home/visible/credentials" ]
ENTRYPOINT [ "yarn", "start" ]
