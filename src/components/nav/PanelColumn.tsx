import type { NavColumn } from './nav.types'
import { PanelLink } from './PanelLink'
import { NAV_COLUMN_MAX } from './nav-style'

/** Figma column: 473px wide, 30px between the eyebrow and each entry. */
export function PanelColumn({ column, onNavigate }: { column: NavColumn; onNavigate?: () => void }) {
  return (
    <div className="flex min-w-0 flex-col gap-[30px]" style={{ maxWidth: NAV_COLUMN_MAX }}>
      <p className="m-0 font-sans text-[16px] font-medium uppercase leading-6 text-[var(--nav-eyebrow)]">
        {column.eyebrow}
      </p>
      <ul className="m-0 flex list-none flex-col gap-[30px] p-0">
        {column.links.map((link) => (
          <li key={link.label}>
            <PanelLink link={link} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </div>
  )
}
