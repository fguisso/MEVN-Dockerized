FROM node:8.17.0

RUN mkdir -p /usr/src/www && \
  apt-get -y update && apt-get install -y curl apt-transport-https

COPY . /usr/src/vue
WORKDIR /usr/src/vue
RUN npm install
RUN npm run build
RUN \
  cp -r /usr/src/vue/dist/static /usr/src/www && \
  cp -r /usr/src/vue/dist/index.html /usr/src/www/index.html

WORKDIR /usr/src/www

COPY ./server /usr/src/www
RUN npm install

EXPOSE 8080
