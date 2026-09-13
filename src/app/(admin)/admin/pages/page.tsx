import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getAdminLandingPages } from '@/lib/pagebuilder/queries'
import { LandingPagesTable } from '@/components/admin/pagebuilder/LandingPagesTable'

export const dynamic = 'force-dynamic'

export default async function AdminLandingPagesPage() {
  const pages = await getAdminLandingPages() // calls verifySession()

  const published = pages.filter((p) => p.status === 'published').length
  const scheduled = pages.filter((p) => p.status === 'scheduled').length
  const drafts = pages.filter((p) => p.status === 'draft').length

  return (
    <div className="cms-container">
      <div className="cms-page-head">
        <div>
          <span className="cms-eyebrow">Landing Page Builder</span>
          <h1 className="cms-title">Pages</h1>
        </div>
        <Link href="/admin/pages/new" className="cms-btn cms-btn--primary">
          <span>
            <Plus size={16} />
          </span>
          <span>New page</span>
        </Link>
      </div>

      <div className="cms-stats">
        <div className="cms-stat">
          <div className="cms-stat-num">{pages.length}</div>
          <div className="cms-stat-label">Total</div>
        </div>
        <div className="cms-stat">
          <div className="cms-stat-num">{published}</div>
          <div className="cms-stat-label">Published</div>
        </div>
        <div className="cms-stat">
          <div className="cms-stat-num">{scheduled}</div>
          <div className="cms-stat-label">Scheduled</div>
        </div>
        <div className="cms-stat">
          <div className="cms-stat-num">{drafts}</div>
          <div className="cms-stat-label">Drafts</div>
        </div>
      </div>

      <LandingPagesTable pages={pages} />
    </div>
  )
}
