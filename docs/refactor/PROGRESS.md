# Refactoring Progress

> Living status document. Every agent session updates this file before ending.
> Newest entries on top in the Session log.

## Current state

- **Phase:** 5 — UI. Decision: **Tailwind 4 + shadcn/ui**, engine-swap keeping
  the look 1:1, by group with user review.
  - **Part 1 MERGED** to `develop` (PR #221) + a11y nits (PR #222): foundation,
    Footer, Header (forks merged), Card+ProductList, adaptive Filter (Filter/
    FilterMobile + Sorting/SortMobile forks gone), Catalog shell, Cart page
    shell + EmptyCart + PromoCode, lazy routes, ErrorBoundary, Card bug.
  - **Part 2 in progress** on `refactor/phase-5-ui-part2` (pushed through commit
    dd48678; later commits local, not pushed): content pages + **full MUI removal**.
    CardMini, Login/Registration, Main/About/Sale/ErrorPage, Profile shell ✅;
    `PageContainer` (MUI `Container xl` → `max-w-[1440px] px-4 sm:px-6`); Tailwind
    breakpoints aligned to the project (sm600/md1024/lg1280/xl1440).
  - **MUI REMOVED (2026-06-15):** zero `@mui` imports; uninstalled `@mui/material`,
    `@mui/icons-material`, `@mui/system`, `@emotion/react`, `@emotion/styled`.
    Icons → **lucide-react**; Slider/Select/Dialog → **Radix** (new shared
    `Button`/`Select`/`Dialog` primitives + RHF adapters incl. `RHFSelect`);
    SnackBar → custom toast; `useMediaQuery` hook replaces MUI's. Build/e2e green;
    bundle no longer ships MUI/emotion. Body bg/color/font (was MUI CssBaseline)
    reinstated on `body` via theme vars.
  - **Remaining (final phase-5 cleanup):** SCSS consolidation — **28 `*.module.scss`**
    + global `src/styles/**` (which still define the CSS vars Tailwind tokens
    resolve through) → migrate vars to a surviving CSS, convert layout scss to
    Tailwind, enable **preflight**, drop `sass`/`classnames`. This is "one styling
    system" from the exit criteria.
- **Stack now:** Vite 7 · React 19 · TS 5.9 · TanStack Query 5 · Zustand 5 ·
  RHF + zod 4 · ts-client 4 + BFF · **Tailwind 4 + lucide + Radix (MUI gone)**;
  legacy SCSS still present (consolidation pending)
- **Latest gate:** build, tsc, eslint 0 errors, 41 unit, e2e 11/11 — 2026-06-15
  (run under Node 22; shell default is Node 16 — `nvm use 22` before verify)
- **Next:** decide part-2 PR scope (open now w/ MUI-removal vs include SCSS
  consolidation) → SCSS consolidation + preflight. Prod still on 2023 CRA build.
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
| 2026-06-10 | Open decisions pending (plan §3.2): UI kit — decided 2026-06-13; Vite SPA + BFF chosen over Next.js |
| 2026-06-13 | **UI kit: Tailwind 4 + shadcn/ui** (full restyle; MUI removed). User chose the modern-stack/portfolio path over MUI 7 |
| 2026-06-15 | Icons → **lucide-react**; interactive primitives → **hybrid Radix** (Slider/Dialog/Select) + native (checkbox/pagination/toast). Brand GitHub icon inlined (lucide dropped brand marks) |

## Session log

### 2026-06-15 — Session 8 cont. (MUI removal sweep S1–S9)

- swept all remaining MUI in 8 groups, gate green per group: ThemeToggle/Header/
  NavBarMobile, Filter leaves (Radix Slider), catalog controls (Radix Select for
  Sorting/SelectSize, native pagination/search/number), forms (RHF adapters +
  shared Button + RHFSelect), Profile, modals (Radix Dialog) + toast, content
  (HeroCarousel/Categories/Gifts/AboutPerson/CurrentProduct/Breadcrumbs/Product)
- **MUI + emotion uninstalled**; 0 `@mui` imports; build + e2e green; bundle slimmer
- new shared primitives: `baseComponents/{Button,Select,Dialog}`, `RHFSelect`,
  `shared/lib/useMediaQuery`; deleted dead `Button` base + `SortingList`; `src/theme` gone
- **visual review (live, Node 22)** caught a CssBaseline regression → restored body
  bg/color/font from theme vars; verified Catalog/Login(±dark)/Product look 1:1
- e2e selectors updated for engine swap (size chip, pagination, ModalProfile role)
- **Remaining:** SCSS consolidation + preflight + drop sass/classnames; part-2 PR
- **Evidence:** commits 3d1ec94/0d7fc02/b741a13/1185e51/a226a7a; gate green each step

### 2026-06-15 — Session 8 (phase 5 part 2: content pages + breakpoint fix)

- restyled to Tailwind: **Main, About, Sale, ErrorPage, Profile shell**;
  deleted their 5 `*.module.scss`. 404 glitch keyframes moved into `tailwind.css`
  (raw `@keyframes` + arbitrary `before:/after:` animation utilities)
- added **`PageContainer`** (`baseComponents/PageContainer`) as the single MUI
  `Container maxWidth="xl"` replacement; retrofitted Catalog/Cart/Login/
  Registration onto it — corrected the earlier `max-w-[1536px]` to the theme's
  real xl `1440` + MUI gutters `px-4 sm:px-6`
- **aligned Tailwind breakpoints** to the legacy MUI theme + SCSS grid
  (`--breakpoint-sm/md/lg/xl = 600/1024/1280/1440`); the prior default-Tailwind
  breakpoints had shifted every `md:`/`sm:` vs the original (Header was
  switching desktop/mobile at 768 instead of 1024). User approved the change.
- surface: `@mui` 49→**44** files, scss 43→**38**; only the **Product** page
  still imports MUI/scss among pages
- **Evidence:** typecheck clean; eslint 0 errors (17 pre-existing warnings);
  unit 45/45; e2e 11/11 (Node 22). Visual proof via throwaway Playwright shots:
  900px→mobile Header, 1024px→desktop Header (switch restored to 1:1);
  404/Sale/About render correctly

### 2026-06-13 — Session 7 cont. (phase 5 part 1 merged, review, part 2 start)

- Cart page shell + EmptyCart + PromoCode → Tailwind; opened PR #221
  (phase 5 part 1), CI green, **merged**
- code review of PR #221 via a fresh subagent → "Approve with nits";
  applied 3 nits (ThemeToggle aria-label, ErrorBoundary RoutePaths.MAIN,
  Filter drawer Esc/focus/dialog) as PR #222, CI green, **merged**;
  remaining focus-trap logged in phase-6.4
- started `refactor/phase-5-ui-part2`: CardMini → Tailwind (color swatches via
  --filter-* map; dropped MUI Button/debounce, classnames); Login + Registration
  page shells → Tailwind
- SESSION_REPORT.md refreshed for the post
- **Evidence:** verify.sh / e2e 11/11 green per group; PRs #221, #222 merged

### 2026-06-13 — Session 7 (phase 5 start: Tailwind foundation + first groups)

- UI decision: Tailwind 4 + shadcn/ui (user). Engine-swap, keep look 1:1,
  group-by-group with visual review in preview
- foundation: @tailwindcss/vite, tokens mirror CSS vars, cn() helper
- structural: lazy routes + Suspense, global ErrorBoundary, Card className bug
- restyled+verified: Footer; Header (merged Header/HeaderMobile fork, deleted
  HeaderMobile, removed App useMediaQuery switch); Card + ProductList
- e2e header-control selectors button→link (corrected a11y semantics)
- MUI still in tree (removed at phase end); preflight deferred until then
- **Evidence:** preview screenshots per group; e2e 11/11 after each

### 2026-06-13 — Session 6 (phase 4: forms, model switched to Opus 4.8)

- zod schema library (fields/forms/countries/rules) as one source of truth
- RHFTextField/RHFCheckbox adapters; profile forms ported; login + 3-step
  wizard rewritten (local typed accumulator, no setTimeout race, password
  out of global store)
- deleted utils/validate/* + updateMessage machinery + formik FieldWrapper;
  removed formik/yup/formik-material-ui
- fixed §2.4 bugs: email mismatch, 1-char password msg, names with '/-,
  per-country postal, dropped 'EU', ProfileEdit default-address, 'Sing up'
- phase-0 validator tests → schemas.test.ts (asserts fixed behavior)
- **Evidence:** verify.sh exit 0; e2e 11/11 ×2

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
