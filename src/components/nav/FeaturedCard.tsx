import Link from 'next/link'
import { motion } from 'framer-motion'
import type { FeaturedCard as FeaturedCardData } from './nav.types'

// Spec permits one React Bits component here, restyled to the nav tokens.
// Not wired in: pulling it in requires running its install command against
// reactbits.dev at build time, which means fetching and executing third-party
// code from an external source — flag it back to Saad to run deliberately
// (and to route past the one-line license check the spec calls for) rather
// than an agent doing it unattended. This lightweight motion visual, built
// from already-installed framer-motion, stands in for it in the meantime.
function SaraVisual() {
  return (
    <div className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-[12px] bg-[var(--nav-base)]">
      <motion.div
        aria-hidden
        className="h-14 w-14 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, rgba(142,45,255,0.9), rgba(142,45,255,0.05) 70%)',
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function CardVisual({ visual }: { visual: FeaturedCardData['visual'] }) {
  if (visual === 'sara') return <SaraVisual />
  return (
    <div className="h-24 w-full rounded-[12px] border border-[var(--nav-hairline)] bg-[var(--nav-base)]" aria-hidden />
  )
}

export function FeaturedCard({ card }: { card: FeaturedCardData }) {
  const body = (
    <>
      <CardVisual visual={card.visual} />
      <p className="mt-3 flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--nav-text-eyebrow)]">
        {card.eyebrow}
        {card.badge && (
          <span className="rounded-full border border-[var(--nav-accent-wash)] bg-[var(--nav-accent-soft)] px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[var(--nav-accent)]">
            {card.badge}
          </span>
        )}
      </p>
      <p className="mt-1.5 font-sans text-[15px] font-medium leading-tight tracking-[-0.01em] text-[var(--nav-text)]">
        {card.title}
      </p>
      {card.body && (
        <p className="mt-1 font-sans text-[13px] leading-snug text-[var(--nav-text-muted)]">{card.body}</p>
      )}
      {card.cta && (
        <span className="mt-3 inline-flex items-center gap-1 font-sans text-[13px] font-medium text-[var(--nav-accent)]">
          {card.cta} &rarr;
        </span>
      )}
    </>
  )

  const className =
    'block w-[280px] shrink-0 rounded-[16px] border border-[var(--nav-hairline)] bg-[var(--nav-panel-raised)] p-4 no-underline outline-none focus-visible:ring-1 focus-visible:ring-[var(--nav-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nav-panel)]'

  if (!card.href) {
    return <div className={className}>{body}</div>
  }

  return (
    <Link href={card.href} className={className}>
      {body}
    </Link>
  )
}
