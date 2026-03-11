# Core Domain Schema Plan Correction Summary

**File Modified:** `ai/core-domain-schema-plan.md`

**Changes Applied:**

1. **PLAYER:**
   - Kept entity and confirmed relations (`1:N PlayerMatchStat`, `1:N Award`).
2. **MATCH:**
   - Modified fields to exact list: `id`, `date`, `competition_id`, `season_id`, `home_team_id`, `away_team_id`, `homeScore`, `awayScore`, `status`.
   - Modified relations to include `1:N with PlayerMatchStat`.
3. **PLAYER MATCH STAT:**
   - Changed Match relation to `N:1 with Match`.
   - Constrained with `UNIQUE(player_id, match_id)`.
4. **PLAYER TEAM TOTAL:**
   - Updated core fields to: `player_id`, `team_id`, `matches`, `tries`, `meters`, `offloads`, `tackles`.
5. **PLAYER COMPETITION TOTAL:**
   - Updated core fields to: `player_id`, `competition_id`, `matches`, `tries`, `meters`, `offloads`, `tackles`.
6. **PLAYER SEASON TOTAL:**
   - Updated core fields to: `player_id`, `season_id`, `competition_id`, `team_id`, `matches`, `tries`, `meters`, `offloads`, `tackles`.
7. **AWARD:**
   - Updated core fields to: `id`, `player_id`, `title`, `year`, `competition_id`, `season_id`, `description`, `imageUrl`.
8. **AUTHORITY HIGHLIGHT:**
   - Expanded fields to include: `id`, `type`, `sourceName`, `title`, `description`, `imageUrl`, `contentUrl`, `yearLabel`, `priority`, `isActive`.
9. **CONTENT BLOCK:**
   - Normalized fields to: `id`, `page`, `section`, `key`, `locale`, `value`, `isActive`.

**Verification:**
The schema plan was corrected precisely as requested via minimal diff. No code files were modified, and the formatting of the markdown document remains intact.
