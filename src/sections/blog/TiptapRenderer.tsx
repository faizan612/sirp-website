import type { JSONContent } from '@tiptap/react'
import { renderRichText } from '@/lib/richtext/render'

/**
 * Renders a full Tiptap JSON document (a blog post body) to React elements.
 * Thin wrapper around the shared rich-text engine at 'full' mode — see
 * src/lib/richtext/render.tsx for the whitelist/security rationale (no
 * dangerouslySetInnerHTML, node/mark allowlist enforced at render time).
 */
export function TiptapRenderer({ doc }: { doc: JSONContent }) {
  return <div className="blog-post-prose">{renderRichText(doc, 'full')}</div>
}
