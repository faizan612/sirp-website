import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TextMotion } from './TextMotion'

const mocks = vi.hoisted(() => ({ tween: vi.fn(), revert: vi.fn(), splitRevert: vi.fn(), refresh: vi.fn() }))
vi.mock('gsap', () => ({ gsap: {
  registerPlugin: vi.fn(), fromTo: mocks.tween,
  context: (callback: () => void) => { callback(); return { revert: mocks.revert } },
} }))
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: { refresh: mocks.refresh } }))
vi.mock('gsap/SplitText', () => ({ SplitText: {
  create: (heading: HTMLElement) => ({ words: [heading], revert: mocks.splitRevert }),
} }))

describe('TextMotion', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Object.defineProperty(document, 'fonts', { configurable: true, value: { ready: Promise.resolve() } })
  })
  afterEach(() => { cleanup(); vi.unstubAllGlobals() })

  async function mount(reduced = false) {
    vi.stubGlobal('matchMedia', () => ({ matches: reduced, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
    const result = render(<TextMotion>
      <h1 data-text-motion="hero">Hero</h1>
      <h2 data-text-motion="scroll">Key statement</h2>
      <h2 data-text-motion="reveal">Section heading</h2>
      <h3>Card title</h3>
    </TextMotion>)
    await act(async () => { await document.fonts.ready })
    return result
  }

  it('animates only selected headings and scrubs the key statement without translation', async () => {
    await mount()
    expect(mocks.tween).toHaveBeenCalledTimes(3)
    const calls = mocks.tween.mock.calls
    expect(calls[0][2].duration).toBe(1.2)
    expect(calls[1][2].scrollTrigger.scrub).toBe(true)
    expect(calls[2][2].scrollTrigger.once).toBe(true)
    calls.forEach(([, from, to]) => { expect(from.y).toBeUndefined(); expect(to.y).toBeUndefined() })
    expect(screen.getByText('Card title')).toBeVisible()
  })

  it('keeps content static for reduced motion', async () => {
    await mount(true)
    expect(mocks.tween).not.toHaveBeenCalled()
    expect(screen.getByText('Key statement')).toBeVisible()
  })

  it('reverts animation and word wrappers on unmount', async () => {
    const result = await mount()
    result.unmount()
    expect(mocks.revert).toHaveBeenCalledOnce()
    expect(mocks.splitRevert).toHaveBeenCalledOnce()
  })
})
