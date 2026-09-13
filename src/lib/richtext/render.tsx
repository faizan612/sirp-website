import type { JSONContent } from '@tiptap/react'
import { Fragment, type ReactNode } from 'react'

/**
 * Renders a Tiptap JSON document to React elements, restricted to the node/mark
 * allowlist for `mode`. This is the single audit surface for "structured JSON
 * in, real React elements out, no dangerouslySetInnerHTML" — the blog's
 * full-document renderer and the page builder's inline/block rich-text fields
 * all share this engine so the safety logic can't drift between call sites.
 *
 * The allowlist is enforced here, at render time, regardless of what the
 * editor UI allowed when a document was authored — stored JSON can be
 * hand-edited, carried over from a looser mode, or just stale, so the
 * render-time check is the real security boundary; any editor-side
 * restriction is only a UX nicety on top of it.
 */

export type RichTextMode = 'inline' | 'block' | 'full'

const SAFE_LINK = /^(https?:|mailto:)/i

const ALLOWED_NODES: Record<RichTextMode, ReadonlySet<string>> = {
  // Inline fields render inside h1-h4/span — no block-level tags allowed (a <p>
  // or <ul> nested inside an <h3> is invalid HTML).
  inline: new Set(['doc', 'text', 'hardBreak']),
  // Block fields render inside a plain <div> — paragraphs/lists are valid there.
  block: new Set(['doc', 'paragraph', 'text', 'hardBreak', 'bulletList', 'orderedList', 'listItem']),
  // Full — today's blog post-body whitelist, unchanged.
  full: new Set([
    'doc',
    'paragraph',
    'heading',
    'bulletList',
    'orderedList',
    'listItem',
    'blockquote',
    'codeBlock',
    'horizontalRule',
    'hardBreak',
    'text',
  ]),
}

const ALLOWED_MARKS: Record<RichTextMode, ReadonlySet<string>> = {
  inline: new Set(['bold', 'italic', 'strike', 'link']),
  block: new Set(['bold', 'italic', 'strike', 'link', 'code']),
  full: new Set(['bold', 'italic', 'strike', 'code', 'link']),
}

function renderMarks(text: string, marks: JSONContent['marks'], key: string, mode: RichTextMode): ReactNode {
  if (!marks || marks.length === 0) return text
  const allowed = ALLOWED_MARKS[mode]

  return marks.reduce<ReactNode>((child, mark, i) => {
    if (!allowed.has(mark.type)) return child
    const k = `${key}-m${i}`
    switch (mark.type) {
      case 'bold':
        return <strong key={k}>{child}</strong>
      case 'italic':
        return <em key={k}>{child}</em>
      case 'strike':
        return <s key={k}>{child}</s>
      case 'code':
        return <code key={k}>{child}</code>
      case 'link': {
        const href = typeof mark.attrs?.href === 'string' ? mark.attrs.href : ''
        if (!SAFE_LINK.test(href)) return child // drop unsafe schemes
        return (
          <a key={k} href={href} rel="noopener noreferrer nofollow" target="_blank">
            {child}
          </a>
        )
      }
      default:
        return child
    }
  }, text)
}

function renderNode(node: JSONContent, key: string, mode: RichTextMode): ReactNode {
  const children = node.content?.map((child, i) => renderNode(child, `${key}-${i}`, mode))

  if (node.type !== 'text' && !ALLOWED_NODES[mode].has(node.type ?? '')) {
    // Outside the allowlist for this mode (or genuinely unknown) — drop the
    // wrapper, keep children, so a disallowed node degrades gracefully instead
    // of vanishing along with everything nested inside it.
    return children ? <Fragment key={key}>{children}</Fragment> : null
  }

  switch (node.type) {
    case 'doc':
      return <Fragment key={key}>{children}</Fragment>
    case 'paragraph':
      return <p key={key}>{children}</p>
    case 'heading': {
      const level = Math.min(Math.max(Number(node.attrs?.level ?? 2), 2), 4)
      const Tag = `h${level}` as 'h2' | 'h3' | 'h4'
      return <Tag key={key}>{children}</Tag>
    }
    case 'bulletList':
      return <ul key={key}>{children}</ul>
    case 'orderedList':
      return <ol key={key}>{children}</ol>
    case 'listItem':
      return <li key={key}>{children}</li>
    case 'blockquote':
      return <blockquote key={key}>{children}</blockquote>
    case 'codeBlock':
      return (
        <pre key={key}>
          <code>{children}</code>
        </pre>
      )
    case 'horizontalRule':
      return <hr key={key} />
    case 'hardBreak':
      return <br key={key} />
    case 'text':
      return <Fragment key={key}>{renderMarks(node.text ?? '', node.marks, key, mode)}</Fragment>
    default:
      // Unknown node type — render its children if any, otherwise nothing.
      return children ? <Fragment key={key}>{children}</Fragment> : null
  }
}

export function renderRichText(doc: JSONContent, mode: RichTextMode): ReactNode {
  return renderNode(doc, 'n', mode)
}
