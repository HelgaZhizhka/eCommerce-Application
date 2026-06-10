# Phase 1 — Build & tooling: CRA → Vite (~1 week)

Goal: same app, living foundation. Plan reference: REFACTORING_PLAN.md §5, "Фаза 1".

## Checklist

- [ ] **1.1** Vite 7 + `@vitejs/plugin-react`: move `index.html` to root,
      `REACT_APP_*` → `import.meta.env.VITE_*`, zod-validated env on startup.
      Remove `react-scripts`, `react-app-env.d.ts`, `.browserslistrc` review.
- [ ] **1.2** TypeScript 5.9: `strict` + `noUncheckedIndexedAccess` +
      `exactOptionalPropertyTypes`, drop `allowJs`, add `@/*` path alias
      (tsconfig + vite resolve). Fix resulting type errors.
- [ ] **1.3** ESLint 9 flat config + typescript-eslint 8 + Prettier 3.
      Fix husky/lint-staged: must cover `*.ts` AND `*.tsx`.
- [ ] **1.4** Vitest 3 + RTL: port surviving tests (~11 validator tests).
      Delete: empty Footer test bodies, byte-identical SignIn/SignUp duplicates.
- [ ] **1.5** React 18 → 19: update types, remove `react-dom/test-utils` usage,
      verify mobx-react-lite compatibility (MobX still present until phase 3).
- [ ] Phase 0 e2e suite green against the Vite build.
- [ ] Update `PROGRESS.md`; PR into `develop`.

## Exit criteria

`pnpm dev` / `pnpm build` / `pnpm test` / `pnpm lint` all work; e2e green;
no `react-scripts` in the tree.
