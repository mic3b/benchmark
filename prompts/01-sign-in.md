# Prompt 01 — Sign In screen

## What we did

Convert the **Sign In** screen from the Horizon UI Figma file into a clean React + Tailwind component.

## Source

- **Figma file:** Horizon UI – Trendiest Open Source Admin Template
- **Node id:** `101:9004`
- **Figma render:** `screenshots/figma-sign-in.png`

## Conversational prompt (what I'd ask the model)

> Convert the Sign In screen (Figma node `101:9004`) into a React component using Tailwind v4. Save it to `app/src/screens/SignIn.tsx`. Use semantic flex/grid layout instead of absolute positioning. Keep the Figma color tokens exact. Download the gradient background, Horizon logo (SVG) and Google "G" icon, drop them into `app/src/assets/`, then reference them via Vite imports.

## MCP calls used (2)

```text
get_design_context(fileKey, nodeId="101:9004")
# → returns: reference React+Tailwind code, screenshot URL,
#   variable names (Primary/Purple Blue/500: #4318FF, Secondary/Grey/600: #A3AED0, ...),
#   asset URLs for: bg gradient, Horizon logo, Google icon, eye icon, separator lines, etc.,
#   Chakra docs links for Button/Checkbox components.

get_screenshot(fileKey, nodeId="101:9004", maxDimension=1600)
# → 1600x960 PNG of the rendered design, saved to screenshots/figma-sign-in.png
```

## Manual adaptation steps

1. **Read the reference code as a hint, not as the final output.** The MCP returns a literal absolute-positioned layout (every text/element placed by `left/top` in pixels). That's faithful but not maintainable.
2. **Rewrite as semantic layout:** `grid grid-cols-[1fr_min(50%,960px)]` for the page; a centered `<form>` block on the left; the right side as a relatively-positioned panel with the gradient as a background `<img>` layer.
3. **Keep the design tokens exact.** Don't approximate — `#4318ff` is the Horizon brand purple, not "indigo-600". Spacing (`h-[50px]`, `rounded-2xl`) likewise.
4. **Download Figma asset URLs to disk.** Asset URLs from MCP are short-lived (7 days). `curl -o app/src/assets/bg-gradient.png <url>` for each, then import in TSX.
5. **Fix the logo SVG.** The MCP-exported SVG had `preserveAspectRatio="none" width="100%" height="100%"` and `fill="var(--fill-0, white)"`. Both confuse browsers when loaded via `<img>`. Replace with explicit `width="280" height="375"` and `fill="white"`.

## Fidelity note

The implementation contains minor visual differences from the Figma source. None of them affect the UX.

## Result

- **Code:** `app/src/screens/SignIn.tsx`
- **Render:** `screenshots/result-sign-in.png`

## Gotchas (worth knowing before you try this)

1. **Figma assets aren't always the right format for the filename.** The MCP returned `imgHorizonLogo` with a URL — I assumed PNG, but it was an SVG. `file` revealed the truth, then I renamed and re-imported.
2. **Asset URLs in design context expire in 7 days.** Persist them locally immediately, otherwise the prompt is non-reproducible.
3. **MCP reference code uses Chakra-era patterns.** Horizon UI's Figma still references Chakra docs (`chakra-ui.com/docs/form/button`). MCP surfaces this in `Component descriptions` — treat as historical context, not a constraint.
4. **The `data-node-id` attributes the MCP injects** are useful while iterating: you can grep `SignIn.tsx` for a node-id and find which DOM element maps to which Figma layer. Strip them before shipping production code.
