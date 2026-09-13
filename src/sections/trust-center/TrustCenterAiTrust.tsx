import { TRUST_CENTER_AI_TRUST } from '@/lib/constants'
import './trust-center.css'

export function TrustCenterAiTrust() {
  const { heading, intro, reasoning, callout } = TRUST_CENTER_AI_TRUST

  return (
    <section className="overflow-hidden bg-[#f6f5f8] py-16 md:py-20">
      <div className="container-sirp">
        <h2 className="tc-h2 font-sans font-medium text-black mb-5">{heading}</h2>
        <p className="tc-body max-w-2xl mb-10" style={{ color: 'rgba(0,0,0,0.7)' }}>{intro}</p>

        <h3 className="font-sans text-lg font-medium text-black mb-4">{reasoning.heading}</h3>
        <div className="grid gap-4 md:grid-cols-2 mb-10">
          {reasoning.items.map((item) => (
            <div key={item.title} className="tc-note--light">
              <p className="font-sans text-base font-medium text-black mb-2">{item.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.6)' }}>{item.body}</p>
            </div>
          ))}
        </div>

        <div className="tc-note--light max-w-3xl">
          <span className="tc-note-label">{callout.label}</span>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.7)' }}>{callout.body}</p>
        </div>
      </div>
    </section>
  )
}
