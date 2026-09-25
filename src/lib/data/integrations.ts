/* Integration catalog data. The full categorized collection is kept
 * separate from the smaller, art-directed marquee used in hero rails. */

export type Integration = {
  name: string
  logo: string
  category?: string
  description?: string
  href?: string
}

export const INTEGRATION_CATEGORIES = [
  'Application Security & Testing',
  'Cloud & Infrastructure',
  'Collaboration & ITSM',
  'Data Security',
  'Email & Phishing',
  'Endpoint Security & EDR',
  'Identity & Access Management',
  'Network Security',
  'Security Operations & SIEM',
  'Threat Intelligence',
  'Threat Analysis & Sandboxing',
  'Vulnerability Management',
  'Utilities & Enrichment',
  'Security News & Standards',
] as const

type IntegrationCategory = (typeof INTEGRATION_CATEGORIES)[number]

const INTEGRATION_NAMES_BY_CATEGORY: Record<IntegrationCategory, readonly string[]> = {
  'Application Security & Testing': [
    'Apiary', 'APIVoid', 'Imperva', 'QA Cafe',
  ],
  'Cloud & Infrastructure': [
    'Amazon', 'Ansible Tower', 'CloudPassage Halo', 'Datadog', 'Google', 'IBM',
    'Ivanti', 'ManageEngine', 'Microsoft', 'OpenText', 'SolarWinds', 'VMware',
  ],
  'Collaboration & ITSM': [
    'AlertFind', 'Amazon Alexa', 'Atlassian', 'BMC Remedy', 'Cherwell', 'ClickSend',
    'CMDB', 'Freshworks', 'Gmail', 'Rootly', 'ServiceNow', 'ServiceNow Icon', 'Slack',
    'Zendesk', 'Zoho',
  ],
  'Data Security': [
    'Elastic', 'Forcepoint', 'MongoDB', 'MySQL', 'SWIFT', 'Synacor',
  ],
  'Email & Phishing': [
    'Barracuda', 'CheckPhish', 'Cofense', 'Mail Header', 'Mimecast',
    'Phishing Initiative', 'PhishTank', 'Proofpoint', 'SlashNext', 'Unshorten.me',
  ],
  'Endpoint Security & EDR': [
    'Bitdefender', 'Broadcom', 'Carbon Black Defense', 'CrowdStrike Falcon Host',
    'Cybereason', 'CylancePROTECT', 'Cyphort', 'ESET', 'FireEye', 'Huntress',
    'Kaspersky', 'Lastline', 'Malwarebytes', 'Panda EDR', 'SentinelOne', 'Sevco',
    'Sophos', 'Trellix', 'Trend Micro',
  ],
  'Identity & Access Management': [
    'CyberArk', 'Google Authenticator', 'Have I Been Pwned', 'RSA', 'Thycotic',
  ],
  'Network Security': [
    'A10 LADS', 'Arbor APS', 'Blue Coat', 'Check Point', 'Cisco Tetration Analytics',
    'Cloudflare', 'F5', 'Fidelis', 'Fortinet', 'Hillstone Networks', 'Huawei',
    'Infoblox', 'Juniper Networks', 'Sangfor', 'SSH', 'Zscaler',
  ],
  'Security Operations & SIEM': [
    'Aella Data Starlight', 'AlienVault', 'ArcSight ESM', 'Cyware', 'Devo',
    'LogRhythm', 'Logsign', 'NetWitness', 'Nivel Technologies', 'PrecisionSec',
    'SGBOX', 'Splunk', 'Sumo Logic', 'Wazuh',
  ],
  'Threat Intelligence': [
    'AbuseIPDB', 'Anomali ThreatStream', 'AutoFocus', 'Blueliv', 'CIRCL',
    'Critical Stack Intel', 'CRITs', 'CTM360', 'Cymmetria MazeRunner', 'Cymon',
    'DarkOwl', 'DeepSight', 'DShield', 'Farsight Security', 'FS-ISAC', 'GreyNoise',
    'HoneyDB', 'MISP', 'RiskIQ', 'SOCRadar', 'Threat Intelligence Platform',
    'ThreatCrowd', 'ThreatMiner', 'ThreatQ', 'ZeroFOX',
  ],
  'Threat Analysis & Sandboxing': [
    'ANY.RUN', 'Cuckoo Sandbox', 'Cyber Triage', 'Gaijin', 'Hybrid Analysis',
    'Koodous', 'MalShare', 'Maltiverse', 'OPSWAT', 'PolySwarm', 'VirusTotal',
  ],
  'Vulnerability Management': [
    'Censys', 'Certly', 'Hacker Target', 'Qualys', 'Rapid7', 'Secpod', 'Tenable',
    'VulDB',
  ],
  'Utilities & Enrichment': [
    'DNSlytics', 'DomainTools', 'IPinfo.io', 'ipstack', 'JSON Whois', 'MaxMind',
    'MojoDNS', 'Monapi.io', 'MxToolBox', 'MyIP', 'NeutrinoAPI', 'SecurityTrails',
    'Shodan', 'Wayback Machine', 'WhatIsMyBrowser', 'WhoisXML API',
  ],
  'Security News & Standards': [
    'CyberScoop', 'E Hacking News', 'NIST', 'The Register', 'Virus Bulletin',
  ],
}

export const INTEGRATIONS: readonly Integration[] = INTEGRATION_CATEGORIES.flatMap((category) =>
  INTEGRATION_NAMES_BY_CATEGORY[category].map((name) => ({
    name,
    category,
    logo: `/integrations/logos/${encodeURIComponent(name)}.svg`,
  })),
)

/** Curated artwork for animated logo rails; never expand this from the catalog. */
export const FEATURED_INTEGRATIONS: readonly Integration[] = Array.from(
  { length: 18 },
  (_, index) => ({
    name: `Integration ${index + 1}`,
    logo: `/images/integrations/logo-${index + 1}.svg`,
  }),
)

/** True when any entry carries a category, gating the chip filter UI. */
export const HAS_CATEGORIES = INTEGRATIONS.some((i) => Boolean(i.category))

/**
 * Filter integrations by a free-text query (matches name, case-insensitive)
 * and an optional category. Pure + client-safe so it can be unit-tested and
 * reused by the page's live filter.
 */
export function filterIntegrations(
  list: readonly Integration[],
  query: string,
  category?: string,
): Integration[] {
  const q = query.trim().toLowerCase()
  return list.filter((item) => {
    const matchesQuery = q === '' || item.name.toLowerCase().includes(q)
    const matchesCategory = !category || item.category === category
    return matchesQuery && matchesCategory
  })
}

/** Alphabetical by name, locale-aware, returns a new array. */
export function sortIntegrations(list: readonly Integration[]): Integration[] {
  return [...list].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }),
  )
}
