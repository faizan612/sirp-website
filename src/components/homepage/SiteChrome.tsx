'use client'

import { usePathname } from 'next/navigation'
import { SiteNav } from '@/components/nav/SiteNav'
import { Footer as GlobalFooter } from '@/components/layout/Footer'
import { SocCta } from '@/components/homepage/sections/soc-cta'
import { Footer as HomepageFooter } from '@/components/homepage/sections/footer'

export function SiteHeader() {
  const pathname = usePathname()
  return <>
    {(pathname === '/' || pathname === '/sara') && (
      <div className="relative min-h-[41px] w-full overflow-hidden border-b-[0.8px] border-[#b889ff] bg-[#0e0e0e] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-105.5px] h-[251px] w-[550px] -translate-x-1/2 opacity-80 blur-[80px]"
          style={{ background: 'radial-gradient(ellipse 62% 46% at 50% 50%, rgba(165,88,214,1) 0%, rgba(123,59,185,1) 40%, rgba(86,41,143,1) 56%, rgba(49,23,101,1) 73%, rgba(49,23,101,1) 100%)' }}
        />
        <div className="relative mx-auto flex min-h-[40px] max-w-[1280px] items-center justify-center gap-4 px-4 py-1 text-center text-[14px] leading-[20px]">
          <span>Too good to gatekeep. Sara is now free.</span>
          <a href="https://sara-open.sirp.io/" className="flex shrink-0 flex-col items-center gap-[2px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <span className="font-semibold tracking-[0.28px]">Try her now</span>
            <span aria-hidden="true" className="h-[2px] w-[83.638px] rounded-[30px] bg-[#b889ff]" />
          </a>
        </div>
      </div>
    )}
    <SiteNav />
  </>
}

export function SiteFooter() {
  const pathname = usePathname()

  if (pathname === '/') return null

  if (pathname === '/sara') {
    return (
      <>
        <SocCta />
        <HomepageFooter />
      </>
    )
  }

  return <GlobalFooter showHero={pathname !== '/omnisense'} />
}
