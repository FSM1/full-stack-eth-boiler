# Use LTS Node environment as build environment
FROM core:latest

RUN mkdir -p /build/api
RUN mkdir -p /build/webapp
RUN mkdir -p /build/webapp/internals
RUN mkdir -p /build/blockchain

WORKDIR /build

COPY package.json yarn.lock ./
COPY api/package.json ./api
COPY webapp/package.json ./webapp
COPY webapp/internals ./webapp/internals
COPY blockchain/package.json ./blockchain

RUN yarn install --frozen-lockfile && yarn cache clean
# --production

ADD . /build

ARG API_HOST
ARG API_SCHEMA
RUN yarn build:webapp

RUN rm -rf node_modules
RUN rm -rf blockchain
RUN rm -rf webapp/node_modules
