/* ─── OmniSense page — "Bring us your worst alert" ───────────
 * Copy is final per spec. Do not paraphrase.
 * Primary CTA routes to /contact — no dedicated alert-intake or
 * scheduling flow exists yet (confirmed with the user); this is
 * the same lead-gen destination used elsewhere on the site.
 * Secondary CTA scrolls to the existing demo-video section
 * (OmnisenseAction), tagged with id="watch-demo" for this link. */

export const EYEBROW = 'SEE IT WORK'

export const HEADLINE = 'Bring us your worst alert.'

export const BODY =
  "Pick the one that took your best analyst all night. Send it to us, sanitized however you need. We'll run it through the loop you just read about, and hand you back the case record, start to finish. Not a demo script. Your alert."

export const PRIMARY_CTA = { label: 'Submit an alert', href: '/contact' }
export const SECONDARY_CTA = { label: 'Or just watch one run', href: '#watch-demo' }
