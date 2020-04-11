FROM node:12-alpine AS build
ENV NODE_ENV=development
WORKDIR /home

RUN apk add --no-cache git yarn
COPY . /home

RUN yarn --frozen-lockfile \
  && yarn cache clean \
  && yarn run build

FROM node:12-alpine AS production

ENV NODE_ENV=production
WORKDIR /home

RUN apk add --no-cache yarn

COPY --from=build /home/node_modules /home/node_modules
COPY --from=build /home/packages/web-client/.next /home/.next
COPY --from=build /home/packages/web-client/public /home/public
COPY --from=build /home/packages/web-client/dist /home/dist
COPY --from=build /home/packages/web-client/package.json /home/package.json

EXPOSE ${CLIENT_PORT}
ENTRYPOINT [ "yarn", "start" ]
