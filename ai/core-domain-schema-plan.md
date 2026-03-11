# Core Domain Schema Plan — Athlete Platform

This document outlines the core domain model required for the Davit Niniashvili athlete platform backend. It defines entities, their responsibilities, relationships, and core fields without introducing code. 

All reserved commerce entities (Shop, Product, Order) are intentionally excluded from this platform core design.

---

## 1. Core Profile Domain

### `Player`
**Responsibility:** Represents the athlete's core biographical and profile data. 
**Relations:** 
- 1:N with `PlayerMatchStat`
- 1:N with `PlayerSeasonTotal`, `PlayerTeamTotal`, `PlayerCompetitionTotal`
- 1:N with `Award`
**Core Fields:**
- `id` (UUID/Long)
- `firstName`, `lastName`
- `position`
- `nationality`
- `birthDate`
- `height` (cm), `weight` (kg)
- `biography` (Text)

---

## 2. Match & Hierarchy Domain

### `Team`
**Responsibility:** Represents a rugby club or national team.
**Relations:**
- 1:N with `Match` (as home or away team)
- 1:N with `PlayerTeamTotal`
**Core Fields:**
- `id`
- `name` (e.g., "Lyon", "La Rochelle", "Georgia")
- `logoUrl`
- `isNationalTeam` (Boolean)

### `Competition`
**Responsibility:** Represents a tournament or league.
**Relations:**
- 1:N with `Match`
- 1:N with `PlayerCompetitionTotal`
**Core Fields:**
- `id`
- `name` (e.g., "Top 14", "Challenge Cup", "Rugby World Cup")
- `type` (Domestic, International, European)
- `logoUrl`

### `Season`
**Responsibility:** Represents a specific playing calendar block.
**Relations:**
- 1:N with `Match`
- 1:N with `PlayerSeasonTotal`
**Core Fields:**
- `id`
- `name` (e.g., "2023/2024", "2024")
- `startDate`, `endDate`

### `Match`
**Responsibility:** Represents a single rugby fixture.
**Relations:**
- N:1 with `Team` (Home), `Team` (Away)
- N:1 with `Competition`
- N:1 with `Season`
- 1:N with `PlayerMatchStat`
**Core Fields:**
- `id`
- `date`
- `competition_id`
- `season_id`
- `home_team_id`
- `away_team_id`
- `homeScore`
- `awayScore`
- `status`

---

## 3. Statistics Domain

*Note: In the athlete platform, stats are tightly scoped to the individual player.*

### `PlayerMatchStat`
**Responsibility:** Holds the granular, per-game statistics for the player.
**Relations:**
- N:1 with `Player`
- N:1 with `Match`
**Constraints:**
- `UNIQUE(player_id, match_id)`
**Core Fields:**
- `id`
- `minutesPlayed`
- `tries`, `assists`
- `metersCarried`, `defendersBeaten`, `lineBreaks`, `offloads`
- `tacklesMade`, `tackleSuccessRate`

### Aggregation Entities (Materialized Views or Cache Tables)
These entities optimize read performance for the frontend by pre-calculating totals across different dimensions.

#### `PlayerTeamTotal`
**Responsibility:** All-time stats for the player grouped by team.
**Relations:** N:1 `Player`, N:1 `Team`
**Core Fields:** 
- `player_id`
- `team_id`
- `matches`
- `tries`
- `meters`
- `offloads`
- `tackles`

#### `PlayerCompetitionTotal`
**Responsibility:** All-time stats for the player grouped by competition.
**Relations:** N:1 `Player`, N:1 `Competition`
**Core Fields:** 
- `player_id`
- `competition_id`
- `matches`
- `tries`
- `meters`
- `offloads`
- `tackles`

#### `PlayerSeasonTotal`
**Responsibility:** All-time stats for the player grouped by season.
**Relations:** N:1 `Player`, N:1 `Season`
**Core Fields:** 
- `player_id`
- `season_id`
- `competition_id`
- `team_id`
- `matches`
- `tries`
- `meters`
- `offloads`
- `tackles`

---

## 4. Content & Presentation Domain

### `Award`
**Responsibility:** Represents career achievements, trophies, and milestones.
**Relations:**
- N:1 with `Player`
- N:1 with `Competition` (Optional)
- N:1 with `Season` (Optional)
**Core Fields:**
- `id`
- `player_id`
- `title`
- `year`
- `competition_id`
- `season_id`
- `description`
- `imageUrl`

### `AuthorityHighlight`
**Responsibility:** Manages external media, quotes, and visual proof of authority (videos/articles).
**Relations:** None (Standalone content block)
**Core Fields:**
- `id`
- `type`
- `sourceName`
- `title`
- `description`
- `imageUrl`
- `contentUrl`
- `yearLabel`
- `priority`
- `isActive`

### `ContentBlock`
**Responsibility:** Drives dynamic, localized UI text and structural config from the database.
**Relations:** None
**Core Fields:**
- `id`
- `page`
- `section`
- `key`
- `locale`
- `value`
- `isActive`

---

## 5. System Infrastructure Domain

### `SyncLog`
**Responsibility:** Audit trail for external data ingestion (e.g., pulling stats from Opta/ESPN APIs).
**Relations:** None
**Core Fields:**
- `id`
- `timestamp`
- `source` (e.g., "OPTA_API")
- `status` (SUCCESS, FAILED)
- `recordsUpdated` (Integer)
- `errorMessage` (Text block if failed)
