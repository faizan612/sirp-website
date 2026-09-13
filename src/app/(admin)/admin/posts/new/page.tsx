import { verifySession } from '@/lib/auth/dal'
import { PostForm } from '@/components/admin/PostForm'
import { createPostAction } from '@/lib/cms/actions'

export const dynamic = 'force-dynamic'

export default async function NewPostPage() {
  await verifySession()

  return (
    <div className="cms-container--narrow">
      <div className="cms-page-head">
        <div>
          <span className="cms-eyebrow">Compose</span>
          <h1 className="cms-title">New post</h1>
        </div>
      </div>
      <PostForm action={createPostAction} />
    </div>
  )
}
