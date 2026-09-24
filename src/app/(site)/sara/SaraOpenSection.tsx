'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './sara-open.module.css'

const SARA_OPEN_URL = 'https://sara-open.sirp.io/'
const SARA_OPEN_ORIGIN = 'https://sara-open.sirp.io'
const FALLBACK_HANDOFF_DELAY = 18_000

export function SaraOpenSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const fallbackTimerRef = useRef<number | null>(null)
  const hasStartedSessionRef = useRef(false)
  const [showHandoff, setShowHandoff] = useState(false)

  useEffect(() => {
    const revealHandoff = () => {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current)
        fallbackTimerRef.current = null
      }
      setShowHandoff(true)
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== SARA_OPEN_ORIGIN) return

      const payload = typeof event.data === 'string' ? event.data : event.data?.type
      if (typeof payload !== 'string') return

      const normalized = payload.toLowerCase()
      if (
        normalized.includes('reply-complete') ||
        normalized.includes('reply_complete') ||
        normalized.includes('response-complete') ||
        normalized.includes('response_complete')
      ) {
        revealHandoff()
      }
    }

    const handleWindowBlur = () => {
      window.setTimeout(() => {
        if (document.activeElement !== iframeRef.current || hasStartedSessionRef.current) return

        hasStartedSessionRef.current = true
        fallbackTimerRef.current = window.setTimeout(revealHandoff, FALLBACK_HANDOFF_DELAY)
      }, 0)
    }

    window.addEventListener('message', handleMessage)
    window.addEventListener('blur', handleWindowBlur)

    return () => {
      window.removeEventListener('message', handleMessage)
      window.removeEventListener('blur', handleWindowBlur)
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current)
    }
  }, [])

  return (
    <section className={styles.section} aria-labelledby="sara-open-heading">
      <div className={styles.intro}>
        <span className={styles.eyebrow}>Try Sara Open</span>
        <h2 id="sara-open-heading">Triage, hunt, or detect?</h2>
        <p>
          SARA is the free AI security analyst by SIRP Labs. Drop in an alert, IOC, CVE, or suspicious email — SARA
          triages it at Tier-2 analyst quality in seconds. No account, no signup.
        </p>
      </div>

      <div className={styles.frame}>
        <div className={styles.viewport}>
          <div className={styles.iframeClip}>
            <iframe
              ref={iframeRef}
              className={styles.iframe}
              src={SARA_OPEN_URL}
              title="SARA Open — free AI security analyst"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="clipboard-write"
            />
          </div>

          <div className={`${styles.handoffOverlay} ${showHandoff ? styles.handoffVisible : ''}`} aria-hidden={!showHandoff}>
            <div className={styles.handoffPrompt}>
              <span>Get Free Access?</span>
              <a href={SARA_OPEN_URL} target="_top">
                Try here now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
