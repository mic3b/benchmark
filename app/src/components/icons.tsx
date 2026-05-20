import type { SVGProps } from 'react'
import { color } from '../lib/tokens'

type IconProps = SVGProps<SVGSVGElement>

const base = (props: IconProps): IconProps => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  ...props,
  className: props.className ?? 'size-5',
})

/* ------------------------------------------------------------------ */
/* UI / nav / utility icons — currentColor so parents can recolour    */
/* ------------------------------------------------------------------ */

export function DashboardIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M3 13l9-9 9 9M5 11v9h4v-6h6v6h4v-9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

export function ShopIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M3 9l1-4h16l1 4M3 9v10a1 1 0 001 1h16a1 1 0 001-1V9M3 9h18M9 13h6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

export function TableIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10h18M9 5v14" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export function KanbanIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="3" y="4" width="5" height="16" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="10" y="4" width="5" height="10" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="17" y="4" width="5" height="13" rx="1" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export function ProfileIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M4 21a8 8 0 0116 0" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export function SignInIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function SearchIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function BellIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9zM10 21a2 2 0 004 0" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

export function MoonIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M21 13A9 9 0 1111 3a7 7 0 0010 10z" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export function InfoIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v.01M11 12h1v4h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function MoreHorizIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="5" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="19" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function MoreVertIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function AddCircleIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function ChevronIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function EyeIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export function BarChartIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M6 20V10M12 20V4M18 20v-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Status icons (Complex Table)                                       */
/* ------------------------------------------------------------------ */

export function CheckCircleIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={p.className ?? 'size-5'} {...p}>
      <circle cx="12" cy="12" r="10" fill={color.statusOk} />
      <path d="M8 12l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export function CancelIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={p.className ?? 'size-5'} {...p}>
      <circle cx="12" cy="12" r="10" fill={color.statusBad} />
      <path d="M8 8l8 8M16 8l-8 8" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function ErrorTriangleIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={p.className ?? 'size-5'} {...p}>
      <path d="M12 3l10 17H2L12 3z" fill={color.statusWarn} />
      <path d="M12 10v4M12 17v.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Inline metadata icons used in card content                         */
/* ------------------------------------------------------------------ */

export function FireIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={p.className ?? 'size-7'} {...p}>
      <path d="M12 2c1 4 4 5 4 9a4 4 0 11-8 0c0-2 1-3 2-4 0 2 1 3 2 3-1-2-1-5 0-8z" fill={color.statusBad} />
    </svg>
  )
}

export function TimerIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M12 9v4l3 2M9 2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function VideoIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
    </svg>
  )
}

export function FastfoodIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M4 11h16l-2 8H6l-2-8zM6 11V8a3 3 0 016 0M12 11V7a3 3 0 016 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function ClockIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Stat-card icons (top row of dashboard, Figma node 201:1809)        */
/* ------------------------------------------------------------------ */

export function EarningsIcon(p: IconProps) {
  return (
    <svg {...base({ className: 'size-6', ...p })}>
      <path d="M5 21V11M12 21V3M19 21v-6" stroke={color.brand} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function DollarIcon({ color: c = color.brand, ...p }: IconProps & { color?: string }) {
  return (
    <svg {...base({ className: 'size-6', ...p })}>
      <path
        d="M16 8a4 4 0 00-4-4M8 16a4 4 0 004 4M12 4v16M16 13a4 4 0 01-8 0M8 9a4 4 0 018 0"
        stroke={c}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function FlagUsIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 36 36" className={p.className ?? 'size-9'} {...p}>
      <defs>
        <clipPath id="flag-us-clip">
          <circle cx="18" cy="18" r="17" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-us-clip)">
        <rect width="36" height="36" fill="#fff" />
        {[0, 2, 4, 6, 8, 10, 12].map((i) => (
          <rect key={i} y={i * 2.6} width="36" height="2.6" fill="#bf0a30" />
        ))}
        <rect width="18" height="18.2" fill="#002868" />
      </g>
      <circle cx="18" cy="18" r="17" fill="none" stroke={color.border} strokeWidth="1" />
    </svg>
  )
}

export function NewTasksIcon(p: IconProps) {
  return (
    <svg {...base({ className: 'size-6 text-white', ...p })}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18.5" cy="5.5" r="2.5" fill="currentColor" />
      <path d="M18.5 4v3M17 5.5h3" stroke={color.accentSky} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function ProjectsIcon(p: IconProps) {
  return (
    <svg {...base({ className: 'size-6', ...p })}>
      <path
        d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
        stroke={color.brand}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M7 11h10" stroke={color.brand} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
