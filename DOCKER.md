# Docker setup

The application runs as a monolith through Docker Compose:

- Frontend: http://localhost:3000
- Backend API and Socket.IO: http://localhost:5001
- PostgreSQL: localhost:5432

## Start the stack

The application expects `backend/.env`. A local file already works as-is because
Compose overrides the container-specific database host settings. The frontend
also expects `frontend/.env` for public browser configuration such as Google
OAuth. For a fresh clone:

```powershell
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
docker compose up --build
```

The `migrate` container applies the SQL migrations before the backend starts.
The `ensure-admin` container then creates or resets the built-in database admin:

```text
Email: admin@startupconnect.test
Password: AdminPass123!
```

PostgreSQL data and backend uploads are persisted in named volumes.

## Stop the stack

```powershell
docker compose down
```

To intentionally remove stored database records and uploads too:

```powershell
docker compose down --volumes
```
