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
- [x] **0.4** ~~GitHub Actions CI.~~ Done 2026-06-11: first run green on
      PR #216 (`verify` job: install + tsc + eslint + unit, 1m00s).
- [x] **0.5** Playwright e2e suite pinning current behavior. Done 2026-06-11:
      10 tests green twice in a row (`npx playwright test`, webServer reuses
      local CRA dev server on :3000).
  - [x] login / logout
  - [x] registration wizard (3 steps, happy path; pins the "Sing up" typo)
  - [x] catalog: category navigation + size filter + reset + pagination
  - [x] product detail page (via cart flow)
  - [x] cart: add / change quantity / remove line item / clear all
  - [x] promo code apply — enabled 2026-06-11 after `BAGS15-SP` validity was
        extended in Merchant Center; full suite: 11/11 green
  - [x] profile: view registered data, open edit mode
  - Notes: product-card `<a>` wrappers are layout-invisible to Playwright
    (assert on inner `img`); products API has no stable sort (assert counts,
    not exact sets); cart clear races on cart version if clicked before the
    page's getCart settles (`networkidle` guard in specs).
- [x] **0.6** Characterization unit tests. Done 2026-06-11: 27 new tests
      (`cartHelpers.test.ts`, `productHelpers.test.ts`, `credentialsValidate.test.ts`).
  - [x] `getCartProducts`: prices/discounts/promo + quirks (missing price drops
        totalPrice; missing key/name → string "undefined")
  - [x] `productHelpers`: getPriceValue, extractSizesWithVariantId (dedupe keeps
        last variant), getSku (BUG pinned: TypeError on unknown id),
        transformFetchedCategories (orderHint sort + nesting)
  - [x] `sigIn`/`signUp` validators (previously ZERO coverage): rule flags,
        always-empty errors object, single-char-password bug — all pinned with
        `TODO(refactor)` marks for phases 3-4
- [x] `scripts/verify.sh` includes e2e (auto-detected via playwright.config.ts).
- [ ] Update `PROGRESS.md`; open PR `refactor/phase-0-safety-net` → `develop`.

## Exit criteria

CI green; e2e suite green twice in a row (flake check); lockfile committed;
secret rotated (or explicitly tracked as pending human task in PROGRESS.md).
