# Phase 3 — Server state: MobX → TanStack Query + URL (~2 weeks)

Goal: hand-rolled server cache deleted; filters/sort/pagination live in the URL.
Plan reference: REFACTORING_PLAN.md §5, "Фаза 3".

## Checklist

- [x] **3.1** Done 2026-06-12: @tanstack/react-query 5.101, QueryClient with
      legacy-parity defaults (no retries, no focus refetch). Query keys:
      `['categories']`, `['categoryAttributes', slug]`,
      `['products', id, page, search, sizes, colors, price, sort]`,
      `['product', key]`, `['cart']`, `['me']`.
      **DECISION**: stayed on react-router-dom 6 — URL state via
      `useSearchParams` (identical in v6/v7); the router major bump is not
      mixed into the largest phase.
- [x] **3.2** Done 2026-06-13: catalog state lives in the URL
      (`useCatalogParams`); ProductStore (366 lines) deleted; the
      `paginationNavigate` dispatch became a pure function of URL params
      inside the queryFn (fixed by construction: pagination used to forget
      the sort order). 8 components converted to controlled props. Legacy
      semantics kept: search ⊻ filters, criteria changes reset the page.
- [x] **3.3** Done 2026-06-13: CartStore (334 lines) deleted. `useCartQuery`
      derives products/totals/promo from the cached Cart; all mutations
      update the cache from the server response — the cart-version race
      class is dead (no cartId/cartVersion in localStorage). The duplicated
      `productsInCartSku` Set is gone. `useCartActions` facade keeps the
      legacy call shape for Card/CurrentProduct until phase 5.
- [x] **3.4** Done 2026-06-13: `useMeQuery` + `useUpdateProfileMutation`
      replace userProfile / getUserProfile / the 148-line action switch
      (collapsed into an action→service map; the stringly-typed form
      contract dies in phase 4). Edit-mode flag is page-local state.
- [x] **3.5** Done 2026-06-13: minimal toast bus (`queries/notifications.ts`);
      cart/profile mutations emit the legacy success/error strings; SnackBar
      subscribes. NOTE: catalog/product *query* errors no longer toast
      ('Error fetching products' died with the stores) — page-level error
      states are a phase 5/6 UX item.
- [x] **3.6** Done 2026-06-13: remaining client state on Zustand 5 —
      `stores/theme.ts` (darkMode) and `stores/authStore.ts` (loggedIn,
      registration wizard accumulator [dies in phase 4], login/signup/logout,
      error/success strings [die in phase 4]). **mobx and mobx-react-lite
      uninstalled**; all 23 observer() wrappers removed.
- [x] E2E suite green: 11/11, twice, after every slice.
- [ ] Update `PROGRESS.md`; PR into `develop`.

## Exit criteria

`src/stores/` contains only client state (theme, auth) + pure helpers and
types; no `mobx` in package.json; e2e green; catalog state shareable via URL.
