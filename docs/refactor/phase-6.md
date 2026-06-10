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
      contrast.
- [ ] **6.5** Docs: rewrite README (stack, setup, scripts), ADRs for key
      decisions (BFF, TanStack Query, UI kit choice).
- [ ] Final `PROGRESS.md` update; close the refactor.

## Exit criteria

CI runs lint+types+unit+integration+e2e on every PR; coverage thresholds
enforced; README matches reality.
