import { verifySession } from '@/lib/auth/dal'
import { PageBuilderEditor } from '@/components/admin/pagebuilder/PageBuilderEditor'
import { createLandingPageAction } from '@/lib/pagebuilder/actions'

export const dynamic = 'force-dynamic'

export default async function NewLandingPagePage() {
  await verifySession()

  return (
    <div className="cms-container">
      <div className="cms-page-head">
        <div>
          <span className="cms-eyebrow">Compose</span>
          <h1 className="cms-title">New page</h1>
        </div>
      </div>
      <PageBuilderEditor action={createLandingPageAction} />
    </div>
  )
}
