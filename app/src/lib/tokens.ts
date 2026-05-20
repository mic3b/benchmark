/**
 * Design tokens for use in TypeScript (SVG `fill` / `stroke` attrs in
 * `components/charts.tsx` and `components/icons.tsx`).
 *
 * The same values are declared as Tailwind utilities in `src/index.css`
 * under `@theme { ... }` — keep both in sync.
 */

export const color = {
  brand: '#4318ff',
  brandHover: '#3713cc',
  brandLight: '#868cff',
  accentSky: '#39b8ff',
  accentCyan: '#6ad2ff',

  textHeading: '#2b3674',
  textBody: '#707eae',
  textMuted: '#a3aed0',

  surfacePage: '#f4f7fe',
  surfaceChipHover: '#e9efff',
  surfaceChipDark: '#fafcfe',
  border: '#e0e5f2',
  trackBg: '#eff4fb',

  statusOk: '#01b574',
  statusWarn: '#ffce20',
  statusBad: '#ee5d50',
  statusBadSoft: '#feefee',

  overlayBottom: '#111c44',
} as const
