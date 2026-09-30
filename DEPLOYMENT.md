# Luxedrive — Deployment Notes

Quick reference for how this project is deployed, hosted, and maintained.

---

## Architecture

| Piece | Host | URL |
|---|---|---|
| Frontend (React + Vite) | **Vercel** | https://luxedrive-olive.vercel.app |
| Backend (PHP + SQLite) | **Render** (Docker) | https://luxedrive-backend.onrender.com |
| Source code | **GitHub** (public) | https://github.com/RihamSaab/luxedrive |

- Frontend uses `VITE_API_URL` env var to reach the backend.
- Backend runs in a Docker container (`backend/Dockerfile`) with PHP 8.2 + pdo_sqlite.
- SQLite DB lives at `backend/car_rental.sqlite` inside the container.

---

## Environment variables

### Vercel (set in Vercel dashboard → Settings → Environment Variables)
| Key | Value | Type |
|---|---|---|
| `VITE_API_URL` | `https://luxedrive-backend.onrender.com` | Config (public) |

### Render (set in Render dashboard → your service → Environment)
| Key | Purpose |
|---|---|
| `SEED_SECRET` | Password for `seedCars.php` URL |
| `PROMOTE_SECRET` | Password for `promoteAdmin.php` URL |
| `ADMIN_USERNAME` | Admin username auto-created on seed |
| `ADMIN_PASSWORD` | Admin password (must be strong: 8+ chars, upper/lower/digit/symbol) |

**Never commit these values.** Only the *names* live in code (via `getenv()`).

### Local dev (`.env` and `backend/admin_config.php` — both gitignored)
- `.env` (project root): `VITE_API_URL=http://localhost:8000`
- `backend/admin_config.php`: local admin credentials (returns array)

---

## Common operations

### Update backend code
1. Edit files under `backend/`
2. Commit + push:
   ```bash
   git add . && git commit -m "message" && git push
   ```
3. Render → **Manual Deploy** → **Deploy latest commit**
4. ⚠️ Redeploy **wipes the SQLite DB** (free tier limitation).
5. Re-seed cars + admin — see below.

### Update frontend code
1. Edit files under `src/`
2. Commit + push
3. Vercel auto-deploys on push (no manual step)

### Seed cars + admin after every backend redeploy
Open in browser (use your real `SEED_SECRET` value):
```
https://luxedrive-backend.onrender.com/seedCars.php?secret=YOUR_SEED_SECRET
```
Returns: `{"success":true,"cars_inserted":11,"admin_created":true}`

### Promote an existing user to admin
Open in browser (use your real `PROMOTE_SECRET`):
```
https://luxedrive-backend.onrender.com/promoteAdmin.php?secret=YOUR_PROMOTE_SECRET&username=USERNAME
```
Also clears any failed login attempts for that user.

### Test backend health
```
https://luxedrive-backend.onrender.com/getCars.php
```
Should return a JSON array. First request after idle ~30s (cold start).

---

## Known limitations of the free tier

- **DB wipes on every Render redeploy** — re-hit seed URL after each push.
- **Cold start ~30 sec** after 15 min of idleness on Render free plan.
- **No SSH / shell access** on Render free — that's why we use HTTP endpoints (`seedCars.php`, `promoteAdmin.php`) for DB admin.
- **No persistent disk** on Render free — uploaded car images added via the admin UI disappear on redeploy. Only images baked into the repo at `backend/upload/` survive.

---

## Local development

```bash
# Frontend (port 5173)
cd /path/to/luxedrive
pnpm install
pnpm dev

# Backend (port 8000, separate terminal)
cd backend
php -S localhost:8000
```

Make sure `.env` has `VITE_API_URL=http://localhost:8000` and `backend/admin_config.php` has your local admin creds.

---

## File map — key backend files

| File | Purpose |
|---|---|
| `backend/config.php` | DB connection + CREATE TABLE for cars, users, bookings, login_attempts |
| `backend/login.php` | Login endpoint (bcrypt verify, no rate limit) |
| `backend/signup.php` | Signup with password strength check |
| `backend/getCars.php` | List all cars |
| `backend/addCar.php` | Admin: add car (form + image upload) |
| `backend/deleteCar.php` | Admin: delete car |
| `backend/addBooking.php` | User: create booking |
| `backend/getBookings.php` | User: list own bookings |
| `backend/seedCars.php` | **One-off** — populates cars + admin user (secret-gated) |
| `backend/promoteAdmin.php` | **One-off** — promotes a user to admin (secret-gated) |
| `backend/Dockerfile` | PHP 8.2 CLI + pdo_sqlite, listens on `$PORT` |

---

## Security notes

- Passwords stored with **bcrypt** (`password_hash` / `password_verify`).
- Signup enforces strong passwords (8+ chars, upper/lower/digit/symbol).
- Login rate limiting was **removed** (it was locking us out during dev). Consider re-adding for production.
- Secret-gated endpoints (`seedCars.php`, `promoteAdmin.php`) rely on env vars, not hardcoded secrets — safe in a public repo.
- Frontend uses `localStorage` for session — no cookies, no CSRF concern for now.

---

## Historical context (why the code looks this way)

- Started local with SQLite + XAMPP.
- Tried InfinityFree — blocked cross-origin POST API calls (anti-bot).
- Tried Fly.io — required credit card.
- Landed on Render (free tier, Docker) — DB wipes on redeploy, mitigated with `seedCars.php`.

---

*Last updated: Sep 2026*
