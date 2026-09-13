import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getAdminPosts } from '@/lib/cms/queries'
import { PostsTable } from '@/components/admin/PostsTable'

// Always render fresh, session-scoped data (never statically cache the admin).
export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  // getAdminPosts() calls verifySession() — redirects if not an admin.
  const posts = await getAdminPosts()

  const published = posts.filter((p) => p.status === 'published').length
  const scheduled = posts.filter((p) => p.status === 'scheduled').length
  const drafts = posts.filter((p) => p.status === 'draft').length

  return (
    <div className="cms-container">
      <div className="cms-page-head">
        <div>
          <span className="cms-eyebrow">Content library</span>
          <h1 className="cms-title">Posts</h1>
        </div>
        <Link href="/admin/posts/new" className="cms-btn cms-btn--primary">
          <span><Plus size={16} /></span>
          <span>New post</span>
        </Link>
      </div>

      <div className="cms-stats">
        <div className="cms-stat"><div className="cms-stat-num">{posts.length}</div><div className="cms-stat-label">Total</div></div>
        <div className="cms-stat"><div className="cms-stat-num">{published}</div><div className="cms-stat-label">Published</div></div>
        <div className="cms-stat"><div className="cms-stat-num">{scheduled}</div><div className="cms-stat-label">Scheduled</div></div>
        <div className="cms-stat"><div className="cms-stat-num">{drafts}</div><div className="cms-stat-label">Drafts</div></div>
      </div>

      <PostsTable posts={posts} />
    </div>
  )
}
