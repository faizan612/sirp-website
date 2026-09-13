import { TRUST_CENTER_HERO } from '@/lib/constants'
import './trust-center.css'

export function TrustCenterHero() {
  const { eyebrow, heading, headingGradient, subhead, badges, meta } = TRUST_CENTER_HERO

  return (
    <section className="relative overflow-hidden bg-hero-surface pt-28 pb-16 md:pt-36 md:pb-20">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      <div className="container-sirp relative z-10">
        <div className="max-w-2xl">
          <div className="tc-pill--dark mb-6">
            <span>{eyebrow}</span>
          </div>

          <h1 className="tc-h1 font-sans font-semibold text-white mb-5" style={{ whiteSpace: 'pre-line' }}>
            {heading}
            <br />
            <span style={{ color: '#8e2dff' }}>{headingGradient}</span>
          </h1>

          <p className="tc-body max-w-xl text-[#b0b0b0] mb-8">{subhead}</p>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            {badges.map((badge) => (
              <span key={badge} className="tc-pill--dark" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: '#8e2dff' }} />
                {badge}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-2 border-t border-white/10 pt-6 font-mono text-xs text-white/45">
            <span>
              <span className="text-white/30">ISSUED BY </span>
              {meta.issuedBy}
            </span>
            <span>
              <span className="text-white/30">VERSION </span>
              {meta.version}
            </span>
            <span>
              <span className="text-white/30">CONTACT </span>
              {meta.contact}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
