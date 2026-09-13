'use client'

import type { Editor } from '@tiptap/react'
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Minus,
  Undo2,
  Redo2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type ToolbarButtonProps = {
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  label: string
  children: React.ReactNode
}

function ToolbarButton({ onClick, isActive, disabled, label, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()} // keep editor focus/selection
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={isActive}
      title={label}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-sirp-sm text-text-secondary transition-colors',
        'hover:bg-bg-elevated hover:text-text-primary',
        'disabled:pointer-events-none disabled:opacity-40',
        isActive && 'bg-purple/20 text-purple-light',
      )}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
}

/** Custom Tailwind toolbar driving the headless Tiptap editor. */
export function EditorToolbar({ editor }: { editor: Editor }) {
  const setLink = () => {
    const previous = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('Link URL', previous ?? 'https://')
    if (url === null) return // cancelled
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    // Only allow safe schemes; anything else is dropped.
    if (!/^(https?:|mailto:)/i.test(url)) {
      window.alert('Links must start with http://, https:// or mailto:')
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-black/20 p-2">
      <ToolbarButton label="Bold" isActive={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold size={16} />
      </ToolbarButton>
      <ToolbarButton label="Italic" isActive={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic size={16} />
      </ToolbarButton>
      <ToolbarButton label="Strikethrough" isActive={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough size={16} />
      </ToolbarButton>
      <ToolbarButton label="Inline code" isActive={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()}>
        <Code size={16} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton label="Heading 2" isActive={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 size={16} />
      </ToolbarButton>
      <ToolbarButton label="Heading 3" isActive={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 size={16} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton label="Bullet list" isActive={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List size={16} />
      </ToolbarButton>
      <ToolbarButton label="Ordered list" isActive={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered size={16} />
      </ToolbarButton>
      <ToolbarButton label="Blockquote" isActive={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote size={16} />
      </ToolbarButton>
      <ToolbarButton label="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus size={16} />
      </ToolbarButton>
      <ToolbarButton label="Link" isActive={editor.isActive('link')} onClick={setLink}>
        <LinkIcon size={16} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton label="Undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>
        <Undo2 size={16} />
      </ToolbarButton>
      <ToolbarButton label="Redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>
        <Redo2 size={16} />
      </ToolbarButton>
    </div>
  )
}
