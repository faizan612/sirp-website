import { useId } from 'react'
import AlertDotField from '@/components/shared/AlertDotField'
import { Button } from '@/components/shared/Button'
import CountUp from '@/components/ui/CountUp'
import { problem } from '@/content/home/problem'
import { AUTONOMY_RATE, STATS_DATA } from '@/lib/constants'

/* ─── Component ──────────────────────────────────────────── *
 * "How it works" and "Results you can see" used to be two full-viewport
 * sections making the same argument twice — the dot matrix already is the
 * 90% autonomous-actions stat, rendered visually. Merged into one light
 * section: narrative + dot matrix on the left, the numeric proof on the
 * right, so the visual and numeric claims sit next to each other. */
export function HowItWorksResultsSection() {
  const headingId = useId()
  const { eyebrow, stat: headline, body, legendLit, legendDim } = problem
  const { stats, demoHref } = STATS_DATA

  return (
    <section aria-labelledby={headingId} className="overflow-hidden bg-[#f6f5f8] py-16 md:py-20">
      <div className="container-sirp">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">

          {/* Left column — narrative + dot matrix */}
          <div>
            {/* Pill — matches the badge used in the hero and the governed-autonomy section */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5">
              <span className="font-sans text-sm text-black">{eyebrow}</span>
            </div>

            <h2
              id={headingId}
              className="mt-6 font-sans font-medium text-black"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                lineHeight: '1.15',
                letterSpacing: '-0.02em',
              }}
            >
              {headline}
            </h2>

            <div className="mt-10" style={{ maxWidth: '460px' }}>
              <AlertDotField
                dotSize={4}
                investigatedRatio={AUTONOMY_RATE}
                litLabel="get resolved autonomously"
                dimColor="#a1a1aa"
              />
            </div>

            {/* Legend */}
            <div className="mt-5 flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.06em] text-black/60">
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="inline-block h-2.5 w-2.5" style={{ backgroundColor: '#8e2dff' }} />
                {legendLit}
              </span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="inline-block h-2.5 w-2.5" style={{ backgroundColor: '#a1a1aa' }} />
                {legendDim}
              </span>
            </div>

            <p className="mt-8 max-w-[520px] font-sans text-base leading-[1.65]" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
              {body}
            </p>
          </div>

          {/* Right column — numeric proof panel + CTA, vertically centered
              against the whole left column so it doesn't just hug the top. */}
          <div className="flex flex-col gap-8 border-t border-black/10 pt-10 lg:border-t-0 lg:border-l lg:pl-16 lg:pt-0">
            <div
              className="rounded-[24px] border p-7 md:p-9"
              style={{ borderColor: '#e5e0ee', background: 'linear-gradient(180deg, #faf8fd 0%, #f3f0f9 100%)' }}
            >
              <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-black/45">
                Autonomous SOC impact
              </span>

              <dl className="mt-6 flex flex-col">
                {stats.map((item, i) => {
                  const isHero = item.label === 'resolved autonomously'
                  return (
                    <div key={item.label} className={i > 0 ? 'mt-6 border-t border-black/[0.04] pt-6' : ''}>
                      {isHero && (
                        <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#8e2dff]">
                          Primary outcome
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-4">
                        <dd
                          className="font-sans font-semibold text-[#8e2dff]"
                          style={{
                            fontSize: isHero ? 'clamp(3.5rem, 6vw, 4.6rem)' : 'clamp(2.75rem, 5vw, 3.5rem)',
                            lineHeight: 1,
                            letterSpacing: '-0.02em',
                          }}
                        >
                          <CountUp to={Number(item.value)} duration={1.5} />%
                        </dd>
                        <dt className="max-w-[110px] text-right font-sans text-sm capitalize leading-snug text-black/70">
                          {item.label}
                        </dt>
                      </div>
                      <div aria-hidden="true" className="mt-3 h-[3px] w-8 rounded-full bg-[#8e2dff]" />
                    </div>
                  )
                })}
              </dl>
            </div>

            {/* TODO(marketing): one-line attribution footnote for these three
                stats — deployment type and measurement window. Needs marketing
                to supply or approve exact wording; do not ship invented figures,
                customer names, or date ranges in the meantime. */}

            <Button href={demoHref} className="self-center">Get a demo</Button>
          </div>

        </div>
      </div>
    </section>
  )
}
