'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { BLOG_WHITEPAPER_CTA } from '@/lib/constants/blog'
import type { BlogPostCard } from '@/lib/blog/types'
import './BlogChangelog.css'

type BlogChangelogProps = {
  posts: BlogPostCard[]
}

export function BlogChangelog({ posts }: BlogChangelogProps) {
  const { text, link } = BLOG_WHITEPAPER_CTA

  return (
    <section className="bg-[#121218] pb-24">
      <div className="container-sirp">

        {posts.length > 0 ? (
          <div className="changelog-grid">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="changelog-card">
                  <div className="changelog-card-arrow" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 12L12 2M12 2H5M12 2V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="changelog-card-image">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      unoptimized
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                    />
                  </div>

                  <div className="changelog-card-content">
                    <div className="changelog-card-meta">
                      {post.type ? (
                        <span className="changelog-card-category">{post.type}</span>
                      ) : null}
                      {post.date ? <span className="changelog-card-date">{post.date}</span> : null}
                    </div>
                    <h3 className="changelog-card-title">{post.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`changelog-cta${posts.length === 0 ? ' changelog-cta--solo' : ''}`}
        >
          <p className="changelog-cta-text">{text}</p>
          <Link href={link.href} className="changelog-cta-pill">
            <Image src="/images/enterprise-soc/shine.svg" alt="" width={14} height={14} unoptimized />
            {link.label}
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
