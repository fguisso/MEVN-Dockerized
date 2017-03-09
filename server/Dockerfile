FROM node:7.6.0

RUN npm install -g npm grunt-cli gulp

COPY . /src
RUN cd /src; npm install

EXPOSE 3000
CMD [ "node", "src/server"]
