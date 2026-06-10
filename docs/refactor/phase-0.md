# Phase 0 — Safety net & security (~1 week)

Goal: the project stops being vulnerable and unreproducible; current behavior
is pinned by e2e tests before any migration starts.
Plan reference: REFACTORING_PLAN.md §5, "Фаза 0".

## Checklist

- [ ] **0.1 [HUMAN]** Rotate the Commercetools API client in Merchant Center.
      New client: minimal scopes (`view_published_products`, me-endpoints).
      Old clientId/secret revoked. Update Netlify env vars.
- [ ] **0.2** Remove `package-lock.json` from `.gitignore`; adopt pnpm
      (`pnpm-lock.yaml` committed) or commit npm lockfile.
      Done when: `pnpm install --frozen-lockfile` (or `npm ci`) succeeds from scratch.
- [ ] **0.3** Delete `public/css/**` (committed build artifacts).
      Remove 7 dead deps: `axios`, `localforage`, `match-sorter`, `sort-by`,
      `react-transition-group`, `date-fns`, `@mui/joy`.
      Done when: app builds and runs identically; deps absent from package.json.
- [ ] **0.4** GitHub Actions CI: lint + `tsc --noEmit` + unit tests on PR.
      Done when: pipeline green on this branch's PR.
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
