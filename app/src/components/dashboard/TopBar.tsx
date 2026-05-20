import { BellIcon, InfoIcon, MoonIcon, SearchIcon } from '../icons'

type Props = {
  breadcrumb?: string
  title: string
}

export function TopBar({ breadcrumb = 'Pages', title }: Props) {
  return (
    <header className="mb-9 flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-xs font-medium text-body">
          {breadcrumb} <span className="text-heading">/ {title}</span>
        </p>
        <h1 className="text-3xl font-bold text-heading">{title}</h1>
      </div>

      <div className="flex items-center gap-4 rounded-full bg-white px-4 py-2 shadow-card">
        <label className="flex items-center gap-2 rounded-full bg-page px-4 py-2">
          <SearchIcon className="size-4 text-muted" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-sm text-heading placeholder:text-muted outline-none"
          />
        </label>

        <button aria-label="Notifications" className="text-muted hover:text-heading">
          <BellIcon />
        </button>
        <button aria-label="Toggle theme" className="text-muted hover:text-heading">
          <MoonIcon />
        </button>
        <button aria-label="Info" className="text-muted hover:text-heading">
          <InfoIcon />
        </button>
        <div className="size-9 rounded-full bg-gradient-to-br from-violet-400 to-violet-700" aria-hidden />
      </div>
    </header>
  )
}
