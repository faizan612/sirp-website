import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/PageHeader'
import { InfoCtaBlock } from '@/components/shared/InfoCtaBlock'
import { SplitInfoCtaImage } from '@/components/shared/SplitInfoCtaImage'
import { CtaSection } from '@/sections/home/CtaSection'
import './page.css'

export const metadata: Metadata = {
  title: 'Autonomous Security Operations',
  description: 'How SIRP replaces reactive SOC workflows with AI-native autonomous security: decision systems that detect, investigate, and respond without human bottlenecks.',
  alternates: { canonical: '/autonomous-security' },
  openGraph: {
    url: '/autonomous-security',
    type: 'website',
    title: 'Autonomous Security Operations | SIRP',
    description: 'From playbooks to decision systems: the architectural shift redefining modern security operations.',
  },
}

export default function Page() {
  const autonomousCtaData = {
    heading: "Experience true",
    headingItalic: "autonomy",
    primaryBtn: { label: "What is Autonomous SOC?", href: "https://www.sirp.io/what-is-autonomous-soc" },
    secondaryBtn: { label: "Read Whitepaper", href: "/technical-white-paper" }
  }

  return (
    <div className="autonomous-security-page">
      <PageHeader
        badgeText="Pillar"
        heading={
          <>
            <em>Autonomous SOC</em>
            <br />
            From Playbooks to
            <br />
            Decision Systems
          </>
        }
        subtext={
          <>
            <span className="page-header-subtext-block">
              Security operations were built for human-paced threats. Modern attacks operate at machine speed. The SOC operating model must evolve.
            </span>
            <span className="page-header-subtext-gap">
              An Autonomous SOC is a security operations model where AI systems independently analyze alerts, compute risk, decide response actions, and execute remediation within defined governance boundaries. Unlike traditional SOAR platforms that automate static workflows, an Autonomous SOC enables decision-driven security operations.
            </span>
          </>
        }
      />

      <InfoCtaBlock
        sectionClassName="autonomous-security-designed-world"
        heading="The SOC Was Not Designed for This World"
        body={
          <>
            <p>
              Security Operations Centers were designed around assumptions that no longer hold.
            </p>
            <p>They assumed alerts were manageable. <br />
            They assumed humans could correlate signals in real time. <br />
            They assumed scale meant adding people.</p>
            <p>Those assumptions quietly collapsed.</p>
            <p>
              Modern incidents are not single alerts. They are multi-stage attack chains spanning email, identity,
              endpoints, cloud workloads, and user behavior, unfolding faster than humans can reliably reason about
              in sequence.
            </p>
            <p>This is not a failure of analysts.<br />
            It is a failure of the operating model.</p>
          </>
        }
      />

      <InfoCtaBlock
        heading="Why Automation and SOAR Reached a Ceiling"
        body={
          <>
            <p>
              Automation was a necessary step, but it was never the destination.
            </p>
            <p>SOAR accelerated execution. It did not change how decisions were made.</p>
            <p>
              Playbooks encode predefined paths for known conditions. Attackers do not follow predefined
              paths. As environments became more dynamic and attacks more adaptive, static automation became brittle.
            </p>
            <p className="info-cta-lead">The result was predictable:</p>
            <ul>
              <li>Endless tuning</li>
              <li>Growing exception lists</li>
              <li>Human overrides everywhere</li>
            </ul>
            <p>Automation without reasoning simply moves the bottleneck downstream.</p>
          </>
        }
        button={{
          label: 'SOAR vs Autonomous SOC',
          href: '/soar-vs-autonomous-soc',
        }}
      />

      <InfoCtaBlock
        heading="Why the Industry Is Rebuilding, Not Optimizing"
        body={
          <>
            <p>
              The current wave of cybersecurity consolidation is often described as optimization.
            </p>
            <p>That framing misses the deeper shift underway.</p>
            <p>
              Strategic buyers are no longer prioritizing incremental detection, additional controls, or workflow expansion.
              They are responding to a more fundamental realization: the security operating layer itself no longer scales.
            </p>
            <p>The industry is not optimizing the SOC.</p>
            <p>It is rebuilding it around decision systems.</p>
          </>
        }
        button={{
          label: 'Rebuilding Cybersecurity',
          href: '/blog/why-cybersecurity-is-being-rebuilt-not-optimized',
        }}
      />

      <InfoCtaBlock
        heading="From Alert Handling to Decision Systems"
        body={
          <>
            <p>Legacy security platforms are optimized for handling alerts.<br />
            Modern security requires systems optimized for making decisions.</p>
            <p>
              Alert-centric architectures assume humans will correlate context, prioritize risk, and decide when to act.
              That assumption no longer holds at machine scale.
            </p>

            <p>Decision-centric architectures operate differently:</p>
            <ul>
              <li>Context is assembled automatically</li>
              <li>Risk is evaluated continuously</li>
              <li>Actions are proposed or executed within policy</li>
              <li>Humans are involved only where judgment adds value</li>
            </ul>

            <p>This is not about removing humans.<br />
            It is about removing them from being the bottleneck.</p>
          </>
        }
      />

      <InfoCtaBlock
        heading="Autonomy With Governance"
        body={
          <>
            <p>Autonomy does not mean loss of control.</p>
            <p>
              Human-driven SOCs already operate with uncontrolled variance: different analysts make different decisions, fatigue
              changes outcomes, and escalation paths are inconsistent.
            </p>
            <p>
              AI-native autonomy, when designed correctly, is more governable, not less.
            </p>
            <p>Effective autonomous security systems operate within:</p>
            <ul>
              <li>Explicit policies</li>
              <li>Risk-tiered approval gates</li>
              <li>Blast-radius constraints</li>
              <li>Full auditability and reversibility</li>
            </ul>
            <p>Autonomy is not binary.</p>
            <p>It is deliberately bounded.</p>
          </>
        }
        button={{
          label: 'Autonomous, Not Uncontrolled',
          href: '/blog/autonomous-security-does-not-mean-uncontrolled-security',
        }}
      />

      <InfoCtaBlock
        heading="The Economics Force the Shift"
        body={
          <>
            <p>Human-centric SOCs scale linearly.</p>
            <p>Threats scale exponentially.</p>
            <p>
              As alert volume increases, analyst fatigue rises, response times slow, and error rates grow. Costs increase
              predictably while outcomes remain inconsistent.
            </p>
            <p>AI-native decision systems change the economics:</p>
            <ul>
              <li>Alerts become inputs, not work</li>
              <li>Spikes become learning events, not stress events</li>
              <li>Marginal cost per alert approaches zero</li>
              <li>Outcomes become more predictable over time</li>
            </ul>
            <p>This is not just cheaper security.</p>
            <p>It is sustainable security.</p>
          </>
        }
        button={{
          label: 'AI-Native SOC Economics',
          href: '/blog/the-economics-of-an-ai-native-soc',
        }}
      />

      <InfoCtaBlock
        heading="The Real Risk Has Changed"
        body={
          <>
            <p>Historically, the risk for CISOs was moving too early.</p>
            <p>Today, the greater risk is standing still.</p>
            <p>
              Boards are no longer satisfied with dashboards, alert counts, or tool inventories. They care about decision
              speed, adaptability, and outcome consistency.
            </p>
            <p>
              The question is no longer whether AI will change security operations, but whether leaders adapt their
              operating model in time.
            </p>
          </>
        }
        button={{
          label: 'The CISO’s Real Risk',
          href: '/blog/the-cisos-real-risk-isnt-ai-its-standing-still',
        }}
      />

      <InfoCtaBlock
        heading="Humans Are Repositioned, Not Removed"
        body={
          <>
            <p>AI-native security does not remove human responsibility.</p>
            <p>It refocuses it.</p>
            <p>Humans remain essential for:</p>
            <ul>
              <li>Defining policy and acceptable risk</li>
              <li>Governing autonomy boundaries</li>
              <li>Handling business-critical decisions</li>
              <li>Auditing outcomes and accountability</li>
            </ul>
            <p>The future SOC is human-on-the-loop, not human-in-the-loop.</p>
          </>
        }
      />

      <SplitInfoCtaImage
        sectionClassName="autonomous-security-split"
        imageObjectFit="contain"
        heading="Go Deeper"
        body={
          <>
            <p>
              For a detailed technical explanation, including architecture, decision flows, governance boundaries, and
              learning loops, read the founder-authored whitepaper:
            </p>
            <p>
              This page is the canonical guide to SIRP's Autonomous Security narrative. It is intended for architectural
              and strategic understanding, not product marketing.
            </p>
          </>
        }
        button={{
          label: 'Autonomous soc Architecture',
          href: '/technical-white-paper',
        }}
      />

      <CtaSection
        data={autonomousCtaData}
        disclaimer="This page is the canonical guide to SIRP's Autonomous Security narrative. It is intended for architectural and strategic understanding, not product marketing."
      />
    </div>
  )
}
