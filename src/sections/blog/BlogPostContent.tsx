import type { MDXComponents } from 'mdx/types'
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'

const mdxComponents: MDXComponents = {
  table: ({ children }) => (
    <div className="blog-post-table-wrap">
      <table>{children}</table>
    </div>
  ),
  a: ({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) =>
    href?.startsWith('/') ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    ),
  img: ({ src, alt }: ImgHTMLAttributes<HTMLImageElement>) =>
    typeof src === 'string' ? (
      <Image src={src} alt={alt ?? ''} width={1200} height={630} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
    ) : null,
}

type BlogPostContentProps = {
  /** Raw MDX body from src/content/blog/<slug>.mdx. */
  content: string
}

export function BlogPostContent({ content }: BlogPostContentProps) {
  return (
    <div className="blog-post-prose">
      <MDXRemote source={content} components={mdxComponents} />
    </div>
  )
}
