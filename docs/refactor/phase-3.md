# Phase 3 — Server state: MobX → TanStack Query + URL (~2 weeks)

Goal: hand-rolled server cache deleted; filters/sort/pagination live in the URL.
Plan reference: REFACTORING_PLAN.md §5, "Фаза 3".

## Checklist

- [ ] **3.1** `QueryClient` + provider. Query keys: `['categories']`,
      `['products', categoryId, filters, sort, page]`, `['product', key]`,
      `['cart']`, `['me']`.
- [ ] **3.2** Catalog state → URL search params (typed via router).
      `paginationNavigate` logic dies; query key expresses it.
- [ ] **3.3** Cart: `useCart()` + mutations (add/remove/quantity/promo) with
      optimistic updates + invalidation. Delete `productsInCartSku` Set and the
      manual cart cache. `cartId`/`cartVersion` leave localStorage.
- [ ] **3.4** Profile: `useMe()` + per-action mutations (`useChangePassword`,
      `useAddAddress`, …). The 148-line `updateUserProfile` switch dies.
- [ ] **3.5** Notifications: toasts from mutation `onSuccess`/`onError`
      (sonner or similar) replace the store error/success string bus + SnackBar
      observing three stores.
- [ ] **3.6** Remaining client state: `useTheme` (Zustand or context +
      CSS variables), thin auth state. **Remove `mobx` and `mobx-react-lite`
      from dependencies.**
- [ ] E2E suite green; loading/error states present on cart and profile mutations.
- [ ] Update `PROGRESS.md`; PR into `develop` (consider splitting: catalog / cart / profile).

## Exit criteria

`src/stores/` deleted; no `mobx` in package.json; e2e green; catalog state
shareable via URL.
