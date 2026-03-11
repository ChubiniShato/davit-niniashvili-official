# Second Backend Implementation Slice

## Single Best Second Slice: The AuthorityHighlight Domain

### 1. Why is this the best second slice?

The `AuthorityHighlight` domain is the clear winner for the second vertical slice under the current constraints. 

- **Supports Business Priorities:** Authority highlights (pull quotes, media recognition, standout stats) directly support the primary goals of **Sponsor Acquisition** and **Brand Building**. They provide the "social proof" required for a premium athlete platform.
- **Additive & Low-Risk:** Like the `Award` slice, this is entirely generative. It does not require modifying existing entities or intersecting with legacy controllers. 
- **Avoids Refactors:** Creating the `Highlight` entity cleanly bypasses the polluted `MediaItem` entity (which currently mixes training photos, highlights, and gallery assets into one generic bucket). By creating a dedicated `AuthorityHighlight` table, we avoid untangling the legacy `PublicContentController` and `MediaItemRepository`.
- **Establishes the Content Pattern:** It further reinforces the `ApiResponse<T>` contract established in the first slice.

**Why not the others?**
- *Player/Stats:* Implementing Player or Stats correctly right now would require touching `PublicContentController` and migrating the existing hardcoded `BioResponse` and `PlayerStat` models. This risks breaking the live frontend before a shared DTO/Service layer is approved.
- *ContentBlock:* While additive, content blocks are structurally complex (requiring localization keys and HTML storage) and are less immediately impactful for the sponsor-facing brand narrative than rich authority highlights.

---

### 2. Implementation Specifications

- **Endpoint:** 
  `GET /api/player/highlights`

- **Controller:** 
  `com.davitniniashvili.api.controller.HighlightController`

- **Entity / Repository Additions:**
  - Create `AuthorityHighlight` entity (`com.davitniniashvili.api.model.AuthorityHighlight`).
  - Create `HighlightRepository` (`com.davitniniashvili.api.repository.HighlightRepository`).
  *Note: The entity must use the expanded fields defined in the schema plan (id, type, sourceName, title, description, imageUrl, contentUrl, yearLabel, priority, isActive).*

- **ApiResponse usage:** 
  **Yes**. The controller will wrap the `List<AuthorityHighlight>` in the standardized `com.davitniniashvili.api.dto.ApiResponse<T>` created during the first slice.

- **Files Likely to be Touched:**
  - `backend/src/main/java/com/davitniniashvili/api/model/AuthorityHighlight.java` (NEW)
  - `backend/src/main/java/com/davitniniashvili/api/repository/HighlightRepository.java` (NEW)
  - `backend/src/main/java/com/davitniniashvili/api/controller/HighlightController.java` (NEW)
  - `backend/src/main/java/com/davitniniashvili/api/config/DataSeeder.java` (MODIFIED - append safe seed data).

### 3. Risk Level and Approval Boundary
**Risk Level: Very Low (Safe Now)**
This slice is strictly additive and parallel to existing infrastructure. It shares the same minimal-diff footprint as the Award slice.

**Approval Boundary:**
This slice falls entirely within the **SAFE NOW** boundary defined in `ai/backend-minimal-plan.md`. It does not require architectural or service-layer approval to proceed, provided no generic/legacy controllers are altered.
