# CLAUDE.md — Refactoring Harness

Legacy 2023 RS School eCommerce SPA (Commercetools) undergoing a 7-phase
refactor to a modern stack. The full plan with rationale lives in
[REFACTORING_PLAN.md](REFACTORING_PLAN.md). This file is the working contract
for every agent session.

## Startup workflow (before writing any code)

1. Read `docs/refactor/PROGRESS.md` — current phase, last completed task, blockers.
2. Read the checklist for the current phase: `docs/refactor/phase-N.md`.
3. Read the matching section of `REFACTORING_PLAN.md` for rationale and acceptance criteria.
4. Run `./scripts/verify.sh` to confirm the repo is green before touching it.

## Working rules

- **One phase at a time, one checklist item at a time.** Phases are strictly
  sequential; do not start phase N+1 tasks while phase N items are open.
- **Behavior is frozen.** This is a refactor, not feature work. The app must
  behave identically after every PR (known bugs are fixed only when the plan
  explicitly says so — see plan §2.4 bug list and phase tasks).
- **Never claim "done" without running `./scripts/verify.sh`** and quoting its
  output. E2E suites (from phase 0 onward) must be green before merge.
- **Update `docs/refactor/PROGRESS.md` before ending every session**: what was
  done (with evidence), what is next, any blockers. Check off completed items
  in the phase checklist.
- **Branch per phase**: `refactor/phase-N-<slug>`, PR into `develop`. Keep PRs
  reviewable; split a phase into several PRs if it grows.
- **No secrets in the repo or bundle.** `REACT_APP_*`/`VITE_*` vars visible to
  the browser must never contain secrets. The Commercetools clientSecret goes
  only into server-side (Netlify Functions) env.
- **Delete replaced code in the same phase** that replaces it. No long-lived
  parallel implementations.
- **No Co-Authored-By trailers** in commits or PR descriptions.

## Verification commands

```bash
./scripts/verify.sh        # full gate: install + typecheck + lint + unit + e2e
npm run typecheck          # tsc --noEmit
npm run eslint             # lint only
npm test                   # unit tests (Vitest, single run)
npx playwright test        # e2e only
```

## Definition of done (per checklist item)

- [ ] Implementation matches the plan's acceptance criterion for that item
- [ ] `./scripts/verify.sh` passes
- [ ] Replaced/dead code removed
- [ ] `PROGRESS.md` and the phase checklist updated
- [ ] Committed with a descriptive message

## Known landmines (read before touching related code)

- `clientSecret` is currently in the browser bundle (`src/services/BuildClient.ts`).
  Rotation in Merchant Center is a phase 0 human task — until phase 2 lands, do
  not copy this pattern anywhere.
- `public/css/**` are committed build artifacts — scheduled for deletion in
  phase 0; never reference them.
- `src/__tests__/` is mostly disposable (asserts MUI internals; two files are
  byte-identical duplicates testing the wrong module). Only the pure validator
  tests carry information — and some of them codify known bugs.
- Deep imports from `@commercetools/platform-sdk/dist/declarations/...` break
  on SDK upgrade; replace with public entry points when touched.
- `package-lock.json` is gitignored until phase 0 fixes it — builds are not
  reproducible yet.

## Stack: current → target

CRA → Vite 7 · React 18 → 19 · TS 4.9 → 5.9 strict · MobX → TanStack Query 5
(+ minimal Zustand) · Formik/Yup → react-hook-form/zod 4 · `sdk-client-v2` →
`@commercetools/ts-client` v3 + BFF (Netlify Functions) · Jest/CRA → Vitest 3 +
MSW 2 + Playwright · ESLint 8 airbnb → ESLint 9 flat config.
UI kit decision (MUI 7 vs Tailwind 4 + shadcn/ui) is still open — see plan §3.2.
