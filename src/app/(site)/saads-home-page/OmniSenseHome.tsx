'use client'

/* ──────────────────────────────────────────────────────────────────────────
 * OmniSense view of the homepage — a product-aligned rebuild of every
 * saads-home section, fed by the SAME content constants as the classic view
 * (src/lib/constants/saads-home). Design follows the sirp.io token doc:
 * flat near-black surfaces, hairline borders, a three-step grey text ramp,
 * and purple reserved for primary actions + active states only.
 *
 * Rendered by page.tsx when ?view=omnisense. On mount it flags
 * <html class="omni-active"> so omnisense.css can retire the classic global
 * Navbar/Footer and let this view's own chrome stand in.
 * ────────────────────────────────────────────────────────────────────────── */

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import AlertDotField from '@/components/shared/AlertDotField'
import {
  HERO_DATA,
  PROBLEM_DATA,
  HOW_IT_WORKS_DATA,
  GOVERNED_DATA,
  PROOF_DATA,
  PLATFORM_DEPTH_DATA,
  INTEGRATIONS_DATA,
  FINAL_CTA_DATA,
} from '@/lib/constants/saads-home'
import './omnisense.css'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const NAV_ITEMS = [
  { label: 'Platform', href: '/omnisense' },
  { label: 'How it works', href: '/how-autonomous-soc-works' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'Outcomes', href: '/security-outcomes-and-metrics' },
  { label: 'Blog', href: '/blog' },
] as const

const GOVERNED_TABS = ['Assist mode', 'Autonomous mode'] as const

export function OmniSenseHome() {
  /* Flag the document so the classic chrome is hidden and the page bg goes
   * to true near-black. Kept in sync on client-side navigation away. */
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('omni-active')
    return () => root.classList.remove('omni-active')
  }, [])

  const [mode, setMode] = useState<(typeof GOVERNED_TABS)[number]>('Assist mode')

  return (
    <div className="omni-root">
      {/* ── Announcement strip + nav ─────────────────────────────────────── */}
      <header className="omni-chrome">
        <div className="omni-announce">
          <span className="omni-announce__tag">Now free</span>
          Sara, your security Co-Analyst, is free to try.{' '}
          <Link href="https://sara-open.sirp.io" className="omni-announce__link">
            Try her now →
          </Link>
        </div>
        <div className="omni-container">
          <nav className="omni-nav" aria-label="Primary">
            <Link href="/saads-home-page?view=omnisense" className="omni-nav__brand">
              <span className="omni-nav__mark" aria-hidden="true" />
              <span className="omni-nav__wordmark">OmniSense</span>
            </Link>
            <div className="omni-nav__links">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className="omni-nav__link">
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="omni-nav__actions">
              <Link href="/contact" className="omni-btn omni-btn--secondary">
                Login
              </Link>
              <Link href="/demo" className="omni-btn omni-btn--primary">
                <Plus className="omni-btn__plus" size={16} strokeWidth={2} />
                Get a demo
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="omni-hero">
        <div className="omni-hero__stage">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="omni-hero__video"
            aria-hidden="true"
          >
            <source src={HERO_DATA.videoSrc} type="video/webm" />
          </video>
          <div className="omni-hero__mask" aria-hidden="true" />
        </div>
        <div className="omni-container omni-hero__copy omni-fade">
          <h1 className="omni-h1">
            The SOC that <em>drives&nbsp;itself</em>.
          </h1>
          <p className="omni-body omni-hero__sub">{HERO_DATA.subheading}</p>
          <div className="omni-hero__cta">
            <Link href={HERO_DATA.primaryBtn.href} className="omni-btn omni-btn--primary">
              {HERO_DATA.primaryBtn.label}
              <ArrowRight size={16} />
            </Link>
            <Link href={HERO_DATA.secondaryBtn.href} className="omni-btn omni-btn--secondary">
              {HERO_DATA.secondaryBtn.label}
            </Link>
          </div>
          {HERO_DATA.proofLine && (
            <p className="omni-eyebrow omni-hero__proof">{HERO_DATA.proofLine}</p>
          )}
        </div>
      </section>

      {/* ── The problem ──────────────────────────────────────────────────── */}
      <section className="omni-section">
        <div className="omni-container" style={{ maxWidth: 820, textAlign: 'center' }}>
          <span className="omni-eyebrow">{PROBLEM_DATA.eyebrow}</span>
          <h2 className="omni-h2" style={{ marginTop: 18 }}>
            {PROBLEM_DATA.stat}
          </h2>
          <div style={{ maxWidth: 520, margin: '32px auto 0', minHeight: 420 }}>
            <AlertDotField />
          </div>
          <div className="omni-problem__legend">
            <span>
              <span className="omni-dot" style={{ background: '#8E2DFF' }} aria-hidden="true" />
              investigated
            </span>
            <span>
              <span className="omni-dot" style={{ background: '#222228' }} aria-hidden="true" />
              sampled, snoozed, or aged out
            </span>
          </div>
          <p className="omni-body" style={{ maxWidth: 620, margin: '40px auto 0' }}>
            {PROBLEM_DATA.body}
          </p>
          <p className="omni-problem__cite">{PROBLEM_DATA.citation}</p>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="omni-section">
        <div className="omni-container">
          <div style={{ maxWidth: 760, marginBottom: 48 }}>
            <span className="omni-eyebrow">{HOW_IT_WORKS_DATA.eyebrow}</span>
            <h2 className="omni-h2" style={{ marginTop: 16 }}>
              {HOW_IT_WORKS_DATA.heading} <em>{HOW_IT_WORKS_DATA.headingItalic}</em>
            </h2>
          </div>
          <div className="omni-grid-3">
            {HOW_IT_WORKS_DATA.steps.map((step) => (
              <article key={step.number} className="omni-panel omni-panel--interactive omni-step">
                <span className="omni-step__num">{step.number}</span>
                <h3 className="omni-h3">{step.title}</h3>
                <p className="omni-body-sm">{step.description}</p>
                <ul className="omni-step__tags">
                  {step.tags.map((tag) => (
                    <li key={tag} className="omni-tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 36 }}>
            <Link href={HOW_IT_WORKS_DATA.cta.href} className="omni-link">
              {HOW_IT_WORKS_DATA.cta.label}
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Governed autonomy ────────────────────────────────────────────── */}
      <section className="omni-section">
        <div className="omni-container omni-governed">
          <div className="omni-governed__copy">
            <span className="omni-eyebrow">{GOVERNED_DATA.eyebrow}</span>
            <h2 className="omni-h2" style={{ marginTop: 16, marginBottom: 18 }}>
              {GOVERNED_DATA.heading} <em>{GOVERNED_DATA.headingItalic}</em>
            </h2>
            <p className="omni-body" style={{ maxWidth: 520 }}>
              {GOVERNED_DATA.body}
            </p>
            <div style={{ marginTop: 32 }}>
              <Link href={GOVERNED_DATA.cta.href} className="omni-link">
                {GOVERNED_DATA.cta.label}
                <ArrowRight />
              </Link>
            </div>
          </div>
          <div className="omni-governed__widget">
            <div role="tablist" aria-label="Autonomy mode" className="omni-seg">
              {GOVERNED_TABS.map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={mode === tab}
                  className={`omni-seg-opt${mode === tab ? ' is-active' : ''}`}
                  onClick={() => setMode(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="omni-panel omni-governed__visual" role="img" aria-label={GOVERNED_DATA.modes[mode]}>
              {mode === 'Assist mode' ? (
                <Lottie
                  key="assist"
                  animationData={require('../../../../public/animations/assist-mode/home-01A.json')}
                  loop
                  className="omni-governed__lottie"
                />
              ) : (
                <Lottie
                  key="autonomous"
                  animationData={require('../../../../public/animations/autonomous/home-01B.json')}
                  loop
                  className="omni-governed__lottie"
                />
              )}
            </div>
            <p className="omni-body-sm omni-muted" style={{ marginTop: 14 }}>
              {GOVERNED_DATA.modes[mode]}
            </p>
          </div>
        </div>
      </section>

      {/* ── Proof ────────────────────────────────────────────────────────── */}
      <section className="omni-section">
        <div className="omni-container">
          <div style={{ maxWidth: 680, margin: '0 auto 48px', textAlign: 'center' }}>
            <span className="omni-eyebrow">{PROOF_DATA.eyebrow}</span>
            <h2 className="omni-h2" style={{ marginTop: 16 }}>
              {PROOF_DATA.heading} <em>{PROOF_DATA.headingItalic}</em>
            </h2>
          </div>
          <div className="omni-grid-3">
            {PROOF_DATA.stats.map((stat) => (
              <div key={stat.label} className="omni-panel omni-metric">
                <span className="omni-metric__value">{stat.value}</span>
                <span className="omni-metric__label">{stat.label}</span>
                <span className="omni-metric__delta">{stat.proof}</span>
              </div>
            ))}
          </div>
          <p className="omni-proof__cite">
            {PROOF_DATA.methodologyNote}{' '}
            <Link href={PROOF_DATA.methodologyHref} className="omni-proof__cite-link">
              Methodology
            </Link>
          </p>
        </div>
      </section>

      {/* ── Platform depth ───────────────────────────────────────────────── */}
      <section className="omni-section">
        <div className="omni-container">
          <div style={{ maxWidth: 760, marginBottom: 48 }}>
            <span className="omni-eyebrow">{PLATFORM_DEPTH_DATA.eyebrow}</span>
            <h2 className="omni-h2" style={{ marginTop: 16 }}>
              {PLATFORM_DEPTH_DATA.heading} <em>{PLATFORM_DEPTH_DATA.headingItalic}</em>
            </h2>
          </div>
          <div className="omni-grid-2">
            {PLATFORM_DEPTH_DATA.cards.map((card) => {
              const bridge = 'bridge' in card ? card.bridge : undefined
              return (
                <div key={card.id} className="omni-panel omni-depth-card">
                  <div className="omni-depth-card__media">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                      unoptimized
                    />
                  </div>
                  <div className="omni-depth-card__body">
                    <h3 className="omni-h3">{card.title}</h3>
                    <p className="omni-body-sm">{card.description}</p>
                    {bridge && (
                      <p className="omni-body-sm" style={{ color: 'var(--text-secondary)', marginTop: 'auto', paddingTop: 16 }}>
                        {bridge.text}{' '}
                        <Link
                          href={bridge.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="omni-link"
                          style={{ display: 'inline-flex' }}
                        >
                          {bridge.link.label}
                          <ArrowRight />
                        </Link>
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: 36 }}>
            <Link href={PLATFORM_DEPTH_DATA.cta.href} className="omni-link">
              {PLATFORM_DEPTH_DATA.cta.label}
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Integrations ─────────────────────────────────────────────────── */}
      <section className="omni-section">
        <div className="omni-container" style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="omni-eyebrow">{INTEGRATIONS_DATA.pill}</span>
          <h2 className="omni-h2" style={{ marginTop: 16, marginBottom: 16 }}>
            {INTEGRATIONS_DATA.heading} <em>{INTEGRATIONS_DATA.headingItalic}</em>{' '}
            {INTEGRATIONS_DATA.headingSuffix}
          </h2>
          <p className="omni-body" style={{ maxWidth: 680, margin: '0 auto' }}>
            {INTEGRATIONS_DATA.description}
          </p>
        </div>
        <div className="omni-marquee">
          <div className="omni-marquee__track">
            {[...INTEGRATIONS_DATA.logos, ...INTEGRATIONS_DATA.logos].map((logo, i) => (
              <div key={i} className="omni-logo-tile">
                <img
                  src={logo.src}
                  alt={logo.name}
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        {INTEGRATIONS_DATA.ctaHref && (
          <div className="omni-container" style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
            <Link href={INTEGRATIONS_DATA.ctaHref} className="omni-link">
              View all integrations
              <ArrowRight />
            </Link>
          </div>
        )}
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="omni-section">
        <div className="omni-container">
          <div className="omni-panel omni-cta">
            <h2 className="omni-h2">
              {FINAL_CTA_DATA.heading} <em>{FINAL_CTA_DATA.headingItalic}</em>{' '}
              {FINAL_CTA_DATA.headingSuffix}
            </h2>
            <p className="omni-body" style={{ maxWidth: 440, margin: '14px auto 0' }}>
              {FINAL_CTA_DATA.body}
            </p>
            <div className="omni-cta__actions">
              <Link href={FINAL_CTA_DATA.primaryBtn.href} className="omni-btn omni-btn--primary">
                {FINAL_CTA_DATA.primaryBtn.label}
                <ArrowRight size={16} />
              </Link>
              <Link href={FINAL_CTA_DATA.secondaryBtn.href} className="omni-btn omni-btn--secondary">
                {FINAL_CTA_DATA.secondaryBtn.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="omni-footer">
        <div className="omni-container omni-footer__row">
          <Link href="/saads-home-page?view=omnisense" className="omni-nav__brand">
            <span className="omni-nav__mark" aria-hidden="true" />
            <span className="omni-nav__wordmark">OmniSense</span>
          </Link>
          <nav className="omni-footer__links" aria-label="Footer">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="omni-footer__link">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="omni-footer__link">
              Contact
            </Link>
          </nav>
          <span className="omni-body-sm omni-muted">© SIRP. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
