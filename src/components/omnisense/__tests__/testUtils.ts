import { vi } from 'vitest'

/** Same helper used across src/sections/home/__tests__ — reused here so the
 * omnisense component tests match house convention rather than reinventing it. */
/** jsdom has no IntersectionObserver. framer-motion's useInView constructs
 * one eagerly, so components using it (StatGauge, MetricRail,
 * GovernancePipeline, TimelineScrubber via useInViewOnce) need a working
 * stub, not `undefined`, to render in tests at all. Firing every observer
 * as "intersecting" immediately keeps tests deterministic without needing
 * to simulate scroll. */
export function mockIntersectionObserver() {
  class MockIntersectionObserver {
    callback: IntersectionObserverCallback
    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback
    }
    observe(target: Element) {
      this.callback(
        [{ isIntersecting: true, target } as IntersectionObserverEntry],
        this as unknown as IntersectionObserver,
      )
    }
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return []
    }
  }
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
}

export function mockMatchMedia(reducedMotion: boolean) {
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
