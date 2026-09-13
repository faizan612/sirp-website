import { PurplePill } from '@/components/shared/PurplePill'
import './ManifestoAboutAuthorSection.css'

export function ManifestoAboutAuthorSection() {
  return (
    <section className="manifesto-about-author" aria-label="About the author">
      <div className="manifesto-about-author-inner">
        <PurplePill className="manifesto-about-author-pill">About The Author</PurplePill>

        <div className="manifesto-about-author-card">
          <p className="manifesto-about-author-text">
            Faiz Shuja is the Co-Founder and CEO of SIRP Labs, where he created the OmniSense Autonomous SOC platform. A
            system designed to autonomously understand signals, reason in real-time, and take action based on evolving
            context. His career in cybersecurity spans two decades.
          </p>
          <p className="manifesto-about-author-text">
            He founded Rewterz in 2006 from a small room on a rooftop in Karachi, Pakistan, with a single goal: build
            something meaningful in cybersecurity. That company grew into one of the Middle East&apos;s leading
            cybersecurity firms, now protecting 50+ enterprises across the globe with a 200-member team and a
            state-of-the-art SOC in Riyadh. He served as CEO of The Honeynet Project (2016-2021), the international
            non-profit dedicated to investigating cyber attacks and developing open-source security tools. He holds
            CISSP, GCIH, and GSEC certifications.
          </p>
        </div>
      </div>
    </section>
  )
}
