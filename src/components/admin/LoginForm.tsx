'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import Image from 'next/image'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { loginAction, type LoginState } from '@/lib/auth/actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className="cms-btn cms-btn--primary">
      <span>{pending ? 'Signing in…' : 'Sign in'}</span>
      {!pending && <ArrowRight size={16} />}
    </button>
  )
}

export function LoginForm({ next, initialError }: { next: string; initialError?: string }) {
  const [state, formAction] = useActionState<LoginState, FormData>(loginAction, {
    error: initialError,
  })

  return (
    <form action={formAction} className="cms-auth-form">
      <Image
        src="/images/logos/SIRP-Logo.svg"
        alt="SIRP"
        width={100}
        height={36}
        priority
        className="cms-auth-logo"
        // Size is controlled here; width:auto keeps the aspect ratio and
        // silences next/image's width-or-height warning.
        style={{ height: 30, width: 'auto' }}
      />

      <span className="cms-eyebrow">Secure sign in</span>
      <h1 className="cms-auth-title" style={{ marginTop: '0.5rem' }}>
        Welcome <em>back</em>
      </h1>
      <p className="cms-subtitle">Sign in to the SIRP content workspace.</p>

      {state.error && <div className="cms-auth-alert">{state.error}</div>}

      <input type="hidden" name="next" value={next} />

      <div className="cms-field">
        <label htmlFor="email" className="cms-label">Email</label>
        <div className="cms-input-icon">
          <Mail size={16} />
          <input id="email" name="email" type="email" autoComplete="email" className="cms-input" placeholder="you@sirp.io" required />
        </div>
      </div>

      <div className="cms-field">
        <label htmlFor="password" className="cms-label">Password</label>
        <div className="cms-input-icon">
          <Lock size={16} />
          <input id="password" name="password" type="password" autoComplete="current-password" className="cms-input" placeholder="••••••••" required />
        </div>
      </div>

      <SubmitButton />

      <p className="cms-auth-foot">
        Access is invite-only. If you need an account, ask a workspace administrator.
      </p>
    </form>
  )
}
