import styles from './sara-governance.module.css'

const trustItems = [
  {
    number: '01',
    tab: 'Role-aware access',
    title: 'Every interaction is auditable',
    description:
      'Messages, retrieved context, recommendations, and analyst decisions are logged for review and audit.',
    iconClass: styles.auditIcon,
  },
  {
    number: '02',
    tab: 'Controlled context',
    title: 'Access applies to every interaction',
    description:
      'Sara checks the analyst role on every message. Cross-tenant information is outside its retrieval scope.',
    iconClass: styles.contextIcon,
  },
  {
    number: '03',
    tab: 'Reviewable by design',
    title: 'Customer data does not train the model',
    description:
      'Incidents, alerts, conversations, and tenant knowledge are not used to update the model weights.',
    iconClass: styles.reviewIcon,
  },
  {
    number: '04',
    tab: 'Data stays governed',
    title: 'Regional reasoning by design',
    description:
      'Sara runs through the OmniSense region serving the customer jurisdiction, with customer data kept inside that regional boundary during reasoning.',
    iconClass: styles.regionIcon,
  },
] as const

export function SaraGovernanceSection() {
  return (
    <section className={styles.section} aria-labelledby="sara-governance-title">
      <header className={styles.header}>
        <span className={styles.eyebrow}>Build for trust</span>
        <h2 id="sara-governance-title">
          Your security context
          <br />
          stays governed.
        </h2>
        <p>
          AI inside a SOC should not create a new blind spot. Sara is designed so teams
          <br className={styles.desktopBreak} /> can understand what it accessed, what it answered, and how that interaction
          <br className={styles.desktopBreak} /> fits inside the controls around their environment.
        </p>
      </header>

      <div className={styles.trustGrid}>
        {trustItems.map((item) => (
          <article className={styles.trustItem} key={item.number}>
            <div className={styles.copy}>
              <span className={`${styles.figmaIcon} ${item.iconClass}`} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

            <span className={styles.connector} aria-hidden="true" />

            <div className={styles.tab}>
              <span className={styles.number}>{item.number}</span>
              <span>{item.tab}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
