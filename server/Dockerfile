FROM node:7.6.0

RUN mkdir -p /usr/src/app && \
  apt-get update && apt-get install -y curl apt-transport-https && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install yarn

WORKDIR /usr/src/app
RUN npm install -g gulp-cli

COPY . /usr/src/app
RUN yarn;gulp babel

EXPOSE 3000
