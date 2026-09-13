import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HeroSection } from '../HeroSection'
import { hero } from '@/content/home/hero'
import { CASE } from '@/content/home/casePanel'

function mockMatchMedia() {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }))
}

describe('HeroSection', () => {
  beforeEach(() => {
    mockMatchMedia()
    // jsdom has no IntersectionObserver; the case panel's hook no-ops without one.
    vi.stubGlobal('IntersectionObserver', undefined)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the copy const verbatim', () => {
    render(<HeroSection />)
    expect(screen.getByText(hero.eyebrow)).toBeInTheDocument()
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.textContent).toBe(hero.headlineSetup + hero.headlinePayoff)
    expect(screen.getByText(hero.subhead)).toBeInTheDocument()
  })

  it('renders the headline as two block-level sentences, not one run-on line', () => {
    render(<HeroSection />)
    const h1 = screen.getByRole('heading', { level: 1 })
    const spans = h1.querySelectorAll('span')
    expect(spans).toHaveLength(2)
    expect(spans[0]?.textContent).toBe(hero.headlineSetup)
    expect(spans[1]?.textContent).toBe(hero.headlinePayoff)
  })

  it('points the CTAs at their hrefs, primary first in DOM order', () => {
    render(<HeroSection />)
    const links = screen.getAllByRole('link')
    const primary = screen.getByRole('link', { name: new RegExp(hero.primaryCta.label) })
    const secondary = screen.getByRole('link', { name: new RegExp(hero.secondaryCta.label) })
    expect(primary).toHaveAttribute('href', hero.primaryCta.href)
    expect(secondary).toHaveAttribute('href', hero.secondaryCta.href)
    expect(links.indexOf(primary)).toBeLessThan(links.indexOf(secondary))
  })

  it('renders the interactive case panel as the hero proof, addressable at the secondary CTA anchor', () => {
    render(<HeroSection />)
    expect(screen.getByText(CASE.title)).toBeInTheDocument()
    expect(document.getElementById('case-walkthrough')).not.toBeNull()
    expect(hero.secondaryCta.href).toBe('#case-walkthrough')
  })
})
