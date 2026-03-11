# Project Context — Davit Niniashvili Official (Source of Truth)

### AI_DATA_START
ACTIVE_MODE: ProLevel
HERO_CLIPS: /videos/hero.mp4
DOCKER_PORTS: 8081:8080 3000
### AI_DATA_END

## Product scope
Official athlete platform and premium presentation website.

Primary priorities:
1. Sponsor acquisition
2. Brand partner acquisition
3. Davit Niniashvili brand building
4. Future commerce layer

Current product scope:
- bio
- stats
- gallery/media
- sponsor-facing presentation
- authority highlights
- partner-facing content
- admin-managed content

Reserved future scope:
- shop
- products
- orders
- merchandise
- ecommerce flows

Important:
Shop is a planned future business layer, but it is not part of the current active implementation phase.
Do not introduce shop-driven architecture or code unless explicitly requested.

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
- Backend runs on: http://localhost:8080/api (server.port=8080)
- Frontend dev: http://localhost:5173

### Docker (docker-compose)
- Backend is exposed as: http://localhost:8081/api (ports: 8081:8080)
- Frontend container is exposed as: http://localhost:3000 (nginx)

### Vite proxy
- frontend/vite.config.js proxies /api → http://localhost:8081

Implication:
- If using Docker backend → proxy works as-is.
- If running backend locally on 8080 → proxy target must be switched to 8080 (do NOT change unless explicitly requested).

## Current implementation phase
Current active engineering phase:
Spring Boot backend transition into athlete-platform architecture.

Active backend scope now:
- player
- stats
- awards
- authority highlights
- content blocks
- admin auth
- sync foundation

Reserved but inactive:
- shop
- orders
- ecommerce
- payments

## Non-negotiable change policy
- No file modifications without explicit approval.
- No refactors/cleanup/formatting/dependency bumps unless explicitly requested.
- Always propose minimal diff/patch first.
- Backend work must respect current phase scope.
- If a requested step requires architecture rewrite, broad refactor, dependency churn, or system-wide restructuring, return:
  APPROVAL REQUIRED: <reason> | SAFE ALTERNATIVE: <minimal option>

## Hero Video System (HARD CONSTRAINTS)
File: frontend/src/features/home/Hero.jsx

Allowed by default:
- ONLY edit the CLIPS array values (src/poster/cutStart/cutEnd)
- ONLY add/remove static assets under frontend/public (videos/posters)

Not allowed by default:
- Do NOT touch the Hero component logic (RAF loop, listeners, cleanup, switching safeguards).

## Hero assets rules
- Videos live in: frontend/public/videos/
- Used in code as: /videos/<file>.mp4
- Posters live in: frontend/public/ (or subfolders)
- Used in code as: /<file>.jpg

## Recommended hero video workflow (token-efficient)
Preferred:
one mp4 + time slicing into multiple "clips" via CLIPS (same src, different cutStart/cutEnd + posters).
No real splitting required.

Poster generation examples:
ffmpeg -y -ss 1.0 -i frontend/public/videos/<file>.mp4 -frames:v 1 -q:v 2 frontend/public/videos/<file>_a.jpg
ffmpeg -y -ss 7.2 -i frontend/public/videos/<file>.mp4 -frames:v 1 -q:v 2 frontend/public/videos/<file>_b.jpg

## Current known state
- Hero CLIPS currently points to:
  - hero.mp4 (≈13.47s) [temporary single-asset hero; will be replaced later]
- Docker backend host port is 8081; local backend is 8080.

## Task log (update as you go)
- [ ] (todo) add real hero mp4(s) into frontend/public/videos/
- [ ] (todo) update CLIPS to match real assets and desired cut ranges
- [ ] (todo) verify mobile autoplay + seamless swap