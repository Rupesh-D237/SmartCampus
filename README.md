# Campus Connect

Full‑stack smart campus platform.

## Tech stack

- Frontend: React + Vite
- Backend: Java 17 + Spring Boot (JWT auth)
- DB: H2 (file‑based, persistent for local dev)

## Project structure

- `frontend/` – React + Vite app
- `backend/` – Spring Boot REST API

## Run locally (Windows PowerShell)

### Backend

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Backend runs on `http://localhost:8080`.

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

Frontend runs on the Vite URL shown in the terminal (ex: `http://localhost:5173/`).

## Root convenience scripts

From repo root:

```powershell
npm run dev:backend
npm run dev:frontend
```

