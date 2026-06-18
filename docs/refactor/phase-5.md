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
  + adaptive Filter** (part 1, merged); **Cart group complete** (Cart page,
  EmptyCart, PromoCode, **CardMini**); **Login + Registration page shells**;
  **content pages** Main / About / Sale / ErrorPage (404 glitch keyframes moved
  into `tailwind.css`) / **Profile shell** (part 2, on `refactor/phase-5-ui-part2`).
  - **`PageContainer`** added (`baseComponents/PageContainer`): one Tailwind
    replacement for MUI `<Container maxWidth="xl">` (centered, `max-w-[1440px]`,
    `px-4 sm:px-6` — the theme's real xl is 1440, not MUI's default 1536).
    Catalog/Cart/Login/Registration retrofitted onto it (fixes the earlier
    `1536` drift; removes the duplicated wrapper string).
  - **Breakpoints aligned** in `tailwind.css` (`--breakpoint-sm/md/lg/xl =
    600/1024/1280/1440`) to match the legacy MUI theme + SCSS grid, so `md:`/
    `sm:` mean what `up('md')`/`up('sm')` meant. Verified the Header
    desktop/mobile switch now flips at exactly 1024 (900px → mobile, 1024px →
    desktop), restoring 1:1.
  **MUI fully swept (2026-06-15):** all leaf/page components moved off MUI —
  icons → lucide-react; Slider/Select/Dialog → Radix (new shared `Button`/
  `Select`/`Dialog` primitives, `RHFSelect`, `useMediaQuery`); Product page on
  `PageContainer`. `@mui/*` + `@emotion/*` uninstalled, **0 `@mui` imports**
  (merged to `develop` via PR #223). SCSS consolidation in progress on
  `refactor/phase-5-ui-part3-scss` (≈18 modules done) — see FINAL part B below.
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
- [x] **FINAL (part A — MUI)**: removed `@mui/*` + `@emotion/*` (uninstalled);
      0 `@mui` imports. lucide + Radix + shared primitives in place. Body base
      styles (bg/color/font) reinstated from theme vars after CssBaseline removal.
- [x] **FINAL (part B — SCSS): DONE** on `refactor/phase-5-ui-part3-scss`.
      ALL component `*.module.scss` converted to Tailwind (ProductCarousel, Poster,
      Feature/Features, ProfileView, CurrentProduct, Categories ×5 variants,
      Registration 3-step, HeroCarousel 3 slides × desktop+mobile; dead
      `Header.module.scss` removed) + global partials folded into `tailwind.css`
      as plain CSS (normalize/body base, `.link`/`.icon`/`.badge`, `.app`, swiper
      overrides, Mukta @import). **0 `.scss` files left**; `src/styles/**` +
      `index.scss` deleted; `sass` + `classnames` uninstalled. Tailwind **preflight
      deliberately NOT enabled** (would reset heading/list/anchor defaults app-wide
      → not 1:1); base look preserved via the normalize block. Fixed latent
      `matchMedia` mock gap → 41/41 unit green.
- [x] E2E green (11/11), 41/41 unit green, production build green; base computed
      styles measured identical to pre-migration (light + dark); every part-B
      component live-verified ±theme/±viewport. **One styling system in the tree.**
- [x] `PROGRESS.md` updated. Part 2 (MUI removal) merged via **PR #223**;
      part B continues on its own branch → its own PR.

## Exit criteria

One styling system in the tree; no \*Mobile component forks; lazy routes;
e2e green; human visual sign-off.
