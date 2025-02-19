# development
FROM node:22.14.0-alpine3.21 AS development

RUN apk add --no-cache libc6-compat xdg-utils

WORKDIR /app

COPY package.json .

RUN npm install

FROM node:22.14.0-alpine3.21 AS builder

RUN apk add --no-cache libc6-compat xdg-utils

WORKDIR /app

COPY . .

COPY --from=development /app/node_modules ./node_modules

RUN npm run build

FROM nginx:alpine3.21 AS production

ENV NODE_ENV production

RUN echo "http://uk.alpinelinux.org/alpine/v3.8/main" > /etc/apk/repositories ; \
    echo "http://uk.alpinelinux.org/alpine/v3.8/community" >> /etc/apk/repositories ; \
    apk add --no-cache bash ; \
    echo "http://dl-cdn.alpinelinux.org/alpine/v3.8/main" > /etc/apk/repositories ; \
    echo "http://dl-cdn.alpinelinux.org/alpine/v3.8/community" >> /etc/apk/repositories

COPY    ./entrypoint.sh /entrypoint.sh

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

RUN     chmod +x /entrypoint.sh

CMD     [ "/entrypoint.sh" ]