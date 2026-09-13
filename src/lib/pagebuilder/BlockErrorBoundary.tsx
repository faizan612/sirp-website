'use client'

import { Component, type ReactNode } from 'react'

/**
 * Catches a render-time throw from a single block's real component on the
 * *client* — e.g. a bug that only surfaces once a user interacts with a
 * block and it re-renders in the browser — so it can't take down the page
 * shell or sibling blocks. This does NOT protect the page's initial server
 * render (a nested error boundary can't reliably catch a synchronous throw
 * during SSR — see BlockRenderer.tsx's preflight check, which covers that
 * case instead).
 */
export class BlockErrorBoundary extends Component<
  { blockType: string; blockId: string; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error(
      `[pagebuilder] block "${this.props.blockType}" (id=${this.props.blockId}) threw during render:`,
      error instanceof Error ? error.message : error,
    )
  }

  render() {
    return this.state.hasError ? null : this.props.children
  }
}
