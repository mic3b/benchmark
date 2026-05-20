import { color } from '../lib/tokens'

/**
 * Hand-rolled static SVG charts that mirror the Figma renders.
 * For a real product, replace with recharts / apexcharts / similar.
 *
 * Each component is pure: data goes in via props (with sensible defaults
 * matching the Figma sample data), markup comes out.
 */

/* ------------------------------------------------------------------ */
/* helpers                                                            */
/* ------------------------------------------------------------------ */

/** Smooth Bézier path through evenly-spaced x positions. */
function smoothPath(xs: readonly number[], ys: readonly number[]): string {
  if (xs.length !== ys.length || xs.length === 0) return ''
  let d = `M${xs[0]} ${ys[0]}`
  for (let i = 1; i < xs.length; i++) {
    const c = (xs[i - 1] + xs[i]) / 2
    d += ` C${c} ${ys[i - 1]}, ${c} ${ys[i]}, ${xs[i]} ${ys[i]}`
  }
  return d
}

/* ------------------------------------------------------------------ */
/* This Month — two smooth lines + hover badge                        */
/* ------------------------------------------------------------------ */

const DEFAULT_MONTHS = ['SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'] as const
const DEFAULT_LINE_TOP = [110, 100, 70, 95, 75, 60, 55] as const
const DEFAULT_LINE_BOT = [160, 165, 145, 155, 150, 130, 130] as const
const LINE_XS = [40, 130, 220, 310, 400, 490, 580] as const

type LineChartProps = {
  months?: readonly string[]
  top?: readonly number[]
  bottom?: readonly number[]
  /** Index in `top` to attach the hover badge to (defaults to peak). */
  peakIndex?: number
  peakLabel?: string
}

export function ThisMonthLineChart({
  months = DEFAULT_MONTHS,
  top = DEFAULT_LINE_TOP,
  bottom = DEFAULT_LINE_BOT,
  peakIndex = 2,
  peakLabel = '$108.00',
}: LineChartProps = {}) {
  const peakX = LINE_XS[peakIndex]
  const peakY = top[peakIndex]
  const lastX = LINE_XS[LINE_XS.length - 1]
  const monthStep = LINE_XS[1] - LINE_XS[0]

  return (
    <svg viewBox="0 0 620 220" className="h-48 w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="this-month-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color.brand} stopOpacity="0.08" />
          <stop offset="100%" stopColor={color.brand} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${smoothPath(LINE_XS, top)} L${lastX} 200 L${LINE_XS[0]} 200 Z`} fill="url(#this-month-fill)" />
      <path d={smoothPath(LINE_XS, bottom)} stroke={color.accentCyan} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d={smoothPath(LINE_XS, top)} stroke={color.brand} strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* hover badge */}
      <g>
        <rect x={peakX - 30} y={peakY - 38} width="60" height="22" rx="6" fill={color.brand} />
        <text x={peakX} y={peakY - 23} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
          {peakLabel}
        </text>
        <circle cx={peakX} cy={peakY} r="6" fill="white" stroke={color.brand} strokeWidth="3" />
      </g>
      {months.map((m, i) => (
        <text key={m} x={LINE_XS[i] + monthStep / 2} y={215} textAnchor="middle" fontSize="11" fill={color.textMuted} fontWeight="500">
          {m}
        </text>
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Weekly Revenue — 9 tri-color stacked bars                          */
/* ------------------------------------------------------------------ */

type StackedBarsProps = {
  labels?: readonly string[]
  heights?: readonly number[]
}

const DEFAULT_WEEKLY_LABELS = ['17', '18', '19', '20', '21', '22', '23', '24', '25'] as const
const DEFAULT_WEEKLY_HEIGHTS = [110, 130, 120, 140, 110, 125, 115, 130, 140] as const

export function WeeklyRevenueChart({
  labels = DEFAULT_WEEKLY_LABELS,
  heights = DEFAULT_WEEKLY_HEIGHTS,
}: StackedBarsProps = {}) {
  const barWidth = 26
  const slotWidth = 60
  const baseline = 180

  return (
    <svg viewBox="0 0 580 220" className="h-48 w-full" preserveAspectRatio="xMidYMid meet">
      {heights.map((h, i) => {
        const x = 30 + i * slotWidth
        const purpleH = h * 0.35
        const cyanH = h * 0.3
        const capH = h * 0.35
        const purpleY = baseline - purpleH
        const cyanY = purpleY - cyanH
        const capY = cyanY - capH
        return (
          <g key={labels[i]}>
            <rect x={x} y={capY} width={barWidth} height={capH + barWidth / 2} rx={barWidth / 2} fill={color.trackBg} />
            <rect x={x} y={cyanY} width={barWidth} height={cyanH} fill={color.accentCyan} />
            <rect x={x} y={purpleY} width={barWidth} height={purpleH} fill={color.brand} />
            {/* baseline mask so the bottom of the purple rect doesn't round */}
            <rect x={x} y={baseline} width={barWidth} height="2" fill="white" />
            <text x={x + barWidth / 2} y={205} textAnchor="middle" fontSize="14" fill={color.textMuted} fontWeight="500">
              {labels[i]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Daily Traffic — single vertical-gradient bars                      */
/* ------------------------------------------------------------------ */

const DEFAULT_TRAFFIC_LABELS = ['00', '04', '08', '12', '14', '16', '18'] as const
const DEFAULT_TRAFFIC_HEIGHTS = [85, 60, 130, 50, 95, 150, 40] as const

export function DailyTrafficChart({
  labels = DEFAULT_TRAFFIC_LABELS,
  heights = DEFAULT_TRAFFIC_HEIGHTS,
}: StackedBarsProps = {}) {
  const barWidth = 22
  const slotWidth = 50
  const baseline = 175

  return (
    <svg viewBox="0 0 380 210" className="h-48 w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="daily-traffic-bar" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color.brand} />
          <stop offset="100%" stopColor={color.brand} stopOpacity="0" />
        </linearGradient>
      </defs>
      {heights.map((h, i) => {
        const x = 18 + i * slotWidth
        const y = baseline - h
        return (
          <g key={labels[i]}>
            <rect x={x} y={y} width={barWidth} height={h + barWidth / 2} rx={barWidth / 2} fill="url(#daily-traffic-bar)" />
            <rect x={x} y={baseline} width={barWidth} height={barWidth} fill="white" />
            <text x={x + barWidth / 2} y={200} textAnchor="middle" fontSize="13" fill={color.textMuted} fontWeight="500">
              {labels[i]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Pie chart                                                          */
/* ------------------------------------------------------------------ */

export function PieChart() {
  return (
    <svg viewBox="0 0 200 200" className="size-44">
      <circle cx="100" cy="100" r="80" fill={color.brand} />
      {/* second slice — top quadrant */}
      <path d="M100 100 L100 20 A80 80 0 0 1 173 71 Z" fill={color.accentSky} />
      <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="2" />
    </svg>
  )
}
