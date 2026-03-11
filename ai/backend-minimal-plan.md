# Minimal Backend Evolution Plan

This plan defines the path for evolving the Spring Boot backend to support the Davit Niniashvili athlete platform. It respects the strict boundaries between authorized domains, required architectural approvals, and reserved future commerce layers.

## 1. SAFE NOW (Minimal Diff Implementation Possible)

These tasks involve adding isolated components parallel to existing code without restructuring the core application logic. They can be executed via minimal, additive PRs.

- **player**:
  - Add `Player` entity, `PlayerRepository`.
  - Add `PlayerController`.
  - Endpoint: `GET /api/player`
- **stats**:
  - Define a dedicated `StatsController` (Do not use `PublicContentController`).
  - Endpoint: `GET /api/player/stats`
- **awards**:
  - Add `Award` entity, `AwardRepository`.
  - Add `AwardController`.
  - Endpoint: `GET /api/player/awards`
- **authority highlights**:
  - Add `Highlight` entity (Do NOT reuse `MediaItem`), `HighlightRepository`.
  - Add `HighlightController`.
  - Endpoint: `GET /api/player/highlights`
- **content blocks**:
  - Add `ContentBlock` entity (key, localization, content) and `ContentBlockRepository`.
  - Add `ContentBlockController` (or use existing content routing if defined).
  - Endpoint: `GET /api/content/blocks`

## 2. APPROVAL REQUIRED (Structural Change)

These tasks involve cross-cutting concerns, architectural additions, or modifying existing system behaviors. They cannot be executed without explicit authorization and a signed-off structural plan.

- **admin auth**:
  - Introducing Spring Security.
  - Adding JWT filtering/validation.
  - Adding `Admin` or `User` credentials modeling.
- **sync foundation**:
  - Adding scheduled tasks (`@EnableScheduling`).
  - Adding external API ingestion clients (e.g., ESPN/Opta stats integration).
  - Creating dedicated Service layer boundaries for data mutation.
- **Architecture Refactoring**:
  - Moving existing logic out of Controllers into a new Service layer.
  - Introducing DTOs and mappers (`MapStruct`/manual) for existing entities.
  - Adding global exception handling (`@ControllerAdvice`).

## 3. RESERVED FUTURE (Shop, Ecommerce)

These domains are explicitly locked out of the current active engineering phase. No schema changes, endpoint modifications, or refactoring should occur here until the platform's commerce layer phase is authorized.

- **shop**
- **products**
- **orders**
- **merchandise**
- **ecommerce flows**
