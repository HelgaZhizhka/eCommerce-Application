# Refactoring Progress

> Living status document. Every agent session updates this file before ending.
> Newest entries on top in the Session log.

## Current state

- **Phase:** 6 — **COMPLETE.** All items merged to `develop`: **6.1** MSW
  integration tests, **6.2** coverage thresholds (80/70, enforced in CI),
  **6.3** Playwright in CI (Netlify preview), **6.4** a11y (Filter focus-trap +
  form labels/aria + dark-theme contrast: input-text bug fixed, rest documented
  1:1), **6.5** README + ADRs, **6.6** dependency security. **The 7-phase
  refactor (0→6) is done on `develop`; awaiting the final `develop`→`main`
  merge.** Phase 5 (UI) **COMPLETE** — Tailwind 4 + Radix, engine-swap keeping
  the look 1:1, all parts merged.
- **Refactor outcome (0→6):** CRA→Vite 7 · React 18→19 · TS 4.9→5.9 strict ·
  MobX→TanStack Query 5 + Zustand · Formik/Yup→RHF + zod 4 · `sdk-client-v2`→
  `@commercetools/ts-client` v4 **+ BFF (Netlify Functions)** so the
  clientSecret left the browser bundle · Jest/CRA→Vitest 3 + MSW 2 (98
  unit/integration) + Playwright (11 e2e, in CI) · ESLint 8 airbnb→ESLint 9 flat ·
  MUI 7 + SCSS → **Tailwind 4 + Radix + lucide** (one styling system, look 1:1).
  Coverage thresholds enforced on `services/*` + `queries/*`. **Prod is still on
  the 2023 CRA build until `main` is deployed.**
  - **Part 1 MERGED** to `develop` (PR #221) + a11y nits (PR #222): foundation,
    Footer, Header (forks merged), Card+ProductList, adaptive Filter (Filter/
    FilterMobile + Sorting/SortMobile forks gone), Catalog shell, Cart page
    shell + EmptyCart + PromoCode, lazy routes, ErrorBoundary, Card bug.
  - **Part 2 MERGED** to `develop` (PR #223, 2026-06-17): content pages +
    **full MUI removal**. CardMini, Login/Registration, Main/About/Sale/ErrorPage,
    Profile shell ✅; `PageContainer` (MUI `Container xl` → `max-w-[1440px]
    px-4 sm:px-6`); Tailwind breakpoints aligned to the project (sm600/md1024/
    lg1280/xl1440).
  - **MUI REMOVED (2026-06-15):** zero `@mui` imports; uninstalled `@mui/material`,
    `@mui/icons-material`, `@mui/system`, `@emotion/react`, `@emotion/styled`.
    Icons → **lucide-react**; Slider/Select/Dialog → **Radix** (new shared
    `Button`/`Select`/`Dialog` primitives + RHF adapters incl. `RHFSelect`);
    SnackBar → custom toast; `useMediaQuery` hook replaces MUI's. Build/e2e green;
    bundle no longer ships MUI/emotion. Body bg/color/font (was MUI CssBaseline)
    reinstated on `body` via theme vars.
  - **Part B MERGED** to `develop` (PR #225, 2026-06-18): SCSS fully consolidated
    — **0 `.scss` files in the tree** (only `tailwind.css`); `sass` + `classnames`
    uninstalled. One styling system. **Phase 5 exit criteria met.**
- **Stack now:** Vite 7 · React 19 · TS 5.9 · TanStack Query 5 · Zustand 5 ·
  RHF + zod 4 · ts-client 4 + BFF · **Tailwind 4 + lucide + Radix (MUI + SCSS gone)**
- **Latest gate:** production build, tsc, eslint 0 errors, 41 unit, e2e 11/11 —
  2026-06-17 post part-B teardown (run under Node 22; shell default is Node 16 —
  `nvm use 22` before verify)
- **Part 2 PR:** [#223](https://github.com/HelgaZhizhka/eCommerce-Application/pull/223)
  (MUI removal) **MERGED** to `develop` 2026-06-17 (CI green).
- **Part B (SCSS consolidation) — DONE** on `refactor/phase-5-ui-part3-scss`
  (off part 2, pushed): runtime CSS vars → `tailwind.css`; **ALL component
  `*.module.scss` converted to Tailwind, then global partials folded into
  `tailwind.css` → 0 `.scss` files left.** Each component live-verified
  ±theme ±viewport: ProductCarousel, Poster, Feature/Features, ProfileView,
  CurrentProduct, Categories (5 variants), Registration (3-step), HeroCarousel
  (3 slides × desktop+mobile); dead `Header.module.scss` removed. Global partials
  (normalize/body base, `.link`/`.icon`/`.badge`, `.app`, `.text-brand`/
  `.no-scroll`/`.text-overflow`, swiper overrides, Mukta @import) migrated as plain
  CSS — base look preserved 1:1; **Tailwind preflight deliberately NOT enabled**
  (it would reset heading/list/anchor defaults app-wide → not 1:1). `src/styles/**`
  + `index.scss` deleted; `sass` + `classnames` uninstalled (sass now only a
  transitive vite dep). Also fixed latent `matchMedia` mock gap (modern
  `useMediaQuery`) that had made Footer.test red since the Logo conversion.
- **Latest gate (post-teardown):** production build + typecheck + eslint(0 err)
  + 41 unit + 11 e2e — all green; base computed styles measured identical to
  pre-migration (light + dark).
- **Part B PR:** [#225](https://github.com/HelgaZhizhka/eCommerce-Application/pull/225)
  → `develop` **MERGED 2026-06-18** (CI `verify` green). Reviewed by a fresh-context
  subagent (precedent: #221) → 1 must-fix (Categories hover-underline colour lost to
  `.link::after` source-order tie) fixed before merge; rest approved.
- **Next:** **6.1** MSW integration tests (catalog+filters, cart, auth) → **6.2**
  coverage thresholds (80% for `entities/*` + `shared/api`) → **6.4** remainder
  (form labels/aria audit + dark-theme contrast pass) → final close. Prod still on
  2023 CRA build; the e2e CI job activates at the final `develop`→`main` merge.
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

### 2026-06-19 — Session 14 (phase 6 CLOSED — input-contrast fix + refactor wrap-up)

- **fixed the dark-theme input bug** found in the 6.4 audit: `input, optgroup,
  select, textarea { color: inherit }` in `tailwind.css` so fields follow the
  theme text colour. Verified live in **both** themes (screenshots): light
  unchanged (dark text on white), dark now readable (`#f2f2f2`, ~16.7). The
  white-on-orange CTA contrast and a couple of fixed-colour headings are left
  1:1 and documented (token-colour change deferred).
- **closed the refactor:** phase 6 fully merged to `develop`; PROGRESS "Current
  state" now records the 0→6 outcome. Only the final `develop`→`main` merge
  remains (prod still on the 2023 CRA build until then).
- **Gate:** typecheck clean · eslint 0 errors · 98 unit/integration + coverage ·
  11 e2e.

### 2026-06-19 — Session 13 (phase 6.4 — form a11y + dark-theme contrast audit)

- **form labels/aria (no visual change):** `RHFTextField` + `RHFSelect` set
  `aria-invalid` and link helper text via `aria-describedby`; `RHFSelect` label
  tied to the trigger with `aria-labelledby`; `Search`/`PromoCode` inputs got
  accessible names, `PromoCode` error is `role="alert"`. Verified live on /login
  (Email/Password names + `aria-invalid`). Filter/catalog/currency controls
  already had names.
- **dark-theme contrast: measured + documented, colours unchanged** (user chose
  audit-only to keep the look 1:1). Findings logged in phase-6.md: input text
  renders black (~1.12 on #121212 — preflight-off, inputs don't inherit theme
  colour) and white-on-primary-orange CTAs (~2.85). Both need token-colour
  changes to fix → deferred as a look-vs-a11y decision.
- **Gate:** typecheck clean · eslint 0 errors (17 pre-existing warnings) · 98
  unit/integration + coverage · 11 e2e.
- **Next:** final PROGRESS wrap-up / close the refactor.

### 2026-06-19 — Session 12 (phase 6.2 — coverage thresholds)

- scoped **v8 coverage to the API layer** (`src/services/**` + `src/queries/**`
  — the project's real `entities`/`shared/api`) in `vite.config`, with enforced
  thresholds **80/80/80/70** (stmts/lines/funcs/branch).
- raised coverage to clear it: profile suite (`setCustomersDetails` all exports
  + branches, `queries/customer` hooks) and the remaining cart hooks
  (`useCartQuery`, change-qty/remove-line-item/remove-promo, `useCartActions`)
  + pure-helper units (`categoryIdByName`, `catalogParams`, `notifications`,
  `queryClient`). **+28 tests → 98 total**, all green.
- actuals: **stmts 92.6 · branch 78.1 · funcs 89.3 · lines 93.8**.
- new `test:coverage` script wired into `scripts/verify.sh` + CI `verify` job
  (replaces the plain `npm test` step) — below-threshold now fails the build.
  Installed `@vitest/coverage-v8`.
- **Gate:** typecheck clean · eslint 0 errors (17 pre-existing warnings) · 98
  unit/integration + coverage thresholds met · 11 e2e (Node 22).
- **Next:** 6.4 remainder (form labels/aria audit + dark-theme contrast), close.

### 2026-06-19 — Session 11 (phase 6.1 — MSW 2 + integration tests)

- added **MSW 2** (`msw@^2`) + a shared harness in `src/test/`: `server.ts`
  (setupServer + `recordRequests` helper), `handlers.ts` (BFF `/api/auth/*` +
  CT endpoints), `fixtures.ts` (minimal CT payloads shaped to the transforms),
  `utils.tsx` (per-test QueryClient wrapper, retries off).
- wired MSW into `setupTests.ts` with **`server.listen()` at setup-file eval
  time** (not in `beforeAll`) — the CT SDK captures `httpClient: fetch` once at
  module load, so MSW must patch `globalThis.fetch` before `ctClient` imports.
  `onUnhandledRequest: 'error'`; `afterEach` resets handlers + event listeners.
- `vite.config` `test.env` pins a non-secret CT host/projectKey so handler URLs
  match the SDK in CI (no `.env` there).
- **29 integration tests** (all green): catalog+filters (subtree/attribute/price/
  sort/search/pagination query-arg construction + `select` transforms, service +
  hook level), cart (active-cart 200/404→null/throw, create/update/delete,
  mutation cache writes), auth (visitor memo, lazy anon, refresh/expiry/drop,
  login + signup request shaping). Total unit+integration **70/70**.
- landmine found: the CT SDK reads `errors[0].code` on an error body — an empty
  `errors: []` throws and is reported as a network error (`statusCode 0`); mocks
  for error responses must include a populated `errors[]`.
- **Gate:** typecheck clean · eslint 0 errors (17 pre-existing warnings) · 70
  unit/integration · 11 e2e (Node 22, vs local `netlify dev`).
- **Next:** 6.2 (coverage thresholds for `services/*` + `queries/*`, ~80%),
  6.4 remainder (form aria + contrast), close.

### 2026-06-19 — Session 10 (phase 6.3 e2e merged; route scroll-restoration fix)

- **6.3 Playwright-in-CI MERGED to `develop`** (PR #231): `.github/workflows/e2e.yml`
  runs against the Netlify deploy preview via `deployment_status` → `target_url`;
  **no CT secrets in GitHub**. `playwright.config.ts` reads `PLAYWRIGHT_BASE_URL`
  and skips the local server when set. Validated against a real deploy preview
  (11/11) and again locally (11/11). Dormant until it lands on `main` (the final
  merge) — `deployment_status` workflows only run from the default branch.
- **Bug fix — "page renders from the bottom" on navigation** (`src/routes/index.tsx`):
  (1) scroll reset moved `useEffect` → **`useLayoutEffect`** so a tall/cached page
  is never painted at the previous scroll offset and then snapped to the top;
  (2) `AnimatePresence` → **`mode="wait"`** so the exiting route fully leaves before
  the next mounts — no two route subtrees stacked in normal flow. Verified live:
  before the fix `main` briefly held **2** route children mid-transition; after,
  it stays **1** and `window.scrollY` is **0** from the first frame across
  catalog→about, about→catalog, catalog→product, and category→category jumps.
- **Gate:** typecheck clean · eslint 0 errors (17 pre-existing warnings) · unit
  41/41 · e2e 11/11 (Node 22, vs local `netlify dev`).
- **Next:** 6.1 (MSW integration tests), 6.2 (coverage), 6.4 remainder, close.

### 2026-06-18 — Session 9 (phase 5 part B finished + merged; phase 5 CLOSED)

- converted the heavy-tail component scss to Tailwind (ProductCarousel, Poster,
  Feature/Features, ProfileView, CurrentProduct, **Categories** ×5 variants,
  **Registration** 3-step, **HeroCarousel** 3 slides × desktop+mobile); removed dead
  `Header.module.scss`. Each live-verified ±theme/±viewport.
- folded global `src/styles` partials into `tailwind.css`; deleted `src/styles/**`
  + `index.scss`; uninstalled `sass` + `classnames` → **0 `.scss` in tree**.
  Preflight left OFF (not 1:1); MUI-style base resets added instead.
- fixed latent `matchMedia` mock gap (modern `useMediaQuery`) → 41/41 unit green.
- **user visual review caught leaked UA defaults** (button border, anchor underline,
  UA-blue links, About Us colour) → fixed via bare-element resets + `a{color:inherit}`
  + explicit nav-link colours. Confirmed in live preview.
- **code-review subagent** on PR #225 → 1 must-fix (Categories hover-underline colour
  lost on a `.link::after` source-order tie) → fixed; rest approved.
- **PR #225 MERGED to `develop`** (CI green). Phase 5 done — one styling system.
- **Next:** Phase 6 (MSW tests, coverage, CI e2e, a11y, README/ADRs, 6.6 Dependabot).

### 2026-06-17 — Session 8 cont. (merge #223, start SCSS part B)

- **PR #223 (MUI removal) merged to `develop`** (CI green) — develop now MUI-free
- started **part B (SCSS consolidation)** on `refactor/phase-5-ui-part3-scss`
  (pushed): CSS vars → `tailwind.css`; ≈18 `*.module.scss` → Tailwind (forms,
  utilities, Logo/InfoPanel/AboutPerson/Product/ProfileEdit/RegistrationSuccessful)
- live-verified Logo (responsive + theme), InfoPanel, AboutPerson; gate green/group
- docs synced (PROGRESS / phase-5 / SESSION_REPORT) to post-merge reality
- **Remaining:** 10 heavy component scss + global partials → preflight → drop sass

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
