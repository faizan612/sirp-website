import './blocks' // side-effecting registration — must run before any lookup below
import { getBlockEntry } from './registry'
import { BlockErrorBoundary } from './BlockErrorBoundary'
import type { BlockInstance } from './types'

function logBlockIssue(block: BlockInstance, stage: string, err: unknown) {
  // Block type + id + stage only — never block.props (admin-authored text,
  // confidential per data-handling policy) and never a raw error payload
  // beyond its message.
  console.error(
    `[pagebuilder] block "${block.type}" (id=${block.id}) failed at ${stage}`,
    err instanceof Error ? err.message : err,
  )
}

/**
 * Renders one block instance. Guards against two failure modes here, both
 * plain synchronous checks with no dependency on how React itself renders:
 *
 *  (a) the block's type was renamed/removed from the registry after the page
 *      was saved with it → log, return null. Never a visible placeholder.
 *  (b) the stored props fail schema validation (hand-edited data, or a
 *      migration that didn't fully patch the shape) → log, return null.
 *
 * A third failure mode — the real component throwing during render — is
 * NOT guarded here. Next.js's App Router explicitly forbids importing
 * `react-dom/server` inside a Server Component (a hard build error, not a
 * lint warning), which rules out the obvious "preflight-render this exact
 * element in a try/catch" fix from inside this file. A nested
 * BlockErrorBoundary doesn't substitute for it either — verified empirically
 * (see BlockRenderer.test.tsx's history) that a class-based error boundary
 * does not reliably catch a synchronous throw during React's *server*
 * render; it only protects a *client-side* re-render after hydration, which
 * is what BlockErrorBoundary is scoped to below.
 *
 * The real guard against (c) is at *save time*, in the admin action, not
 * render time: `previewRenderBlock()` (src/lib/pagebuilder/previewRender.tsx)
 * runs in a Server Action, which is not part of the RSC render tree and so
 * has no such restriction — a block that would throw is rejected before it
 * can ever be saved, rather than being caught after the fact on every page
 * load.
 */
export function BlockRenderer({ block }: { block: BlockInstance }) {
  const entry = getBlockEntry(block.type)

  if (!entry) {
    logBlockIssue(block, 'lookup', new Error('unregistered block type'))
    return null
  }

  let rawProps: unknown = block.props
  if (entry.migrate && block.schemaVersion < entry.schemaVersion) {
    try {
      rawProps = entry.migrate(block.props, block.schemaVersion)
    } catch (err) {
      logBlockIssue(block, 'migrate', err)
      return null
    }
  }

  let safeProps: unknown
  try {
    safeProps = entry.validate(rawProps)
  } catch (err) {
    logBlockIssue(block, 'validate', err)
    return null
  }

  const Component = entry.Component
  return (
    <BlockErrorBoundary blockType={block.type} blockId={block.id}>
      <Component {...entry.adapt(safeProps)} />
    </BlockErrorBoundary>
  )
}

export function PageRenderer({ blocks }: { blocks: BlockInstance[] }) {
  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  )
}
