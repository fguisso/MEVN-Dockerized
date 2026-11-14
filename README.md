# MEVN Dockerized

A dockerized MEVN stack: **M**ongoDB, **E**xpress, **V**ue and **N**ode.js.

![Portal Gestor dashboard](docs/dashboard.png)

| Service   | Stack                                    | Port |
| --------- | ---------------------------------------- | ---- |
| `api`     | Node.js 24, Express 5, Mongoose 9        | 3000 (internal API; do not publish directly) |
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

    browser -->|"SPA + /api/ · http :8080"| portal
    portal -->|"REST + JWT · private Compose network"| api
    api -->|"Mongoose"| db
    db --- vol
```

The portal serves the SPA and forwards `/api/` to the API on the Compose network.
The browser authenticates with a JWT stored after sign-in. Only the portal needs
to be reachable by browsers; keep direct API access and MongoDB private.

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

3. Open the apps on the Docker host:

   - Portal: <http://localhost:8080>
   - API: <http://localhost:3000>

   The API port is bound to `127.0.0.1` by default. The portal is bound to
   `0.0.0.0:8080`; restrict access with your firewall/proxy as needed.

4. Before exposing the app, create the first admin **from inside the API container**
   with a unique password of at least 16 characters. On the Docker host, enter
   it interactively (never put the password in a shell command or commit it):

   ```sh
   read -r -p 'Admin email: ' ADMIN_EMAIL
   read -r -s -p 'Admin password (16+ characters): ' ADMIN_PASSWORD; printf '\n'
   export ADMIN_EMAIL ADMIN_PASSWORD
   docker compose exec -e ADMIN_EMAIL -e ADMIN_PASSWORD api npm run bootstrap-admin
   unset ADMIN_EMAIL ADMIN_PASSWORD
   ```

   This command works only while the user collection is empty. There is no public
   bootstrap route or default admin password. Public registration creates only
   non-admin accounts; an admin can grant admin rights using the user edit page.
   JWTs expire after eight hours, so sign in again when one expires.

## Internal homelab preview

For an internal browser preview, run the Compose stack on your Docker host and
create an **internal** Nginx Proxy Manager (NPM) proxy host pointing to
`http://<docker-host-LAN-IP>:8080`. Resolve its hostname using internal DNS and
enable HTTPS with a certificate valid for that internal name. Keep the API's
`127.0.0.1:3000` binding and do not publish MongoDB. The browser calls the
same-origin `/api/` path through the portal's nginx proxy; it does not connect
to port 3000 directly. Do not use a public Quick Tunnel for an internal preview.

## API

The API is documented with **OpenAPI 3.1** in [`api/openapi.yaml`](api/openapi.yaml) —
paste it into the [Swagger Editor](https://editor.swagger.io) or point any
OpenAPI tooling at it. Summary:

| Method   | Path              | Auth | Description                          |
| -------- | ----------------- | ---- | ------------------------------------ |
| `GET`    | `/`               | —    | Health check                         |
| `POST`   | `/users/auth`     | —    | Authenticate and retrieve a JWT      |
| `POST`   | `/users/register` | —    | Register a new user                  |
| `GET`    | `/users/list`     | JWT  | List users                           |
| `GET`    | `/users/{id}`     | JWT  | Get a user by id                     |
| `PUT`    | `/users/{id}`     | JWT  | Edit self; admins can edit others and roles |
| `DELETE` | `/users/{id}`     | Admin JWT | Delete a user                  |
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
The API permits CORS only from `http://localhost:8080` by default (override with
`CORS_ORIGIN` for a different local dev origin). The Vite dev server proxies
`/api/` to `http://localhost:3000/` for the normal same-origin workflow.

### Portal

```sh
cd portal
npm install

npm run dev      # dev server with HMR at http://localhost:8080
npm run build    # production build to dist/
npm run preview  # serve the production build locally
npm run lint     # ESLint
```

The portal reads the API base URL from `VITE_API_URL` (defaults to `/api/`).
