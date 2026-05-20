import type { ReactNode } from 'react'
import { Card } from '../ui'
import {
  ChevronIcon,
  DollarIcon,
  EarningsIcon,
  FlagUsIcon,
  NewTasksIcon,
  ProjectsIcon,
} from '../icons'

type StatCardProps = {
  icon: ReactNode
  label: string
  value: string
  iconBg?: string
  extra?: ReactNode
  rightSlot?: ReactNode
}

function StatCard({ icon, label, value, iconBg = 'bg-page', extra, rightSlot }: StatCardProps) {
  return (
    <Card padding="compact" className="flex items-center gap-3">
      <div className={`flex size-14 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1 text-xs font-medium text-muted">
          {label} {rightSlot}
        </div>
        <div className="truncate text-2xl font-bold text-heading">{value}</div>
        {extra}
      </div>
    </Card>
  )
}

export function StatCardsRow() {
  return (
    <section className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      <StatCard icon={<EarningsIcon />} label="Earnings" value="$350.4" />
      <StatCard icon={<DollarIcon />} label="Spend this month" value="$642.39" />
      <StatCard
        icon={<DollarIcon color="white" />}
        label="Sales"
        value="$574.34"
        iconBg="bg-gradient-to-br from-brand-light to-brand"
        extra={
          <p className="mt-0.5 text-[11px] font-bold text-muted">
            <span className="text-ok">+23%</span> since last month
          </p>
        }
      />
      <StatCard
        icon={<FlagUsIcon />}
        label="Your balance"
        value="$1,000"
        iconBg=""
        rightSlot={<ChevronIcon className="size-4 text-muted" />}
      />
      <StatCard
        icon={<NewTasksIcon />}
        label="New Tasks"
        value="154"
        iconBg="bg-gradient-to-br from-accent-sky to-brand"
      />
      <StatCard icon={<ProjectsIcon />} label="Total Projects" value="2935" />
    </section>
  )
}
