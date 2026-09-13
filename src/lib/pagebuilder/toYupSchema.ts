import * as Yup from 'yup'
import type { AnySchema } from 'yup'
import type { BlockPropField, BlockPropSchema } from './propSchema'

// Absolute http(s)/mailto, or a site-relative path — matches the scheme
// allowlist already enforced at render time by src/lib/richtext/render.tsx.
const URL_PATTERN = /^(https?:\/\/|mailto:|\/)/i

function fieldToYup(field: BlockPropField): AnySchema {
  switch (field.kind) {
    case 'text': {
      const base = Yup.string().trim()
      const withMax = field.maxLength ? base.max(field.maxLength, `${field.label} is too long`) : base
      return field.required ? withMax.required(`${field.label} is required`) : withMax.notRequired()
    }
    case 'richText': {
      // Stored as Tiptap JSON — structurally validated (has a `doc` root), not
      // string-length validated. The render-time node/mark allowlist in
      // src/lib/richtext/render.tsx is the actual safety boundary, not this.
      //
      // Yup.mixed(), not Yup.object() — an object schema with no declared
      // shape strips every key under { stripUnknown: true } (the option every
      // registered block's validate() actually uses), silently reducing a
      // valid { type: 'doc', content: [...] } document down to {} *before*
      // this test ever runs. mixed() passes the value through untouched.
      const base = Yup.mixed().test('is-doc', `${field.label} is not a valid document`, (value) => {
        if (value == null) return !field.required
        return (value as { type?: string }).type === 'doc'
      })
      return field.required ? base.required(`${field.label} is required`) : base.nullable().notRequired()
    }
    case 'url': {
      const base = Yup.string().trim().matches(URL_PATTERN, `${field.label} must be a valid link`)
      return field.required ? base.required(`${field.label} is required`) : base.notRequired()
    }
    case 'image': {
      const base = Yup.object({ src: Yup.string().required(), alt: Yup.string().default('') })
      return field.required ? base.required(`${field.label} is required`) : base.notRequired()
    }
    case 'enum': {
      const values = field.options.map((o) => o.value)
      const base = Yup.string().oneOf(values, `Invalid ${field.label}`)
      return field.required ? base.required(`${field.label} is required`) : base.notRequired()
    }
    case 'boolean':
      return Yup.boolean().default(false)
    case 'number': {
      let base = Yup.number()
      if (field.min !== undefined) base = base.min(field.min, `${field.label} must be at least ${field.min}`)
      if (field.max !== undefined) base = base.max(field.max, `${field.label} must be at most ${field.max}`)
      return base.notRequired()
    }
    case 'object': {
      const shape = toYupSchema(field.fields)
      return field.required ? shape.required(`${field.label} is required`) : shape.notRequired()
    }
    case 'array': {
      let base = Yup.array().of(toYupSchema(field.itemFields))
      if (field.minItems !== undefined) base = base.min(field.minItems, `${field.label} needs at least ${field.minItems}`)
      if (field.maxItems !== undefined) base = base.max(field.maxItems, `${field.label} allows at most ${field.maxItems}`)
      return base
    }
  }
}

/** Mechanically derives a Yup object schema from a BlockPropSchema — the same
 *  schema drives the auto-generated property panel form. */
export function toYupSchema(schema: BlockPropSchema) {
  const shape = Object.fromEntries(Object.entries(schema).map(([key, field]) => [key, fieldToYup(field)]))
  return Yup.object(shape)
}
