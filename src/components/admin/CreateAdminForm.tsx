'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { UserPlus } from 'lucide-react'
import { createAdminAccountAction } from '@/lib/cms/actions'
import type { CreateAdminActionState } from '@/lib/cms/types'

const INITIAL: CreateAdminActionState = { ok: false }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className="cms-btn cms-btn--primary">
      <span><UserPlus size={15} /></span>
      <span>{pending ? 'Creating…' : 'Create account'}</span>
    </button>
  )
}

/**
 * Directly provisions a teammate's admin account — no email, no Supabase
 * dashboard. Submits to `createAdminAccountAction`, the one place in the app
 * that uses the service-role client.
 */
export function CreateAdminForm() {
  const [state, formAction] = useActionState(createAdminAccountAction, INITIAL)

  return (
    <div>
      <form action={formAction} className="cms-grid-2" style={{ alignItems: 'end' }}>
        <div className="cms-field" style={{ margin: 0 }}>
          <label htmlFor="new-admin-email" className="cms-label">Email</label>
          <input id="new-admin-email" name="email" type="email" required placeholder="teammate@sirp.io" className="cms-input" />
        </div>
        <div className="cms-field" style={{ margin: 0 }}>
          <label htmlFor="new-admin-password" className="cms-label">Password</label>
          <input id="new-admin-password" name="password" type="password" required minLength={8} placeholder="At least 8 characters" className="cms-input" />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <SubmitButton />
        </div>
      </form>

      {state.error && <p className="cms-error">{state.error}</p>}
      {state.ok && state.message && <div className="cms-banner cms-banner--success" style={{ marginTop: '0.75rem' }}>{state.message}</div>}
    </div>
  )
}
