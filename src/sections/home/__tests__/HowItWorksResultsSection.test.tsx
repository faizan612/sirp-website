import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HowItWorksResultsSection } from '../HowItWorksResultsSection'
import { problem } from '@/content/home/problem'
import { STATS_DATA } from '@/lib/constants'

describe('HowItWorksResultsSection', () => {
  it('renders the headline as the section\'s only h2', () => {
    render(<HowItWorksResultsSection />)
    const headings = screen.getAllByRole('heading', { level: 2 })
    expect(headings).toHaveLength(1)
    expect(headings[0]?.textContent).toBe(problem.stat)
  })

  it('renders all three stat values and labels', () => {
    render(<HowItWorksResultsSection />)
    for (const stat of STATS_DATA.stats) {
      expect(screen.getByText(`${stat.value}%`)).toBeInTheDocument()
      expect(screen.getByText(stat.label)).toBeInTheDocument()
    }
  })

  it('points the demo CTA at the demo href', () => {
    render(<HowItWorksResultsSection />)
    const cta = screen.getByRole('link', { name: /get a demo/i })
    expect(cta).toHaveAttribute('href', STATS_DATA.demoHref)
  })

  it('renders the eyebrow, body copy, and legend labels verbatim', () => {
    render(<HowItWorksResultsSection />)
    expect(screen.getByText(problem.eyebrow)).toBeInTheDocument()
    expect(screen.getByText(problem.body)).toBeInTheDocument()
    expect(screen.getByText(problem.legendLit)).toBeInTheDocument()
    expect(screen.getByText(problem.legendDim)).toBeInTheDocument()
  })
})
