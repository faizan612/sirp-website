import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CasePanel } from '../CasePanel'
import { CASE, T } from '@/content/home/casePanel'

function mockMatchMedia(reducedMotion: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('reduce') ? reducedMotion : false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }))
}

function mockRaf() {
  let nextId = 0
  const callbacks = new Map<number, FrameRequestCallback>()
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    nextId += 1
    callbacks.set(nextId, cb)
    return nextId
  })
  vi.stubGlobal('cancelAnimationFrame', (handle: number) => {
    callbacks.delete(handle)
  })
  return {
    flush(now: number) {
      const pending = Array.from(callbacks.values())
      callbacks.clear()
      pending.forEach((cb) => cb(now))
    },
  }
}

describe('CasePanel', () => {
  beforeEach(() => {
    mockMatchMedia(false)
    // jsdom has no IntersectionObserver; the hook no-ops without one.
    vi.stubGlobal('IntersectionObserver', undefined)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('resolves straight to the closed stage on mount when the OS prefers reduced motion, with no run to click', () => {
    mockMatchMedia(true)
    render(<CasePanel />)
    expect(screen.getByText(CASE.verdict)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /close this case/i })).not.toBeInTheDocument()
  })

  it('disables the run button and swaps its label to "Working…" once a run starts', () => {
    render(<CasePanel />)
    const button = screen.getByRole('button', { name: /close this case/i })
    fireEvent.click(button)
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('Working…')
  })

  it('announces each stage transition through the aria-live region', () => {
    const raf = mockRaf()
    render(<CasePanel />)
    fireEvent.click(screen.getByRole('button', { name: /close this case/i }))

    const live = screen.getByRole('status')
    expect(live).toHaveTextContent('Investigating')

    raf.flush(0)
    raf.flush(T.gate)
    expect(live).toHaveTextContent('Governance gate evaluating the proposed action')

    raf.flush(T.acting)
    expect(live).toHaveTextContent('Taking action')

    raf.flush(T.closed)
    expect(live).toHaveTextContent(`Case ${CASE.id} closed. ${CASE.verdict}`)
  })
})
