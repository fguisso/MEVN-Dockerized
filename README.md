# MEVN Dockerized

A dockerized MEVN stack: **M**ongoDB, **E**xpress, **V**ue and **N**ode.js.

![Portal Gestor dashboard](docs/dashboard.png)

| Service   | Stack                                    | Port |
| --------- | ---------------------------------------- | ---- |
| `api`     | Node.js 24, Express 5, Mongoose 9        | 3000 |
| `portal`  | Vue 3 + Vite, served by nginx            | 8080 |
| `mongodb` | MongoDB 8 (data persisted in a volume)   | —    |

## Architecture

```mermaid
flowchart LR
    browser(["Browser"])

    subgraph compose["Docker Compose"]
        portal["<strong>portal</strong><br/>Vue 3 + Vue Router + Vuex<br/>built with Vite, served by nginx"]
        api["<strong>api</strong><br/>Node.js + Express 5<br/>JWT auth"]
        db[("<strong>mongodb</strong><br/>MongoDB 8")]
        vol[/"volume<br/>mongodb-data"/]
    end

    browser -->|"SPA · http :8080"| portal
    browser -->|"REST + JWT · http :3000"| api
    api -->|"Mongoose"| db
    db --- vol
```

The portal only serves the static SPA — the app in the browser talks to the
API directly, authenticating with a JWT stored after sign-in.

## Quick start

1. Create the API environment file:

   ```sh
   cp api/.env.example api/.env
   # edit api/.env and set a real SECRET
   ```

2. Build and run everything:

   ```sh
   docker compose up --build
   ```

3. Open the apps:

   - Portal: <http://localhost:8080>
   - API: <http://localhost:3000>

4. Create the admin user (once):

   ```sh
   curl http://localhost:3000/users/init
   ```

   Then sign in with `admin@admin.com` / `admin`.

## API

The API is documented with **OpenAPI 3.1** in [`api/openapi.yaml`](api/openapi.yaml) —
paste it into the [Swagger Editor](https://editor.swagger.io) or point any
OpenAPI tooling at it. Summary:

| Method   | Path              | Auth | Description                          |
| -------- | ----------------- | ---- | ------------------------------------ |
| `GET`    | `/`               | —    | Health check                         |
| `GET`    | `/users/init`     | —    | Create the default admin user        |
| `POST`   | `/users/auth`     | —    | Authenticate and retrieve a JWT      |
| `POST`   | `/users/register` | —    | Register a new user                  |
| `GET`    | `/users/list`     | JWT  | List users                           |
| `GET`    | `/users/{id}`     | JWT  | Get a user by id                     |
| `PUT`    | `/users/{id}`     | JWT  | Update a user                        |
| `DELETE` | `/users/{id}`     | JWT  | Delete a user                        |
| `GET`    | `/items/list`     | JWT  | List items                           |
| `POST`   | `/items/register` | JWT  | Create an item                       |
| `PUT`    | `/items/{id}`     | JWT  | Update an item                       |
| `DELETE` | `/items/{id}`     | JWT  | Delete an item                       |
| `GET`    | `/info`           | JWT  | Dashboard statistics                 |

## Local development

### API

```sh
cd api
npm install

# needs a MongoDB running and the env vars from api/.env.example
SECRET=dev-secret DB_URI=mongodb://localhost:27017/mevn npm run dev
```

`npm run dev` uses Node's built-in watch mode, so the server restarts on file changes.

### Portal

```sh
cd portal
npm install

npm run dev      # dev server with HMR at http://localhost:8080
npm run build    # production build to dist/
npm run preview  # serve the production build locally
npm run lint     # ESLint
```

The portal reads the API base URL from `VITE_API_URL` (defaults to `http://localhost:3000/`).
