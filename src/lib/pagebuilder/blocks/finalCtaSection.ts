import type { ComponentProps } from 'react'
import { FinalCtaSection } from '@/sections/home/FinalCtaSection'
import { toYupSchema } from '../toYupSchema'
import { registerBlock } from '../registry'
import type { BlockPropSchema } from '../propSchema'

type CtaBtn = { label: string; href: string }

export type FinalCtaSectionStoredProps = {
  heading: string
  headingItalic?: string
  headingSuffix?: string
  body: string
  primaryBtn: CtaBtn
  secondaryBtn: CtaBtn
}

const BTN_FIELDS: BlockPropSchema = {
  label: { kind: 'text', label: 'Label', required: true, maxLength: 40 },
  href: { kind: 'url', label: 'Link', required: true },
}

const propSchema: BlockPropSchema = {
  heading: { kind: 'text', label: 'Heading', required: true, maxLength: 120 },
  headingItalic: { kind: 'text', label: 'Heading (italic)', maxLength: 60 },
  headingSuffix: { kind: 'text', label: 'Heading (suffix)', maxLength: 60 },
  body: { kind: 'text', label: 'Body', required: true, maxLength: 300 },
  primaryBtn: { kind: 'object', label: 'Primary button', required: true, fields: BTN_FIELDS },
  secondaryBtn: { kind: 'object', label: 'Secondary button', required: true, fields: BTN_FIELDS },
}

const yupSchema = toYupSchema(propSchema)

registerBlock<FinalCtaSectionStoredProps, ComponentProps<typeof FinalCtaSection>>({
  type: 'final-cta-section',
  displayName: 'CTA (closing dome)',
  schemaVersion: 1,
  propSchema,
  yupSchema,
  validate: (raw) => yupSchema.validateSync(raw, { abortEarly: false, stripUnknown: true }) as FinalCtaSectionStoredProps,
  adapt: (props) => ({
    data: {
      heading: props.heading,
      headingItalic: props.headingItalic ?? '',
      headingSuffix: props.headingSuffix ?? '',
      body: props.body,
      primaryBtn: props.primaryBtn,
      secondaryBtn: props.secondaryBtn,
    },
  }),
  Component: FinalCtaSection,
  defaultProps: {
    heading: 'Watch your Autonomous SOC',
    headingItalic: 'drive',
    headingSuffix: 'itself',
    body: '',
    primaryBtn: { label: 'Get a demo', href: '/contact' },
    secondaryBtn: { label: 'Learn more', href: '/contact' },
  },
})
