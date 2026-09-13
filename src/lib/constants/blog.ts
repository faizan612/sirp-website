export const BLOG_HERO = {
  badge: 'Blog',
  heading: {
    line1: 'Autonomous SOC Insights:',
    line2prefix: 'The Future of ',
    italic: 'Security Operations',
  },
  descLine1:
    'This blog explores the evolution of Autonomous SOC and AI-native security operations. We analyze how decision-driven systems',
  descLine2:
    'are transforming traditional SOAR, incident response, and enterprise security architectures.',
  guideText:
    'For a complete overview of Autonomous SOC and governed decision-driven security operations, start with our canonical guide:',
  guideLink: {
    label: 'Autonomous SOC: From Playbooks to Decision Systems',
    href: '/technical-white-paper',
  },
} as const

export type BlogCategory = 'PILLAR' | 'BLOG' | 'CHANGELOG'

export interface BlogPost {
  id: string
  slug: string
  category: BlogCategory
  date: string
  title: string
  image: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'economics-of-ai-native-soc',
    category: 'PILLAR',
    date: 'Jan 9, 2026',
    title: 'The Economics of an AI-Native SOC',
    image: '/images/blogs/imgi_19_QTvmn6YhIx2oKxvKM3IfPUvJjeQ.png',
  },
  {
    id: '2',
    slug: 'ciso-real-risk-standing-still',
    category: 'PILLAR',
    date: 'Jan 7, 2026',
    title: "The CISO's Real Risk Isn't AI: It's Standing Still",
    image: '/images/blogs/Theciso.png',
  },
  {
    id: '3',
    slug: 'autonomous-security-not-uncontrolled',
    category: 'PILLAR',
    date: 'Jan 6, 2026',
    title: 'Autonomous Security Does Not Mean Uncontrolled Security',
    image: '/images/blogs/AutonomosSecurity.png',
  },
  {
    id: '4',
    slug: 'cybersecurity-rebuilt-not-optimized',
    category: 'PILLAR',
    date: 'Jan 1, 2026',
    title: 'Why Cybersecurity Is Being Rebuilt, Not Optimized',
    image: '/images/blogs/why cybersecurity.png',
  },
  {
    id: '5',
    slug: 'security-tools-dont-scale',
    category: 'BLOG',
    date: 'Apr 9, 2026',
    title: "Why Security Tools Don't Scale (And Systems Do)",
    image: '/images/blogs/Why Security.jpg',
  },
  {
    id: '6',
    slug: 'soar-to-autonomous-soc',
    category: 'BLOG',
    date: 'Apr 7, 2026',
    title: 'How to Transition From SOAR to Autonomous SOC',
    image: '/images/blogs/How to Transition.jpg',
  },
  {
    id: '7',
    slug: 'soar-decisions-without-human-routing',
    category: 'BLOG',
    date: 'Apr 6, 2026',
    title: 'Why SOAR Cannot Make Security Decisions Without Human Routing',
    image: '/images/blogs/Why SOAR Cannot.jpg',
  },
  {
    id: '8',
    slug: 'autonomous-systems-learn-playbooks',
    category: 'BLOG',
    date: 'Apr 3, 2026',
    title: 'How Autonomous Systems Learn (And Why Playbooks Never Will)',
    image: '/images/blogs/How Autonomous.jpg',
  },
  {
    id: '9',
    slug: 'decision-driven-vs-playbook-soar',
    category: 'PILLAR',
    date: 'Mar 28, 2026',
    title: 'Why Decision-Driven Systems Outperform Playbook-Based SOAR',
    image: '/images/blogs/imgi_74_FZLWv9seyNZsN3E5cx9jnsYJ8.jpg',
  },
  {
    id: '10',
    slug: 'anatomy-autonomous-incident-response',
    category: 'BLOG',
    date: 'Mar 20, 2026',
    title: 'The Anatomy of an Autonomous Incident Response',
    image: '/images/blogs/imgi_49_hMMQlVwH1AqFyiiCxSTcPTs.png',
  },
  {
    id: '11',
    slug: 'alert-to-closure-ai-native-soc',
    category: 'BLOG',
    date: 'Mar 14, 2026',
    title: 'From Alert to Closure: How AI-Native SOCs Handle Threats',
    image: '/images/blogs/imgi_60_2daxcwp3OX2u5SWjsx9GatMffcs.jpg',
  },
  {
    id: '12',
    slug: 'orchestration-vs-automation',
    category: 'PILLAR',
    date: 'Mar 7, 2026',
    title: 'Security Orchestration vs. Security Automation: The Key Difference',
    image: '/images/blogs/imgi_56_5fLi0vIwNR9teCN3Vc2E2QPNAeA.jpg',
  },
  {
    id: '13',
    slug: 'mttr-wrong-metric',
    category: 'BLOG',
    date: 'Feb 26, 2026',
    title: 'Why Mean Time to Respond Is the Wrong Metric',
    image: '/images/blogs/imgi_54_xrXsQl18fAeEo0leEWd4VxRCo.jpg',
  },
  {
    id: '14',
    slug: 'measure-soc-effectiveness-autonomous',
    category: 'BLOG',
    date: 'Feb 18, 2026',
    title: 'How to Measure SOC Effectiveness in an Autonomous World',
    image: '/images/blogs/imgi_62_M1X1ZnjChJusTBgzA3uZoOVBc08.jpg',
  },
]

export const BLOG_WHITEPAPER_CTA = {
  text: 'For a deeper technical exploration of how these ideas are implemented in practice, including architecture, decision flows, and governance, read our founder-authored whitepaper:',
  link: {
    label: 'An AI-Native Architecture for Autonomous Security Operations',
    href: '/technical-white-paper',
  },
} as const
