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

ENV NODE_ENV=production \
  WEB_PORT=3000 \
  PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /home

RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  freetype-dev \
  harfbuzz \
  ca-certificates \
  ttf-freefont \
  nodejs \
  yarn

RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
  && mkdir -p /home/pptruser/Downloads /app \
  && chown -R pptruser:pptruser /home/pptruser \
  && chown -R pptruser:pptruser /app

COPY --from=build \
  /home/node_modules \
  /home/packages/web-server/dist \
  /home/packages/web-server/package.json \
  /home/packages/web-server/ormconfig.js \
  /home/

VOLUME [ "./logs" ]
EXPOSE ${WEB_PORT}
USER pptruser
CMD yarn start
