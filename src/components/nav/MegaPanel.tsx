import type { NavMenu } from './nav.types'
import { PanelColumn } from './PanelColumn'
import { NAV_COLUMN_GAP, NAV_COLUMN_MAX } from './nav-style'

export function MegaPanel({
  menu,
  reduceMotion,
  onNavigate,
}: {
  menu: NavMenu
  reduceMotion: boolean
  onNavigate?: () => void
}) {
  const columns = menu.columns ?? []

  return (
    // Keyed so switching menus replaces the content outright, with a CSS fade
    // rather than an orchestrated one — if animations are throttled (a hidden
    // or backgrounded tab) the content still lands in its final, visible state.
    <div
      key={menu.id}
      // Columns are left-aligned and capped at the Figma width rather than
      // stretched, which is what keeps the narrower menus sitting against the
      // left gutter like the design.
      className={`grid justify-start ${NAV_COLUMN_GAP}`}
      style={{
        gridTemplateColumns: `repeat(${Math.max(columns.length, 1)}, minmax(0, ${NAV_COLUMN_MAX}px))`,
        animation: reduceMotion ? undefined : 'fadeIn 0.16s ease-out',
      }}
    >
      {columns.map((column) => (
        <PanelColumn key={column.eyebrow} column={column} onNavigate={onNavigate} />
      ))}
    </div>
  )
}
