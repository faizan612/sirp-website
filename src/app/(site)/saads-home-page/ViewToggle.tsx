'use client'

/* The switch control. Drives the view off the ?view query param so a link is
 * shareable, while still presenting as a clickable button (per the original
 * request). Styles are inline so it renders in the classic view too, which
 * does not load omnisense.css. */

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function ViewToggle({ active }: { active: boolean }) {
  const pathname = usePathname()
  const href = active ? pathname : `${pathname}?view=omnisense`

  return (
    <Link
      href={href}
      aria-pressed={active}
      style={{
        position: 'fixed',
        right: 18,
        bottom: 18,
        zIndex: 100,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: 'var(--font-mono), monospace',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        padding: '9px 14px',
        borderRadius: 999,
        border: '1px solid rgba(255,255,255,0.14)',
        background: 'rgba(16,16,18,0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        color: '#fff',
      }}
    >
      <span
        aria-hidden="true"
        style={{ width: 7, height: 7, borderRadius: 999, background: '#8E2DFF' }}
      />
      {active ? 'Classic view' : 'OmniSense view'}
    </Link>
  )
}
