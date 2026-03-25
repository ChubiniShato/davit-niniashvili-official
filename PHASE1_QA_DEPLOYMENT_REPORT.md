# Phase 1 QA + Deployment Report

## Overall Verdict
**READY WITH MINOR NON-BLOCKING GAPS**

## Scope
- Admin auth
- Public pages
- Career admin
- Awards admin
- Content blocks admin
- Content blocks public behavior
- Base deployment hardening

## QA Status

### 1.1 Auth / Security — PASS
- `/admin/login` opens
- Valid credentials work
- Invalid credentials are rejected
- Redirect to `/admin` after login works
- Session persists on refresh
- Logout works
- Protected admin routes are blocked after logout
- Logout UI fix completed
- Logout hardening completed

### 1.2 Public Site Regression — PASS
- Main public pages load
- `/career` works
- No obvious 404/500 issues on main routes
- Public UI is stable

### 1.3 Career Admin — PASS
- `/admin/career` loads
- Existing payload renders correctly
- Valid JSON validation works
- Invalid JSON rejection works
- Publish works
- Public `/career` updates after publish
- Malformed publish does not break public output
- Backup file creation verified
- Backup persistence verified on host

### 1.4 Awards Admin — PASS
- List/load works
- Create works
- Edit works
- Delete works
- Required validation works

### 1.5 Content Blocks Admin — PASS
- List/load works
- Create works
- Edit works
- Delete works
- `isActive` works
- Admin CRUD verified

### Content Blocks Public Integration — PASS
- Public side was initially hardcoded
- Integration was added
- Content mapping was corrected
- Final homepage slogan experiment was rolled back correctly:
  - Hero short phrase stays in code/translations
  - Authority full slogan stays in code/translations
  - These slots are no longer admin-overridable

### 1.6 Player Profile Surface QA — DEFERRED
Reason:
- Out of current Phase 1 release scope
- Sync-sensitive
- To be tested in dedicated Player Profile / Hybrid Sync phase

### 1.7 Error / Stability — PASS WITH 2 KNOWN FAILS
#### PASS
- Normal public render is stable
- Career page render is stable
- No obvious duplicate submit issue
- No logout multi-click instability observed

#### FAIL
- Offline home -> browser default `ERR_INTERNET_DISCONNECTED`
- Offline admin login -> browser default `ERR_INTERNET_DISCONNECTED`

Interpretation:
- Graceful offline handling does not exist
- This is **not a release blocker** for current Phase 1 scope

## Deployment Hardening Status

### Completed
- Backend runtime data persistence enabled:
  - `./backend/data:/app/data`
- `career-profile.json` persists on host
- Backup files persist on host
- Backup creation verified on second publish
- PostgreSQL persistence works
- PostgreSQL healthcheck works
- `restart: unless-stopped` applied
- Career files persist across container recreation

### Result
**Deployment hardening base layer completed**

## Fixes Completed During QA
- Admin logout button added
- Shared admin layout implemented
- Logout UX hardening implemented
- Career publish/backup flow verified
- Content blocks admin CRUD verified
- Content blocks public integration implemented
- Homepage slogan/authority mapping corrected
- Homepage slogan-related UI returned to non-CMS-controlled mode

## Known Issues / Non-Blockers
1. No graceful offline handling
2. No formal backend health endpoint yet
3. Production secrets discipline still needs hardening

## Final Status
### Passed
- Auth / Security
- Public Site Regression
- Career Admin
- Awards Admin
- Content Blocks Admin
- Content Blocks public behavior
- Deployment hardening base layer

### Failed
- Offline home graceful handling
- Offline admin login graceful handling

### Deferred
- Player Profile Surface QA

### Critical blockers
**None**

## Next Phase
- Sponsor product structure
- Proof/data layer
- Media reach framing
- Inquiry flow
- Commercial pack v1
