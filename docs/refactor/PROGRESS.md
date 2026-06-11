# Refactoring Progress

> Living status document. Every agent session updates this file before ending.
> Newest entries on top in the Session log.

## Current state

- **Phase:** 0 — Safety net & security: **agent tasks complete**
  (0.1 ✅, 0.2 ✅, 0.3 ✅, 0.4 awaiting first PR run, 0.5 ✅ except blocked promo, 0.6 ✅)
- **Branch:** `refactor/phase-0-safety-net` (not pushed yet)
- **Final gate:** `./scripts/verify.sh` → install + tsc + lint + 69 unit +
  10 e2e, exit 0 (2026-06-11)
- **Next:** push + PR → CI green → merge → start phase 1 (CRA → Vite)
- **Pending human tasks:**
  - extend validity of discount code `BAGS15-SP` — expired 2026-03-15; then
    un-fixme `e2e/promo.spec.ts`
  - push branch + open PR into `develop` to get the first CI run
  - (verify with colleague) old 2023 API client deactivated in Merchant Center

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

### 2026-06-11 — Session 2 (phase 0 execution)

- 0.2/0.3/0.4: lockfile committed, 9 dead deps + `public/css` removed, CI added;
  fixed pre-commit hook (`/dev/tty`) and a tsc error in `Price.test.tsx`
- 0.1: new SPA-scope client verified end-to-end (token, 17 categories,
  110 products, anonymous cart, home + catalog render); `.env` remapped from
  colleague's `CTP_*` format
- 0.5: Playwright suite — 10 tests across smoke/catalog/filter/cart/auth,
  green twice in a row; promo spec `fixme` until `BAGS15-SP` is extended
- Found & pinned quirks: unstable product sort, cart-version race on clear,
  layout-invisible card anchors, swapped sort/filter aria-labels (mobile),
  breadcrumb `/cart/cart` URL, "Sing up" typo — fix candidates for phases 3-5
- **Evidence:** `./scripts/verify.sh` output quoted in PR description / session notes

### 2026-06-10 — Session 1 (analysis & scaffolding)

- Full codebase audit (10 parallel agents + manual review) → `REFACTORING_PLAN.md`
- Verified ecosystem state: `sdk-client-v2` deprecated 10/2024 → `ts-client` v3;
  CRA dead; current majors confirmed (Vite 7, React 19, TanStack Query 5, zod 4)
- Found 7 dead dependencies, committed build artifacts in `public/css`,
  missing lockfile, 0% business-logic test coverage, clientSecret in bundle
- Scaffolded harness: `CLAUDE.md`, `docs/refactor/`, `scripts/verify.sh`
- **Evidence:** plan committed; harness files committed on `refactor/phase-0-safety-net`
