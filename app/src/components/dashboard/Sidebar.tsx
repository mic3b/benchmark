import type { ReactNode } from 'react'
import {
  DashboardIcon,
  InfoIcon,
  KanbanIcon,
  ProfileIcon,
  ShopIcon,
  SignInIcon,
  TableIcon,
} from '../icons'

type NavId = 'dashboard' | 'marketplace' | 'tables' | 'kanban' | 'profile' | 'sign-in'

const NAV: { id: NavId; label: string; icon: ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'marketplace', label: 'NFT Marketplace', icon: <ShopIcon /> },
  { id: 'tables', label: 'Tables', icon: <TableIcon /> },
  { id: 'kanban', label: 'Kanban', icon: <KanbanIcon /> },
  { id: 'profile', label: 'Profile', icon: <ProfileIcon /> },
  { id: 'sign-in', label: 'Sign In', icon: <SignInIcon /> },
]

type Props = { active?: NavId }

export function Sidebar({ active = 'dashboard' }: Props) {
  return (
    <aside className="hidden w-[290px] shrink-0 border-r border-line bg-white px-2 py-9 lg:flex lg:flex-col">
      <div className="flex items-center gap-2 px-7 pb-9">
        <span className="text-2xl font-bold text-heading">HORIZON</span>
        <span className="text-2xl font-medium text-heading">FREE</span>
      </div>
      <div className="mx-7 mb-6 h-px bg-line" />

      <nav className="flex flex-1 flex-col gap-1">
        {NAV.map((item) => (
          <SidebarItem key={item.id} {...item} active={item.id === active} />
        ))}
      </nav>

      <UpgradeCard />
    </aside>
  )
}

function SidebarItem({ icon, label, active }: { icon: ReactNode; label: string; active: boolean }) {
  return (
    <a
      href="#"
      className={`group flex items-center gap-4 px-7 py-2.5 text-sm transition ${
        active ? 'font-bold text-heading' : 'font-medium text-muted hover:text-heading'
      }`}
    >
      <span className={`flex size-6 items-center justify-center ${active ? 'text-brand' : ''}`}>
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      {active && <span className="h-7 w-1 rounded-full bg-brand" aria-hidden />}
    </a>
  )
}

function UpgradeCard() {
  return (
    <div className="mx-3 mt-6 rounded-3xl bg-gradient-to-br from-brand-light to-brand px-5 py-6 text-white">
      <div className="mb-4 flex justify-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-white/20">
          <InfoIcon />
        </div>
      </div>
      <p className="mb-4 text-center text-sm">
        <span className="font-bold">Upgrade to PRO</span>
        <br />
        <span className="text-xs opacity-90">
          to get access to all features! Connect with Venus World!
        </span>
      </p>
    </div>
  )
}
