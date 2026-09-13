'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './omnisense-platform.module.css'

interface Tab {
  id: string
  label: string
  title: string
  description: string
  image: string
}

interface PlatformData {
  badge: string
  heading: string
  headingItalic: string
  headingSuffix: string
  tabs: readonly Tab[]
}

const artwork = ['orchestrator', 'omnisec', 'omnimap', 'omniflex', 'omnicollective']

export function OmnisensePlatform({ data }: { data: PlatformData }) {
  const section = useRef<HTMLElement>(null)
  const panels = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const root = section.current
    if (!root) return
    let frame = 0
    const update = () => {
      frame = 0
      const threshold = window.innerHeight * 0.48
      let selected = 0
      panels.current.forEach((panel, index) => {
        if (panel && panel.getBoundingClientRect().top <= threshold) selected = index
      })
      setActive(selected)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.setAttribute('data-revealed', 'true')
      })
    }, { threshold: 0.12 })
    panels.current.forEach(panel => { if (panel) observer.observe(panel) })
    root.dataset.enhanced = 'true'
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      delete root.dataset.enhanced
    }
  }, [data.tabs.length])

  return (
    <section ref={section} className={styles.section} aria-labelledby="pillars-heading">
      <div className={styles.container}>
        <header className={styles.heading}>
          <span className={styles.badge}>{data.badge}</span>
          <h2 id="pillars-heading">Five pillars<br />One engine</h2>
        </header>
        <div className={styles.layout}>
          <nav className={styles.navigation} aria-label="The five pillars of OmniSense">
            {data.tabs.map((tab, index) => (
              <a key={tab.id} href={`#pillar-${tab.id}`} aria-current={active === index ? 'step' : undefined}
                onClick={event => {
                  event.preventDefault()
                  panels.current[index]?.scrollIntoView({
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
                    block: 'start',
                  })
                }}>
                <span className={styles.mark} aria-hidden="true" />
                <span>{tab.label}</span>
              </a>
            ))}
          </nav>
          <div className={styles.panels}>
            {data.tabs.map((tab, index) => (
              <article key={tab.id} id={`pillar-${tab.id}`} ref={node => { panels.current[index] = node }}
                className={styles.panel} aria-labelledby={`pillar-title-${tab.id}`}>
                <div className={styles.artwork}>
                  <Image src={`/images/omnisense/pillar-${artwork[index]}.svg?v=2`} alt={`${tab.title} platform illustration`}
                    width={828} height={740} unoptimized className={styles.image} />
                </div>
                <div className={styles.copy}>
                  <h3 id={`pillar-title-${tab.id}`}>{tab.title}</h3>
                  <p>{tab.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
