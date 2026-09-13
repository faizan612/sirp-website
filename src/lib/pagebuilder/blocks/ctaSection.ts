import type { ComponentProps } from 'react'
import type { JSONContent } from '@tiptap/react'
import { CtaSection } from '@/sections/home/CtaSection'
import { renderRichText } from '@/lib/richtext/render'
import { toYupSchema } from '../toYupSchema'
import { registerBlock } from '../registry'
import type { BlockPropSchema } from '../propSchema'

type CtaBtn = { label: string; href: string }

export type CtaSectionStoredProps = {
  pill?: JSONContent | null
  pillShowSparkle: boolean
  heading?: JSONContent | null
  description?: string
  disclaimer?: string
  primaryBtn: CtaBtn
  secondaryBtn?: CtaBtn | null
}

const BTN_FIELDS: BlockPropSchema = {
  label: { kind: 'text', label: 'Label', required: true, maxLength: 40 },
  href: { kind: 'url', label: 'Link', required: true },
}

const propSchema: BlockPropSchema = {
  pill: { kind: 'richText', label: 'Pill text', mode: 'inline' },
  pillShowSparkle: { kind: 'boolean', label: 'Show sparkle in pill' },
  heading: { kind: 'richText', label: 'Heading', mode: 'inline' },
  description: { kind: 'text', label: 'Description', maxLength: 280 },
  disclaimer: { kind: 'text', label: 'Disclaimer', maxLength: 200 },
  primaryBtn: { kind: 'object', label: 'Primary button', required: true, fields: BTN_FIELDS },
  secondaryBtn: { kind: 'object', label: 'Secondary button', fields: BTN_FIELDS },
}

const yupSchema = toYupSchema(propSchema)

registerBlock<CtaSectionStoredProps, ComponentProps<typeof CtaSection>>({
  type: 'cta-section',
  displayName: 'CTA (dome)',
  schemaVersion: 1,
  propSchema,
  yupSchema,
  validate: (raw) => yupSchema.validateSync(raw, { abortEarly: false, stripUnknown: true }) as CtaSectionStoredProps,
  adapt: (props) => ({
    data: { primaryBtn: props.primaryBtn, secondaryBtn: props.secondaryBtn ?? undefined },
    pill: props.pill ? renderRichText(props.pill, 'inline') : undefined,
    pillShowSparkle: props.pillShowSparkle,
    heading: props.heading ? renderRichText(props.heading, 'inline') : undefined,
    description: props.description,
    disclaimer: props.disclaimer,
  }),
  Component: CtaSection,
  defaultProps: {
    pillShowSparkle: true,
    primaryBtn: { label: 'Get started', href: '/contact' },
  },
})
