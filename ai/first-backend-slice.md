# First Backend Implementation Slice

## Single Best First Slice: The Award Domain

### 1. Why is this the best first slice?
The `Award` domain is the absolute safest, highest-value entry point for transitioning the backend to the athlete-platform architecture under the current minimal-diff constraints. 

- **High-Value:** Awards (achievements, trophies) are a core component of the athlete presentation and currently do not exist in the database or API.
- **True Minimal-Diff:** It is a 100% additive change. It requires zero modification to existing legacy controllers (`PublicContentController`, `OrderController`), meaning zero regression risk for the currently running frontend.
- **Avoids Broad Refactor:** Unlike extracting `PlayerStat` out of `PublicContentController` (which would require rerouting active frontend code and untangling legacy logic), creating `Award` allows us to build a net-new vertical slice using the correct standards.
- **Models the Future:** By building `AwardController` correctly from day one (using `ApiResponse<T>`), this slice establishes the blueprint for how `Highlight`, `ContentBlock`, and eventually `Player` and `Stats` will be built, reducing future migration risk.
- **No Commerce Overlap:** Awards are purely platform presentation layer.

---

### 2. Implementation Specifications

- **Endpoint:**
  `GET /api/player/awards`

- **Controller:**
  `com.davitniniashvili.api.controller.AwardController`
  It will be a new controller cleanly separated from legacy code.

- **Repository/Entity additions:**
  Create `Award` entity model.
  Create `AwardRepository` (extending `JpaRepository<Award, Long>`).
  Create `AwardDTO` (optional, but recommended if mapping from Entity to Response).
  Seed initial data cleanly via the existing `DataSeeder`.

- **ApiResponse usage:**
  **Yes.** This endpoint will be the first to introduce and return the standardized `ApiResponse<T>` wrapper (unifying the `{ "success": true, "data": [...] }` contract) as established in the API audit, acting as the pilot for the new response standard.

- **Exact files touched:**
  - `backend/src/main/java/com/davitniniashvili/api/model/Award.java` (NEW)
  - `backend/src/main/java/com/davitniniashvili/api/repository/AwardRepository.java` (NEW)
  - `backend/src/main/java/com/davitniniashvili/api/dto/ApiResponse.java` (NEW)
  - `backend/src/main/java/com/davitniniashvili/api/controller/AwardController.java` (NEW)
  - `backend/src/main/java/com/davitniniashvili/api/config/DataSeeder.java` (MODIFIED - append 2 lines to seed initial awards).

### 3. Risk Level and Approval Boundary
**Risk Level: Very Low (Safe Now)**
Because this entire slice consists of adding new files that do not intersect with or alter existing controller/service logic, it respects the minimal-diff guardrail perfectly.

**Approval Boundary:**
This specific slice is classified as **SAFE NOW** per the `ai/backend-minimal-plan.md` definitions. It does not require a structural refactor approval to proceed, provided it only adds the files listed above.
