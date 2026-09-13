import type { ComponentProps } from 'react'
import { FeaturesSection } from '@/sections/home/FeaturesSection'
import { toYupSchema } from '../toYupSchema'
import { registerBlock } from '../registry'
import type { BlockPropSchema } from '../propSchema'

type Feature = { id: string; title: string; description: string; image: { src: string; alt: string }; textTop: boolean }

export type FeaturesSectionStoredProps = {
  pill: string
  heading: string
  headingItalic?: string
  features: Feature[]
}

const FEATURE_FIELDS: BlockPropSchema = {
  id: { kind: 'text', label: 'ID', required: true, maxLength: 40 },
  title: { kind: 'text', label: 'Title', required: true, maxLength: 120 },
  description: { kind: 'text', label: 'Description', required: true, maxLength: 400 },
  image: { kind: 'image', label: 'Image', required: true },
  textTop: { kind: 'boolean', label: 'Text above image' },
}

const propSchema: BlockPropSchema = {
  pill: { kind: 'text', label: 'Pill text', required: true, maxLength: 60 },
  heading: { kind: 'text', label: 'Heading', required: true, maxLength: 160 },
  headingItalic: { kind: 'text', label: 'Heading (italic suffix)', maxLength: 60 },
  features: { kind: 'array', label: 'Features', minItems: 1, maxItems: 8, itemFields: FEATURE_FIELDS },
}

const yupSchema = toYupSchema(propSchema)

registerBlock<FeaturesSectionStoredProps, ComponentProps<typeof FeaturesSection>>({
  type: 'features-section',
  displayName: 'Features grid',
  schemaVersion: 1,
  propSchema,
  yupSchema,
  validate: (raw) => yupSchema.validateSync(raw, { abortEarly: false, stripUnknown: true }) as FeaturesSectionStoredProps,
  adapt: (props) => ({
    data: {
      pill: props.pill,
      heading: props.heading,
      headingItalic: props.headingItalic ?? '',
      features: props.features.map((f) => ({
        id: f.id,
        title: f.title,
        description: f.description,
        image: f.image.src,
        textTop: f.textTop,
      })),
    },
  }),
  Component: FeaturesSection,
  defaultProps: {
    pill: 'Features',
    heading: 'What makes it different',
    headingItalic: '',
    features: [{ id: 'feature-1', title: '', description: '', image: { src: '', alt: '' }, textTop: false }],
  },
})
