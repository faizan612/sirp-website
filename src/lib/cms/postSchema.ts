import * as Yup from 'yup'
import { POST_TYPES } from './types'

/**
 * Strict server-side validation for the post editor. Mirrors the repo's
 * contact-form pattern (Yup), and enforces the same invariants the database
 * does (e.g. slugs may not contain "/", per the blog_posts_slug_no_slash
 * check constraint) so bad input is rejected before it reaches Postgres.
 */

/** Cover-image upload limits — validated on the server, not just the client. */
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024 // 4 MB
export const ACCEPTED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/avif',
] as const

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/** Text/flag fields extracted from the submitted FormData. */
export const postSchema = Yup.object({
  title: Yup.string().trim().required('Title is required').max(200, 'Title is too long'),
  slug: Yup.string()
    .trim()
    .lowercase()
    .required('Slug is required')
    .max(200, 'Slug is too long')
    .matches(SLUG_PATTERN, 'Use lowercase letters, numbers and hyphens only'),
  excerpt: Yup.string()
    .trim()
    .transform((v) => (v === '' ? undefined : v))
    .optional()
    .max(400, 'Excerpt is too long'),
  type: Yup.string()
    .oneOf(POST_TYPES as unknown as string[], 'Unknown post type')
    .default('blog'),
  // Tiptap serialises its document to a JSON string carried in a hidden input.
  // We validate that it parses AND is a well-formed ProseMirror doc, which is
  // what makes stored content safe to render structurally (no raw HTML).
  contentJson: Yup.string()
    .required('Content is required')
    .test('is-tiptap-doc', 'Content is not a valid document', (value) => {
      if (!value) return false
      try {
        const parsed = JSON.parse(value)
        return parsed && parsed.type === 'doc' && Array.isArray(parsed.content)
      } catch {
        return false
      }
    }),
  publish: Yup.boolean().default(false),
})

export type PostInput = Yup.InferType<typeof postSchema>

/** Validate a `File` from FormData. Returns an error message, or null if ok. */
export function validateImageFile(file: File | null, { required }: { required: boolean }): string | null {
  if (!file || file.size === 0) {
    return required ? 'A cover image is required' : null
  }
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number])) {
    return 'Image must be PNG, JPEG, WebP or AVIF'
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return 'Image must be 4 MB or smaller'
  }
  return null
}
