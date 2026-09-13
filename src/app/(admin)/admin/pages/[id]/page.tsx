import { notFound } from 'next/navigation'
import { getAdminLandingPageById } from '@/lib/pagebuilder/queries'
import { updateLandingPageAction } from '@/lib/pagebuilder/actions'
import { PageBuilderEditor } from '@/components/admin/pagebuilder/PageBuilderEditor'

export const dynamic = 'force-dynamic'

export default async function EditLandingPagePage({
  params,
}: {
  // Next 16: params is a Promise.
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const page = await getAdminLandingPageById(id) // calls verifySession()
  if (!page) notFound()

  // Bind the page id so PageBuilderEditor sees the (prevState, formData) action shape.
  const action = updateLandingPageAction.bind(null, id)

  return (
    <div className="cms-container">
      <div className="cms-page-head">
        <div>
          <span className="cms-eyebrow">Editing</span>
          <h1 className="cms-title">{page.title}</h1>
        </div>
      </div>
      <PageBuilderEditor action={action} page={page} />
    </div>
  )
}
