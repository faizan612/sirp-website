import type { ComponentProps } from 'react'
import { IntegrationsSection } from '@/sections/home/IntegrationsSection'
import { toYupSchema } from '../toYupSchema'
import { registerBlock } from '../registry'
import type { BlockPropSchema } from '../propSchema'

type Logo = { name: string; image: { src: string; alt: string } }

export type IntegrationsSectionStoredProps = {
  pill: string
  heading: string
  headingItalic?: string
  headingSuffix?: string
  description: string
  logos: Logo[]
}

const LOGO_FIELDS: BlockPropSchema = {
  name: { kind: 'text', label: 'Name', required: true, maxLength: 60 },
  image: { kind: 'image', label: 'Logo image', required: true },
}

const propSchema: BlockPropSchema = {
  pill: { kind: 'text', label: 'Pill text', required: true, maxLength: 60 },
  heading: { kind: 'text', label: 'Heading', required: true, maxLength: 160 },
  headingItalic: { kind: 'text', label: 'Heading (italic)', maxLength: 60 },
  headingSuffix: { kind: 'text', label: 'Heading (suffix)', maxLength: 60 },
  description: { kind: 'text', label: 'Description', required: true, maxLength: 400 },
  logos: { kind: 'array', label: 'Logos', minItems: 1, maxItems: 40, itemFields: LOGO_FIELDS },
}

const yupSchema = toYupSchema(propSchema)

registerBlock<IntegrationsSectionStoredProps, ComponentProps<typeof IntegrationsSection>>({
  type: 'integrations-section',
  displayName: 'Integrations logo strip',
  schemaVersion: 1,
  propSchema,
  yupSchema,
  validate: (raw) => yupSchema.validateSync(raw, { abortEarly: false, stripUnknown: true }) as IntegrationsSectionStoredProps,
  adapt: (props) => ({
    data: {
      pill: props.pill,
      heading: props.heading,
      headingItalic: props.headingItalic ?? '',
      headingSuffix: props.headingSuffix ?? '',
      description: props.description,
      logos: props.logos.map((l) => ({ name: l.name, src: l.image.src })),
    },
  }),
  Component: IntegrationsSection,
  defaultProps: {
    pill: 'Integrations',
    heading: 'Every tool.',
    headingItalic: '',
    headingSuffix: '',
    description: '',
    logos: [{ name: '', image: { src: '', alt: '' } }],
  },
})
