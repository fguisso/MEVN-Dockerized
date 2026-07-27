# MEVN Dockerized

A dockerized MEVN stack: **M**ongoDB, **E**xpress, **V**ue and **N**ode.js.

| Service   | Stack                                    | Port |
| --------- | ---------------------------------------- | ---- |
| `api`     | Node.js 24, Express 5, Mongoose 9        | 3000 |
| `portal`  | Vue 3 + Vite, served by nginx            | 8080 |
| `mongodb` | MongoDB 8 (data persisted in a volume)   | —    |

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

For the full list of API endpoints, see [`api/api-blueprint.md`](api/api-blueprint.md).

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
