# Architecture Decision Records

Short records of the key decisions taken during the 2026 refactor. Format:
context → decision → consequences. Full rationale and alternatives live in
[`../../REFACTORING_PLAN.md`](../../REFACTORING_PLAN.md).

| ADR | Decision |
| --- | --- |
| [0001](0001-bff-for-commercetools-auth.md) | Auth via a BFF (Netlify Functions) — keep the Commercetools secret server-side |
| [0002](0002-tanstack-query-and-zustand-over-mobx.md) | Server state → TanStack Query; minimal client state → Zustand (replacing MobX) |
| [0003](0003-tailwind-radix-over-mui.md) | UI: Tailwind 4 + Radix + lucide (replacing MUI + SCSS modules) |
