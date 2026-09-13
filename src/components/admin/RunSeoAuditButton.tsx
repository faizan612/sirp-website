'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { RefreshCw } from 'lucide-react'
import { runSeoAuditAction } from '@/lib/seo/actions'

type State = { ok: boolean; error?: string }
const INITIAL: State = { ok: false }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className="cms-btn cms-btn--primary">
      <span><RefreshCw size={15} /></span>
      <span>{pending ? 'Running audit…' : 'Run audit'}</span>
    </button>
  )
}

export function RunSeoAuditButton() {
  const [state, formAction] = useActionState(async (_prev: State, _formData: FormData) => runSeoAuditAction(), INITIAL)

  return (
    <form action={formAction}>
      <SubmitButton />
      {state.error && <p className="cms-error">{state.error}</p>}
    </form>
  )
}
