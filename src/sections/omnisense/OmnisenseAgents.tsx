'use client'

import { motion } from 'framer-motion'

/* ─── Icons ──────────────────────────────────────────────── */
const icons: Record<string, React.ReactNode> = {
  classification: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <path d="M 14 0 L 2 0 C 0.9 0 0 0.9 0 2 L 0 18 C 0 19.1 0.9 20 2 20 L 14 20 C 15.1 20 16 19.1 16 18 L 16 2 C 16 0.9 15.1 0 14 0 Z M 5 2 L 7 2 L 7 7 L 6 6.25 L 5 7 Z M 14 18 L 2 18 L 2 2 L 3 2 L 3 11 L 6 8.75 L 9 11 L 9 2 L 14 2 Z" fill="white" transform="translate(4 2)"/>
    </svg>
  ),
  playbook: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <path d="M 18 0 L 2 0 C 0.89 0 0 0.89 0 2 L 0 14 C 0 15.1 0.89 16 2 16 L 6 16 L 6 18 L 14 18 L 14 16 L 18 16 C 19.1 16 20 15.1 20 14 L 20 2 C 20 0.89 19.1 0 18 0 Z M 18 14 L 2 14 L 2 2 L 18 2 Z" fill="white" transform="translate(2 3)"/>
      <path d="M 8 0 L 0 0 L 0 1.5 L 8 1.5 Z" fill="white" transform="translate(6 8.25)"/>
      <path d="M 1.5 2.75 L 3 2.75 L 3 1.25 L 1.5 1.25 L 1.5 0 L 0 0 L 0 4 L 1.5 4 Z" fill="white" transform="translate(15 7)"/>
      <path d="M 8 0 L 0 0 L 0 1.5 L 8 1.5 Z" fill="white" transform="translate(10 12.25)"/>
      <path d="M 1.5 4 L 3 4 L 3 0 L 1.5 0 L 1.5 1.25 L 0 1.25 L 0 2.75 L 1.5 2.75 Z" fill="white" transform="translate(6 11)"/>
    </svg>
  ),
  assign: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <path d="M 10 6.89 L 10.94 10 L 13.76 10 L 11.49 11.62 L 12.42 14.63 L 10 12.79 L 7.58 14.63 L 8.51 11.62 L 6.24 10 L 9.06 10 Z M 7.58 8 L 0 8 L 6.17 12.41 L 3.83 20 L 10 15.31 L 16.18 20 L 13.83 12.41 L 20 8 L 12.42 8 L 10 0 Z M 20.36 20 L 18.5 13.99 L 22.68 11 L 19.24 11 L 16.16 13.2 L 17.62 17.92 Z M 16 6 L 14.18 0 L 13.14 3.45 L 13.91 6 Z" fill="white" transform="translate(0.66 2)"/>
    </svg>
  ),
  header: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <path d="M 4 14 L 11 14 L 11 16 L 4 16 Z M 4 10 L 14 10 L 14 12 L 4 12 Z M 4 6 L 14 6 L 14 8 L 4 8 Z M 16 2 L 11.82 2 C 11.4 0.84 10.3 0 9 0 C 7.7 0 6.6 0.84 6.18 2 L 2 2 C 1.86 2 1.73 2.01 1.6 2.04 C 1.21 2.12 0.86 2.32 0.59 2.59 C 0.41 2.77 0.26 2.99 0.16 3.23 C 0.06 3.46 0 3.72 0 4 L 0 18 C 0 18.27 0.06 18.54 0.16 18.78 C 0.26 19.02 0.41 19.23 0.59 19.42 C 0.86 19.69 1.21 19.89 1.6 19.97 C 1.73 19.99 1.86 20 2 20 L 16 20 C 17.1 20 18 19.1 18 18 L 18 4 C 18 2.9 17.1 2 16 2 Z M 9 1.75 C 9.41 1.75 9.75 2.09 9.75 2.5 C 9.75 2.91 9.41 3.25 9 3.25 C 8.59 3.25 8.25 2.91 8.25 2.5 C 8.25 2.09 8.59 1.75 9 1.75 Z M 16 18 L 2 18 L 2 4 L 16 4 Z" fill="white" transform="translate(3 2)"/>
    </svg>
  ),
  preprocessor: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <path d="M 16 0 L 2 0 C 0.89 0 0 0.9 0 2 L 0 14 C 0 15.1 0.89 16 2 16 L 6 16 L 6 14 L 2 14 L 2 4 L 16 4 L 16 14 L 12 14 L 12 16 L 16 16 C 17.1 16 18 15.1 18 14 L 18 2 C 18 0.9 17.11 0 16 0 Z M 9 6 L 5 10 L 8 10 L 8 16 L 10 16 L 10 10 L 13 10 Z" fill="white" transform="translate(3 4)"/>
    </svg>
  ),
  enrichment: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <path d="M 9.98 0 C 4.47 0 0 4.47 0 9.98 C 0 15.49 4.47 19.96 9.98 19.96 C 15.49 19.96 19.96 15.49 19.96 9.98 C 19.96 4.47 15.49 0 9.98 0 Z M 9.98 17.96 C 5.58 17.96 2 14.38 2 9.98 C 2 5.58 5.58 2 9.98 2 C 14.38 2 17.96 5.58 17.96 9.98 C 17.96 14.38 14.38 17.96 9.98 17.96 Z M 10.73 2.98 L 6.23 11.48 L 9.37 11.48 L 9.37 16.98 L 13.73 8.48 L 10.73 8.48 Z" fill="white" transform="translate(2.02 2.02)"/>
    </svg>
  ),
  analysis: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <path d="M 16 0 L 2 0 C 0.9 0 0 0.9 0 2 L 0 16 C 0 17.1 0.9 18 2 18 L 16 18 C 17.1 18 18 17.1 18 16 L 18 2 C 18 0.9 17.1 0 16 0 Z M 16 16 L 2 16 L 2 2 L 16 2 Z" fill="white" transform="translate(3 3)"/>
      <path d="M 2 0 L 0 0 L 0 5 L 2 5 Z" fill="white" transform="translate(7 12)"/>
      <path d="M 2 0 L 0 0 L 0 10 L 2 10 Z" fill="white" transform="translate(15 7)"/>
      <path d="M 2 0 L 0 0 L 0 3 L 2 3 Z" fill="white" transform="translate(11 14)"/>
      <path d="M 2 0 L 0 0 L 0 2 L 2 2 Z" fill="white" transform="translate(11 10)"/>
    </svg>
  ),
  remediation: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <path d="M 19.69 15.37 L 20.83 14.37 L 19.83 12.64 L 18.38 13.13 C 18.06 12.86 17.7 12.65 17.3 12.5 L 17 11 L 15 11 L 14.7 12.49 C 14.3 12.64 13.94 12.85 13.62 13.12 L 12.17 12.63 L 11.17 14.36 L 12.31 15.36 C 12.23 15.86 12.23 16.12 12.31 16.62 L 11.17 17.62 L 12.17 19.35 L 13.62 18.86 C 13.94 19.13 14.3 19.34 14.7 19.49 L 15 21 L 17 21 L 17.3 19.51 C 17.7 19.36 18.06 19.15 18.38 18.88 L 19.83 19.37 L 20.83 17.64 L 19.69 16.64 C 19.77 16.13 19.77 15.87 19.69 15.37 Z M 16 18 C 14.9 18 14 17.1 14 16 C 14 14.9 14.9 14 16 14 C 17.1 14 18 14.9 18 16 C 18 17.1 17.1 18 16 18 Z M 8 4 L 8 9.41 L 10.36 11.77 L 11.4 9.98 L 10 8.59 L 10 4 Z M 18 9 C 18 4.03 13.97 0 9 0 C 6.17 0 3.65 1.32 2 3.36 L 2 1 L 0 1 L 0 7 L 6 7 L 6 5 L 3.26 5 C 4.53 3.19 6.63 2 9 2 C 12.86 2 16 5.14 16 9 Z M 7.86 15.91 C 4.87 15.42 2.51 13.01 2.08 10 L 0.06 10 C 0.56 14.5 4.37 18 9 18 C 9.02 18 9.05 18 9.07 18 Z" fill="white" transform="translate(1.585 1.5)"/>
    </svg>
  ),
  actions: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <path d="M 10 12 L 0 12 L 0 14 L 10 14 Z M 16 4 L 0 4 L 0 6 L 16 6 Z M 0 10 L 16 10 L 16 8 L 0 8 Z M 0 0 L 0 2 L 16 2 L 16 0 Z" fill="white" transform="translate(4 5)"/>
    </svg>
  ),
}

/* ─── Types ──────────────────────────────────────────────── */
interface Agent {
  icon:        string
  title:       string
  description: string
}

interface AgentsData {
  heading:     string
  description: string
  items:       readonly Agent[]
}

interface OmnisenseAgentsProps {
  data: AgentsData
}

/* ─── Card ───────────────────────────────────────────────── */
function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div
      className="agent-card-outer relative flex-shrink-0 overflow-hidden"
      style={{ borderRadius: '20px', padding: '1px', width: '300px', height: '350px', background: 'rgb(37,37,52)' }}
    >
      {/* Clockwise spinning border */}
      <div className="agent-card-spin" />

      {/* Inner card */}
      <div
        className="agent-card relative overflow-hidden cursor-default"
        style={{ borderRadius: '20px', background: 'linear-gradient(rgb(37,37,52) 0%, rgb(18,18,24) 20%)', width: '100%', height: '100%' }}
      >
        {/* Content */}
        <div style={{ position: 'absolute', top: '24px', left: '50%', transform: 'translateX(-50%)', width: '250px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>{icons[agent.icon]}</div>
          <h4 style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '20px', fontWeight: 500, lineHeight: '120%', margin: 0, color: 'white' }}>
            {agent.title}
          </h4>
          <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '12px', fontWeight: 500, lineHeight: '150%', margin: 0, color: 'white' }}>
            {agent.description}
          </p>
        </div>

        {/* Purple glow — bottom */}
        <div className="card-glow absolute bottom-0 left-0 right-0 pointer-events-none rounded-b-[20px]" />
      </div>
    </div>
  )
}

/* ─── Component ──────────────────────────────────────────── */
export function OmnisenseAgents({ data }: OmnisenseAgentsProps) {
  const { heading, description, items } = data
  const doubled = [...items, ...items]

  return (
    <section className="py-[50px] md:py-[100px] overflow-hidden" style={{ background: 'linear-gradient(#252534 0%, #121218 20%)' }}>

      <style>{`
        @keyframes agents-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .agents-track {
          animation: agents-marquee 40s linear infinite;
        }
        .agents-track:has(.agent-card-outer:hover) {
          animation-play-state: paused;
        }

        /* ── clockwise spinning border ── */
        @keyframes border-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .agent-card-spin {
          position: absolute;
          inset: -100%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 340deg,
            rgba(142,45,255,0.4) 350deg,
            rgba(180,80,255,1) 358deg,
            transparent 360deg
          );
          animation: border-spin 12s linear infinite;
          z-index: 0;
        }

        /* ── bottom glow ── */
        .agent-card .card-glow {
          height: 50%;
          background: linear-gradient(to top, rgba(142,45,255,0.35), rgba(142,45,255,0.08), transparent);
          transition: height 0.6s ease, opacity 0.6s ease, background 0.6s ease;
          opacity: 0.6;
        }
        .agent-card:hover .card-glow {
          height: 70%;
          opacity: 1;
          background: linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(180,80,255,0.6) 30%, rgba(142,45,255,0.3) 65%, transparent 100%);
        }
      `}</style>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container-sirp text-center mb-10 md:mb-14 max-w-[960px] mx-auto"
      >
        <h2
          className="font-sans font-medium text-white mb-4 mx-auto w-full"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', lineHeight: '1.15', letterSpacing: '-0.02em', maxWidth: '960px' }}
        >
          {heading}
        </h2>
        <p
          className="font-sans text-white leading-[1.65] text-base md:text-lg mx-auto w-full"
          style={{ maxWidth: '960px' }}
        >
          {description}
        </p>
      </motion.div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgb(18, 18, 24), transparent)' }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgb(18, 18, 24), transparent)' }} />

        <div className="agents-track flex gap-[10px] w-max px-4">
          {doubled.map((agent, i) => (
            <AgentCard key={i} agent={agent as Agent} />
          ))}
        </div>
      </div>

    </section>
  )
}
