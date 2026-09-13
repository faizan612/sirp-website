import { LoginForm } from '@/components/admin/LoginForm'

const ERROR_MESSAGES: Record<string, string> = {
  not_authorized: 'Your account is not authorised for the CMS. Contact an administrator.',
}

export default async function LoginPage({
  searchParams,
}: {
  // Next 16: searchParams is a Promise.
  searchParams: Promise<{ next?: string; error?: string }>
}) {
  const { next, error } = await searchParams

  return (
    <div className="cms-auth">
      <span className="cms-glow" />
      <div className="cms-auth-card">
        <LoginForm next={next ?? '/admin'} initialError={error ? ERROR_MESSAGES[error] : undefined} />
      </div>
    </div>
  )
}
