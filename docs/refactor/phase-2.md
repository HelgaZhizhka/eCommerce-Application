# Phase 2 — API layer & auth (~1–2 weeks)

Goal: no secrets in the bundle, one token owner, typed API surface.
Plan reference: REFACTORING_PLAN.md §5, "Фаза 2".

## Checklist

- [x] **2.1** BFF on Netlify Functions. Done 2026-06-12: five functions
      (`auth-visitor|anonymous|login|refresh|logout`) behind `/api/auth/*`
      redirects; only `netlify/lib/ctAuth.ts` reads `CTP_CLIENT_SECRET`;
      refresh token in httpOnly `ct_refresh` cookie (browser never sees it);
      visitor token narrowed to `view_*` scopes. Verified: secret absent from
      the production bundle (grep over build assets). Dev workflow is now
      `npx netlify dev` (:8888 fronts Vite + functions; netlify.toml [dev]).
      Gotcha fixed: a catch-all in `_redirects` hijacks Vite module URLs under
      netlify dev — SPA fallback is appended to `build/_redirects` at build
      time only, dev reads `public/` (`[dev] publish`).
      TODO(cosmetic): rename functions to `.mts` (CJS-format warnings).
  - [ ] **[HUMAN]** add `CTP_PROJECT_KEY/CLIENT_ID/CLIENT_SECRET/AUTH_URL/SCOPES`
        in Netlify UI (Site settings → Environment variables) before the next
        production deploy; `VITE_CLIENT_*`/`VITE_AUTH_URL`/`VITE_SCOPES` vars
        can be deleted there.
- [ ] **2.2** `@commercetools/ts-client` + current `platform-sdk`.
      ONE client instance per session (not per request). Single token-management
      module. Remove all deep imports from `dist/declarations/...`.
  - [x] **part 1** (2026-06-12): `sdk-client-v2` → **ts-client 4.10**
        (v4 is current major, not the planned v3), `platform-sdk` 4 → **8.27**.
        All 14 deep imports → root exports (v8 exports everything publicly).
        `src/services/BuildClient.ts` → `ctClient.ts` (async TokenCache of v4;
        same four flows, same factory-per-call shape for now). Vite workarounds
        for the dead SDK deleted (aliases + `define.global`). Exposed and fixed
        parasitic `NodeJS.Timeout` typing in browser code. 11/11 e2e green.
  - [x] **part 2** (2026-06-12): `src/services/session.ts` is the single token
        owner (visitor in memory, session in `ct_session` localStorage entry,
        refresh + in-flight dedupe). Three clients built ONCE via a custom
        auth-injecting middleware (`publicApi`/`sessionApi`/`cartApi`) —
        no more client-per-request; `MyTokenCache` and the raw `token`
        localStorage key are gone.
- [x] **2.3** Done 2026-06-12 (largely achieved by 2.2): services are thin
      typed functions over the shared clients — no per-call client building,
      no token plumbing, public SDK types only.
      **DECISION**: domain-error normalization and the dead
      `statusCode === 400` branches move to phase 3 — their only consumers
      are the MobX stores, which phase 3 replaces with TanStack Query
      (mutations get error handling from the library); normalizing now would
      be built twice. The three remaining `statusCode === 2xx` guards in
      services are "on success" semantics, kept as-is.
- [x] **2.4** Done 2026-06-12 (landed with 2.1): anonymous session is created
      lazily by `ensureSessionToken()` on first cart write — nothing on app
      load; me/login keeps CT's default `MergeWithExistingCustomerCart`;
      signup now runs on the anonymous token, so the guest cart follows the
      new account too. Also fixed en route: post-signup `setAdress` was
      fire-and-forget and lost address links when the tab closed early —
      now awaited before signup reports success.
- [x] **2.5** Done 2026-06-12: `loggedIn` localStorage flag deleted (init,
      mobx reaction persisting it, logout cleanup). `userStore.loggedIn` is
      now initialized from `isCustomerSession()` — the stored session is the
      single source of truth; `Secure` routes consume the same observable.
- [ ] E2E suite green (auth flows unchanged from user perspective).
- [ ] Update `PROGRESS.md`; PR into `develop`.

## Exit criteria

`grep -r clientSecret src/` → only BFF code outside the bundle; one token
module; e2e green including login/logout/cart-merge.
