# Phase 5 — UI, styles, routing (~2–3 weeks)

Goal: one styling system, adaptive components instead of mobile/desktop forks,
code splitting. Plan reference: REFACTORING_PLAN.md §5, "Фаза 5".

> **Blocked on decision (plan §3.2):** MUI 7 vs Tailwind 4 + shadcn/ui.
> Record the decision in PROGRESS.md before starting.

## Checklist

- [ ] **5.1** Adopt chosen UI system. Dark theme via CSS variables /
      `data-theme` (no `createTheme` re-creation per render).
- [ ] **5.2** Consolidate 3 styling systems → 1. SCSS abstract/core →
      design tokens.
- [ ] **5.3** Merge breakpoint forks into adaptive components:
      Header/HeaderMobile, Filter/FilterMobile, Sorting/SortMobile, NavBarMobile.
- [ ] **5.4** Route-level `lazy()` + Suspense (code splitting per page).
      Skeletons instead of unmounting the whole shell in App on load.
- [ ] **5.5** Error boundaries (global + per page), 404/500 pages.
- [ ] **5.6** Fix `Card.tsx` className bug; move business logic
      (generateProductPath, variant selection) out of components into entities.
- [ ] **5.7** Performance: bundle analysis, CT image API (`?format=webp`, sizes),
      hover prefetch for product pages.
- [ ] E2E green; visual review of every page (human, both themes, mobile+desktop).
- [ ] Update `PROGRESS.md`; PR(s) into `develop` — split by page group if large.

## Exit criteria

One styling system in the tree; no *Mobile component forks; lazy routes;
e2e green; human visual sign-off.
