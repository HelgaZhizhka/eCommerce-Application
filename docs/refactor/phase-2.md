# Phase 2 — API layer & auth (~1–2 weeks)

Goal: no secrets in the bundle, one token owner, typed API surface.
Plan reference: REFACTORING_PLAN.md §5, "Фаза 2".

## Checklist

- [ ] **2.1** BFF on Netlify Functions: `POST /auth/anonymous`, `/auth/login`,
      `/auth/refresh`, `/auth/logout`. Only functions know `clientSecret`
      (server-side env). Browser gets minimal-scope access token; refresh via
      httpOnly cookie or BFF rotation.
- [ ] **2.2** `@commercetools/ts-client` v3 + current `platform-sdk`.
      ONE client instance per session (not per request). Single token-management
      module. Remove all deep imports from `dist/declarations/...`.
- [ ] **2.3** Rewrite services as thin typed functions over `apiRoot`
      (products, categories, cart via me-endpoints, customer). Remove manual
      `statusCode === 200/400` checks; normalize CT errors into domain errors.
- [ ] **2.4** Sessions: lazy anonymous session (created on first cart write,
      not on app load); on login merge anonymous cart
      (`anonymousCartSignInMode: MergeWithExistingCustomerCart`).
- [ ] **2.5** Delete `loggedIn` localStorage flag; session validity is the
      source of truth for `Secure` routes.
- [ ] E2E suite green (auth flows unchanged from user perspective).
- [ ] Update `PROGRESS.md`; PR into `develop`.

## Exit criteria

`grep -r clientSecret src/` → only BFF code outside the bundle; one token
module; e2e green including login/logout/cart-merge.
