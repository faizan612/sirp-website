import type { NavColumn } from './nav.types'
import { PanelLink } from './PanelLink'

export function PanelColumn({ column, onNavigate }: { column: NavColumn; onNavigate?: () => void }) {
  return (
    <div className="min-w-0">
      <p className="mb-2 px-3 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--nav-text-eyebrow)]">
        {column.eyebrow}
      </p>
      <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
        {column.links.map((link) => (
          <li key={link.href}>
            <PanelLink link={link} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </div>
  )
}
