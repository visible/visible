FROM node:12-alpine AS build
ENV NODE_ENV=development
WORKDIR /home

RUN apk add --no-cache git yarn

COPY . /home

RUN yarn --frozen-lockfile \
  && yarn cache clean \
  && yarn run build

RUN mv node_modules/@visi node_modules/.tmp \
  && cp -LR node_modules/.tmp node_modules/@visi \
  && rm -rf node_modules/.tmp

FROM node:12-alpine AS production
ENV NODE_ENV=production \
  SERVER=/home/packages/@visi/web-server \
  CLIENT=/home/packages/@visi/web-client \
  PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
EXPOSE ${CLIENT_PORT} ${SERVER_PORT}
WORKDIR /home

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
  && chown -R visible:visible /home/visible/ \
  && mkdir -p ${SERVER}/static \
  && mkdir -p ${SERVER}/logs \
  && chown -R visible:visible ${SERVER}/static/ \
  && chown -R visible:visible ${SERVER}/logs/

COPY --from=build /home/package.json /home/lerna.json /home/
COPY --from=build /home/node_modules /home/node_modules

COPY --from=build \
  ${SERVER}/package.json \
  ${SERVER}/ormconfig.js \
  ${SERVER}/
COPY --from=build ${SERVER}/dist ${SERVER}/dist

COPY --from=build ${CLIENT}/package.json ${CLIENT}/
COPY --from=build ${CLIENT}/public ${CLIENT}/public
COPY --from=build ${CLIENT}/.next ${CLIENT}/.next

USER visible
VOLUME [ "/home/packages/@visi/web-server/logs", "/home/packages/@visi/web-server/static" ]
ENTRYPOINT [ "yarn", "start" ]
