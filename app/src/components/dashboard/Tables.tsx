import type { ReactNode } from 'react'
import { Card, Checkbox, MoreButton } from '../ui'
import { CancelIcon, CheckCircleIcon, ErrorTriangleIcon } from '../icons'

/* ------------------------------------------------------------------ */
/* Check Table                                                        */
/* ------------------------------------------------------------------ */

type CheckRow = { name: string; progress: string; quantity: string; date: string }

const CHECK_ROWS: CheckRow[] = [
  { name: 'Horizon UI PRO', progress: '17.5%', quantity: '2.458', date: '24.Jan.2021' },
  { name: 'Horizon UI Free', progress: '10.8%', quantity: '1.485', date: '12.Jun.2021' },
  { name: 'Weekly Update', progress: '21.3%', quantity: '1.024', date: '5.Jan.2021' },
  { name: 'Venus 3D Asset', progress: '31.5%', quantity: '858', date: '7.Mar.2021' },
  { name: 'Marketplace', progress: '12.2%', quantity: '258', date: '17.Dec.2021' },
]

export function CheckTable() {
  return (
    <Card className="xl:col-span-2">
      <SectionHeader title="Check Table" />
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-muted">
            {['NAME', 'PROGRESS', 'QUANTITY', 'DATE'].map((h) => (
              <th key={h} className="border-b border-line pb-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-heading">
          {CHECK_ROWS.map((row) => (
            <tr key={row.name} className="font-bold">
              <td className="py-4">
                <label className="flex cursor-pointer items-center gap-3">
                  <Checkbox defaultChecked />
                  {row.name}
                </label>
              </td>
              <td>{row.progress}</td>
              <td>{row.quantity}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* Complex Table                                                      */
/* ------------------------------------------------------------------ */

type Status = 'approved' | 'disable' | 'error'

type ComplexRow = { name: string; status: Status; date: string; progress: number }

const COMPLEX_ROWS: ComplexRow[] = [
  { name: 'Horizon UI PRO', status: 'approved', date: '18 Apr 2021', progress: 72 },
  { name: 'Horizon UI Free', status: 'disable', date: '18 Apr 2021', progress: 39 },
  { name: 'Marketplace', status: 'error', date: '20 May 2021', progress: 85 },
  { name: 'Weekly Updates', status: 'approved', date: '12 Jul 2021', progress: 55 },
]

const STATUS: Record<Status, { icon: ReactNode; label: string }> = {
  approved: { icon: <CheckCircleIcon />, label: 'Approved' },
  disable: { icon: <CancelIcon />, label: 'Disable' },
  error: { icon: <ErrorTriangleIcon />, label: 'Error' },
}

export function ComplexTable() {
  return (
    <Card className="xl:col-span-2">
      <SectionHeader title="Complex Table" />
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-muted">
            {['NAME', 'STATUS', 'DATE', 'PROGRESS'].map((h) => (
              <th key={h} className="border-b border-line pb-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-heading">
          {COMPLEX_ROWS.map((row) => (
            <tr key={row.name} className="font-bold">
              <td className="py-4">{row.name}</td>
              <td>
                <span className="flex items-center gap-2">
                  {STATUS[row.status].icon}
                  {STATUS[row.status].label}
                </span>
              </td>
              <td>{row.date}</td>
              <td className="pr-4">
                <ProgressBar value={row.progress} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* shared header / progress bar                                       */
/* ------------------------------------------------------------------ */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-4 flex items-start justify-between">
      <p className="text-xl font-bold text-heading">{title}</p>
      <MoreButton />
    </div>
  )
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-[108px] rounded-full bg-track" role="progressbar" aria-valuenow={value}>
      <div className="h-full rounded-full bg-brand" style={{ width: `${value}%` }} />
    </div>
  )
}
