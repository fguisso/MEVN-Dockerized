FROM node:24-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/api

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
