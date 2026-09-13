'use client'

import { useEditor, EditorContent, type JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorToolbar } from './EditorToolbar'
import './Editor.css'

const EMPTY_DOC: JSONContent = { type: 'doc', content: [{ type: 'paragraph' }] }

type EditorProps = {
  /** Existing Tiptap document when editing; empty doc when creating. */
  initialContent?: JSONContent | null
  /** Called with the structured JSON document on every change. */
  onChange: (doc: JSONContent) => void
}

/**
 * Notion-style rich text editor. Pairs Tiptap's headless engine with a custom
 * Tailwind toolbar. The editor's authoritative output is a structured JSON
 * document (`editor.getJSON()`) — never an HTML string — which is what lets the
 * public site render it without `dangerouslySetInnerHTML` and closes the Stored
 * XSS surface.
 */
export function Editor({ initialContent, onChange }: EditorProps) {
  const editor = useEditor({
    // Required for SSR (Next App Router): defer first render to the client to
    // avoid a hydration mismatch.
    immediatelyRender: false,
    extensions: [
      // StarterKit (v2) bundles bold/italic/strike/code/heading/lists/quote/
      // codeBlock/hr/history — but NOT Link, which we add separately below with
      // a strict protocol whitelist.
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ['http', 'https', 'mailto'],
        HTMLAttributes: { rel: 'noopener noreferrer nofollow', target: '_blank' },
      }),
      Placeholder.configure({ placeholder: 'Write your article…' }),
    ],
    content: initialContent ?? EMPTY_DOC,
    editorProps: {
      attributes: {
        class: 'cms-editor-content focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
  })

  return (
    <div className="cms-editor">
      {editor && <EditorToolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
}
