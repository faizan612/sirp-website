import Link from 'next/link'

const LIVE_LINKS = [
  { label: 'OmniSense platform', href: '/omnisense', description: 'The autonomous SOC, end to end.' },
  { label: 'How it works', href: '/how-autonomous-soc-works', description: 'Planner, Governor, Executor.' },
  { label: 'Blog', href: '/blog', description: 'Insights and analysis.' },
  { label: 'Contact', href: '/contact', description: 'Talk to the team.' },
]

export default function NotFound() {
  return (
    <div className="container-sirp flex flex-col items-center gap-6 py-24 text-center">
      <p className="font-mono text-[13px] font-medium uppercase tracking-[0.3em] text-[var(--nav-text-eyebrow)]">
        404
      </p>
      <h1 className="font-sans text-3xl font-medium tracking-[-0.02em] text-[var(--nav-text)] sm:text-4xl">
        We could not find that page.
      </h1>
      <p className="max-w-[520px] font-sans text-[15px] leading-relaxed text-[var(--nav-text-muted)]">
        It may have moved, or it may not exist yet. Here is where most people go next.
      </p>

      <div className="mt-6 grid w-full max-w-[720px] grid-cols-1 gap-3 text-left sm:grid-cols-2">
        {LIVE_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-[16px] border border-[var(--nav-hairline)] bg-[var(--nav-panel)] p-5 no-underline outline-none transition-colors duration-150 hover:border-[var(--nav-accent-wash)] focus-visible:ring-1 focus-visible:ring-[var(--nav-accent)]"
          >
            <span className="block font-sans text-[15px] font-medium text-[var(--nav-text)]">{link.label}</span>
            <span className="mt-1 block font-sans text-[13px] text-[var(--nav-text-muted)]">{link.description}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
