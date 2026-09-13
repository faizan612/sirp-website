import { describe, it, expect } from 'vitest'
import { toYupSchema } from '../toYupSchema'

describe('toYupSchema', () => {
  it('validates required text fields with a max length', async () => {
    const schema = toYupSchema({ title: { kind: 'text', label: 'Title', required: true, maxLength: 10 } })
    await expect(schema.validate({ title: '' })).rejects.toThrow(/required/)
    await expect(schema.validate({ title: 'way too long for this field' })).rejects.toThrow(/too long/)
    await expect(schema.validate({ title: 'ok' })).resolves.toEqual({ title: 'ok' })
  })

  it('validates a url field against the allowed scheme pattern', async () => {
    const schema = toYupSchema({ href: { kind: 'url', label: 'Link', required: true } })
    await expect(schema.validate({ href: 'javascript:alert(1)' })).rejects.toThrow(/valid link/)
    await expect(schema.validate({ href: 'https://sirp.io' })).resolves.toEqual({ href: 'https://sirp.io' })
    await expect(schema.validate({ href: '/contact' })).resolves.toEqual({ href: '/contact' })
  })

  it('validates an enum field against its option values', async () => {
    const schema = toYupSchema({
      variant: {
        kind: 'enum',
        label: 'Variant',
        required: true,
        options: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ],
      },
    })
    await expect(schema.validate({ variant: 'c' })).rejects.toThrow(/Invalid Variant/)
    await expect(schema.validate({ variant: 'a' })).resolves.toEqual({ variant: 'a' })
  })

  it('validates a richText field as a Tiptap doc shape, not by string length', async () => {
    const schema = toYupSchema({ heading: { kind: 'richText', label: 'Heading', mode: 'inline', required: true } })
    await expect(schema.validate({ heading: { type: 'paragraph' } })).rejects.toThrow(/not a valid document/)
    await expect(schema.validate({ heading: { type: 'doc', content: [] } })).resolves.toBeTruthy()
  })

  it('preserves a richText field\'s content under stripUnknown — every registered block validates with this option', async () => {
    // Regression test: Yup.object() with no declared shape silently strips
    // every key (type, content, ...) under stripUnknown, corrupting a valid
    // Tiptap doc down to {} before the doc-shape check ever runs. This is
    // exactly the option every block's real validate() call uses
    // (validateSync(raw, { stripUnknown: true })) — a test that omits it, as
    // the test above does, would not have caught this.
    const schema = toYupSchema({
      heading: { kind: 'richText', label: 'Heading', mode: 'inline' },
      title: { kind: 'text', label: 'Title', required: true },
    })
    const doc = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'hi' }] }] }
    const result = schema.validateSync({ heading: doc, title: 'x', extra: 'strip me' }, { stripUnknown: true }) as Record<
      string,
      unknown
    >
    expect(result.heading).toEqual(doc)
    expect(result).not.toHaveProperty('extra')
  })

  it('validates a nested object field', async () => {
    const schema = toYupSchema({
      button: {
        kind: 'object',
        label: 'Button',
        required: true,
        fields: {
          label: { kind: 'text', label: 'Label', required: true },
          href: { kind: 'url', label: 'Link', required: true },
        },
      },
    })
    await expect(schema.validate({ button: { label: 'Go', href: '/x' } })).resolves.toEqual({ button: { label: 'Go', href: '/x' } })
    await expect(schema.validate({ button: { label: '', href: '/x' } })).rejects.toThrow()
  })

  it('validates an array field with a minimum item count', async () => {
    const schema = toYupSchema({
      items: {
        kind: 'array',
        label: 'Items',
        minItems: 1,
        itemFields: { question: { kind: 'text', label: 'Question', required: true } },
      },
    })
    await expect(schema.validate({ items: [] })).rejects.toThrow(/at least 1/)
    await expect(schema.validate({ items: [{ question: 'Q1' }] })).resolves.toEqual({ items: [{ question: 'Q1' }] })
  })

  it('defaults an omitted boolean field to false', async () => {
    const schema = toYupSchema({ flag: { kind: 'boolean', label: 'Flag' } })
    await expect(schema.validate({})).resolves.toEqual({ flag: false })
  })
})
