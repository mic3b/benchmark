# Workflow — going from a Figma file to working code via the MCP

A generalized version of what the two prompt files (`prompts/01-sign-in.md`,
`prompts/02-dashboard.md`) demonstrate, in case you want to repeat the
exercise on your own design.


## 1. Inventory the file

```text
get_metadata(fileKey)           # lists the top-level pages
get_metadata(fileKey, nodeId)   # lists the frames inside a page
```

If `get_metadata` only returns one page when you expected more, the file
probably has stale pages from a Community origin (e.g. an "Introduction"
cover). Delete or hide them — the MCP listing seems to truncate aggressively.

## 2. Pick a target

Pick the smallest screen that exercises the design system (form fields,
buttons, typography). That gives you tokens + a complete component pattern in
one MCP call.

## 3. The small-component call

```text
get_design_context(fileKey, nodeId, clientFrameworks="react,vite",
                   clientLanguages="typescript,tsx,tailwindcss")
```

You get back:

- A literal React + Tailwind block with absolute positioning.
- An inline screenshot.
- A list of named colors used in the design (the "styles contained in the
  design" paragraph).
- Asset URLs for every image/SVG referenced by the design.
- Component descriptions where the designer attached docs links.

What to do with it:

1. **Don't copy the absolute-positioned code verbatim.** Use it as the
   structural reference; rewrite it with semantic Tailwind (flex/grid,
   responsive utilities, named tokens).
2. **Persist the assets immediately.** They expire in ~7 days.
3. **Verify each asset's true file format** (`file <path>`). Names lie.
4. **Capture the named colors** into a tokens file (`tokens.json` or
   `tokens.css`). These are the actual design tokens — anything not in the
   list is hex-inline in the original.

## 4. The big-screen call

For a dashboard or marketing page with many sections:

```text
get_screenshot(fileKey, nodeId, maxDimension=1800)   # ground truth
get_variable_defs(fileKey, nodeId)                   # what tokens this node uses
```

Optionally try `get_design_context` once, but expect a "design too large"
stub. **Do not drill into 8+ sublayers** — that is more expensive than
writing the page from the screenshot, and the resulting code is unmaintainable.

What to do with it:

1. Treat the screenshot as the visual ground truth.
2. Compose the page **semantically** — sidebar/topbar/grid sections — using
   the tokens you already extracted.
3. Approximate charts/maps with static SVG. Hook a real chart library only
   when product needs it.

## 5. Visual diff — and the fidelity passes

Run the app, screenshot the same node via Playwright, eyeball the two PNGs
side by side. The `scripts/screenshot*.mjs` files in this repo do exactly
that.

For a tighter loop, use [`figforge:verify`](https://github.com/figforge) or
pixelmatch — but for a benchmark, side-by-side PNGs in a README is the most
honest evidence.

Expect to iterate. The pattern that worked for the Horizon dashboard:

| Pass | Trigger | MCP calls |
| --- | --- | --- |
| **1 — anchor** | start of work | `get_screenshot` + `get_design_context` (page-level) + `get_variable_defs` |
| **2 — fidelity** | "the layout is right but I missed sections / details" | `get_design_context` per missing sub-frame (named in the pass-1 metadata XML) |
| **3 — detail** | "the chart shapes / icons still look wrong" | `get_screenshot` per visualization, then hand-roll SVG that mirrors it |

Each pass narrows the scope. You almost never need to drill the full design
tree.
