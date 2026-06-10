# Phase 0 — Safety net & security (~1 week)

Goal: the project stops being vulnerable and unreproducible; current behavior
is pinned by e2e tests before any migration starts.
Plan reference: REFACTORING_PLAN.md §5, "Фаза 0".

## Checklist

- [x] **0.1 [HUMAN]** ~~Rotate the Commercetools API client.~~ Done 2026-06-11:
      new SPA-template client (minimal scopes) in project `yes-code-project-0526`,
      local `.env` switched and verified end-to-end (token OK, 17 categories /
      110 products / 4 product types, home + catalog render, anonymous cart works).
      **Remaining human follow-ups:**
  - [ ] deactivate the old 2023 API client in Merchant Center
  - [ ] extend validity of discount code `BAGS15-SP` (expired 2026-03-15 —
        blocks the promo e2e scenario in 0.5)
  - [ ] update Netlify env vars (can wait until phase 2 BFF)
- [x] **0.2** ~~Remove `package-lock.json` from `.gitignore`; commit lockfile.~~
      Done 2026-06-10 (`ea86093`): npm lockfile committed, `.nvmrc` → Node 22.
      pnpm deferred to phase 1 (react-scripts 5 has known hoisting issues with pnpm).
- [x] **0.3** ~~Delete `public/css/**`; remove dead deps.~~
      Done 2026-06-10 (`ea86093`): removed 9 packages (the planned 7 + `jsdom` +
      `@types/react-transition-group`, both also unused). Verified: tsc, eslint,
      42/42 unit tests, production build — all green on Node 22.
- [ ] **0.4** GitHub Actions CI: lint + `tsc --noEmit` + unit tests on PR.
      Workflow committed (`.github/workflows/ci.yml`); waiting on first PR run
      to call it done.
- [ ] **0.5** Playwright e2e suite pinning current behavior (run against local
      dev server and/or Netlify preview):
  - [ ] login / logout
  - [ ] registration wizard (3 steps, happy path)
  - [ ] catalog: category navigation + filter + pagination
  - [ ] product detail page
  - [ ] cart: add / change quantity / remove
  - [ ] promo code apply / remove
  - [ ] profile: edit address, change personal data
- [ ] **0.6** Characterization unit tests for logic that survives migration:
  - [ ] `stores/cartHelpers.getCartProducts` (cent amounts, discounts, promo)
  - [ ] `stores/productHelpers`
  - [ ] validators in `utils/validate/` — pin current behavior **including known
        bugs**, marked with `// TODO(refactor): bug pinned intentionally, fix in phase 4`
- [ ] Update `scripts/verify.sh` to include e2e once 0.5 lands.
- [ ] Update `PROGRESS.md`; open PR `refactor/phase-0-safety-net` → `develop`.

## Exit criteria

CI green; e2e suite green twice in a row (flake check); lockfile committed;
secret rotated (or explicitly tracked as pending human task in PROGRESS.md).
