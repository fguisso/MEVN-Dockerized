FROM node:16.15.0

RUN mkdir -p /usr/src/www && \
  apt-get -y update && \
  npm install -g http-server

COPY . /usr/src/vue
WORKDIR /usr/src/vue
RUN npm install
RUN npm run build
RUN cp -r /usr/src/vue/dist/* /usr/src/www

WORKDIR /usr/src/www
EXPOSE 8080
CMD http-server -p 8080 --log-ip
