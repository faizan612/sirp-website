import * as Yup from 'yup'

/**
 * Structural validation only — each block's own `props` are validated
 * separately, against that block's own registry entry (see actions.ts), so
 * one invalid block never blocks saving the rest of the page. Mirrors
 * src/lib/cms/postSchema.ts's pattern: strict server-side validation before
 * anything reaches Postgres.
 */

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const blockInstanceSchema = Yup.object({
  id: Yup.string().trim().required(),
  type: Yup.string().trim().required(),
  schemaVersion: Yup.number().required(),
  props: Yup.mixed().required(),
  visibility: Yup.object({
    desktop: Yup.boolean(),
    tablet: Yup.boolean(),
    mobile: Yup.boolean(),
  }).notRequired(),
  isGlobal: Yup.boolean().notRequired(),
  globalSectionId: Yup.string().trim().notRequired(),
})

export const pageDocumentSchema = Yup.object({
  version: Yup.number().required(),
  blocks: Yup.array().of(blockInstanceSchema).required(),
})

export const pageSeoSchema = Yup.object({
  title: Yup.string().trim().max(70, 'SEO title is too long'),
  description: Yup.string().trim().max(200, 'SEO description is too long'),
  ogImage: Yup.string().trim(),
  canonical: Yup.string().trim(),
  noindex: Yup.boolean().default(false),
})

export const landingPageSchema = Yup.object({
  title: Yup.string().trim().required('Title is required').max(200, 'Title is too long'),
  slug: Yup.string()
    .trim()
    .lowercase()
    .required('Slug is required')
    .max(200, 'Slug is too long')
    .matches(SLUG_PATTERN, 'Use lowercase letters, numbers and hyphens only'),
  rootAlias: Yup.string()
    .trim()
    .lowercase()
    .max(200, 'Alias is too long')
    .matches(SLUG_PATTERN, 'Use lowercase letters, numbers and hyphens only')
    .transform((v) => (v === '' ? undefined : v))
    .nullable()
    .notRequired(),
  document: pageDocumentSchema,
  seo: pageSeoSchema,
  publish: Yup.boolean().default(false),
})

export type LandingPageInput = Yup.InferType<typeof landingPageSchema>
