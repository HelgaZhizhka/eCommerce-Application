# YES CODE — eCommerce SPA

Single-page storefront for a merch shop, backed by [Commercetools](https://commercetools.com/).
Originally an RS School 2023 project, migrated to a modern stack (see
[`docs/refactor/`](docs/refactor/)).

**Live:** https://yes-code-merch.netlify.app/

## Stack

| Area        | Tech                                                                 |
| ----------- | -------------------------------------------------------------------- |
| Build       | **Vite 7**                                                           |
| UI          | **React 19** · **TypeScript 5.9** (strict)                           |
| Server state| **TanStack Query 5**                                                 |
| Client state| **Zustand 5** (theme, auth)                                          |
| Forms       | **react-hook-form** + **zod 4**                                      |
| Commerce SDK| **@commercetools/ts-client v4** + a small **BFF** (Netlify Functions)|
| Styling     | **Tailwind CSS 4** + **Radix UI** primitives + **lucide-react** icons|
| Carousels   | **Swiper**                                                           |
| Routing     | **react-router-dom 6** (route-level code splitting)                  |
| Tests       | **Vitest** (unit) · **Playwright** (e2e)                             |
| Tooling     | **ESLint 9** (flat config) · Prettier · Husky + lint-staged          |

## Architecture

The browser bundle never holds the Commercetools client secret. Auth/token
exchange runs server-side in **Netlify Functions** (`netlify/functions/*`, the
"BFF"); the SPA talks to those functions and to the CT API with the resulting
token. See [ADR-0001](docs/adr/0001-bff-for-commercetools-auth.md).

```
src/
  pages/        route screens (lazy-loaded)
  components/   UI components + baseComponents/ (shared primitives, RHF adapters)
  queries/      TanStack Query hooks (catalog, cart, categories, auth)
  stores/       Zustand stores + cart/product helpers
  schemas/      zod form schemas + validation rules
  shared/       cross-cutting libs (cn, useMediaQuery, …)
  services/     CT client setup
  styles/       tailwind.css (the single styling entry)
netlify/
  functions/    auth BFF (anonymous / login / logout / refresh / visitor)
```

## Prerequisites

- **Node 22** (see `.nvmrc` — `nvm use`)
- A Commercetools project + an API client (Merchant Center → Settings →
  Developer settings; use a **Mobile & single-page application** template client)

## Setup

```bash
nvm use            # Node 22
npm ci
cp .env.example .env   # then fill in the values
```

`.env` keys are documented in [`.env.example`](.env.example):
- **Browser** (`VITE_*`) — project key + region API host. No secrets.
- **Server-side** (`CTP_*`) — client id/secret/scopes, used only by the Netlify
  Functions. Locally `netlify dev` injects them; in production set them in the
  Netlify UI. **Never commit `.env`.**

## Run locally

```bash
npx netlify dev        # full app incl. the auth BFF — http://localhost:8888
# or, frontend only (auth/BFF won't work):
npm run dev            # http://localhost:3000
```

## Scripts

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Vite dev server (frontend only)               |
| `npm run build`     | Production build → `build/` (+ SPA redirect)  |
| `npm run preview`   | Serve the production build locally            |
| `npm test`          | Unit tests (Vitest, single run)               |
| `npm run test:watch`| Unit tests in watch mode                      |
| `npm run typecheck` | `tsc --noEmit` (app + `netlify/`)             |
| `npm run eslint`    | Lint · `npm run eslint:fix` to autofix        |
| `npm run prettier`  | Format the repo                               |
| `npx playwright test` | End-to-end tests                            |

## Testing

- **Unit** — Vitest (`npm test`).
- **E2E** — Playwright (`npx playwright test`); the config boots `netlify dev`
  on port 8888 as the test server.
- **Full gate** — [`./scripts/verify.sh`](scripts/verify.sh) runs install +
  typecheck + lint + unit + e2e. CI (`.github/workflows/ci.yml`) runs the same
  minus e2e on every PR and push to `develop`/`main`.

## Deployment

Hosted on **Netlify**. The build command is `npm run build` (publish dir
`build/`); the auth BFF deploys alongside as Netlify Functions. Set the `CTP_*`
environment variables in the Netlify site settings.

## Documentation

- [`docs/refactor/`](docs/refactor/) — the migration plan, per-phase checklists,
  and progress log.
- [`docs/adr/`](docs/adr/) — architecture decision records (BFF, TanStack Query,
  UI kit).

## Pages

Login · Registration · Main · Catalog · Product · Profile · Basket · About Us · Sale
