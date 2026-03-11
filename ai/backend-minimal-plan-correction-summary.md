# Backend Minimal Plan Correction Summary

**File Modified:** `ai/backend-minimal-plan.md`

**Changes Applied to `SAFE NOW` Section:**

1. **PLAYER:**
   - Replaced endpoint `GET /api/player/bio` with `GET /api/player`.
2. **STATS:**
   - Specified defining a dedicated `StatsController` (explicitly instructed not to use `PublicContentController`).
   - Defined endpoint: `GET /api/player/stats`.
3. **AWARDS:**
   - Explicitly mapped the `Award` domain (`Award` entity, `AwardRepository`, `AwardController`).
   - Defined endpoint: `GET /api/player/awards`.
4. **HIGHLIGHTS:**
   - Explicitly mapped the `Highlight` domain (`Highlight` entity, `HighlightRepository`, `HighlightController`), forbidding reuse of `MediaItem`.
   - Defined endpoint: `GET /api/player/highlights`.
5. **CONTENT BLOCKS:**
   - Defined the `ContentBlock` entity and `ContentBlockRepository`.
   - Defined endpoint: `GET /api/content/blocks`.

**Verification:**
The `APPROVAL REQUIRED` and `RESERVED FUTURE` sections were left exactly as they were. No other files were modified, and the formatting was preserved.
