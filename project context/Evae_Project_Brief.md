# Evae — Project Brief

*360° personal-branding & digital agency for physicians*
Prepared for Doctor Hasia · Built by Faith, under Sean's direction · 17 September 2026

---

## 1. What Evae is

A full-service personal-branding and digital agency for physicians and medical professionals. One team, one point of contact: positioning, brand identity, content and social, and a custom website. The name comes from *elevate*.

Faith is building the website and brand; Sean owns creative direction. **Meta ads are deliberately excluded from the public offering for now** (per the 16 September alignment).

**Positioning line (to confirm):** "Personal branding, for the modern physician."
Alternatives on the table: "Where physicians become known." / "The digital agency for doctors."

---

## 2. The case study / proof of method

Doctor Hasia's own four-brand ecosystem is the primary case study — the same operator, the same playbook, across four niches:

- **Doctor Hasia** (@doctorshasia) — the anchor personal brand
- **Doctors Dose** (@doctorsdose) — medical education & content
- **Doctor Hasia Bespoke** (@doctorhasiabespoke) — premium private-client tier
- **The Collagen Doctor** (@thecollagendoctor) — aesthetics & skincare niche

One case study speaks to every specialty Evae wants to serve, without needing an external client to launch.

---

## 3. Visual direction (Revision 2.1)

- **Wordmark:** EVAE — all caps, Geist Light, wide tracking (~+0.22em). A custom joined-letterform version can follow later.
- **Typography:** Geist throughout — no serif, no italic. Headlines use a gradient fade (white → warm mist).
- **Surfaces:** glass-morphism — frosted pills and cards, 1px light borders, soft backdrop blur, a 1px inner top highlight.
- **Anchor reference:** the WHOOP "Daily insights, long-term impact" ad — a product floating over a cool-to-warm gradient with three glass metric pills.
- **Guardrails:** desaturated cool-to-warm only. No neon, no purple/teal, no grid or dot backgrounds, no glow effects.

### Palette (sampled from page 1 of the proposal — no violet)

| Token | Hex | Use |
|---|---|---|
| Graphite | `#2A2C33` | Footer, headlines on light, deepest tone |
| Slate Blue | `#5D5F6E` | Top of hero gradient, body text on light |
| Greige | `#8C8A8B` | Gradient mid-tone, secondary text, icons |
| Warm Mist | `#BAB8B9` | Gradient tail, headline fade, hairlines |
| Khaki | `#B4B0A5` | Warm accent, labels, dividers, pill icons |
| Linen | `#EDEAE4` | Light section canvas (warm off-white) |
| Signal Blue | `#5A86A1` | Primary buttons — one highlight per page only |

**Hero gradient:** Slate Blue → Greige → Warm Mist (cool top/left, warming to bottom/right).

### Glass tokens

| Property | Value |
|---|---|
| Fill (on gradient) | white at 12–18% opacity, subtle top-to-bottom fade |
| Fill (on light) | white at 45–70% opacity over Linen |
| Border | 1px, white at 25% (gradient) / 90% (light) |
| Blur | backdrop-blur 16–24px, one layer at a time |
| Highlight | 1px inner top edge, white at 30% |
| Radius | pills 999px, cards 16–20px, buttons 10–12px |

---

## 4. Motion (from the research report)

- **Tier 1 — build this.** Page-load reveals, scroll-triggered fades, sticky/pinned sections, gentle parallax (40–80px), animated counters, glass cards/pills, dark/light section rhythm, a slow service marquee. All native in Framer.
- **Tier 2 — optional, decided at the day-3 checkpoint.** One scroll-scrubbed hero sequence, built as a canvas image sequence (90–120 WebP frames, ~2–4 MB total), always with a static fallback. Not a scrubbed `<video>` — that stutters on iOS Safari.
- **Tier 3 — not for launch.** Multiple scrubbed sections / long pinned scroll-films. Defer to v2.

The category norm (WHOOP, Oura, Eight Sleep) is a looping autoplay background video + fade reveals — that is the safe default and the path being taken. Mobile-first: 80% of traffic is on phones; respect `prefers-reduced-motion`; cap blur at one to two layers per screen.

---

## 5. Build

- **Tool:** Framer (native backdrop blur, gradient text, scroll animation — fastest path). Fallback: Webflow + GSAP ScrollTrigger.
- **Timeline:** two weeks. Week one builds the site; week two is review, refinement, hosting and launch. The direction change added no days — the mood board was simply replaced.
- **In parallel:** SEO audit of Doctors Dose, course curriculum outline, AI clip review, Monday newsletter to Krisha.

---

## 6. Site structure — one landing page, ten sections

Everything drives to one action: **book a discovery call** (Calendly + WhatsApp).

| # | Section | Mode | Headline |
|---|---|---|---|
| 01 | Hero | Dark | Personal branding, *for the modern physician.* |
| 02 | Belief | Light | Being a great doctor *isn't enough anymore.* |
| 03 | Services | Light | Everything a doctor needs *to be known online.* |
| 04 | Blueprint | Dark | Everything we do, *we've done for ourselves first.* |
| 05 | Process | Light | Discovery → Strategy → Build → Grow. |
| 06 | Who it's for | Light | Evae is for physicians *who are ready to be visible.* |
| 07 | Voice | Light | One pull-quote (Doctor Hasia). |
| 08 | FAQ | Light | Frequently asked questions. |
| 09 | Begin | Dark | Ready to be known *for more than your credentials?* |
| 10 | Footer | Dark | EVAE — Elevating the digital presence of medical professionals. |

**Secondary pages (phase two):** Case study (Doctor Hasia), Approach, Course guide (client-only), Journal (optional).

The wireframe canvas is live with all ten desktop artboards plus mobile hero and blueprint, copy drafted throughout.

---

## 7. Section copy (drafted — bracketed items are placeholders)

**01 · Hero.** Pills: Followers [N] · Reach [N] · Growth [N]. Sub: One team, one point of contact — positioning, identity, content, social and a custom website for doctors who want to be known for more than their credentials. Buttons: Book a discovery call · Message on WhatsApp.

**02 · Belief.** Patients search before they book. Colleagues, hospitals and media look you up before they call. The physicians who are visible get the referrals, the panels and the private clients — the ones who aren't, don't. Evae builds the presence your expertise already deserves — without you learning to be a content creator.

**03 · Services.** Positioning & identity: we find the niche you can own, then build the name, logo and visual system around it. Content & social: scripting, filming, editing and posting — reels, stills and AI-assisted production at scale — managed for you. Website & digital home: a custom site that carries your brand, your proof and one clear way to reach you.

**04 · Blueprint.** Four brands, one playbook — the same operator, the same process, across four different niches. (Each card carries Followers [N] · Reach [N].) Link: See the full case study.

**05 · Process.** 01 Discovery call — a conversation with our operations lead about where you are and where you want to be seen. 02 Strategy 1:1 — a one-on-one session with Doctor Hasia to set your niche, positioning and plan. 03 Build — identity, website and your first content cycle, produced by a dedicated team. 04 Grow — ongoing content and social management, plus the full Evae playbook as an online course.

**06 · Who it's for.** You're an established doctor with a specialty you want to be known for. You'd rather have a team run your presence than learn to run it yourself. You want a brand that reads as credible to patients and peers, not as an influencer. You're ready to invest in this properly — pricing is discussed on the call, not on the page.

**07 · Voice.** "[Pull-quote from Doctor Hasia — one or two sentences, in her own words, about why presence changed her practice.]" — Doctor Hasia, Founder, Evae.

**08 · FAQ.** What exactly is included? [the 360° scope — positioning, identity, content, social and website, plus the course and the 1:1]. How long until I see results? Do I need to film myself or be on camera? Is this appropriate for a medical professional? How do we get started?

**09 · Begin.** Ready to be known for more than your credentials? Book a discovery call · Message on WhatsApp. (Calendly · WhatsApp to [operations number].)

**10 · Footer.** EVAE — Elevating the digital presence of medical professionals. Explore: Services · Blueprint · Process · FAQ. Social: Instagram · TikTok · LinkedIn. Contact: [hello@evae.co] · WhatsApp.

---

## 8. Assets produced

- **Backgrounds (Rescale "Background Fader" recolored to Evae).** Four stills (`evae-bg-1…4`, 2880×2200) and a looping video (`evae-bg-loop.mp4` ~1.1 MB / `.webm`), all retinted from periwinkle to the cool→warm Evae palette so the fader stays consistent as it cross-fades. Two earlier variants exist (`evae-bg-cool`, `evae-bg-cool-warm`).
  - In Framer: Clear the template's stills, upload these, set Hue/Saturation to 0. Drop the mp4 in the Video Background slot (loop + muted + autoplay).
- **Proposal:** `Evae_Website_Proposal_v2.pdf` (Revision 2.1).
- **Research:** scroll-motion recommendation report.
- **Wireframe:** live canvas, 10 desktop + 2 mobile artboards.

---

## 9. Still outstanding — needed before launch

1. Hero metric pill numbers `[N]`
2. Per-brand follower / reach figures on Blueprint
3. The four FAQ answers
4. Doctor Hasia's pull-quote (section 07)
5. Contact details — email + WhatsApp / operations number
6. Domain + trademark check (evae.com / .studio / .co)
7. Confirm: positioning line, Signal Blue, and the Tier-2 scroll-scrub go / no-go
