import type { Metadata } from 'next'
import Image from 'next/image'
import { LogOut } from 'lucide-react'
import { getAdminSession } from '@/lib/auth/dal'
import { logoutAction } from '@/lib/auth/actions'
import { AdminNav } from '@/components/admin/AdminNav'
import './admin.css'

export const metadata: Metadata = {
  title: 'CMS',
  // Never index the admin surface.
  robots: { index: false, follow: false },
}

function initials(email: string | null): string {
  if (!email) return 'A'
  return email.slice(0, 2).toUpperCase()
}

/**
 * Admin shell. Presentational only — authorization is enforced page-by-page via
 * `verifySession()` (and by the proxy + RLS). We use the non-redirecting
 * `getAdminSession()` here so the /admin/login page (which has no session) can
 * render inside this group without a redirect loop.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession()

  // Unauthenticated (e.g. the login page) — render bare inside the theme root.
  if (!session) {
    return <div className="cms-root">{children}</div>
  }

  return (
    <div className="cms-root">
      <div className="cms-shell">
        <aside className="cms-sidebar">
          <div className="cms-brand">
            <Image
              src="/images/logos/SIRP-Logo.svg"
              alt="SIRP"
              width={100}
              height={36}
              priority
              className="cms-brand-logo"
              style={{ height: 26, width: 'auto' }}
            />
            <span className="cms-brand-tag">CMS</span>
          </div>

          <AdminNav />

          <div className="cms-sidebar-foot">
            <form action={logoutAction}>
              <button type="submit" className="cms-nav-item" style={{ width: '100%' }}>
                <LogOut size={17} />
                Sign out
              </button>
            </form>
          </div>
        </aside>

        <div className="cms-main">
          <header className="cms-topbar">
            <span className="cms-eyebrow">Admin workspace</span>
            <div className="cms-user">
              <span className="cms-avatar">{initials(session.email)}</span>
              <span>{session.email}</span>
            </div>
          </header>

          <div className="cms-content">{children}</div>
        </div>
      </div>
    </div>
  )
}
