# Phase 6 — Quality consolidation (~1 week)

Goal: the refactored app is tested, accessible, documented.
Plan reference: REFACTORING_PLAN.md §5, "Фаза 6".

## Checklist

- [x] **6.1** MSW 2 mocks for CT API; integration tests for features (2026-06-19).
      Shared harness in `src/test/` (`server.ts` + `handlers.ts` + `fixtures.ts` +
      `utils.tsx`); MSW intercepts the BFF (`/api/auth/*`) **and** the CT SDK's
      `fetch` — `server.listen()` runs at setup-file eval so it patches
      `globalThis.fetch` before `ctClient` captures it; `vite.config` `test.env`
      pins a deterministic CT host so handler URLs match the SDK in CI. **29 new
      tests** across catalog+filters (request query-arg construction: subtree
      filter, attribute filters, price cents, sort mapping, search `text.en`,
      pagination offset + `select` transforms), cart flows (active-cart
      200/404→null/throw, create/update/delete, mutation cache writes), and auth
      (visitor memo, lazy anon, refresh/expiry, login/signup request shaping).
      Note: CT error responses must carry a populated `errors[]` — the SDK reads
      `errors[0].code` and an empty array drops it into the network-error path.
- [x] **6.2** Vitest coverage thresholds (2026-06-19). The plan's `entities/*` +
      `shared/api` map to this project's **`src/services/**` + `src/queries/**`**;
      v8 coverage is scoped to those in `vite.config` with enforced thresholds
      **statements 80 / lines 80 / functions 80 / branches 70**. Actuals well
      above: **stmts 92.6 · lines 93.8 · funcs 89.3 · branch 78.1** (98 tests).
      Added profile (`setCustomersDetails` + `queries/customer`) and the
      remaining cart hooks/pure-helper tests to clear the bar. New script
      `test:coverage` (`vitest run --coverage`) wired into `scripts/verify.sh`
      and the CI `verify` job, so a drop below threshold fails the build.
- [~] **6.3** Playwright in CI (2026-06-18). Runs e2e **against the Netlify deploy
      preview** — `.github/workflows/e2e.yml` triggers on `deployment_status` and
      points Playwright at the deploy's `target_url` (`playwright.config.ts` reads
      `PLAYWRIGHT_BASE_URL` and skips the local server when it's set). **No
      Commercetools env/secrets in GitHub** — the preview already has them on
      Netlify. **No repo setup required** beyond having Netlify Deploy Previews
      enabled (default for a Netlify-connected repo).
  - Caveat: `deployment_status` workflows only run from the **default branch**, so
    this activates once it lands on `main` (the final merge) and for `main` PRs.
    During `develop` work, e2e runs locally (`./scripts/verify.sh`) and the CI
    `verify` job covers each PR. Chose this over running the app in CI to avoid
    duplicating the CT secret into GitHub Actions.
  - Note: the registration scenario creates a real CT customer per run (unique
    email) — inherent to e2e-against-real-CT. Phase 0 scenarios already track the
    final UI (kept green through phase 5).
- [x] **6.4** A11y pass. Specific items from the PR #221 review (phase 5 part 1):
  - [x] Filter mobile drawer (`Filter.tsx`): Esc-to-close + focus-to-close-button
        + `role="dialog"`/`aria-modal` (PR #222), and now **full focus-TRAP**
        (Tab/Shift+Tab wrap inside) + **focus-return-to-trigger** on close
        (2026-06-18) — verified live: 21 focusables trapped, focus returns to the
        filter trigger.
  - [x] `ThemeToggle.tsx`: `aria-label="Toggle theme"` — done early (PR #222)
  - [x] `ErrorBoundary.tsx`: uses `RoutePaths.MAIN` — done early (PR #222)
  - [x] Form labels/aria audit (2026-06-19, no visual change): `RHFTextField`
        + `RHFSelect` now set `aria-invalid` and link the helper text via
        `aria-describedby`; `RHFSelect`'s visible label is tied to the trigger
        with `aria-labelledby` (was a bare `<span>`); `Search` and `PromoCode`
        inputs gained accessible names (`aria-label`) and `PromoCode`'s error is
        an `aria-describedby` `role="alert"`. Verified live: login fields expose
        Email/Password names + `aria-invalid`. Filter/catalog controls already
        had names (`Size`, `Sorting`, per-colour `aria-label`, `aria-pressed`),
        as did `SelectCurrency` and the password toggle.
  - [x] Dark-theme contrast — measured; the one real bug fixed, the rest
        documented and left 1:1 (user decision 2026-06-19). WCAG AA findings:
        - **Input text rendered black in dark mode** → ratio ~1.12 on `#121212`
          (login/registration/search/promo/profile). Root cause: preflight is
          off, so `<input>` kept the UA default `color` instead of inheriting
          the theme text. **FIXED** by `input, optgroup, select, textarea {
          color: inherit }` in `tailwind.css` — light theme unchanged (text was
          already dark), dark theme now light/readable (~16.7). Verified live in
          both themes (screenshots).
        - **White on primary orange** (`#f2760f`) buttons → ratio ~2.85 (below
          AA 4.5); theme-independent, affects all primary CTAs. **Left as-is** —
          fixing it changes the brand colour (deviates from 1:1); deferred as a
          look-vs-a11y decision.
        - Pre-existing, also left 1:1: some headings use a fixed dark colour and
          are low-contrast on the dark theme (same token-colour tradeoff).
        - Passing (reference): body/price 16.7, gray labels 6.5, orange links
          6.6, red breadcrumb 4.8.
- [x] **6.5** Docs (2026-06-18): README rewritten (real stack/architecture/setup/
      scripts/structure; dropped the stale CRA/MUI/MobX boilerplate). ADRs added in
      `docs/adr/`: 0001 BFF auth, 0002 TanStack Query + Zustand, 0003 Tailwind +
      Radix + lucide.
- [~] **6.6** Dependency security (2026-06-18): `npm audit` went from
      **1 critical + 14 moderate + 5 low → 9 low** (all one dev-only advisory).
  - [x] **critical** `swiper` (runtime, HeroCarousel/ProductCarousel): bumped
        `^10.1.0` → **`^12.2.0`** (2-major). typecheck/build/41 unit/11 e2e green;
        both carousels visually verified (hero autoplay + product thumbnails),
        look/behaviour 1:1.
  - [x] **moderate** `@opentelemetry/core`, `micromatch`, `yaml`: cleared via
        `overrides` (`@opentelemetry/core ^2.8.0`, `micromatch ^4.0.8`, `yaml ^2.8.3`).
  - [~] **low** `esbuild` (9×, transitive via netlify-cli internals + Vite): NOT
        patched. Accepted residual risk — advisory is a **Windows-only dev-server
        file-read**, build-time only, **not in the production bundle**; we build on
        Linux/Netlify. A global `esbuild` override risks breaking Vite 7/Vitest 4
        (tightly version-coupled), and `netlify-cli@26` already pins its own copies.
        Revisit when Vite/netlify-cli bump esbuild upstream.
  - Verify on GitHub that Dependabot's tracked alerts clear after merge.
- [x] Final `PROGRESS.md` update; close the refactor (2026-06-19). All of phase
      6 merged to `develop`; refactor summary recorded in PROGRESS.md.

## Exit criteria

CI runs lint+types+unit+integration+e2e on every PR; coverage thresholds
enforced; README matches reality.
