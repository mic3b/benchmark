import { Card, Checkbox, MoreButton, BarChartButton } from '../ui'
import { ChevronIcon, MoreVertIcon } from '../icons'
import {
  DailyTrafficChart,
  PieChart as PieChartSvg,
  ThisMonthLineChart,
  WeeklyRevenueChart,
} from '../charts'

/* ------------------------------------------------------------------ */
/* "This Month" + "Weekly Revenue" — top two-column charts row        */
/* ------------------------------------------------------------------ */

export function ChartsRow() {
  return (
    <section className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
      <Card>
        <div className="mb-4 flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-lg bg-page px-3 py-1.5 text-xs font-medium text-muted">
              📅 This month
            </span>
            <p className="mt-4 text-4xl font-bold text-heading">$37.5K</p>
            <p className="mt-1 text-sm text-muted">
              Total Spent <span className="font-bold text-ok">▲ +2.45%</span>
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-ok">
              <CheckBadge /> On track
            </p>
          </div>
          <BarChartButton />
        </div>
        <ThisMonthLineChart />
      </Card>

      <Card>
        <div className="mb-4 flex items-start justify-between">
          <p className="text-xl font-bold text-heading">Weekly Revenue</p>
          <BarChartButton />
        </div>
        <WeeklyRevenueChart />
      </Card>
    </section>
  )
}

function CheckBadge() {
  return (
    <svg viewBox="0 0 24 24" className="size-5">
      <circle cx="12" cy="12" r="10" fill="#01b574" />
      <path d="M8 12l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Daily Traffic stat card                                            */
/* ------------------------------------------------------------------ */

export function DailyTrafficCard() {
  return (
    <Card>
      <div className="mb-1 flex items-start justify-between">
        <p className="text-sm text-muted">Daily Traffic</p>
        <span className="text-sm font-bold text-ok">▲ +2.45%</span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-heading">2.579</span>
        <span className="pb-1 text-sm text-muted">Visitors</span>
      </div>
      <div className="mt-4">
        <DailyTrafficChart />
      </div>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* Pie Chart card                                                     */
/* ------------------------------------------------------------------ */

export function PieChartCard() {
  return (
    <Card>
      <div className="mb-4 flex items-start justify-between">
        <p className="text-lg font-bold text-heading">Your Pie Chart</p>
        <select className="rounded-lg bg-page px-2 py-1 text-xs font-bold text-heading">
          <option>Monthly</option>
        </select>
      </div>
      <div className="flex justify-center">
        <PieChartSvg />
      </div>
      <div className="mt-6 flex items-center justify-around rounded-2xl border border-line py-3">
        <Legend dotColor="bg-brand" label="Your files" value="63%" />
        <div className="h-8 w-px bg-line" aria-hidden />
        <Legend dotColor="bg-accent-sky" label="System" value="25%" />
      </div>
    </Card>
  )
}

function Legend({ dotColor, label, value }: { dotColor: string; label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="mb-1 flex items-center justify-center gap-2 text-xs text-muted">
        <span className={`size-2 rounded-full ${dotColor}`} /> {label}
      </div>
      <p className="text-base font-bold text-heading">{value}</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Tasks                                                              */
/* ------------------------------------------------------------------ */

const TASKS = [
  { label: 'Landing Page Design', done: true },
  { label: 'Dashboard Builder', done: true },
  { label: 'Mobile App Design', done: false },
  { label: 'Illustrations', done: false },
  { label: 'Promotional LP', done: false },
]

export function Tasks() {
  return (
    <Card>
      <div className="mb-4 flex items-start justify-between">
        <p className="text-xl font-bold text-heading">Tasks</p>
        <MoreButton />
      </div>
      <ul className="flex flex-col gap-4">
        {TASKS.map((t) => (
          <li key={t.label} className="flex items-center gap-3 text-heading">
            <Checkbox defaultChecked={t.done} />
            <span className="flex-1 text-sm font-bold">{t.label}</span>
            <button aria-label="Task options" className="text-muted">
              <MoreVertIcon />
            </button>
          </li>
        ))}
      </ul>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* Mini calendar                                                      */
/* ------------------------------------------------------------------ */

type CalendarProps = { month?: string; year?: number; today?: number; muted?: number }

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export function Calendar({ month = 'April', year = 2021, today = 14, muted = 28 }: CalendarProps = {}) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1)
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <p className="flex items-center gap-1 text-xl font-bold text-heading">
          {month}
          <ChevronIcon className="size-4 text-muted" />
        </p>
        <span className="text-sm text-muted">{year}</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {WEEKDAYS.map((d, i) => (
          <span key={i} className="font-medium text-muted">{d}</span>
        ))}
        {days.map((d) => (
          <span
            key={d}
            className={`flex size-8 items-center justify-center rounded-full text-heading ${
              d === today ? 'bg-brand font-bold text-white' : ''
            } ${d === muted ? 'bg-page font-bold' : ''}`}
          >
            {d}
          </span>
        ))}
      </div>
    </Card>
  )
}
