# ADR-0001: Auth via a BFF (Netlify Functions)

- **Status:** Accepted (2026, phase 2)
- **Context**

  The 2023 app used the Commercetools **client-credentials** flow directly from
  the browser, so the `clientSecret` shipped inside the JS bundle — public to
  anyone since 2023. Commercetools explicitly flags client credentials from a
  browser as a vulnerability, and the SPA guidance is to keep the secret on a
  server.

- **Decision**

  Introduce a thin **Backend-for-Frontend** as **Netlify Functions**
  (`netlify/functions/auth-*`). The functions perform the token exchange
  (anonymous / login / refresh / logout / visitor) using the `CTP_*` secrets,
  which live only in server-side env (`netlify dev` locally, Netlify env vars in
  prod). The browser receives tokens and talks to the CT API with
  `@commercetools/ts-client` v4; `VITE_*` env holds only the public project key
  and region host.

- **Consequences**

  - The secret is out of the browser bundle (verified by grep over the prod
    build → 0 occurrences).
  - A small serverless layer to maintain — but the functions are tiny
    (token exchange only) and deploy alongside the SPA on Netlify, so no extra
    infrastructure.
  - Local dev requires `netlify dev` (not bare `vite`) for auth to work.
  - Replaces the deprecated `sdk-client-v2`.
