import { TRUST_CENTER_CONTROLS } from '@/lib/constants'
import './trust-center.css'

export function TrustCenterControls() {
  const { heading, intro, groups, callout } = TRUST_CENTER_CONTROLS

  return (
    <section className="overflow-hidden bg-hero-surface py-16 md:py-20">
      <div className="container-sirp">
        <h2 className="tc-h2 font-sans font-medium text-white mb-3">{heading}</h2>
        <p className="tc-body max-w-2xl mb-10 text-text-muted">{intro}</p>

        <div className="grid gap-10 md:grid-cols-2">
          {groups.map((group) => (
            <div key={group.heading}>
              <h3 className="tc-group-label tc-group-label--dark mb-3">{group.heading}</h3>
              <ul className="list-none p-0 m-0">
                {group.items.map((item) => (
                  <li key={item} className="tc-row--dark text-sm leading-relaxed text-white/75">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="tc-note--dark max-w-3xl mt-10">
          <span className="tc-note-label">{callout.label}</span>
          <p className="text-sm leading-relaxed text-white/65">{callout.body}</p>
        </div>
      </div>
    </section>
  )
}
