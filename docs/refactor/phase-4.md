# Phase 4 — Forms: Formik/Yup → react-hook-form + zod (~1–2 weeks)

Goal: one validation paradigm, one schema library, validation bugs fixed.
Plan reference: REFACTORING_PLAN.md §5, "Фаза 4". Bug list: plan §2.4 "Формы".

## Checklist

- [ ] **4.1** Shared zod schema library (`shared/lib/validation` or similar):
  - [ ] ONE email schema (kills the register-vs-profile regex mismatch)
  - [ ] password, name (allow hyphens/apostrophes/spaces: O'Brien, Anna-Maria)
  - [ ] date of birth: single age threshold, correct date math (not year subtraction)
  - [ ] address with postal code **per country**; countries = ISO 3166-1 only (drop "EU")
- [ ] **4.2** Profile forms (paradigm B — mechanical port): AddressAdd,
      PasswordChange, ProfilePersonalInfo, ProfileAddress → RHF + zodResolver.
      Fix ProfileEdit default-address bug (compare by id, not `!!defaultShippingAddress`).
- [ ] **4.3** Login/registration (paradigm A — rewrite): RHF `mode: 'onChange'`,
      rule-checklist UX (ShowValidate) rendered from zod issues. DELETE the
      updateMessage/areAllValuesFalse machinery (~1,100 lines across 4 components)
      and `utils/validate/*`.
- [ ] **4.4** Registration wizard: typed step state machine, local accumulator
      (not global store), single submit mutation. No `setTimeout(signup, 0)` race;
      password never leaves form scope.
- [ ] **4.5** Typed form→API contract; kill `Record<string, string|boolean|number>`
      + stringly `action` dispatch (its store half died in phase 3).
- [ ] Remove `formik`, `yup`, `formik-material-ui` from dependencies.
- [ ] Un-pin the intentionally-pinned validator bugs from phase 0
      characterization tests; assert correct behavior now.
- [ ] E2E green (registration/login/profile flows).
- [ ] Update `PROGRESS.md`; PR into `develop`.

## Exit criteria

No formik/yup in package.json; one schema source; e2e green; the §2.4 form
bug list fully closed.
