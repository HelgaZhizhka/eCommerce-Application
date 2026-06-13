# Phase 4 — Forms: Formik/Yup → react-hook-form + zod (~1–2 weeks)

Goal: one validation paradigm, one schema library, validation bugs fixed.
Plan reference: REFACTORING_PLAN.md §5, "Фаза 4". Bug list: plan §2.4 "Формы".

## Checklist

- [x] **4.1** Done 2026-06-13: shared zod schema library under `src/schemas/`
      (`fields.ts`, `forms.ts`, `countries.ts`, `rules.ts`):
  - [x] ONE email schema (allows + aliases and TLDs > 4 chars; kills the
        register-vs-profile mismatch)
  - [x] password, names (allow hyphens/apostrophes/spaces — O'Brien, Anna-Maria)
  - [x] date of birth: single threshold (13), honest month/day age math
  - [x] address postal code per country; countries = ISO 3166-1 only ("EU" dropped)
- [x] **4.2** Done 2026-06-13: profile forms (AddressAdd, PasswordChange,
      ProfilePersonalInfo, ProfileAddress) → RHF + zodResolver via the new
      `RHFTextField`/`RHFCheckbox` adapters. ProfileEdit default-address bug
      fixed (compare by id, not `!!defaultShippingAddress`).
- [x] **4.3** Done 2026-06-13: login/registration rewritten on RHF
      `mode: 'onChange'`; rule-checklist UX (ShowValidate) now renders from a
      `Rule[]` list. The updateMessage/areAllValuesFalse machinery and
      `utils/validate/*` are deleted (~1,100 lines).
- [x] **4.4** Done 2026-06-13: registration wizard is a typed 3-step state
      machine in the Registration page; the accumulator (incl. password) is
      local state, never the global store. Final submit is a single awaited
      `signup(data)` — the `setTimeout(signup, 0)` race is gone; password never
      leaves form scope.
- [x] **4.5** Done 2026-06-13: forms are typed via `z.infer`; the stringly-typed
      `action` dispatch survives only as the profile-mutation contract (its
      store half died in phase 3) — acceptable, scoped to `queries/customer.ts`.
- [x] Removed `formik`, `yup`, `formik-material-ui` (and the formik-based
      FieldWrapper) from dependencies.
- [x] Phase 0 validator characterization tests replaced by `schemas.test.ts`
      asserting the CORRECT (fixed) behavior; the pinned bugs are gone.
- [x] E2E green (registration/login/profile): 11/11, twice.
- [ ] Update `PROGRESS.md`; PR into `develop`.

## Exit criteria

No formik/yup in package.json; one schema source; e2e green; the §2.4 form
bug list fully closed.
