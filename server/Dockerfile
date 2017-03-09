FROM node:7.6.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g gulp-cli

COPY . /usr/src/app

RUN npm install;gulp babel

EXPOSE 3000
CMD [ "node", "dist/server"]
