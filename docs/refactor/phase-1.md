# Phase 1 — Build & tooling: CRA → Vite (~1 week)

Goal: same app, living foundation. Plan reference: REFACTORING_PLAN.md §5, "Фаза 1".

## Checklist

- [x] **1.1** Vite + `@vitejs/plugin-react`. Done 2026-06-11: **Vite 7.3.5**
      (Vite 8.0.x has an open rolldown-optimizer regression breaking
      emotion/MUI prebundling — vitejs/vite#22499; revisit after upstream fix).
      `index.html` at root, `REACT_APP_*` → `VITE_*` (typed in `vite-env.d.ts`),
      react-scripts/react-app-env.d.ts removed, `build.outDir=build` (Netlify).
      Required along the way: MUI deep imports (`@mui/material/X`,
      `@mui/system/*`) normalized to barrel imports via codemod (44 files) —
      mixed deep/barrel entries broke dep-optimizer interop; `define.global`
      polyfill + browser-build aliases for the deprecated CT SDK (die in
      phase 2). zod env validation deferred to phase 4 (zod arrives there).
- [x] **1.2** TypeScript 5.9.3. Done 2026-06-12: `allowJs` dropped,
      `moduleResolution: bundler`, `@/*` path alias (tsconfig + vite),
      `swiper/types/swiper-options` deep import → public `swiper/types`.
      **DECISION**: `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`
      deferred — they surface 128 errors, ~all in code scheduled to die in
      phases 2-5 (stores 25, forms/components ~50, services 6, their tests).
      Enable in phase 5 wrap-up (tracked there) when the surviving code is the
      code we keep. `@/*` alias is infra-only for now — existing relative
      imports are NOT mass-rewritten (churn); new/touched code uses `@/`.
- [x] **1.3** ESLint 9 flat config + typescript-eslint 8 + Prettier 3.
      Done 2026-06-12: eslint 9.39 flat config (airbnb dropped — dead upstream;
      baseline = recommended sets + react/hooks/jsx-a11y + prettier-config).
      ESLint 10 blocked by eslint-plugin-jsx-a11y peer (max v9) — revisit.
      Rule-parity decisions commented in eslint.config.mjs: caught errors not
      flagged (airbnb parity), react-hooks v7 new rules + 2 a11y rules → warn
      (19 warnings stay visible; owners: phases 3-6). e2e/ + configs now
      linted. lint-staged covers `*.{ts,tsx}`. Prettier 3: one-time repo
      reformat as separate style-only commit.
- [x] **1.4** Vitest + RTL. Done 2026-06-11: **Vitest 4.1.8** (current major),
      all 18 suites ported (`jest.*` → `vi.*`, jest-dom v6 vitest build,
      `classNameStrategy: 'non-scoped'` for legacy CSS-module assertions).
      Deleted: byte-identical SignIn/SignUp duplicates (real coverage in
      credentialsValidate.test.ts), 2 empty Footer test bodies → 57 tests green.
- [x] **1.5** React 18 → 19. Done 2026-06-12: react 19.2.7 + types;
      RTL 13 → 16 (+@testing-library/dom), framer-motion 10 → 12
      (`as const` for variants literals), mobx-react-lite → 4.1.1,
      unused @testing-library/user-event dropped (review finding),
      cargo-cult `act()` from removed react-dom/test-utils deleted
      (wrapped pure sync calls), `JSX.Element` → explicit
      `import type { JSX } from 'react'` (React 19 dropped the global).
      MUI 5.18 / formik-material-ui accept React 19 peers as-is.
- [x] Phase 0 e2e suite green against the Vite build: 11/11, twice.
- [ ] Update `PROGRESS.md`; PR into `develop`.

## Exit criteria

`pnpm dev` / `pnpm build` / `pnpm test` / `pnpm lint` all work; e2e green;
no `react-scripts` in the tree.
