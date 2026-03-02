# Project Context — Davit Niniashvili Official (Source of Truth)
### AI_DATA_START
ACTIVE_MODE: ProLevel
HERO_CLIPS: /videos/hero.mp4
DOCKER_PORTS: 8081:8080 3000
### AI_DATA_END

## Product scope
Official website (bio, stats, gallery, shop, orders). Full-stack.

## Stack
Frontend: React 18 + Vite + TailwindCSS + Framer Motion + React Router + Axios
Backend: Java 17 + Spring Boot + PostgreSQL + Maven
Infra: Docker Compose

## Repo layout
- backend/ (Spring Boot)
- frontend/ (Vite app)
- docker-compose.yml (dev/prod-ish containers)

## Environments & Ports (IMPORTANT)
### Local (non-docker)
- Backend runs on: http://localhost:8080/api  (server.port=8080)
- Frontend dev: http://localhost:5173
### Docker (docker-compose)
- Backend is exposed as: http://localhost:8081/api  (ports: 8081:8080)
- Frontend container is exposed as: http://localhost:3000  (nginx)
### Vite proxy
- frontend/vite.config.js proxies /api → http://localhost:8081
Implication:
- If using Docker backend → proxy works as-is.
- If running backend locally on 8080 → proxy target must be switched to 8080 (do NOT change unless explicitly requested).

## Non-negotiable change policy
- No file modifications without explicit approval.
- No refactors/cleanup/formatting/dependency bumps unless explicitly requested.
- Always propose minimal diff/patch first.

## Hero Video System (HARD CONSTRAINTS)
File: frontend/src/features/home/Hero.jsx

Allowed by default:
- ONLY edit the CLIPS array values (src/poster/cutStart/cutEnd)
- ONLY add/remove static assets under frontend/public (videos/posters)

Not allowed by default:
- Do NOT touch the Hero component logic (RAF loop, listeners, cleanup, switching safeguards).

## Hero assets rules
- Videos live in: frontend/public/videos/
  Used in code as: /videos/<name>.mp4
- Posters live in: frontend/public/ (or subfolders)
  Used in code as: /<name>.jpg

## Recommended hero video workflow (token-efficient)
Preferred: one mp4 + time slicing into multiple "clips" via CLIPS (same src, different cutStart/cutEnd + posters).
No real splitting required.

Poster generation examples:
ffmpeg -y -ss 1.0 -i frontend/public/videos/<video>.mp4 -frames:v 1 -q:v 2 frontend/public/videos/<video>_a.jpg
ffmpeg -y -ss 7.2 -i frontend/public/videos/<video>.mp4 -frames:v 1 -q:v 2 frontend/public/videos/<video>_b.jpg

## Current known state
- Hero CLIPS currently points to:
  - hero.mp4 (≈13.47s) [temporary single-asset hero; will be replaced later]
- Docker backend host port is 8081; local backend is 8080.

## Task log (update as you go)
- [ ] (todo) add real hero mp4(s) into frontend/public/videos/
- [ ] (todo) update CLIPS to match real assets and desired cut ranges
- [ ] (todo) verify mobile autoplay + seamless swap
