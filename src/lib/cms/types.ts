import type { JSONContent } from '@tiptap/react'

/** Post type discriminator used by the public site (blog grid vs changelog). */
export const POST_TYPES = ['blog', 'changelog'] as const
export type PostType = (typeof POST_TYPES)[number]

/** Full admin-side row, including drafts and structured content. */
export type AdminPostRow = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  cover_image: string | null
  content_json: JSONContent | null
  type: string | null
  published_at: string | null
  updated_at: string
  created_at: string
}

/** Compact shape rendered in the admin TanStack table. */
export type AdminPostListItem = {
  id: string
  title: string
  slug: string
  type: string | null
  status: 'published' | 'scheduled' | 'draft'
  publishedAt: string | null
  updatedAt: string
}

/** Result returned by the create/update server actions to `useActionState`. */
export type PostActionState = {
  ok: boolean
  message?: string
  /** Field-keyed validation messages for inline display. */
  errors?: Record<string, string>
}

/** An allowlisted admin, shown on the Team page. */
export type AdminUser = {
  userId: string
  email: string | null
  createdAt: string
}

/** Result of the create-admin-account server action for `useActionState`. */
export type CreateAdminActionState = {
  ok: boolean
  message?: string
  error?: string
}
