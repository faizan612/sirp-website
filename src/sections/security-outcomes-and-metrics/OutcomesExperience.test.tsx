import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { OutcomesExperience } from './OutcomesExperience'
import { STATS_DATA } from '@/lib/constants/home'
import { SOM_SYSTEM } from '@/lib/constants/security-outcomes-and-metrics'

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', class {
    observe() {}
    unobserve() {}
    disconnect() {}
  })
})
afterEach(() => { cleanup(); vi.unstubAllGlobals() })

describe('Outcomes page', () => {
  it('preserves headline metrics without duplicating the autonomous percentage below section two', () => {
    render(<OutcomesExperience />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    STATS_DATA.stats.forEach(stat => expect(screen.getByText(stat.label)).toBeVisible())
    expect(screen.queryByText('92%')).not.toBeInTheDocument()
    expect(screen.getByText('7×')).toBeVisible()
  })

  it('retains deployment evidence, escalation limits, and measurement exclusions', () => {
    render(<OutcomesExperience />)
    const fintech = screen.getByRole('article', { name: 'Global fintech SOC' })
    expect(within(fintech).getByText('11 analysts')).toBeVisible()
    expect(within(fintech).getByText('2 on oversight')).toBeVisible()
    expect(screen.getByRole('article', { name: 'SaaS infrastructure company' })).toBeVisible()
    expect(screen.getByText('One oversight team')).toBeVisible()
    expect(screen.getByText('Zero routine escalations. Team retained.')).toBeVisible()
    for (const title of ['Context before a decision', 'Policy before execution', 'Analysts handle exceptions']) {
      const heading = screen.getByRole('heading', { name: title })
      expect(heading).toBeVisible()
      expect(heading.closest('details')).toBeNull()
    }
    SOM_SYSTEM.escalations.forEach(text => expect(screen.getByText(text)).toBeVisible())
    fireEvent.click(screen.getByText('Scope and exclusions'))
    expect(screen.getByText(/Excluded: Test incidents/)).toBeVisible()
  })

  it('keeps architecture detail available and distinguishes illustrative timing', () => {
    render(<OutcomesExperience />)
    expect(screen.getByRole('img', { name: /Deployment and tuning are excluded/ })).toBeVisible()
    expect(screen.getByText('90 days measured')).toBeVisible()
    expect(screen.getByText(/not verified deployment telemetry/)).toBeInTheDocument()
    expect(screen.getByText(/not verified deployment telemetry/).closest('details')).not.toHaveAttribute('open')
  })

  it('uses existing local image assets and valid section anchors', () => {
    const { container } = render(<OutcomesExperience />)
    container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(link => {
      expect(container.querySelector(link.getAttribute('href')!)).not.toBeNull()
    })
    for (const asset of [
      'images/omnisense/pillar-orchestrator.png',
      'images/sara/sara-co-analyst-hero.png',
      'images/sara/evidence-diagram/glow-field.svg',
      'homepage/figma/soc-cta/gradient-bg.png',
      'images/security-outcomes-and-metrics/system.png',
    ]) expect(existsSync(path.join(process.cwd(), 'public', asset))).toBe(true)
  })
})
