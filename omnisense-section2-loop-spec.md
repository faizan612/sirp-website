# Spec: OmniSense page, section 2, "The loop"

Route: `/omnisense`
Scope: one section, directly beneath the hero. No changes to any other section.

## What this section has to do

The hero makes one claim: there is an engine, and the Governor never skips the gate. This
section is the proof. The reader is a security architect with competitor tabs open, and
they are here to check whether "checked before it executes" is actually true or just
copy. The section succeeds if a skeptical reader can trace one action from proposal to
execution and see exactly where it could have been stopped.

This is a teardown, not an illustration. Build it like a schematic, not like marketing art.

---

## Content

**Eyebrow:** `ARCHITECTURE`

**Headline:** Three parts. One loop. Nothing skips the gate.

**Body:** The Planner reasons about what an alert needs and produces a plan. The Executor
carries out what gets approved. The Governor decides what happens next. Reasoning happens
in the model. Enforcement happens outside it, in code, and the two never trade places.

**Four checkpoints, in order:**

1. **Planner** — Reads the alert, the environment, and prior cases. Proposes every
   action. Approves none of them.
2. **Autonomy Gate** — Fires per action, before execution. Checks the proposed action
   against your policy and either allows it, holds it for a named approver, or blocks it.
   Policy is set by you, per action type, not per platform.
3. **Executor** — Runs what the gate allows. Nothing reaches your environment without
   passing through it first.
4. **Decision Governor** — Fires once, after the full run. Issues one of three verdicts:
   close the case, escalate to a human, or issue a new plan.

**New plan callout:** Not a restart. The Governor issues a delta, and the Planner
receives the original plan, every action already taken, and the Governor's reasoning as
context for the next pass.

**Diagram caption pair:** `MODEL REASONING` / `DETERMINISTIC CODE`

All copy is final. Do not rephrase, compress, or "improve" it while implementing. If
something does not fit the layout, come back and ask rather than editing the text.

---

## The signature element

**A live-run diagram, not a static graphic.** A single horizontal track runs Planner →
Gate → Executor → Governor. On load, and on a repeatable trigger, a token travels the
track carrying one concrete example action ("Quarantine endpoint-4471"). At the Gate, the
token visibly pauses, and one of three things happens with a beat of hang time before it
resolves: it passes through, it stops and produces a small "held for approval" chip, or it
turns back with a "blocked by policy" chip. At the Governor, the track terminates in one
of the three verdicts, and if the verdict is "new plan," the token visibly loops back to
the Planner carrying a small annotated payload, rather than just vanishing and reappearing.

This is the section's one bold move. Everything else in the section should be quiet
enough that this is the only thing a returning visitor remembers. Do not add a second
animated element competing for attention.

Why this and not a static four-box diagram: the entire claim of this section is that
enforcement happens at a specific point, outside the model, before execution. A static
diagram asserts that. A token that visibly halts at the Gate demonstrates it. The pause
duration at the Gate should be the longest beat in the sequence, because that pause is the
argument.

**Run the sequence for at least two different example actions on a loop** (e.g. one that
passes straight through, one that gets held for approval), so a visitor who watches for
more than one cycle sees the gate behave differently depending on the action, rather than
watching the same deterministic path repeat.

---

## Layout

Two-zone vertical stack, full section width, not a two-column split like the hero.

```
+----------------------------------------------------------------+
|  ARCHITECTURE                                                  |
|  Three parts. One loop. Nothing skips the gate.                |
|                                                                 |
|  The Planner reasons about what an alert needs and produces a  |
|  plan. The Executor carries out what gets approved. The        |
|  Governor decides what happens next. [...]                     |
+----------------------------------------------------------------+
|                                                                 |
|   MODEL REASONING            |            DETERMINISTIC CODE   |
|  ┌─────────┐   ┌─────────┐   |   ┌─────────┐   ┌─────────┐    |
|  │ Planner │──▶│  Gate   │───┼──▶│Executor │──▶│Governor │    |
|  └─────────┘   └────┬────┘   |   └─────────┘   └────┬────┘    |
|                     │pause                            │        |
|                 [chip on hold/block]          [3-way verdict]  |
|                                                        │        |
|              ◀────────── new plan, with delta ─────────┘       |
|                                                                 |
+----------------------------------------------------------------+
|  Planner          Autonomy Gate       Executor      Governor   |
|  card             card                card          card       |
|  (description)    (description)       (description) (desc.)   |
+----------------------------------------------------------------+
|  ► New plan verdict is not a restart. [...]                     |
+----------------------------------------------------------------+
```

The vertical divide between "model reasoning" and "deterministic code" is a real visual
element, not just the caption pair. Everything left of the Gate sits on one visual
register, everything from the Gate rightward sits on a distinct one. See treatment below.

Below the live diagram, the four checkpoints render as a static reference row so a reader
can stop the animation and read the specifics at their own pace. The diagram teaches the
shape, the cards supply the detail.

---

## Visual treatment

Match the tokens already established for the homepage governed autonomy panel and the
hero. Confirm current values in the token file before implementing. Working assumptions
to verify against the repo, not to invent fresh:

- Background stays on the page's dark surface. Do not introduce a new background color
  for this section.
- Purple `#8e2dff` accent is reserved for the token that travels the track and for the
  Gate itself. Nothing else in this section uses full-saturation purple, so the eye has
  exactly one thing to follow.
- The model-reasoning side (Planner) renders in a warmer, slightly desaturated register.
  The deterministic-code side (Gate, Executor, Governor) renders in a cooler, more precise
  register, tighter corner radii, thinner strokes. The visual language itself should
  imply "soft reasoning" versus "hard enforcement" without a legend explaining it, the
  caption pair is the only label needed.
- Card borders 1px, low-opacity hairline, matching the governed autonomy panel's existing
  border treatment.
- Mono face (IBM Plex Mono) for the eyebrow, the caption pair, the chip labels ("held for
  approval," "blocked by policy"), and the checkpoint number/order markers if used. Sans
  face (DM Sans) for the headline, body, and card descriptions. Do not set the headline or
  body in mono.
- The Gate's pause state should read as weightier than the other three nodes: slightly
  larger, or a subtle pulsing ring, something that makes a first-time viewer's eye stop
  there without needing to read anything.

Before writing any code, run the two-pass process from the frontend-design skill: state
the token and layout plan in a few lines, check it against what "the template answer for
a four-step process diagram" would look like, and if it matches that default (four boxes,
arrows, numbered 01–04, fade-in on scroll), revise before building. Numbered markers are
only justified here if the order is load-bearing information, which it is (plan must
precede gate must precede execution), so retain ordering but do not decorate it with
the generic circled-number treatment.

---

## Motion

- Page load: the section reveals as the reader scrolls to it. Cards fade and rise in
  quickly, no more than 300ms, no stagger longer than 40ms per card. This is a supporting
  reveal, not the signature moment.
- The live-run animation is the signature moment and runs on its own timeline, not tied to
  scroll position beyond starting once the section is roughly half in view.
- Full loop duration: 6 to 8 seconds, ending with 1.5 to 2 seconds resting at the resolved
  verdict before the next cycle begins, so it doesn't feel frantic.
- Respect `prefers-reduced-motion: reduce`: the token does not travel. Instead render the
  diagram in its "resolved" state (token sitting at Governor with a verdict chip already
  showing) and let the checkpoint cards below carry the explanatory weight. Do not simply
  slow the animation down, remove the travel.
- No animation is tied to hover for this section. Hovering a checkpoint card may lift it
  slightly (a few px, quiet) but should not trigger the live-run sequence.

---

## Accessibility

- The live-run diagram is decorative relative to the actual content: the same information
  it conveys visually is present in full in the four checkpoint cards and the new-plan
  callout below it. Mark the diagram `aria-hidden="true"` and ensure a screen reader user
  gets the complete architecture from the text content alone, in document order.
- The vertical divide and color-register split must not be the only signal separating
  "model" from "code." The caption pair (`MODEL REASONING` / `DETERMINISTIC CODE`) is real
  text, positioned so it is unambiguous which side it labels, not implied by proximity
  alone.
- Checkpoint cards are readable and navigable independent of the animation running or
  paused.

---

## Responsive

Below 768px:

- The live-run diagram switches from horizontal to vertical: Planner over Gate over
  Executor over Governor, token travels downward. Preserve the pause-at-Gate behavior,
  it is not optional at any breakpoint.
- The model/code divide becomes a horizontal rule between Planner and the other three,
  rather than a vertical line.
- Checkpoint cards stack full width, one per row.
- Caption pair labels move to sit directly above their respective diagram segment rather
  than flanking the full width.

---

## Acceptance criteria

1. A visitor watching the section for one full loop sees the token pause visibly at the
   Gate before either passing through, being held, or being blocked.
2. At least two distinct example actions cycle through the sequence, and at least one of
   the three verdicts shown is "new plan," visibly looping back to the Planner with a
   payload indicator, not just disappearing and reappearing identically to the start state.
3. The model-reasoning and deterministic-code halves are visually distinct by more than
   color alone, and the caption pair labels are unambiguous about which side is which.
4. All body copy matches the content block above exactly, no paraphrasing.
5. `prefers-reduced-motion: reduce` removes token travel and shows a resolved static
   state, verified by toggling the OS setting, not just shortening a duration value.
6. Screen reader output includes the full architecture description via the checkpoint
   cards and callout, independent of the diagram, verified with the diagram's DOM node
   set to `aria-hidden`.
7. At 375px width the diagram reflows to vertical, no horizontal scroll, and the Gate
   pause behavior still occurs.
8. No second animated element in this section competes with the live-run diagram for
   attention on load.
9. Section uses only tokens already defined in the repo's token file. Any new token
   introduced (e.g. the warm/cool register split) is added to that file, not hardcoded
   inline.

---

## Before writing code

Locate the existing hero component and the homepage governed autonomy panel component.
Reuse their card, border, and mono-label patterns rather than reinventing them for this
section. Report the file paths and confirm token names before starting the build.

## Commit

One commit, this section only.
