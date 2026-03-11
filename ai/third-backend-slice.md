# Third Backend Implementation Slice

## Single Best Third Slice: The ContentBlock Domain

### 1. Why is this the best third slice?

The `ContentBlock` domain is the clear, optimal path forward for the third vertical slice.

- **Builds Toward Dynamic Content Management:** The overarching goal of the athlete platform is to be an easily managed, sponsor-facing presentation. Hardcoded UI copy (like hero slogans, "For Brands" pitches) limits agility. The `ContentBlock` domain solves this by moving text configurations to the database.
- **Remains Additive (Minimal-Diff):** Just like Awards and Highlights, creating the `ContentBlock` entity and its corresponding read endpoint is completely parallel to existing legacy controllers. It does not force a service-layer refactor.
- **Supports Brand Priorities:** The ability to dynamically update localized pitch copy (`en`, `fr`, `ka`) is vital for brand and sponsor acquisition.
- **Follows Established Patterns:** It successfully reuses the generic `ApiResponse<T>` wrapper, solidifying this standard response format across the new architecture.

**Why not the others?**
- *Player / Stats:* Implementing these requires intercepting active UI calls and refactoring the legacy `PublicContentController` (which currently returns hardcoded bio data and legacy `PlayerStat` entity arrays). This violates the "no broad refactor yet" rule.
- *Highlight Admin Endpoint:* Introducing admin mutation endpoints (`POST/PUT/DELETE`) requires Spring Security, admin authentication, and a service layer for business logic—all of which cross the `APPROVAL REQUIRED (Structural Change)` boundary.

---

### 2. Implementation Specifications

- **Endpoint:** 
  `GET /api/content/blocks`
  - **Important:** Legacy endpoints under `/api/content/**` (e.g., `/stats`, `/media`) must remain completely untouched. This new route must coexist without interference.
  - **Optional Query Filters:** Support `?page=X&section=Y&locale=Z` only if it can be implemented via simple Spring Data JPA repository methods (e.g., `findByPageAndSectionAndLocale`).
  - **Fallback:** If these filters increase complexity or demand a service layer, the initial minimal implementation should ignore them and simply return all active content blocks.

- **Controller:** 
  `com.davitniniashvili.api.controller.ContentBlockController`

- **Entity / Repository Additions:**
  - Create `ContentBlock` entity (`com.davitniniashvili.api.model.ContentBlock`) with fields strictly conforming to the schema plan (`id`, `page`, `section`, `key`, `locale`, `value`, `isActive`).
  - Create `ContentBlockRepository` (`com.davitniniashvili.api.repository.ContentBlockRepository`).

- **ApiResponse usage:** 
  **Yes**. The controller will wrap `List<ContentBlock>` (or a Map representation) in the shared `com.davitniniashvili.api.dto.ApiResponse<T>`.

- **Files Likely to be Touched:**
  - `backend/src/main/java/com/davitniniashvili/api/model/ContentBlock.java` (NEW)
  - `backend/src/main/java/com/davitniniashvili/api/repository/ContentBlockRepository.java` (NEW)
  - `backend/src/main/java/com/davitniniashvili/api/controller/ContentBlockController.java` (NEW)
  - `backend/src/main/java/com/davitniniashvili/api/config/DataSeeder.java` (MODIFIED - append safe seed data for basic strings like hero slogan).

### 3. Risk Level and Approval Boundary
**Risk Level: Low (Safe Now)**
This slice is 100% additive. It creates new tables and isolated endpoints, avoiding legacy ecommerce code and generic controllers entirely. 

**Approval Boundary:**
This is classified as **SAFE NOW** per the `ai/backend-minimal-plan.md` framework. It does not cross into service-layer extraction or structural security modifications.
