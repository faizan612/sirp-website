import styles from './sara-section.module.css'

interface SaraMedia {
  /* A screen recording of the assistant — Figma holds this slot as a video. */
  src:    string
  poster?: string
}

interface SaraData {
  badge:       string
  heading:     string
  description: string
  media?:      SaraMedia
}

interface OmnisenseSaraProps {
  data: SaraData
}

export function OmnisenseSara({ data }: OmnisenseSaraProps) {
  const { badge, heading, description, media } = data

  return (
    <section id="omnisense-sara" className={styles.section} aria-labelledby="sara-heading">
      <div className={styles.stage}>
        <span className={styles.badge}>{badge}</span>
        <h2 id="sara-heading" className={styles.title}>{heading}</h2>
        <p className={styles.lede}>{description}</p>

        <div className={styles.shell}>
          <div className={styles.screen}>
            <span className={`${styles.glow} ${styles.glowTop}`} aria-hidden="true" />
            <span className={`${styles.glow} ${styles.glowBottom}`} aria-hidden="true" />
            {media && (
              <video
                className={styles.media}
                src={media.src}
                poster={media.poster}
                width={1298}
                height={724}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={heading}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
