import 'server-only'
import { renderToStaticMarkup } from 'react-dom/server'
import './blocks' // side-effecting registration — must run before any lookup below
import { getBlockEntry } from './registry'
import type { BlockInstance } from './types'

export type PreviewRenderResult = { ok: true } | { ok: false; error: string }

/**
 * Proves a block's real component can render with its (already schema-
 * validated) props, WITHOUT rendering it as part of the public page tree.
 *
 * This exists specifically because it *can't* live in BlockRenderer.tsx —
 * Next.js's App Router forbids importing `react-dom/server` inside a Server
 * Component (a hard build error). A Server Action is not part of the RSC
 * render tree, so no such restriction applies here; this is meant to be
 * called from the landing-page save action (Stage B) before a block is
 * persisted, catching a component that would throw before it ever reaches
 * a real page load rather than after.
 *
 * Not a substitute for BlockRenderer's own (a)/(b) checks — this only ever
 * runs at save time, on an admin's own action; it does nothing for a block
 * that starts throwing later purely because its component code changed
 * after the page was already saved (a code-review problem, not a data
 * problem).
 */
export function previewRenderBlock(block: Pick<BlockInstance, 'type' | 'props'>): PreviewRenderResult {
  const entry = getBlockEntry(block.type)
  if (!entry) {
    return { ok: false, error: `Unknown block type "${block.type}"` }
  }

  let safeProps: unknown
  try {
    safeProps = entry.validate(block.props)
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Invalid block props' }
  }

  try {
    renderToStaticMarkup(<entry.Component {...entry.adapt(safeProps)} />)
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'This block failed to render' }
  }
}
