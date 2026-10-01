import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { DeploymentEvidence, OutcomeMechanism } from './OutcomeEvidence'
import { SOM_DEPLOYMENTS, SOM_WHY } from '@/lib/constants/security-outcomes-and-metrics'

afterEach(cleanup)

describe('Outcomes evidence presentations', () => {
  it('shows each deployment with its own before, after, result and quote', () => {
    render(<DeploymentEvidence />)
    SOM_DEPLOYMENTS.items.forEach(item => {
      fireEvent.click(screen.getByRole('tab', { name: item.company }))
      const panel = screen.getByRole('tabpanel')
      for (const text of [item.before, item.after, item.results, item.quote]) expect(within(panel).getByText(text)).toBeVisible()
    })
  })
  it('supports keyboard switching and moves focus', () => {
    render(<DeploymentEvidence />)
    const tabs = screen.getAllByRole('tab')
    fireEvent.keyDown(tabs[0], { key: 'End' })
    expect(tabs[1]).toHaveFocus()
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    fireEvent.keyDown(tabs[1], { key: 'Home' })
    expect(tabs[0]).toHaveFocus()
  })
  it('uses the corresponding local asset and explanation for each loop stage', () => {
    render(<OutcomeMechanism />)
    SOM_WHY.stages.forEach(stage => {
      fireEvent.click(screen.getByRole('tab', { name: new RegExp(stage.label) }))
      const panel = screen.getByRole('tabpanel')
      expect(within(panel).getByText(stage.body)).toBeVisible()
      expect(existsSync(path.join(process.cwd(), 'public/images/omnisense', `architecture-${stage.id}.svg`))).toBe(true)
    })
    const tabs = screen.getAllByRole('tab')
    fireEvent.keyDown(tabs[3], { key: 'ArrowRight' })
    expect(tabs[0]).toHaveFocus()
  })
})
