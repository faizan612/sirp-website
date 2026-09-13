import type { JSONContent } from '@tiptap/react'

/**
 * Concatenates every text node in a Tiptap doc. Backs the plain-text
 * authoring UI for rich-text block fields (Stage B of the page builder) — a
 * real formatting toolbar is a fast-follow; storage and rendering already go
 * through the same Tiptap-JSON pipeline as blog posts regardless.
 */
export function docToPlainText(doc: JSONContent | null | undefined): string {
  if (!doc) return ''
  const parts: string[] = []
  function walk(node: JSONContent) {
    if (node.type === 'text' && node.text) parts.push(node.text)
    node.content?.forEach(walk)
  }
  walk(doc)
  return parts.join('')
}

export function plainTextToDoc(text: string): JSONContent {
  return {
    type: 'doc',
    content: [{ type: 'paragraph', content: text ? [{ type: 'text', text }] : [] }],
  }
}
