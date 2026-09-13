import Image from 'next/image'
import { WHITE_PAPER_SECTIONS } from './whitepaper-sections-data'

export function WhitePaperBody() {
  return (
    <article className="whitepaper-main">
      <div className="container-sirp whitepaper-main-inner">
        {WHITE_PAPER_SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="whitepaper-section"
            aria-labelledby={`${section.id}-heading`}
          >
            <h2 className="whitepaper-section-heading" id={`${section.id}-heading`}>
              {section.heading}
            </h2>
            <div className="whitepaper-section-body">
              {section.blocks.map((block, i) => {
                switch (block.kind) {
                  case 'p':
                    return (
                      <p
                        key={i}
                        className={block.variant === 'copyright' ? 'whitepaper-copyright' : undefined}
                      >
                        {block.text}
                      </p>
                    )
                  case 'em':
                    return (
                      <p key={i} className="whitepaper-em-paragraph">
                        <em>{block.text}</em>
                      </p>
                    )
                  case 'strongLabel':
                    return (
                      <p key={i} className="whitepaper-strong-label">
                        <strong>{block.text}</strong>
                      </p>
                    )
                  case 'ul':
                    return (
                      <ul key={i} className="whitepaper-list">
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )
                  case 'ol':
                    return (
                      <ol key={i} className="whitepaper-ordered-list">
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ol>
                    )
                  case 'image': {
                    const w = block.width ?? 1600
                    const h = block.height ?? 420
                    return (
                      <figure key={i} className="whitepaper-inline-figure">
                        <Image
                          src={block.src}
                          alt={block.alt}
                          width={w}
                          height={h}
                          className="whitepaper-inline-img"
                          sizes="(max-width: 1320px) 100vw, 1320px"
                          unoptimized
                        />
                      </figure>
                    )
                  }
                  default:
                    return null
                }
              })}
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}
