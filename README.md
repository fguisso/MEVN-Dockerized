# Stack MEVN dockerized

MongoDB, Express, Vue and NodeJS

## Running
```bash
docker-compose up
```

Okay, now your containers are running!

|||
|---|---|
|API|http://localhost:3000|
|Webapp|http://localhost:8080|

To create admin's user:

GET `http://localhost:3000/users/init`

ATENTION: This is a bad pratice, I'll remove this method in future and use a random pass generator.

|||
|-|-|
|email|admin@admin.com|
|password|admin|

For more about api endpoints, look at [api-blueprint](https://github.com/fguisso/MEVN-Dockerized/blob/main/api/api-blueprint.md).

## Development
### Webapp
```bash
# in portal folder, for install modules
npm install

# for run in dev mode
npm run serve

# Compile to dist folder
npm run build
```

### API
```bash
# in api folder, install all dependencies
npm install

# running api
npm start
```
