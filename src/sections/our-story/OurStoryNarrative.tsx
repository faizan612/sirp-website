import { Fragment } from 'react'
import { ourStoryNarrative, ourStoryBadges } from '@/content/our-story/story'

/** Splits on `**bold**` markers and wraps them in <strong>. Content is static/trusted copy. */
function renderBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((chunk, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-white">
        {chunk}
      </strong>
    ) : (
      <Fragment key={i}>{chunk}</Fragment>
    ),
  )
}

export function OurStoryNarrative() {
  return (
    <section className="bg-[#121218] py-24">
      <div className="container-sirp">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr] md:gap-16">
          <div className="md:sticky md:top-32 md:self-start">
            <span className="font-sans text-2xl font-semibold text-white">{ourStoryNarrative.label}</span>
          </div>

          <div className="flex max-w-2xl flex-col gap-6">
            {ourStoryNarrative.paragraphs.map((paragraph, i) => (
              <p key={i} style={{ color: '#b0b0b0' }} className="font-sans text-base leading-[1.6] md:text-lg">
                {renderBold(paragraph)}
              </p>
            ))}

            <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-8">
              {ourStoryBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 rounded-full border border-[#323232] bg-[#0E0E0E] px-3 py-1.5 font-sans text-sm text-white"
                >
                  <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: '#8e2dff' }} />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
