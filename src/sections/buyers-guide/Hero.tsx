import Link from 'next/link'
import type { buyersGuideContent } from '@/app/(site)/buyers-guide/content'
import { Button } from '@/components/shared/Button'
import './Hero.css'

type HeroProps = {
  data: (typeof buyersGuideContent)['hero']
}

export function Hero({ data }: HeroProps) {
  return (
    <section className="bg-hero">
      <div className="container-sirp">
        <div className="bg-hero-eyebrow">{data.eyebrow}</div>
        <h1 className="bg-hero-headline">{data.headline}</h1>
        <p className="bg-hero-lead">{data.lead}</p>

        <div className="bg-hero-actions">
          <Button href={data.primaryCta.href} variant="primary">
            {data.primaryCta.label}
          </Button>
          <Link href={data.secondaryCta.href} className="bg-hero-secondary-link">
            {data.secondaryCta.label}
          </Link>
        </div>

        <dl className="bg-hero-meta">
          {data.meta.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
