# syntax=docker/dockerfile:1.1.7-experimental

ARG NODEVER=21.6.1
ARG ALPINEVER=3.18

###### First Build Phase
FROM node:${NODEVER}-alpine${ALPINEVER} as build

RUN apk upgrade --no-cache

RUN apk upgrade --no-cache && apk add --no-cache \
  bash

WORKDIR /srv/showcase

RUN npm install -g pnpm

COPY ./showcase-dist .

RUN pnpm install --prod --frozen-lockfile

###### Second Build Phase
FROM node:${NODEVER}-alpine${ALPINEVER}

RUN apk upgrade --no-cache && apk add --no-cache \
  bash \
  curl

RUN npm install -g pnpm

WORKDIR /srv/showcase

# Copy built app from the first phase
COPY --from=build /srv/showcase /srv/showcase

# Final run command
CMD pnpm run start
