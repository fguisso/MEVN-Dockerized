FROM node:24-alpine AS build

WORKDIR /usr/src/portal

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.29-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/portal/dist /usr/share/nginx/html

EXPOSE 8080
