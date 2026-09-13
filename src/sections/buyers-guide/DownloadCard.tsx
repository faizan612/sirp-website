'use client'

import { useId, useState, type FormEvent } from 'react'
import Link from 'next/link'
import type { buyersGuideContent } from '@/app/(site)/buyers-guide/content'
import { Button } from '@/components/shared/Button'
import './DownloadCard.css'

type DownloadCardProps = {
  data: (typeof buyersGuideContent)['download']
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// TODO(buyers-guide): no lead-capture backend is wired up yet — no PDF exists to
// send, and no HubSpot/API integration has been decided (see spec §4). This form
// only validates the email client-side and points people to /contact in the
// meantime. Replace with the real gate once a delivery pattern is chosen.
export function DownloadCard({ data }: DownloadCardProps) {
  const inputId = useId()
  const errorId = useId()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!EMAIL_PATTERN.test(email)) {
      setError('Enter a valid email address.')
      return
    }

    setError(null)
    setSubmitted(true)
  }

  return (
    <div className="bg-download-card" id="download">
      <div>
        <h3 className="bg-download-title">{data.title}</h3>
        <p className="bg-download-body">{data.body}</p>
      </div>

      {submitted ? (
        <p className="bg-download-success" role="status">
          The PDF isn't ready to send automatically yet —{' '}
          <Link href="/contact">reach out and we'll get it to you</Link>.
        </p>
      ) : (
        <form className="bg-download-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor={inputId} className="sr-only">
            Email address
          </label>
          <input
            id={inputId}
            type="email"
            name="email"
            placeholder="you@company.com"
            className="bg-download-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
          />
          <Button type="submit" variant="primary">
            Send it
          </Button>
          {error && (
            <p id={errorId} className="bg-download-error" role="alert">
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  )
}
