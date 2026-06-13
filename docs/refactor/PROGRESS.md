# Refactoring Progress

> Living status document. Every agent session updates this file before ending.
> Newest entries on top in the Session log.

## Current state

- **Phase:** 3 — Server state: **COMPLETE** (3.1–3.6 ✅, phase 2 merged
  as PR #218) — MobX is gone; ProductStore/CartStore/UserStore deleted
  (~1,050 lines); catalog state in the URL; cart-version races dead
- **Stack now:** Vite 7.3.5 · React 19.2.7 · TS 5.9.3 · ESLint 9.39 ·
  Vitest 4.1.8 · ts-client 4.10 + BFF · TanStack Query 5.101 · Zustand 5
- **Dev workflow:** `npx netlify dev` (:8888)
- **Final gate:** `./scripts/verify.sh` → exit 0 (tsc src+netlify, eslint
  0 errors / 18 warnings, 57 unit, build, 11/11 e2e ×2) — 2026-06-13
- **Next:** PR into `develop` → merge → phase 4 (Formik/Yup →
  react-hook-form + zod). Netlify env vars are configured (2026-06-12);
  production still serves the 2023 CRA build — deploy decision pending
- **Watch:**
  - Vite pinned to major 7 (vitejs/vite#22499 — Vite 8 rolldown optimizer
    breaks emotion/MUI prebundling); unpin when fixed upstream
  - ESLint pinned to major 9 (eslint-plugin-jsx-a11y peers max v9)
  - `noUncheckedIndexedAccess`/`exactOptionalPropertyTypes` deferred to
    phase 5 wrap-up (decision in phase-1.md §1.2)
- **Pending human tasks:**
  - (verify with colleague) old 2023 API client deactivated in Merchant Center

## Blockers

- (none)

## Decisions made

| Date       | Decision                                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-06-10 | Refactor plan written and committed (`REFACTORING_PLAN.md`)                                                                                       |
| 2026-06-10 | Harness: minimal custom (CLAUDE.md + PROGRESS.md + phase checklists + verify.sh). OpenSpec deferred — reconsider for post-refactor feature work   |
| 2026-06-10 | Branch-per-phase strategy, PRs into `develop`                                                                                                     |
| 2026-06-10 | Open decisions pending (plan §3.2): UI kit (MUI 7 vs Tailwind 4 + shadcn/ui) — must be decided before phase 5; Vite SPA + BFF chosen over Next.js |

## Session log

### 2026-06-13 — Session 5 (phase 3: MobX → TanStack Query)

- 3.1 Query infra + categories; 3.2 catalog/product on queries + URL params
  (ProductStore deleted, 8 components → controlled props)
- 3.3 cart on mutations updating cache from server responses (CartStore
  deleted, version races dead); 3.5 toast bus
- 3.4 profile on useMe + one action-mapped mutation (148-line switch died)
- 3.6 theme/auth → Zustand; mobx + mobx-react-lite uninstalled,
  23 observer() wrappers removed
- **Evidence:** verify.sh exit 0 after every slice; e2e 11/11 ×2

### 2026-06-12 — Session 4 (phase 1 completion: 1.2, 1.3, 1.5)

- 1.2: TS 5.9.3, bundler resolution, `@/*` alias; extra-strict flags deferred
  (128 errors in dying code — decision recorded in phase-1.md)
- 1.3: ESLint 9.39 flat config (airbnb dropped), typescript-eslint 8,
  react-hooks 7, Prettier 3 + one-time style-only reformat commit;
  lint-staged finally covers `*.ts`
- 1.5: React 19.2.7, RTL 16, framer-motion 12, mobx-react-lite 4.1.1;
  test-utils act() cargo-cult removed; JSX type imports
- Code review (skill run) before 1.2: approve with notes — Netlify Node
  confirmed 22 by user; unused user-event removed in 1.5
- **Evidence:** verify.sh exit 0 quoted in PR description

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
