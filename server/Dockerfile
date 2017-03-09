FROM node:7.6.0

RUN npm install -g npm gulp-cli

COPY . /src
RUN cd /src; npm install;gulp babel

EXPOSE 3000
CMD [ "node", "src/dist/server"]
