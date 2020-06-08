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
  && mkdir -p /home/packages/web-server/tmp \
  && mkdir -p /home/packages/web-server/static \
  && chown -R visible:visible /home/packages/web-server/tmp/ \
  && chown -R visible:visible /home/packages/web-server/static/

COPY --from=build /home/package.json /home/lerna.json /home/
COPY --from=build /home/node_modules /home/node_modules

COPY --from=build \
  /home/packages/web-server/package.json \
  /home/packages/web-server/ormconfig.js \
  /home/packages/web-server/
COPY --from=build /home/packages/web-server/dist /home/packages/web-server/dist

COPY --from=build /home/packages/web-client/package.json /home/packages/web-client/
COPY --from=build /home/packages/web-client/dist /home/packages/web-client/dist
COPY --from=build /home/packages/web-client/public /home/packages/web-client/public
COPY --from=build /home/packages/web-client/.next /home/packages/web-client/.next

USER visible
VOLUME [ "/home/packages/web-server/logs" ]
ENTRYPOINT [ "yarn", "start" ]
