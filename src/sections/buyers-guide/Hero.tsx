import Image from 'next/image'
import Link from 'next/link'
import type { buyersGuideContent } from '@/app/(site)/buyers-guide/content'
import { PrimaryButton } from '@/components/homepage/ui/primary-button'
import { Badge } from '@/components/homepage/ui/badge'
import { Container } from '@/components/homepage/ui/container'
import './Hero.css'

type HeroProps = {
  data: (typeof buyersGuideContent)['hero']
  criteria: (typeof buyersGuideContent)['scorecard']['rows']
}

export function Hero({ data, criteria }: HeroProps) {
  return (
    <section className="bg-hero" aria-labelledby="buyers-guide-title">
      <Container>
        <div className="bg-hero-layout">
          <div className="bg-hero-copy">
            <Badge>{data.eyebrow}</Badge>
            <h1 id="buyers-guide-title" className="bg-hero-headline">{data.headline}</h1>
            <p className="bg-hero-lead">{data.lead}</p>
            <div className="bg-hero-actions">
              <PrimaryButton href={data.primaryCta.href}>{data.primaryCta.label}</PrimaryButton>
              <Link href={data.secondaryCta.href} className="bg-hero-secondary-link">
                {data.secondaryCta.label}
              </Link>
            </div>
            <dl className="bg-hero-meta">
              {data.meta.map((item) => (
                <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>
              ))}
            </dl>
          </div>

          <aside className="bg-guide-index" aria-label="Inside the buyer’s guide">
            <Image
              src="/homepage/figma/soc-cta/gradient-bg.png"
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 90vw, 540px"
              className="bg-guide-index-art"
            />
            <div className="bg-guide-index-content">
              <div className="bg-guide-index-brand">
                <Image src="/homepage/figma/nav/logo.svg" alt="SIRP" width={88} height={34} />
                <span>THE BUYER’S GUIDE</span>
              </div>
              <h2>Autonomous SOC<br />&amp; SOAR</h2>
              <p>Eight criteria. One informed decision.</p>
              <nav className="bg-guide-index-links" aria-label="Jump to a scorecard question">
                {criteria.map((criterion) => (
                  <a key={criterion.num} href={`#criterion-${criterion.num}`}>
                    <span>{criterion.num}</span>{criterion.title}
                  </a>
                ))}
              </nav>
              <a href="#scorecard" className="bg-guide-index-link">
                Explore the scorecard
                <Image src="/homepage/figma/shared/arrow-up-right.svg" alt="" width={20} height={20} />
              </a>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}
