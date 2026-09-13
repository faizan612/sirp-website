import { getTeam } from '@/lib/cms/queries'
import { CreateAdminForm } from '@/components/admin/CreateAdminForm'

export const dynamic = 'force-dynamic'

export default async function TeamPage() {
  const { admins } = await getTeam() // calls verifySession()

  return (
    <div className="cms-container--narrow">
      <div className="cms-page-head">
        <div>
          <span className="cms-eyebrow">Access</span>
          <h1 className="cms-title">Team</h1>
          <p className="cms-subtitle">
            Create a teammate&apos;s admin account directly — no email, no Supabase dashboard.
            They can sign in immediately with the password you set here.
          </p>
        </div>
      </div>

      <div className="cms-card">
        <div className="cms-card-head">
          <div className="cms-card-title">Create admin account</div>
          <div className="cms-card-desc">They&apos;ll be able to sign in right away with these credentials.</div>
        </div>
        <div className="cms-card-body">
          <CreateAdminForm />
        </div>
      </div>

      <div className="cms-card">
        <div className="cms-card-head">
          <div className="cms-card-title">Admins ({admins.length})</div>
        </div>
        <ul className="cms-list">
          {admins.map((a) => (
            <li key={a.userId}>
              <span>{a.email ?? a.userId}</span>
              <span className="cms-list-meta">since {new Date(a.createdAt).toLocaleDateString('en-GB')}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
