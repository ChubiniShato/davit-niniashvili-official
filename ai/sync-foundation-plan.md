# Sync Foundation Plan

## Goal
Establish a clear, scalable architectural plan for future third-party data ingestion (e.g., automated stats updates from rugby data providers) specifically tailored to the athlete platform, ensuring PostgreSQL remains the canonical source of truth while conforming to Spring Boot best practices.

---

## 1. Architectural Scope

A robust sync foundation in Spring Boot should decouple the fetching of external data from the serving of internal data to the UI. The architecture revolves around a one-way data ingestion pipeline:

- **Sources:** The external APIs (e.g., Opta, Sportradar) providing raw statistical or match data.
- **Fetchers (Clients):** Spring `@Service` or `@Component` classes utilizing `RestTemplate` or `WebClient` to retrieve external JSON/XML.
- **Parsers:** Deserialization layers converting raw external payloads into internal DTOs.
- **Normalizers:** Business logic mapping external identifiers to internal domain IDs (e.g., converting an external team ID to our local `Team` entity ID).
- **Validators:** Rule-engines ensuring data sanity before database insertion (e.g., rejecting a match stat where tackles missed is > total tackles).
- **Publishers (Services):** Standard Spring Data JPA Services writing the normalized, validated entities to PostgreSQL.
- **Sync Logs:** A persistent system record tracking the success, failure, duration, and payload metadata of every sync operation.
- **Manual Trigger Concept:** Exposing an admin-only endpoint (e.g., `POST /api/admin/sync/stats`) to manually force a job run outside of standard `@Scheduled` cron timings.

---

## 2. Platform Safety & Isolation

### Public API Isolation
The public-facing APIs (e.g., `GET /api/player/stats`) **must never** communicate directly with external sources. 
When a user visits the athlete platform UI, they are reading strictly from our local PostgreSQL database. This ensures:
1. **Performance:** Sub-millisecond read times unconstrained by third-party API latency.
2. **Reliability:** If the external provider goes down, the athlete website remains 100% functional.
3. **Data Ownership:** We have final editorial control over the statistics presented on the site.

### PostgreSQL as the Canonical Source
The local database is the single source of truth. The sync pipeline acts as a background worker that securely updates the local state. If external data conflicts with heavily curated local data, the Normalization layer can determine override privileges.

---

## 3. Minimal SyncLog Model

To support auditing and debugging of automated jobs without over-engineering, we define a minimal logging entity.

**Table:** `sync_logs`
```java
@Entity
@Table(name = "sync_logs")
public class SyncLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String jobName; // e.g., "OPTA_STATS_SYNC"

    @Column(nullable = false)
    private String status; // "SUCCESS", "FAILED", "PARTIAL"

    @Column(name = "started_at", nullable = false)
    private LocalDateTime startedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    private Integer recordsProcessed;

    @Column(columnDefinition = "TEXT")
    private String errorMessage; // Null if successful
}
```

---

## 4. Boundary Classification Actions

This plan separates what can be prepared now under minimal-diff constraints versus what requires deeper architectural integration.

### SAFE NOW (Preparatory Work)
- **Action:** Creating the `SyncLog` entity and `SyncLogRepository`.
- **Reason:** This is a purely additive database logging construct. It is completely decoupled from active logic.

### APPROVAL REQUIRED (Implementation Work)
- **Action:** Implementing `@Scheduled` tasks, adding external API `WebClient` dependencies, or building the `Fetcher/Normalizer` service layer pipeline.
- **Reason:** Introducing active background jobs, managing external network requests, and creating complex service-layer orchestration fundamentally alters system behavior and resource consumption. This must be approved as a distinct feature phase.
