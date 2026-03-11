# Admin Authentication Feasibility Plan

## Goal
Determine the safest minimal path to introduce protected admin endpoints (`POST`/`PUT`/`DELETE`) for managing the newly established athlete-platform domains (Awards, Authority Highlights, Content Blocks) without breaking active legacy operations.

---

## 1. Spring Security Evaluation
Introducing Spring Security is necessary for protecting mutation endpoints, but it carries a high risk of accidentally locking down existing public routes or active legacy frontend calls if not configured precisely.

**Constraint Adherence:** 
Adding Spring Security requires a new dependency (`spring-boot-starter-security`). Therefore, this action crosses the minimal-diff guardrail and is strictly **APPROVAL REQUIRED**.

## 2. JWT vs. Session-Based Authentication

**Recommendation: JWT (JSON Web Tokens)**
- **Why:** The frontend is a decoupled SPA (React/Vue/Svelte in Vite, typically). JWT is stateless and avoids CORS/Cookie complexities common with session-based auth in decoupled environments.
- **Why not Session:** Relying on JSESSIONID implies sticky sessions or server-side memory, which is less scalable and harder to decouple from the UI layer. 
- **Setup:** Requires adding `java-jwt` or `jjwt` dependencies and writing a custom `JwtAuthenticationFilter`.

## 3. Minimal Admin Role Model
To keep the scope small, we do not need a complex RBAC (Role-Based Access Control) system yet.

- **Entity Model:** 
  A simple `AdminUser` table (id, username, password_hash) or simply `User` with a hardcoded `ROLE_ADMIN`.
- **First Iteration:** 
  A single seeded admin account is sufficient for the athlete or their manager to log in and manage content.

## 4. Required Packages & Files (Architectural Plan)

If approved, the following structure would be added:

- **Config:**
  - `config/SecurityConfig.java` (MUST explicitly permit all `/images/**`, `/api/products/**`, `/api/orders/**`, and `GET /api/player/**` routes to prevent live site breakage).
  - `security/JwtTokenProvider.java`
  - `security/JwtAuthenticationFilter.java`
- **Model:**
  - `model/AdminUser.java`
- **Repository:**
  - `repository/AdminUserRepository.java`
- **Controller:**
  - `controller/AuthController.java` (Exposing `POST /api/auth/login`)
- **Service (First introduction):**
  - `service/AuthService.java` (Authentication logic)
  - `service/AdminContentService.java` (To safely handle creation/updating without bloating controllers).

## 5. Boundary Classification Actions
> **APPROVAL REQUIRED: Structural Security Addition**
> Adding `spring-boot-starter-security` and JWT filters fundamentally changes the request lifecycle of the application. 
> 
> **SAFE ALTERNATIVE:** None. You cannot safely expose mutable endpoints to the public internet without authentication. We must pause backend write-operations until Security is approved.

## 6. Safest Staged Rollout Plan

If we are to proceed with the backend evolution, here is the chronological, low-risk sequence:

**Stage 1: The Security Shell (No Endpoints Yet)**
- Add the Maven dependency.
- Create `SecurityConfig.java` but configure it to `permitAll()` on **every** existing route.
- Deploy and verify the live site still functions.

**Stage 2: Auth Endpoints**
- Create `AdminUser` entity and seed 1 admin user.
- Build `AuthController` (`/api/auth/login`) and configure the JWT filter.
- Protect *only* `/api/admin/**` routes (which don't exist yet).
- Deploy and verify login returns a token.

**Stage 3: Protected Mutations**
- Build `POST /api/admin/awards`, `POST /api/admin/highlights`, etc.
- These endpoints will require the `Bearer <token>`.
- The live frontend remains completely unaware and unharmed.
