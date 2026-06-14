# Phase 5 — UI, styles, routing (~2–3 weeks)

Goal: one styling system, adaptive components instead of mobile/desktop forks,
code splitting. Plan reference: REFACTORING_PLAN.md §5, "Фаза 5".

> **Decision (2026-06-13): Tailwind 4 + shadcn/ui.** Full restyle; MUI removed
> at the end of the phase. Approach: engine swap, keep the look 1:1 (verified
> visually per group). Done by page/component group with user review between
> groups. Branch `refactor/phase-5-ui` — will become one or more PRs.

## Foundation (done 2026-06-13)

- `@tailwindcss/vite` + `src/styles/tailwind.css`: design tokens mirror the
  existing CSS variables (one source of truth); preflight deferred until MUI
  is gone; dark variant bound to `[data-theme]`. `cn()` helper added.

## Checklist

- [x] **5.1/5.2** (in progress, per group) — adopt Tailwind, consolidate styles.
  Done groups: **Footer**, **Header**, **Card + ProductList**, **Catalog shell
  + adaptive Filter**.
  Remaining: leaf filter/sort internals still on MUI (FilterChip Chip,
  FilterColorCheckBox Button, FilterPrice Slider, SortingList MenuItem,
  Search Input, PaginationCatalog, SelectSize) — come off in the final MUI
  sweep; Cart group (Cart/CardMini/PromoCode/EmptyCart); forms
  (Login/Registration/Profile + RHFTextField/SelectSize MUI internals); pages
  (Main/About/Sale/ErrorPage); shared base (Button/Price/Icon/Modal/Breadcrumbs).
- [x] **5.3** Forks merged: Header/HeaderMobile ✅, **Filter/FilterMobile ✅**
  (adaptive Filter: sidebar md+ / Tailwind drawer below), **Sorting/SortMobile ✅**
  (one MUI dropdown at all widths). Remaining: NavBarMobile review (it's the
  mobile nav drawer opened by the merged Header — keep or fold in).
- [x] **5.4** Route-level lazy() + Suspense (done). Skeletons: App still
  unmounts shell on initial categories load — revisit with page skeletons.
- [x] **5.5** Global ErrorBoundary (done). Remaining: per-page boundaries,
  dedicated 404/500 styling (ErrorPage exists, needs Tailwind restyle).
- [x] **5.6** Card `className` bug fixed (done). Remaining: move business logic
  (generateProductPath, variant selection) out of Card into entities.
- [ ] **5.7** Performance: bundle analysis, CT image API (`?format=webp`,
      sizes), hover prefetch for product pages.
- [ ] **FINAL**: remove MUI (`@mui/*`, `@emotion/*`), enable Tailwind preflight,
      delete `src/styles/**` SCSS once nothing imports it, drop `sass`/`classnames`.
- [ ] E2E green; visual review of every page (human, both themes, mobile+desktop).
- [ ] Update `PROGRESS.md`; PR(s) into `develop` — split by page group if large.

## Exit criteria

One styling system in the tree; no \*Mobile component forks; lazy routes;
e2e green; human visual sign-off.
