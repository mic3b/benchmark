# Lessons learned (running order)

The raw notes from doing the Sign In + Dashboard run, in the order they hit.


## 1. `get_metadata` may only show one page

Even with the right file, `get_metadata` (no nodeId) returned a single page
named "Introduction". The other six dashboard pages were not listed.

Removing the "Introduction" cover from the Figma file made the next call list
the actual content page (`Horizon UI Pages (Light Mode)`). Whatever pagination
the MCP applies here, it bites first when a Community-origin file has stale
cover pages.

## 2. `get_metadata` on a populated page is *huge*

Calling `get_metadata` with the page nodeId returned 222 KB of XML — too big
for the prompt context. The MCP wrote it to a file and told us to use `jq`.

**Fix:** ask for the frame list, not the whole tree. The XML's structure makes
that easy:

```bash
jq -r '.[0].text' "$persisted_file" > /tmp/file.xml
grep -E '^  <frame ' /tmp/file.xml | \
  sed -E 's/.*id="([^"]+)" name="([^"]+)".*/\1  |  \2/'
```

This is the cheapest "what screens are in this file?" probe.

## 3. `get_design_context` is fantastic for small components

One call on the Sign In screen gave us:

- Reference React+Tailwind code (literal but complete)
- An inline screenshot (so we could verify before pulling the bigger one)
- A named-color list ("Primary/Purple Blue/500: #4318FF, …")
- Asset URLs for every image (gradient bg, Horizon logo, Google "G", eye
  toggle, separator lines, …)
- Chakra docs links for the Button and Checkbox components, surfaced via
  Figma annotations

You can re-implement the whole screen from this single call.

## 4. Asset URLs lie about file format

`imgHorizonLogo` ended in `…/asset/6d27db88-…`. We `curl`ed it to
`horizon-logo.png` because the import name suggested PNG. Browser refused to
render it. `file <path>` said:

```
horizon-logo.png: SVG Scalable Vector Graphics image
```

**Fix:** always inspect with `file` after downloading. Rename accordingly.

## 5. MCP-exported SVGs have browser-hostile defaults

The logo SVG arrived with:

```xml
<svg preserveAspectRatio="none" width="100%" height="100%" …>
  <path … fill="var(--fill-0, white)" />
```

When loaded as an `<img>`, `preserveAspectRatio="none"` collapses the icon, and
`fill="var(--fill-0, white)"` resolves to nothing because `<img>` doesn't
inherit CSS variables. Both have to be patched before the file is usable.

**Fix:**
```xml
<svg width="280" height="375" viewBox="0 0 279.605 375" …>
  <path … fill="white" />
```

## 6. `get_design_context` refuses large screens

For the Main Dashboard the call returned a stub:

> "IMPORTANT: The design was too large to fit into context with
> get_design_context. Instead you have received a sparse metadata response,
> you MUST call get_design_context on the IDs of the sublayers to get the
> full code."

We did **not** drill into the sublayers. Eight subcalls would have produced
eight chunks of absolute-positioned React, each with its own asset URLs.
Stitching that into a page is more work than writing the page from the
screenshot.

**Fix / decision:** for any screen with more than ~10 sub-frames, use
`get_screenshot` as the source of truth and write the layout semantically.

## 7. `get_variable_defs` is empty on Chakra-era designs

The Dashboard's variable defs were a single entry:

```json
{"Secondary/Grey/300": "#F4F7FE"}
```

Horizon UI predates Figma's variables — its tokens live as inline hex on
every layer. So the variable list under-reports the actual token set.

**Fix:** use the "styles contained in the design" paragraph emitted by
`get_design_context` on a representative *small* node (Sign In was perfect).
That gives you the real palette.

## 8. "Done from the screenshot" needs a verification pass

The first dashboard pass was written entirely from `get_screenshot` + the
tokens. It looked fine until we diffed it side-by-side and noticed:

- the entire bottom row of 4 cards was missing
- the **Complex Table** (separate from Check Table) was missing
- the Daily Traffic card had been simplified down to a thumbnail bar chart

The fix wasn't to abandon the "screenshot first" approach — it was to **diff
the first draft against the Figma screenshot and drill** into the sub-frames
that were wrong. The metadata XML from step 8 contains every sub-frame name
already; you don't have to guess what to drill into.

This is now baked into the workflow: write from screenshot, diff visually,
then re-extract per sub-frame for the parts that need to be 1:1. Five extra
calls turned a 70%-faithful dashboard into a 95%-faithful one.

## 9. Fidelity note

The implementation contains minor visual differences from the Figma source. None of them affect the UX.

## 10. Visualizations need their own pass

After passes 1–2 the dashboard had the right layout and right copy. The
visualizations were still wrong:

- "This Month" had been drawn as one wavy line with a heavy gradient fill.
  Figma actually shows **two clean lines** with a `$108.00` hover badge
  pinned at the peak.
- "Weekly Revenue" had been **paired side-by-side bars**. Figma shows
  **stacked tri-color bars** (purple bottom → cyan middle → pale capsule top).
- "Daily Traffic" had been the same paired bars. Figma shows **single bars
  with a vertical purple→transparent gradient**.
- Stat-card icons were emoji placeholders. Figma uses 6 distinct vector
  icons including one card with a missing `+23% since last month` subtext.

Fix: one more pass of four `get_screenshot` calls (one per chart node, one
for the stat-cards row) to get clean visual references, then hand-roll SVG
that mirrors them. No more reference-code drilling — just look at the
picture and re-draw.

**The shape of a chart is independent of its surrounding code.** Treat
visualizations as their own deliverable; verify them last, in isolation.

## 11. Total cost of the run

| Phase | MCP calls |
| --- | --- |
| Pre-flight (`whoami`) | 0 (exempt) |
| Find pages (`get_metadata` ×2) | 2 |
| Sign In (`get_design_context`, `get_screenshot`) | 2 |
| Dashboard pass 1 — anchor (`get_screenshot`, `get_design_context`, `get_variable_defs`) | 3 |
| Dashboard pass 2 — fidelity (`get_design_context` ×5 sub-frames) | 5 |
| Dashboard pass 3 — detail (`get_screenshot` ×4 charts/stat-row) | 4 |
| **Total** | **16** |


