import { useId } from 'react'
import {
  AUTONOMY_ROWS,
  governedAutonomy,
  LADDER_LEVELS,
  type AutonomyRowLevel,
} from '@/content/home/governedAutonomy'

function pillClassFor(level: AutonomyRowLevel) {
  return level === 'automatic'
    ? 'inline-flex items-center rounded-md bg-purple px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.04em] text-white'
    : 'inline-flex items-center rounded-md border border-hairline px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.04em] text-text-tertiary'
}

/** Decorative lock — the row's own label text carries the meaning. */
function LockIcon() {
  return (
    <svg aria-hidden="true" width="11" height="11" viewBox="0 0 12 12" fill="none" className="mr-1 inline-block align-[-1px]">
      <rect x="2.5" y="5.5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
      <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  )
}

/* ─── Component ──────────────────────────────────────────── *
 * Answers the question the merged "How it works / Results" section
 * raises: the dot grid shows ~10% of alerts escalating, so what governs
 * the other 90%? A static display of a real setting, not a control —
 * the ladder and table are markup, nothing here is clickable. */
export function AutonomyGovernanceSection() {
  const headingId = useId()
  const { eyebrow, headline, body, legendLit, legendDim, tableCaption } = governedAutonomy

  return (
    <section aria-labelledby={headingId} className="overflow-hidden bg-hero-surface py-16 md:py-20">
      <div className="container-sirp">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">

          {/* Left column — narrative */}
          <div>
            {/* Pill — matches the badge used in the hero and the merged section above */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#323232] bg-[#0E0E0E] px-3 py-1.5">
              <span className="font-sans text-sm text-white">{eyebrow}</span>
            </div>

            <h2
              id={headingId}
              className="mt-6 font-sans font-medium text-white"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                lineHeight: '1.15',
                letterSpacing: '-0.02em',
                maxWidth: '40ch',
              }}
            >
              {headline}
            </h2>

            <p
              className="mt-6 max-w-[52ch] font-sans text-base leading-[1.65] text-text-muted"
            >
              {body}
            </p>
          </div>

          {/* Right column — control-surface card */}
          <div>
            <div className="rounded-[var(--radius-sirp-lg)] border border-hairline">

              {/* Ladder — a static display of the configured setting, not a control */}
              <ul className="flex list-none divide-x divide-hairline border-b border-hairline p-0 m-0">
                {LADDER_LEVELS.map((level) => (
                  <li
                    key={level.label}
                    aria-current={level.active ? 'true' : undefined}
                    className={
                      level.active
                        ? 'flex-1 bg-purple px-3 py-3 text-center font-sans text-sm font-medium text-white'
                        : 'flex-1 px-3 py-3 text-center font-sans text-sm text-text-tertiary'
                    }
                  >
                    {level.label}
                    {level.active && <span className="sr-only"> (current setting)</span>}
                  </li>
                ))}
              </ul>

              {/* Rows — genuinely tabular: action → configured policy */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <caption className="sr-only">{tableCaption}</caption>
                  <thead>
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-text-tertiary">
                        Action
                      </th>
                      <th scope="col" className="px-4 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-text-tertiary">
                        Policy
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {AUTONOMY_ROWS.map((row) => (
                      <tr key={row.action} className="border-t border-hairline">
                        <td className="px-4 py-3 align-top font-sans text-sm text-white">
                          {row.action}
                        </td>
                        <td className="px-4 py-3 align-top">
                          <span className={pillClassFor(row.level)}>
                            {row.icon === 'lock' && <LockIcon />}
                            {row.label}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.06em] text-text-tertiary">
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-purple" />
                {legendLit}
              </span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="inline-block h-2.5 w-2.5 border border-hairline" />
                {legendDim}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
