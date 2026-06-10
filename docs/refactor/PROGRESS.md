# Refactoring Progress

> Living status document. Every agent session updates this file before ending.
> Newest entries on top in the Session log.

## Current state

- **Phase:** 0 — Safety net & security (in progress: 0.2 ✅, 0.3 ✅, 0.4 committed/awaiting PR run)
- **Branch:** `refactor/phase-0-safety-net` (not pushed yet)
- **Next agent tasks:** 0.5 — Playwright e2e suite (7 scenarios); 0.6 —
  characterization tests for cartHelpers/productHelpers/validators
- **Pending human tasks:**
  - deactivate the OLD 2023 API client in Merchant Center (new client live since 2026-06-11)
  - extend validity of discount code `BAGS15-SP` — expired 2026-03-15, blocks promo e2e
  - push branch + open PR into `develop` to get the first CI run

## Blockers

- (none)

## Decisions made

| Date | Decision |
|---|---|
| 2026-06-10 | Refactor plan written and committed (`REFACTORING_PLAN.md`) |
| 2026-06-10 | Harness: minimal custom (CLAUDE.md + PROGRESS.md + phase checklists + verify.sh). OpenSpec deferred — reconsider for post-refactor feature work |
| 2026-06-10 | Branch-per-phase strategy, PRs into `develop` |
| 2026-06-10 | Open decisions pending (plan §3.2): UI kit (MUI 7 vs Tailwind 4 + shadcn/ui) — must be decided before phase 5; Vite SPA + BFF chosen over Next.js |

## Session log

### 2026-06-10 — Session 1 (analysis & scaffolding)

- Full codebase audit (10 parallel agents + manual review) → `REFACTORING_PLAN.md`
- Verified ecosystem state: `sdk-client-v2` deprecated 10/2024 → `ts-client` v3;
  CRA dead; current majors confirmed (Vite 7, React 19, TanStack Query 5, zod 4)
- Found 7 dead dependencies, committed build artifacts in `public/css`,
  missing lockfile, 0% business-logic test coverage, clientSecret in bundle
- Scaffolded harness: `CLAUDE.md`, `docs/refactor/`, `scripts/verify.sh`
- **Evidence:** plan committed; harness files committed on `refactor/phase-0-safety-net`
