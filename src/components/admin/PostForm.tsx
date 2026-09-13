'use client'

import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Save } from 'lucide-react'
import type { JSONContent } from '@tiptap/react'
import { Editor } from './Editor'
import { POST_TYPES, type AdminPostRow, type PostActionState } from '@/lib/cms/types'

type PostFormProps = {
  action: (prev: PostActionState, formData: FormData) => Promise<PostActionState>
  /** Present when editing; absent when creating. */
  post?: AdminPostRow
}

const INITIAL: PostActionState = { ok: false }

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="cms-error">{message}</p>
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className="cms-btn cms-btn--primary">
      <span><Save size={16} /></span>
      <span>{pending ? 'Saving…' : 'Save post'}</span>
    </button>
  )
}

export function PostForm({ action, post }: PostFormProps) {
  const [state, formAction] = useActionState(action, INITIAL)
  const [doc, setDoc] = useState<JSONContent | null>(post?.content_json ?? null)
  const errors = state.errors ?? {}

  return (
    <form action={formAction}>
      {state.message && <div className="cms-banner cms-banner--error" style={{ marginBottom: '1.25rem' }}>{state.message}</div>}

      <div className="cms-card">
        <div className="cms-card-head">
          <div className="cms-card-title">Details</div>
          <div className="cms-card-desc">Title, URL slug and category.</div>
        </div>
        <div className="cms-card-body">
          <div className="cms-field">
            <label htmlFor="title" className="cms-label">Title</label>
            <input id="title" name="title" defaultValue={post?.title} className="cms-input" placeholder="A clear, specific headline" required />
            <FieldError message={errors.title} />
          </div>

          <div className="cms-grid-2" style={{ marginTop: '1.15rem' }}>
            <div className="cms-field">
              <label htmlFor="slug" className="cms-label">Slug</label>
              <input id="slug" name="slug" defaultValue={post?.slug} placeholder="my-post-title" className="cms-input" required />
              <FieldError message={errors.slug} />
            </div>
            <div className="cms-field">
              <label htmlFor="type" className="cms-label">Type</label>
              <select id="type" name="type" defaultValue={post?.type ?? 'blog'} className="cms-select">
                {POST_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <FieldError message={errors.type} />
            </div>
          </div>

          <div className="cms-field" style={{ marginTop: '1.15rem' }}>
            <label htmlFor="excerpt" className="cms-label">Excerpt</label>
            <textarea id="excerpt" name="excerpt" defaultValue={post?.excerpt ?? ''} rows={2} className="cms-textarea" placeholder="One or two sentences shown on the blog card." />
            <FieldError message={errors.excerpt} />
          </div>

          <div className="cms-field" style={{ marginTop: '1.15rem' }}>
            <label htmlFor="cover" className="cms-label">
              Cover image {post ? <small>(leave empty to keep current)</small> : null}
            </label>
            <input id="cover" name="cover" type="file" accept="image/png,image/jpeg,image/webp,image/avif" className="cms-file" />
            <FieldError message={errors.cover} />
          </div>
        </div>
      </div>

      <div className="cms-card">
        <div className="cms-card-head">
          <div className="cms-card-title">Content</div>
          <div className="cms-card-desc">Formatting is stored as structured data — never raw HTML.</div>
        </div>
        <div className="cms-card-body">
          <Editor initialContent={post?.content_json ?? null} onChange={setDoc} />
          {/* The editor's structured JSON travels to the server action here. */}
          <input type="hidden" name="contentJson" value={doc ? JSON.stringify(doc) : ''} />
          <FieldError message={errors.contentJson} />
        </div>
      </div>

      <div className="cms-actionbar">
        <label className="cms-switch" style={{ marginRight: 'auto' }}>
          <input type="checkbox" name="publish" defaultChecked={Boolean(post?.published_at)} />
          <span className="cms-switch-track" />
          <span className="cms-switch-text">
            <b>Publish now</b>
            <span>Unchecked saves as a draft</span>
          </span>
        </label>
        <SubmitButton />
      </div>
    </form>
  )
}
