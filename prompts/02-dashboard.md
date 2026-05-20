# Prompt 02 — Main Dashboard

## What we did

Convert the **Main Dashboard** screen from the Horizon UI Figma file into a React + Tailwind page composed of the major sections shown in the design.

## Source

- **Figma node id:** `201:1804`
- **Figma render:** `screenshots/figma-dashboard.png` (498 KB, 1800×1624)
- **Result render:** `screenshots/result-dashboard.png`

## Conversational prompt (what I'd ask the model)

> The Main Dashboard at Figma node `201:1804` is large — `get_design_context` will refuse the full dump. Use the screenshot as the source of truth instead. Compose a single `Dashboard.tsx` with: sidebar (logo + 6 nav items + upgrade card), top bar (breadcrumb + title + search + icons + avatar), 6 stat cards in a row, a line chart card ("This month $37.5K"), a bar chart card ("Weekly Revenue"), a Check Table card with 5 rows, a Daily Traffic stat card with mini bar chart, a Pie Chart card with legend, a Tasks list, and an April calendar with day 14 highlighted. Keep the design tokens consistent with the Sign In screen (already extracted to `tokens/tokens.json`). Charts can be static SVG approximations — don't pull in a chart library.

## MCP calls used (12 total, across 3 passes)

```text
get_screenshot(fileKey, nodeId="201:1804", maxDimension=1800)
# → 1800x1624 PNG of the full dashboard, saved to screenshots/figma-dashboard.png.
#   This becomes our visual ground truth.

get_design_context(fileKey, nodeId="201:1804", excludeScreenshot=true)
# → returned a "design too large" stub:
#   "IMPORTANT: The design was too large to fit into context with
#    get_design_context. Instead you have received a sparse metadata response,
#    you MUST call get_design_context on the IDs of the sublayers to get the
#    full code. Split up the calls to ensure the sublayers do not also exceed
#    the context limit."
#   → The metadata XML lists every frame id (sidebar, stat cards, charts...)
#     but no per-element code. We deliberately stopped drilling — the
#     screenshot was enough for a faithful semantic re-implementation.

get_variable_defs(fileKey, nodeId="201:1804")
# → {"Secondary/Grey/300":"#F4F7FE"}
#   → only one Figma variable defined on this node. Tokens were
#     reconstructed by hand from the Sign In design-context response.

# --- second pass: the first dashboard render missed the entire
# bottom row and the Complex Table. We re-extracted by drilling
# into the named sub-frames the metadata XML had revealed:

get_design_context(fileKey, nodeId="201:1971")   # Large_Complex Table
# → 4 rows: Horizon UI PRO / Free / Marketplace / Weekly Updates
#   with statuses (Approved / Disable / Error) + per-row progress bar widths

get_design_context(fileKey, nodeId="201:2079")   # Medium_Cashback (Starbucks)
# → photo bg + gradient overlay + circular logo + "10% cashback & off"

get_design_context(fileKey, nodeId="201:2049")   # Medium_Team
# → Adela Parkson / Christian Mad / Jason Statham + roles + avatar URLs

get_design_context(fileKey, nodeId="201:2071")   # Medium_Safety
# → credit card icon + headline "Control card security in-app with a tap"
#   + purple "Cards" CTA

get_design_context(fileKey, nodeId="201:2028")   # Medium_Course CTA
# → "Business Design / New lession is available / What do you need to know
#   to create better products?" + 85 mins + Video format + 4 avatars + 18+

# --- third pass: visualizations and icons still off. Pulled per-component
# screenshots and hand-rolled SVG visuals that mirror what they show.

get_screenshot(fileKey, nodeId="201:1835")   # Large_Double Chart2 → This Month
# → revealed two clean lines (no gradient fill) + "$108.00" hover badge with
#   a white pin circle at the peak + SEP/OCT/NOV/DEC/JAN/FEB labels.
#   Previous version had been a single wavy line with heavy gradient fill.

get_screenshot(fileKey, nodeId="201:1866")   # Consumption per Day → Weekly Revenue
# → revealed 9 STACKED tri-color bars (purple bottom / cyan middle / pale
#   capsule top) labeled 17..25. Previous version had been paired side-by-
#   side bars — wrong shape entirely.

get_screenshot(fileKey, nodeId="201:1918")   # Medium_Traffic → Daily Traffic
# → revealed 7 SINGLE bars with a vertical purple→transparent gradient and
#   time-of-day labels (00, 04, 08, 12, 14, 16, 18). Previous version
#   re-used the Weekly Revenue chart, which had the wrong axis labels.

get_screenshot(fileKey, nodeId="201:1809")   # Frame 11 → stat-cards row
# → revealed the 6 actual icons (bar chart / dollar / dollar-white-on-
#   gradient / US flag with caret / check+plus on cyan→blue gradient /
#   folder) plus the missing "+23% since last month" subtext on Sales.
#   Previous version had used emoji placeholders.
```

## Strategy — why we didn't drill further

The Figma MCP exposes a 7-day-cached, screenshot-rich view of the design. For
**small components** (`Sign In`) a single `get_design_context` call returns
both reference code and a screenshot — generation is mostly transcription.

For **complex screens** (`Main Dashboard`, ~30 sub-frames, multiple charts and
tables), drilling section-by-section would cost 8–12 MCP calls and produce a
nest of absolute-positioned React that no human would maintain. The faster,
saner workflow is:

1. **One `get_screenshot` call** → ground truth.
2. **One `get_variable_defs` or `get_design_context` call** → tokens you don't
   already have.
3. **Write the layout semantically** from the screenshot, using the tokens
   already in `tokens/tokens.json`.

This trade-off is the whole point of the benchmark: the MCP is most valuable
for tokens, assets, and small components — and for **anchoring** larger
implementations to a known-good visual reference.

## Result

- **Code:** `app/src/screens/Dashboard.tsx`
- **Render:** `screenshots/result-dashboard.png`

## Lesson from the fidelity pass

The first version of this dashboard missed two whole sections (Complex Table,
bottom row of 4 cards). Reason: I stopped at the "design too large" stub of
`get_design_context` and wrote the page from the screenshot — which is fine,
but the screenshot resolution + my own attention budget meant entire sub-cards
slipped through.

**The fix:** the metadata XML that came back with the stub already lists every
sub-frame by name (`Large_Complex Table`, `Medium_Team`, `Medium_Cashback`,
`Medium_Safety`, `Medium_Course CTA`, …). Five extra `get_design_context`
calls against the IDs we wanted gave us:

- exact text content (e.g. *"Discover our cards benefits, with one tap."*)
- exact progress-bar widths per row (78px / 42px / 92px / 59px out of 108px)
- exact asset URLs for backgrounds and avatars

**Generalizable rule:** for big screens, the workflow is now
`screenshot → first draft → diff against the screenshot → drill into named
sub-frames for the parts you got wrong.` The metadata XML is your map for
where to drill.

The third pass is the same rule applied at a finer grain. We had the right
layout and the right copy, but the *visual shapes* (line chart vs stacked
bars vs gradient bars) still diverged from Figma. Pulling per-chart
screenshots was enough — we didn't need their reference code, just a clear
visual ground truth to mirror with hand-rolled SVG.

## Fidelity note

The implementation contains minor visual differences from the Figma source. None of them affect the UX.

## Acknowledged simplifications

- Line / bar / pie charts are static, hand-rolled SVGs that mirror the Figma
  shapes — no animation, no live data binding. Production would swap in
  recharts, apexcharts, or similar and feed real data.
- The 4 colourful avatars in the Course CTA card are hand-tuned gradients
  rather than the original Unsplash photos (the photos came back as 4096px
  JPEGs totalling ~28 MB — wildly disproportionate for a benchmark repo).
- Body font is system-ui rather than `DM Sans` to keep the repo dep-free.
  Some `Spend this month` / `Total Projects` labels therefore wrap to two
  lines inside the 248px stat-card width; DM Sans Medium is ~3% narrower
  and would fit on one line.
