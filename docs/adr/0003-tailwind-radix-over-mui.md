# ADR-0003: UI — Tailwind 4 + Radix + lucide (replacing MUI + SCSS modules)

- **Status:** Accepted (2026, phase 5)
- **Context**

  The UI ran **three** parallel styling systems: SCSS modules, MUI components,
  and MUI `sx` props. MUI + emotion added a sizeable runtime to the bundle, and
  the SCSS modules duplicated tokens already defined as CSS variables. The two
  candidates were "stay on MUI 7" or "Tailwind 4 + a headless primitive set".

- **Decision**

  Adopt **Tailwind CSS 4** (utility-first) as the single styling system, with:
  - **Radix UI** unstyled primitives where real interaction logic is needed
    (Slider, Dialog, Select) — wrapped in shared `baseComponents/{Button,Select,
    Dialog}` + RHF adapters;
  - **lucide-react** for icons;
  - design tokens as CSS variables in a single `src/styles/tailwind.css`.

  The migration was an **engine swap that kept the look 1:1**, verified visually
  per component group. Tailwind **preflight is intentionally not enabled** — the
  app relied on browser defaults + a normalize block, so enabling preflight would
  have reset headings/lists/links app-wide (not 1:1); the normalize block is kept
  and minimal `a`/`button` resets reproduce the bits MUI's CssBaseline provided.

- **Consequences**

  - One styling system in the tree: **0 `.scss` files**; `sass` and `classnames`
    removed; MUI + emotion uninstalled (smaller bundle, no emotion runtime).
  - `*Mobile` component forks collapsed into adaptive components.
  - Trade-off: more utility classes in markup, and a non-standard "preflight off"
    setup that future contributors must be aware of (documented in
    `tailwind.css`).
