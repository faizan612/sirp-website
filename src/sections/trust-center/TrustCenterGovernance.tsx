import { TRUST_CENTER_GOVERNANCE } from '@/lib/constants'
import './trust-center.css'

function splitLead(item: string): [string, string] {
  const idx = item.indexOf('. ')
  if (idx === -1) return [item, '']
  return [item.slice(0, idx + 1), item.slice(idx + 2)]
}

export function TrustCenterGovernance() {
  const { heading, groups, callout } = TRUST_CENTER_GOVERNANCE

  return (
    <section className="overflow-hidden bg-hero-surface py-16 md:py-20">
      <div className="container-sirp">
        <h2 className="tc-h2 font-sans font-medium text-white mb-10">{heading}</h2>

        <div className="grid gap-10 md:grid-cols-2 mb-10">
          {groups.map((group) => (
            <div key={group.heading}>
              <h3 className="font-sans text-lg font-medium text-white mb-1">{group.heading}</h3>
              <div>
                {group.items.map((item) => {
                  const [lead, rest] = splitLead(item)
                  return (
                    <div key={item} className="tc-row--dark">
                      <p className="text-sm leading-relaxed text-white/65">
                        <span className="text-white font-medium">{lead}</span>{rest ? ` ${rest}` : ''}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="tc-note--dark max-w-3xl">
          <span className="tc-note-label">{callout.label}</span>
          <p className="text-sm leading-relaxed text-white/65">{callout.body}</p>
        </div>
      </div>
    </section>
  )
}
