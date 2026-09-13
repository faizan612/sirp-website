import { notFound } from 'next/navigation'
import { getAdminPostById } from '@/lib/cms/queries'
import { updatePostAction } from '@/lib/cms/actions'
import { PostForm } from '@/components/admin/PostForm'

export const dynamic = 'force-dynamic'

export default async function EditPostPage({
  params,
}: {
  // Next 16: params is a Promise.
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getAdminPostById(id) // calls verifySession()
  if (!post) notFound()

  // Bind the post id so PostForm sees the (prevState, formData) action shape.
  const action = updatePostAction.bind(null, id)

  return (
    <div className="cms-container--narrow">
      <div className="cms-page-head">
        <div>
          <span className="cms-eyebrow">Editing</span>
          <h1 className="cms-title">{post.title}</h1>
        </div>
      </div>
      <PostForm action={action} post={post} />
    </div>
  )
}
