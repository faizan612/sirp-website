import Link from 'next/link'
import { ourStorySidebar, ourStoryValues } from '@/content/our-story/story'

export function OurStoryValues() {
  return (
    <section className="bg-[#0E0E0E] py-24">
      <div className="container-sirp">
        <div
          className="mb-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-[#323232] p-8 md:flex-row md:items-center md:p-10"
          style={{ borderRadius: 'var(--radius-sirp-lg)' }}
        >
          <div className="max-w-xl">
            <h2 className="mb-2 font-sans text-2xl font-semibold text-white">{ourStorySidebar.heading}</h2>
            <p style={{ color: '#b0b0b0' }} className="font-sans text-base leading-[1.5]">
              {ourStorySidebar.body}
            </p>
          </div>
          <Link
            href={ourStorySidebar.cta.href}
            className="inline-flex shrink-0 items-center justify-center rounded-2xl border border-[#323232] bg-[#121218] px-6 py-3 font-medium text-base text-white transition-colors duration-200 hover:border-white/40"
          >
            {ourStorySidebar.cta.label}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {ourStoryValues.map((value) => (
            <div
              key={value.title}
              className="flex flex-col gap-3 rounded-2xl border border-[#323232] bg-[#121218] p-6"
              style={{ borderRadius: 'var(--radius-sirp-lg)' }}
            >
              <h3 className="font-sans text-lg font-semibold text-white">{value.title}</h3>
              <p style={{ color: '#b0b0b0' }} className="font-sans text-sm leading-[1.6]">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
