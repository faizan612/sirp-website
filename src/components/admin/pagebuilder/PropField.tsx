'use client'

import type { JSONContent } from '@tiptap/react'
import type { BlockPropField, BlockPropSchema } from '@/lib/pagebuilder/propSchema'
import { defaultForSchema } from '@/lib/pagebuilder/propSchema'
import { docToPlainText, plainTextToDoc } from '@/lib/richtext/plainText'

type Props = {
  name: string
  field: BlockPropField
  value: unknown
  onChange: (value: unknown) => void
}

/** Renders the right input for one block prop field, driven entirely by its BlockPropField descriptor — one generic renderer, not a bespoke form per block type. */
export function PropField({ name, field, value, onChange }: Props) {
  const id = `field-${name}`

  switch (field.kind) {
    case 'text':
      return (
        <div className="cms-field">
          <label htmlFor={id} className="cms-label">
            {field.label}
            {field.required ? ' *' : ''}
          </label>
          <input
            id={id}
            className="cms-input"
            value={(value as string) ?? ''}
            maxLength={field.maxLength}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      )

    case 'richText':
      return (
        <div className="cms-field">
          <label htmlFor={id} className="cms-label">
            {field.label}
            {field.required ? ' *' : ''}
          </label>
          <textarea
            id={id}
            className="cms-textarea"
            value={docToPlainText(value as JSONContent | null)}
            onChange={(e) => onChange(e.target.value ? plainTextToDoc(e.target.value) : null)}
          />
          <p className="cms-list-meta" style={{ marginTop: '0.3rem' }}>
            Plain text for now — storage and rendering already go through the same safe Tiptap pipeline as blog posts;
            a bold/italic toolbar here is a fast-follow.
          </p>
        </div>
      )

    case 'url':
      return (
        <div className="cms-field">
          <label htmlFor={id} className="cms-label">
            {field.label}
            {field.required ? ' *' : ''}
          </label>
          <input id={id} className="cms-input" value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)} />
        </div>
      )

    case 'image': {
      const image = (value as { src?: string; alt?: string }) ?? {}
      return (
        <div className="cms-field">
          <label htmlFor={id} className="cms-label">
            {field.label}
            {field.required ? ' *' : ''}
          </label>
          <input
            id={id}
            className="cms-input"
            placeholder="Image URL"
            value={image.src ?? ''}
            onChange={(e) => onChange({ ...image, src: e.target.value })}
          />
          <input
            className="cms-input"
            style={{ marginTop: '0.5rem' }}
            placeholder="Alt text"
            value={image.alt ?? ''}
            onChange={(e) => onChange({ ...image, alt: e.target.value })}
          />
        </div>
      )
    }

    case 'enum':
      return (
        <div className="cms-field">
          <label htmlFor={id} className="cms-label">
            {field.label}
          </label>
          <select id={id} className="cms-select" value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)}>
            <option value="">—</option>
            {field.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      )

    case 'boolean':
      return (
        <label className="cms-switch" style={{ marginTop: '0.5rem' }}>
          <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
          <span className="cms-switch-track" />
          <span className="cms-switch-text">
            <b>{field.label}</b>
          </span>
        </label>
      )

    case 'number':
      return (
        <div className="cms-field">
          <label htmlFor={id} className="cms-label">
            {field.label}
          </label>
          <input
            id={id}
            type="number"
            className="cms-input"
            min={field.min}
            max={field.max}
            value={typeof value === 'number' ? value : ''}
            onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
          />
        </div>
      )

    case 'object':
      return (
        <fieldset className="cms-field" style={{ border: '1px solid var(--cms-line)', borderRadius: 10, padding: '0.85rem' }}>
          <legend className="cms-label" style={{ padding: '0 0.3rem' }}>
            {field.label}
            {field.required ? ' *' : ''}
          </legend>
          <ObjectFields
            schema={field.fields}
            value={(value as Record<string, unknown>) ?? {}}
            onChange={onChange as (v: Record<string, unknown>) => void}
          />
        </fieldset>
      )

    case 'array':
      return <ArrayField field={field} value={(value as unknown[]) ?? []} onChange={onChange as (v: unknown[]) => void} />
  }
}

function ObjectFields({
  schema,
  value,
  onChange,
}: {
  schema: BlockPropSchema
  value: Record<string, unknown>
  onChange: (v: Record<string, unknown>) => void
}) {
  return (
    <>
      {Object.entries(schema).map(([key, f]) => (
        <PropField key={key} name={key} field={f} value={value[key]} onChange={(v) => onChange({ ...value, [key]: v })} />
      ))}
    </>
  )
}

function ArrayField({
  field,
  value,
  onChange,
}: {
  field: Extract<BlockPropField, { kind: 'array' }>
  value: unknown[]
  onChange: (v: unknown[]) => void
}) {
  const canAddMore = field.maxItems === undefined || value.length < field.maxItems

  return (
    <div className="cms-field">
      <label className="cms-label">{field.label}</label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {value.map((item, i) => (
          <div key={i} style={{ border: '1px solid var(--cms-line)', borderRadius: 10, padding: '0.75rem', position: 'relative' }}>
            <button
              type="button"
              className="cms-linkbtn"
              style={{ position: 'absolute', top: '0.6rem', right: '0.6rem' }}
              onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            >
              Remove
            </button>
            <ObjectFields
              schema={field.itemFields}
              value={(item as Record<string, unknown>) ?? {}}
              onChange={(v) => onChange(value.map((it, idx) => (idx === i ? v : it)))}
            />
          </div>
        ))}
      </div>
      {canAddMore && (
        <button
          type="button"
          className="cms-btn cms-btn--ghost cms-btn--sm"
          style={{ marginTop: '0.6rem' }}
          onClick={() => onChange([...value, defaultForSchema(field.itemFields)])}
        >
          + Add
        </button>
      )}
    </div>
  )
}
