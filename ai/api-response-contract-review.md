# API Response Contract Review

## 1. Goal
Move the backend toward a unified response structure:

**Success:**
```json
{
 "success": true,
 "data": {}
}
```

**Error:**
```json
{
 "success": false,
 "error": {
   "code": "ERROR_CODE",
   "message": "..."
 }
}
```

---

## 2. Current Controller Audit

### `PublicContentController`
- `GET /api/content/stats`: Returns raw `List<PlayerStat>` (JSON array).
- `GET /api/content/media`: Returns raw `List<MediaItem>` (JSON array).
- `GET /api/content/bio`: Returns raw `BioResponse` object.

### `OrderController` (Reserved Scope)
- `POST /api/orders`: Returns `ResponseEntity<Order>` (JSON object).
- `GET /api/orders/{id}`: Returns `ResponseEntity<Order>` or pure HTTP `404 Not Found` with no body.

### `ShopController` (Reserved Scope)
- `GET /api/shop/products`: Returns raw `List<Product>` (JSON array).
- `GET /api/shop/products/category/{category}`: Returns raw `List<Product>` (JSON array).
- `GET /api/shop/products/{id}`: Returns `ResponseEntity<Product>` or pure HTTP `404 Not Found` with no body.

---

## 3. Inconsistencies Identified

1. **Unwrapped Data**: Every single endpoint currently returns raw lists or entity objects directly at the root of the JSON response, rather than wrapped inside a `data` key.
2. **Missing Success Flag**: No endpoints return the {"success": true} flag.
3. **Inconsistent Error Handling**: Failed lookups (like `findById`) return empty response bodies with a `404` status rather than structured error JSON blocks containing a `code` and `message`.
4. **No Global Error Handling**: There is no `@ControllerAdvice` managing system-level exceptions (like internal server errors or bad requests), meaning Spring Boot's default Whitelabel Error JSON will leak instead of the desired strict error structure.

---

## 4. Proposed Minimal Safe Migration Path

Shifting the entire API contract immediately would break the existing React frontend, which currently expects raw arrays and objects.

**Minimal Safe Migration Strategy:**

1. **Create the Standard Wrapper Object (SAFE NOW)**
   - Introduce an `ApiResponse<T>` generic class in the `dto` package representing the unified success/error structure.

2. **Opt-in Route Migration (SAFE NOW)**
   - Do *not* use a global `@ControllerAdvice` (`ResponseBodyAdvice`) yet, as that would secretly break all un-migrated endpoints and frontend clients simultaneously.
   - For all *new* domains required by the athlete platform (e.g., `PlayerController`, `AwardController`, `HighlightController`), manually return the new `ApiResponse<T>` wrapper from the controller methods.
   - Example: `return ResponseEntity.ok(ApiResponse.success(player));`

3. **Incremental Frontend Updates (APPROVAL REQUIRED FOR FULL CUTOVER)**
   - As new routes go live using the wrapped structure, update the corresponding `Axios` clients in the frontend to read from `.then(res => res.data.data)`.
   - Once the active scope matches the new contract, the legacy endpoints (Shop/Orders) can be migrated under a separate approval block, or a global `@RestControllerAdvice` can be implemented if explicitly authorized.
