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

const artwork: Record<string, string> = {
  'omnisense-core': '/images/omnisense/pillar-orchestrator.png',
  'omnisec-llm': '/images/omnisense/pillar-omnisec.png',
  'omnimap-rag': '/images/omnisense/pillar-omnimap.png',
  omniflex: '/images/omnisense/pillar-omniflex.png',
  omnicollective: '/images/omnisense/pillar-omnicollective.png',
}

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
      const navEdge = document.querySelector('header[data-chrome="global"]')?.getBoundingClientRect().bottom ?? 69
      root.style.setProperty('--nav-edge', `${Math.max(0, navEdge)}px`)
      const first = panels.current[0]?.getBoundingClientRect()
      const last = panels.current[panels.current.length - 1]?.getBoundingClientRect()
      root.dataset.scrolling = String(Boolean(first && last && first.top < navEdge && last.bottom > navEdge + 200))
      const threshold = window.innerHeight * 0.48
      let selected = 0
      panels.current.forEach((panel, index) => {
        if (panel && panel.getBoundingClientRect().top <= threshold) selected = index
      })
      setActive(selected)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      delete root.dataset.scrolling
    }
  }, [data.tabs.length])

  return (
    <section ref={section} className={styles.section} aria-labelledby="pillars-heading">
      <div className={styles.scrollFade} aria-hidden="true" />
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
                  <Image src={artwork[tab.id] ?? tab.image} alt={`${tab.title} platform illustration`}
                    width={3312} height={2960} sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 65vw, (max-width: 1920px) 43.125vw, 828px" className={styles.image} />
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
