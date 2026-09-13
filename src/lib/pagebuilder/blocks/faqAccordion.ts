import type { ComponentProps } from 'react'
import { FaqAccordionSection } from '@/components/shared/FaqAccordionSection'
import { toYupSchema } from '../toYupSchema'
import { registerBlock } from '../registry'
import type { BlockPropSchema } from '../propSchema'

export type FaqAccordionStoredProps = {
  heading: string
  items: { question: string; answer: string }[]
  defaultOpenIndex?: number | null
}

const propSchema: BlockPropSchema = {
  heading: { kind: 'text', label: 'Heading', required: true, maxLength: 120 },
  items: {
    kind: 'array',
    label: 'Questions',
    minItems: 1,
    maxItems: 20,
    itemFields: {
      question: { kind: 'text', label: 'Question', required: true, maxLength: 200 },
      answer: { kind: 'text', label: 'Answer', required: true, maxLength: 1000 },
    },
  },
  defaultOpenIndex: { kind: 'number', label: 'Open by default (index)', min: 0 },
}

const yupSchema = toYupSchema(propSchema)

registerBlock<FaqAccordionStoredProps, ComponentProps<typeof FaqAccordionSection>>({
  type: 'faq-accordion',
  displayName: 'FAQ accordion',
  schemaVersion: 1,
  propSchema,
  yupSchema,
  validate: (raw) => yupSchema.validateSync(raw, { abortEarly: false, stripUnknown: true }) as FaqAccordionStoredProps,
  adapt: (props) => ({
    data: { heading: props.heading, items: props.items },
    defaultOpenIndex: props.defaultOpenIndex ?? null,
  }),
  Component: FaqAccordionSection,
  defaultProps: {
    heading: 'Frequently asked questions',
    items: [{ question: '', answer: '' }],
  },
})
