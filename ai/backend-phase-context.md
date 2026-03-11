# Backend Phase Context — Athlete Platform Transition

## Purpose
This document defines the current backend implementation phase for the Davit Niniashvili platform.

It exists to guide backend work inside the current repository without breaking the minimal-diff and approval-first operating model.

## Current backend direction
Backend stack remains:
- Java 17
- Spring Boot
- PostgreSQL
- Maven

Current backend goal:
Transform the backend toward an athlete-platform core that supports:
- player profile data
- career statistics
- awards
- authority highlights
- localized content blocks
- admin authentication
- sync / ingestion foundation

## Business priority alignment
Platform priorities are:

1. Sponsor acquisition
2. Brand partner acquisition
3. Davit Niniashvili brand building
4. Future commerce layer

Backend work must support the current business priorities above.

## Active implementation scope
Allowed active backend domains:
- player
- stats
- award
- authority highlight
- content block
- admin auth
- sync foundation

These domains may be audited, planned, scaffolded, or incrementally implemented if explicitly approved.

## Reserved future scope
The following domains are strategic but inactive in the current implementation phase:
- shop
- products
- orders
- ecommerce
- payments
- merchandise workflows

Rule:
Do not introduce code, schema, endpoints, or refactors for these domains unless explicitly requested.

## Architecture rules
- PostgreSQL is the canonical source of truth.
- Frontend must not read external sports sources directly.
- External data ingestion must stay isolated from public API behavior.
- Business logic belongs in service/application layers, not controllers.
- Repositories should own DB access.
- Public and admin APIs should move toward consistent response contracts.
- Backend evolution should remain Spring Boot based.

## Change policy for backend work
Default backend operating mode:
- minimal diff only
- touch only strictly required files
- no unrelated cleanup
- no broad refactors without approval
- no dependency updates unless explicitly approved
- no silent architecture rewrites

If a requested backend task would require:
- package-wide restructuring
- major schema redesign
- dependency changes
- cross-module refactor
- security architecture rewrite
- broad endpoint migration

return exactly:

APPROVAL REQUIRED: <reason> | SAFE ALTERNATIVE: <minimal option>

## Preferred execution order
For backend work, follow this order:
1. audit current code
2. define minimal patch plan
3. implement only approved slice
4. summarize touched files and risks

## Deliverable format
When performing backend tasks, prefer:
1. Assessment
2. Problems
3. Minimal Solution
4. Files to touch
5. Approval boundary

## Examples of allowed minimal tasks
- audit backend package structure
- add documentation files under ai/
- add a small DTO or response wrapper if explicitly approved
- add one new endpoint if it fits current architecture and approval is clear
- add one migration only if explicitly approved

## Examples of tasks that usually require approval
- moving many packages
- deleting legacy modules
- introducing JWT stack from scratch
- replacing existing endpoint structure
- adding multiple new dependencies
- rewriting persistence model