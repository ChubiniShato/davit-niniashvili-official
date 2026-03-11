# Backend Architecture Audit

## 1. Current Architecture Map

The current Spring Boot application follows a very basic, tightly coupled Controller-Repository pattern. It lacks several standard enterprise layers (Services, DTOs).

**Core Packages under `com.davitniniashvili.api`:**
- `controller`: Contains REST controllers handling HTTP requests.
- `model`: Contains JPA Entities.
- `repository`: Contains Spring Data JPA repository interfaces.
- `config`: Contains configuration classes (e.g., `DataSeeder` for database initialization).

**Missing Architectural Layers:**
- `service`: No service layer exists. Controllers directly inject Repositories, which mixes business logic with HTTP routing.
- `dto`: No dedicated Data Transfer Object package exists. Entities are being returned directly in most controller responses (except for an inner `BioResponse` class in `PublicContentController`).
- `security`: There is no security configuration, authentication, or authorization setup.
- `exception`: No global exception handling (`@ControllerAdvice`).

**Endpoints Active:**
- `GET /api/content/stats`
- `GET /api/content/media`
- `GET /api/content/bio`
- `POST /api/orders`
- `GET /api/orders/{id}`
- `GET /api/shop/products`
- `GET /api/shop/products/{category}`
- `GET /api/shop/products/{id}`

---

## 2. Reusable Components

Despite the architectural gaps, the following components are aligned with the platform goals and can be reused/refactored:
- **`PlayerStat` / `PlayerStatRepository`:** Currently functional, but should be separated from direct controller exposure via a Service/DTO layer.
- **`MediaItem` / `MediaItemRepository`:** Can serve as the foundation for both the `highlights` and `content blocks` requirements, though it may need to be expanded.
- **`BioResponse`:** Currently hardcoded inside `PublicContentController`. The DTO mapping structure is reusable once a real `Player` entity is created.

---

## 3. Missing Domains (Athlete Platform Scope)

Based on the active implementation scope, the following domains are currently missing or incomplete:
- **player:** Hardcoded as a static response; no database entity or repository exists.
- **awards:** Completely missing. No entities, repositories, or controllers.
- **highlights:** Partially covered by `MediaItem`, but lacks a dedicated domain or generic `content block` structure for text/video highlights.
- **content blocks:** Completely missing. Needs a system to manage localized text/image blocks.
- **admin auth:** Completely missing. No security or JWT implementation.
- **sync foundation:** Completely missing (e.g., ingesting external stats).

---

## 4. Legacy / Unused Backend Areas (Reserved Scope)

The following components violate the current phase ("Reserved future scope") and belong to the future commerce layer. They are active in the codebase but should be isolated or removed in the future:
- **Controllers:** `OrderController`, `ShopController`
- **Models (Entities):** `Order`, `OrderItem`, `Product`
- **Repositories:** `OrderRepository`, `ProductRepository`

**Recommendation:** These areas are polluting the current athlete platform scope. Any further work on the backend should ignore these packages until the commerce layer is explicitly requested.
