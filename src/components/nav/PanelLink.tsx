import Link from 'next/link'
import type { NavLink } from './nav.types'

const TITLE_CLASS = 'block font-sans text-[20px] font-medium leading-6 text-[var(--nav-label)]'
// 457px is the description text box in Figma (inside a 473px entry), and it's
// what puts the break in "…platform, detects, / learns…" where the design has it.
const DESC_CLASS =
  'mt-2 block max-w-[457px] font-sans text-[16px] font-normal leading-[19px] text-[var(--nav-desc)]'

const LINK_CLASS =
  'block rounded-[6px] no-underline outline-none transition-opacity duration-150 hover:opacity-80 ' +
  'focus-visible:ring-2 focus-visible:ring-[var(--nav-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#161718]'

export function PanelLink({ link, onNavigate }: { link: NavLink; onNavigate?: () => void }) {
  const body = (
    <>
      <span className={TITLE_CLASS}>{link.label}</span>
      {link.description && <span className={DESC_CLASS}>{link.description}</span>}
    </>
  )

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={LINK_CLASS}>
        {body}
      </a>
    )
  }

  return (
    <Link href={link.href} onClick={onNavigate} className={LINK_CLASS}>
      {body}
    </Link>
  )
}
