import { Sidebar } from '../components/dashboard/Sidebar'
import { TopBar } from '../components/dashboard/TopBar'
import { StatCardsRow } from '../components/dashboard/StatCards'
import { ChartsRow, DailyTrafficCard, PieChartCard, Tasks, Calendar } from '../components/dashboard/Widgets'
import { CheckTable, ComplexTable } from '../components/dashboard/Tables'
import { BottomCards } from '../components/dashboard/BottomCards'

/**
 * Main Dashboard composition. Each section lives in its own file under
 * `components/dashboard/` — this file is intentionally thin so the page
 * layout is visible at a glance.
 *
 * Grid proportions on rows 3 and 4 match the Figma frames:
 *   `Large_*` frames span 2 columns, `Medium_*` frames span 1, total 4.
 */
export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-page">
      <Sidebar active="dashboard" />

      <main className="flex-1 px-8 pt-9 pb-12">
        <TopBar title="Main Dashboard" />

        <StatCardsRow />

        <ChartsRow />

        <section className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-4">
          <CheckTable />
          <DailyTrafficCard />
          <PieChartCard />
        </section>

        <section className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-4">
          <ComplexTable />
          <Tasks />
          <Calendar />
        </section>

        <BottomCards />
      </main>
    </div>
  )
}
