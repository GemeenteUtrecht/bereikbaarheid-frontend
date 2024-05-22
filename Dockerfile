FROM node:18.18 as builder

ENV BROWSER=none

WORKDIR /app

COPY package.json \
    package-lock.json \
    /app/

#  Changing git URL because network is blocking git protocol...
RUN git config --global url."https://".insteadOf git://
RUN git config --global url."https://github.com/".insteadOf git@github.com:

# install dependencies
RUN npm ci

COPY . /app

# Build the app
ARG BUILD_ENV=production
RUN npm run build -- --mode ${BUILD_ENV}

# Deploy
FROM nginxinc/nginx-unprivileged:mainline-alpine-slim
COPY --from=builder /app/build/. /var/www/html/

ARG NGINX_CONF=nginx.default.conf
COPY ${NGINX_CONF} /etc/nginx/conf.d/default.conf
