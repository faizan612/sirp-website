'use client'

import { useActionState, useMemo, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Save } from 'lucide-react'
import '@/lib/pagebuilder/blocks'
import { getBlockEntry } from '@/lib/pagebuilder/registry'
import { BlockOutline } from './BlockOutline'
import { PropField } from './PropField'
import type { AdminLandingPageRow, BlockInstance, LandingPageActionState } from '@/lib/pagebuilder/types'

const INITIAL: LandingPageActionState = { ok: false }

function newBlockId(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `b_${Date.now()}_${Math.random().toString(36).slice(2)}`
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className="cms-btn cms-btn--primary">
      <span>
        <Save size={16} />
      </span>
      <span>{pending ? 'Saving…' : 'Save page'}</span>
    </button>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="cms-error">{message}</p>
}

export function PageBuilderEditor({
  action,
  page,
}: {
  action: (prev: LandingPageActionState, formData: FormData) => Promise<LandingPageActionState>
  page?: AdminLandingPageRow
}) {
  const [state, formAction] = useActionState(action, INITIAL)
  const [blocks, setBlocks] = useState<BlockInstance[]>(page?.document.blocks ?? [])
  const [selectedId, setSelectedId] = useState<string | null>(page?.document.blocks[0]?.id ?? null)

  const selected = blocks.find((b) => b.id === selectedId) ?? null
  const selectedEntry = selected ? getBlockEntry(selected.type) : undefined
  const errors = state.errors ?? {}

  const documentJson = useMemo(() => JSON.stringify({ version: 1, blocks }), [blocks])

  function addBlock(type: string) {
    const entry = getBlockEntry(type)
    if (!entry) return
    const block: BlockInstance = { id: newBlockId(), type, schemaVersion: entry.schemaVersion, props: entry.defaultProps }
    setBlocks((prev) => [...prev, block])
    setSelectedId(block.id)
  }

  function moveBlock(id: string, direction: 'up' | 'down') {
    setBlocks((prev) => {
      const index = prev.findIndex((b) => b.id === id)
      const swapWith = direction === 'up' ? index - 1 : index + 1
      if (index === -1 || swapWith < 0 || swapWith >= prev.length) return prev
      const next = [...prev]
      ;[next[index], next[swapWith]] = [next[swapWith], next[index]]
      return next
    })
  }

  function duplicateBlock(id: string) {
    setBlocks((prev) => {
      const index = prev.findIndex((b) => b.id === id)
      if (index === -1) return prev
      const copy: BlockInstance = { ...prev[index], id: newBlockId() }
      const next = [...prev]
      next.splice(index + 1, 0, copy)
      return next
    })
  }

  function deleteBlock(id: string) {
    setBlocks((prev) => prev.filter((b) => b.id !== id))
    setSelectedId((current) => (current === id ? null : current))
  }

  function updateSelectedProps(props: unknown) {
    if (!selected) return
    const id = selected.id
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, props } : b)))
  }

  return (
    <form action={formAction}>
      {state.message && (
        <div className="cms-banner cms-banner--error" style={{ marginBottom: '1.25rem' }}>
          {state.message}
        </div>
      )}

      <div className="cms-card">
        <div className="cms-card-head">
          <div className="cms-card-title">Details</div>
        </div>
        <div className="cms-card-body">
          <div className="cms-field">
            <label htmlFor="title" className="cms-label">
              Title
            </label>
            <input id="title" name="title" defaultValue={page?.title} className="cms-input" required />
            <FieldError message={errors.title} />
          </div>
          <div className="cms-grid-2" style={{ marginTop: '1.15rem' }}>
            <div className="cms-field">
              <label htmlFor="slug" className="cms-label">
                Slug <small>(/lp/…)</small>
              </label>
              <input id="slug" name="slug" defaultValue={page?.slug} placeholder="my-campaign" className="cms-input" required />
              <FieldError message={errors.slug} />
            </div>
            <div className="cms-field">
              <label htmlFor="rootAlias" className="cms-label">
                Root URL <small>(optional, e.g. black-friday)</small>
              </label>
              <input id="rootAlias" name="rootAlias" defaultValue={page?.rootAlias ?? ''} className="cms-input" />
              <FieldError message={errors.rootAlias} />
            </div>
          </div>
        </div>
      </div>

      <div className="cms-grid-2" style={{ marginTop: '1.25rem', alignItems: 'start' }}>
        <BlockOutline
          blocks={blocks}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onAdd={addBlock}
          onMove={moveBlock}
          onDuplicate={duplicateBlock}
          onDelete={deleteBlock}
        />

        <div className="cms-card">
          <div className="cms-card-head">
            <div className="cms-card-title">{selectedEntry ? `Edit: ${selectedEntry.displayName}` : 'Select a block'}</div>
          </div>
          <div className="cms-card-body">
            {selected && selectedEntry ? (
              <>
                {Object.entries(selectedEntry.propSchema).map(([key, field]) => (
                  <PropField
                    key={key}
                    name={key}
                    field={field}
                    value={(selected.props as Record<string, unknown> | undefined)?.[key]}
                    onChange={(v) => updateSelectedProps({ ...(selected.props as Record<string, unknown>), [key]: v })}
                  />
                ))}
                <FieldError message={errors[`block:${selected.id}`]} />
              </>
            ) : (
              <p className="cms-subtitle" style={{ margin: 0 }}>
                Add or select a block on the left to edit its content.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="cms-card" style={{ marginTop: '1.25rem' }}>
        <div className="cms-card-head">
          <div className="cms-card-title">SEO</div>
          <div className="cms-card-desc">Overrides the defaults derived from the page's own content.</div>
        </div>
        <div className="cms-card-body">
          <div className="cms-field">
            <label htmlFor="seoTitle" className="cms-label">
              Meta title
            </label>
            <input id="seoTitle" name="seoTitle" defaultValue={page?.seo.title} className="cms-input" maxLength={70} />
          </div>
          <div className="cms-field" style={{ marginTop: '1.15rem' }}>
            <label htmlFor="seoDescription" className="cms-label">
              Meta description
            </label>
            <textarea
              id="seoDescription"
              name="seoDescription"
              defaultValue={page?.seo.description}
              className="cms-textarea"
              maxLength={200}
            />
          </div>
          <div className="cms-grid-2" style={{ marginTop: '1.15rem' }}>
            <div className="cms-field">
              <label htmlFor="seoOgImage" className="cms-label">
                OG image URL
              </label>
              <input id="seoOgImage" name="seoOgImage" defaultValue={page?.seo.ogImage} className="cms-input" />
            </div>
            <div className="cms-field">
              <label htmlFor="seoCanonical" className="cms-label">
                Canonical override
              </label>
              <input id="seoCanonical" name="seoCanonical" defaultValue={page?.seo.canonical} className="cms-input" />
            </div>
          </div>
          <label className="cms-switch" style={{ marginTop: '1.15rem' }}>
            <input type="checkbox" name="seoNoindex" defaultChecked={page?.seo.noindex} />
            <span className="cms-switch-track" />
            <span className="cms-switch-text">
              <b>Noindex</b>
              <span>Hide this page from search engines</span>
            </span>
          </label>
        </div>
      </div>

      <input type="hidden" name="document" value={documentJson} />

      <div className="cms-actionbar">
        <label className="cms-switch" style={{ marginRight: 'auto' }}>
          <input type="checkbox" name="publish" defaultChecked={Boolean(page?.publishedAt)} />
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
