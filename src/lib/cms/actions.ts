'use server'

import { ValidationError } from 'yup'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server-auth'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { verifySession } from '@/lib/auth/dal'
import { postSchema, validateImageFile } from './postSchema'
import { createAdminSchema } from './createAdminSchema'
import type { CreateAdminActionState, PostActionState } from './types'

const STORAGE_BUCKET = 'blog-assets'

const MIME_EXTENSION: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/avif': 'avif',
}

/** Collect Yup field errors into a flat map for inline display. */
function toFieldErrors(err: ValidationError): Record<string, string> {
  const errors: Record<string, string> = {}
  for (const inner of err.inner.length ? err.inner : [err]) {
    if (inner.path && !errors[inner.path]) errors[inner.path] = inner.message
  }
  return errors
}

/**
 * Upload a validated cover image to the private-write / public-read storage
 * bucket and return its public URL. The RLS storage policy still checks
 * is_cms_admin(), so this only succeeds for allowlisted admins.
 */
async function uploadCover(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  file: File,
  slug: string,
): Promise<string> {
  const ext = MIME_EXTENSION[file.type] ?? 'bin'
  const path = `${slug}/${crypto.randomUUID()}.${ext}`
  const buffer = await file.arrayBuffer()

  const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  })
  if (error) throw new Error(`Cover upload failed: ${error.message}`)

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

/**
 * Create a post. Shape matches React's `useActionState`:
 *   (prevState, formData) => Promise<PostActionState>
 * Every mutation re-verifies the session (Server Actions are public POST
 * endpoints — never trust the caller), validates with Yup, then writes under
 * RLS with no service-role escalation.
 */
export async function createPostAction(
  _prev: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  const session = await verifySession()
  const supabase = await createSupabaseServerClient()

  // 1. Validate text/flag fields.
  let values
  try {
    values = await postSchema.validate(
      {
        title: formData.get('title'),
        slug: formData.get('slug'),
        excerpt: formData.get('excerpt'),
        type: formData.get('type') || undefined,
        contentJson: formData.get('contentJson'),
        publish: formData.get('publish') === 'on' || formData.get('publish') === 'true',
      },
      { abortEarly: false, stripUnknown: true },
    )
  } catch (err) {
    if (err instanceof ValidationError) return { ok: false, errors: toFieldErrors(err) }
    throw err
  }

  // 2. Validate the cover image (required on create).
  const file = formData.get('cover') as File | null
  const imageError = validateImageFile(file, { required: true })
  if (imageError) return { ok: false, errors: { cover: imageError } }

  // 3. Upload the image, then insert the clean row.
  try {
    const coverUrl = await uploadCover(supabase, file as File, values.slug)

    const { error } = await supabase.from('blog_posts').insert({
      title: values.title,
      slug: values.slug,
      excerpt: values.excerpt ?? null,
      type: values.type,
      content_json: JSON.parse(values.contentJson),
      cover_image: coverUrl,
      published_at: values.publish ? new Date().toISOString() : null,
      author_id: session.userId,
    })

    if (error) {
      // Unique-violation on slug → friendly field error.
      if (error.code === '23505') return { ok: false, errors: { slug: 'That slug is already in use' } }
      return { ok: false, message: error.message }
    }
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : 'Failed to create post' }
  }

  // 4. Refresh public + admin caches, then land on the dashboard.
  revalidatePath('/blog')
  revalidatePath(`/blog/${values.slug}`)
  revalidatePath('/admin')
  redirect('/admin')
}

/** Update an existing post. Cover image is optional (kept if not replaced). */
export async function updatePostAction(
  id: string,
  _prev: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  await verifySession()
  const supabase = await createSupabaseServerClient()

  let values
  try {
    values = await postSchema.validate(
      {
        title: formData.get('title'),
        slug: formData.get('slug'),
        excerpt: formData.get('excerpt'),
        type: formData.get('type') || undefined,
        contentJson: formData.get('contentJson'),
        publish: formData.get('publish') === 'on' || formData.get('publish') === 'true',
      },
      { abortEarly: false, stripUnknown: true },
    )
  } catch (err) {
    if (err instanceof ValidationError) return { ok: false, errors: toFieldErrors(err) }
    throw err
  }

  const file = formData.get('cover') as File | null
  const imageError = validateImageFile(file, { required: false })
  if (imageError) return { ok: false, errors: { cover: imageError } }

  try {
    const patch: Record<string, unknown> = {
      title: values.title,
      slug: values.slug,
      excerpt: values.excerpt ?? null,
      type: values.type,
      content_json: JSON.parse(values.contentJson),
      published_at: values.publish ? new Date().toISOString() : null,
    }
    if (file && file.size > 0) {
      patch.cover_image = await uploadCover(supabase, file, values.slug)
    }

    const { error } = await supabase.from('blog_posts').update(patch).eq('id', id)
    if (error) {
      if (error.code === '23505') return { ok: false, errors: { slug: 'That slug is already in use' } }
      return { ok: false, message: error.message }
    }
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : 'Failed to update post' }
  }

  revalidatePath('/blog')
  revalidatePath(`/blog/${values.slug}`)
  revalidatePath('/admin')
  redirect('/admin')
}

/** Delete a post. Invoked from a small form in the list view. */
export async function deletePostAction(formData: FormData): Promise<void> {
  await verifySession()
  const supabase = await createSupabaseServerClient()

  const id = String(formData.get('id') ?? '')
  if (!id) return

  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) {
    console.error('[cms] deletePostAction:', error.message)
    return
  }

  revalidatePath('/blog')
  revalidatePath('/admin')
}

/**
 * Directly provision a new admin account from the Team page: creates the
 * Supabase Auth user (confirmed immediately — no email sent) and adds them to
 * cms_admins in one step. This is the one place in the app that uses the
 * service-role client, scoped to exactly this action. Only reachable by an
 * existing admin, since `verifySession()` runs first and the caller must
 * already be authenticated as an allowlisted admin to reach the Team page.
 */
export async function createAdminAccountAction(
  _prev: CreateAdminActionState,
  formData: FormData,
): Promise<CreateAdminActionState> {
  await verifySession()

  let values
  try {
    values = await createAdminSchema.validate(
      { email: formData.get('email'), password: formData.get('password') },
      { abortEarly: false },
    )
  } catch (err) {
    if (err instanceof ValidationError) return { ok: false, error: err.errors[0] ?? 'Invalid input.' }
    throw err
  }

  let admin
  try {
    admin = createSupabaseAdminClient()
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Admin provisioning is not configured.' }
  }

  const { data, error } = await admin.auth.admin.createUser({
    email: values.email,
    password: values.password,
    email_confirm: true, // account is immediately usable — no confirmation email is sent
  })

  if (error || !data.user) {
    if (error && /already registered|already exists/i.test(error.message)) {
      return { ok: false, error: 'An account with this email already exists.' }
    }
    return { ok: false, error: error?.message ?? 'Failed to create account.' }
  }

  const { error: insertError } = await admin.from('cms_admins').insert({ user_id: data.user.id, email: values.email })

  if (insertError) {
    return { ok: false, error: `Account created, but admin promotion failed: ${insertError.message}` }
  }

  revalidatePath('/admin/team')
  return { ok: true, message: `${values.email} can sign in now at /admin/login with the password you set — no email needed.` }
}
