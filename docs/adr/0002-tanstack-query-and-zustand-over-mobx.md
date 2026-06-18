# ADR-0002: TanStack Query + Zustand (replacing MobX)

- **Status:** Accepted (2026, phase 3)
- **Context**

  State lived in **4 MobX stores** (~1050 lines) that mixed two concerns:
  server data (products, cart, categories — fetched, cached, refetched) and
  genuine client state (theme, auth flag). MobX made the server-cache concern
  verbose and hand-rolled (manual loading/error flags, no dedupe/staleness).

- **Decision**

  Split state by ownership:
  - **Server state → TanStack Query 5** (`src/queries/*`): caching, request
    dedupe, background refetch, loading/error out of the box. Catalog
    filters/sort/page are encoded in the **URL** (shareable, back/forward
    friendly) and drive the queries.
  - **Client state → Zustand 5** (`src/stores/*`): only what isn't server data —
    theme and auth state. Cart math helpers stay as pure functions.

- **Consequences**

  - All 4 MobX stores removed; far less boilerplate.
  - Clear server/client boundary; catalog state is linkable via URL.
  - Cart version-race and other fetch races fixed by Query's request handling.
  - New dependency surface (TanStack Query) but it is the de-facto standard for
    server state in React.
