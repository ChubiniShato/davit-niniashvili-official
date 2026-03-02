Change Scope Addendum

Project: Davit Niniashvili Official
Purpose: Extend allowed scope for visual refinement without violating core system constraints

1. Objective

This addendum clarifies that controlled visual and layout refinements are explicitly approved, while preserving all architectural, logic, and backend constraints defined in context.md.

This does not override non-negotiable system protections.
It expands styling-level permissions only.

2. Approved Scope Extension

The following changes are now explicitly allowed:

✅ Visual Styling Changes

Tailwind class adjustments

Color updates

Background / overlay refinements

Spacing adjustments

Layout alignment changes

Responsive sizing refinements

Section reordering inside HomePage.jsx

✅ Hero Section Visual Refinement

Allowed:

Overlay strength adjustment

Logo size adjustments

Logo color softening

Positioning adjustments

CTA styling changes

Not allowed:

Editing Hero video playback logic

Editing RAF loop

Editing clip switching system

Editing event listeners

Refactoring Hero component logic

CLIPS array rules remain unchanged.

✅ Theme / Token Adjustments

Allowed:

Adding color tokens (e.g., refined gold)

Adding overlay color variables

Extending Tailwind config for color use

Not allowed:

Typography token changes

Font-family changes

Font-scale changes

Heading hierarchy changes

Typography remains locked.

✅ Home Architecture Changes

Allowed:

Section reordering to match sponsor-first narrative

Adding new Home sections

Updating CTA targets

Adding sponsor badge

Separating:

Brand Collaborations

Digital Sponsorship Opportunities

Not allowed:

Backend/API changes

Data model refactors

Router structural refactors (unless explicitly requested)

3. Explicitly Locked Systems

The following remain hard constraints:

Hero video system logic

Docker configuration

Backend port configuration

API proxy logic

Database schema

Typography system

No refactors.
No cleanup.
No dependency updates.
No silent structural changes.

Minimal diff policy remains in effect.

4. Strategic Direction Confirmation

Visual direction moving forward:

Sponsor-first landing narrative

Premium / editorial tone

Controlled contrast

Softened sport logo (not replaced yet)

Clear separation:

Ambassador collaborations

Website sponsorship tiers

Brand evolution = gradual, not disruptive.

5. Change Philosophy

All modifications must follow:

Minimal patch approach

Scoped changes only

No unrelated edits

No formatting-only changes

No structural rewrites

If a change touches logic or system behavior → explicit approval required first.