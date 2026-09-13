/**
 * A small bespoke field-descriptor DSL for a block's editable props — not raw
 * Yup, not JSON Schema. Yup alone has no native concept of "render an image
 * picker" or "this is a repeatable fieldset," and JSON Schema needs vendor
 * extensions to express the same thing with more ceremony for no real gain.
 * `toYupSchema()` mechanically derives a real Yup validator from this, so
 * validation *execution* still goes through Yup (matching the rest of this
 * codebase) — only the *authoring* format is new.
 */

export type BlockPropField =
  | { kind: 'text'; label: string; required?: boolean; maxLength?: number; placeholder?: string }
  | { kind: 'richText'; label: string; mode: 'inline' | 'block'; required?: boolean }
  | { kind: 'url'; label: string; required?: boolean }
  | { kind: 'image'; label: string; required?: boolean }
  | { kind: 'enum'; label: string; options: readonly { value: string; label: string }[]; required?: boolean }
  | { kind: 'boolean'; label: string }
  | { kind: 'number'; label: string; min?: number; max?: number }
  | { kind: 'object'; label: string; required?: boolean; fields: BlockPropSchema }
  | { kind: 'array'; label: string; itemFields: BlockPropSchema; minItems?: number; maxItems?: number }

export type BlockPropSchema = Record<string, BlockPropField>

/** A blank starting value for one field — used when an admin adds a new array item in the editor. */
function defaultForField(field: BlockPropField): unknown {
  switch (field.kind) {
    case 'text':
    case 'url':
      return ''
    case 'richText':
      return null
    case 'image':
      return { src: '', alt: '' }
    case 'enum':
      return ''
    case 'boolean':
      return false
    case 'number':
      return undefined
    case 'object':
      return defaultForSchema(field.fields)
    case 'array':
      return []
  }
}

/** A blank starting object for a whole BlockPropSchema — one field per key, via defaultForField. */
export function defaultForSchema(schema: BlockPropSchema): Record<string, unknown> {
  return Object.fromEntries(Object.entries(schema).map(([key, field]) => [key, defaultForField(field)]))
}
