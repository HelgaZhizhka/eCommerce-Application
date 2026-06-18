# Phase 6 — Quality consolidation (~1 week)

Goal: the refactored app is tested, accessible, documented.
Plan reference: REFACTORING_PLAN.md §5, "Фаза 6".

## Checklist

- [ ] **6.1** MSW 2 mocks for CT API; integration tests for features
      (catalog+filters, cart flows, auth flow).
- [ ] **6.2** Vitest coverage thresholds for `entities/*` and `shared/api`
      (target: 80%).
- [ ] **6.3** Playwright in CI against Netlify preview deploys; refresh
      phase 0 scenarios to the final UI.
- [ ] **6.4** A11y pass: form labels/aria, modal focus management, dark theme
      contrast. Specific items from the PR #221 review (phase 5 part 1):
  - [~] Filter mobile drawer (`Filter.tsx`): Esc-to-close + focus-to-close-button
        + `role="dialog"`/`aria-modal` DONE (PR #222); full focus-TRAP and
        focus-return-to-trigger still TODO here.
  - [x] `ThemeToggle.tsx`: `aria-label="Toggle theme"` — done early (PR #222)
  - [x] `ErrorBoundary.tsx`: uses `RoutePaths.MAIN` — done early (PR #222)
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
- [ ] Final `PROGRESS.md` update; close the refactor.

## Exit criteria

CI runs lint+types+unit+integration+e2e on every PR; coverage thresholds
enforced; README matches reality.
