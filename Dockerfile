FROM node:23-alpine as builder

WORKDIR /var/app

COPY package.json package-lock.json /var/app/

RUN npm install

COPY tsconfig.json merchants.json webpack.config.ts /var/app/

COPY src/ /var/app/src/

RUN npm run build

FROM caddy:2.10.0-alpine

COPY --from=builder /var/app/dist /srv