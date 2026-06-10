# Refactoring Progress

> Living status document. Every agent session updates this file before ending.
> Newest entries on top in the Session log.

## Current state

- **Phase:** 0 — Safety net & security (not started)
- **Branch:** `refactor/phase-0-safety-net`
- **Next action:** 0.1 — rotate the Commercetools API client in Merchant Center
  (**human task** — agents cannot do this; blocks nothing else, but must happen
  before phase 2 ships)
- **First agent task:** 0.2 — commit lockfile / move to pnpm

## Blockers

- (none yet)

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
