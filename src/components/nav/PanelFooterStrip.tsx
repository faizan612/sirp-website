import Link from 'next/link'
import type { PanelFooter } from './nav.types'

export function PanelFooterStrip({ footer }: { footer: PanelFooter }) {
  return (
    <div className="mt-6 flex items-center justify-between gap-4 border-t border-[var(--nav-hairline)] pt-4">
      <p className="font-mono text-[12px] tracking-[0.06em] text-[var(--nav-text-muted)]">{footer.text}</p>
      <Link
        href={footer.href}
        className="shrink-0 whitespace-nowrap font-mono text-[12px] tracking-[0.06em] text-[var(--nav-accent)] no-underline outline-none focus-visible:ring-1 focus-visible:ring-[var(--nav-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nav-panel)]"
      >
        {footer.cta} &rarr;
      </Link>
    </div>
  )
}
