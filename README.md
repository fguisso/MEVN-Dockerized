# Stack MEVN dockerized

MongoDB, Express, Vue and NodeJS

In this time, every is okay, just run
```
docker-compose up

// if you make any changes, just use this flag

docker-compose up --build
```

Okay, now your containers are running!

API >> `localhost:3000`
CLient >> `localhost:8080`

To create admin's user:

GET `localhost:3000/users/init`

email: Admin@admin.com
password: admin

For more about api endpoints, search api-blueprint in api folder.

For edit, start localy, rebuild
```
// in client folder, for install modules

yarn

// for run in dev mode

yarn run dev

// Compile to dist folder

yarn run build

// in api folder, install all dependencies

yarn

// for dev and watch files, run gulp

gulp

// after babel crete a dist folder, for execute localy

yarn run start
//or
node dist/server
```