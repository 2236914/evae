// Shared content: brands / case studies, packages and the comparison matrix.
// Bracketed values like [N] are placeholders still to be supplied (see the project brief, §9).

export const trustedBrands = [
  { name: 'Doctor Hasia', src: '/assets/doctorhasia.svg' },
  { name: 'Doctors Dose', src: '/assets/doctorsdose.svg' },
  { name: 'Doctor Hasia Bespoke', src: '/assets/bespoke.svg' },
  { name: 'Doctor Hasia Academy', src: '/assets/academy.svg' },
];

// Blueprint tiles paint the logo through a CSS mask, so they use the transparent *-mark.svg variants.
export const brandLogos = Object.fromEntries(trustedBrands.map((brand) => [brand.name, brand.src.replace('.svg', '-mark.svg')]));

export const caseStudies = [
  {
    slug: 'doctor-hasia', number: '01 / 04', name: 'Doctor Hasia', handle: '@doctorhasia',
    site: 'https://www.doctorhasia.com/', instagram: 'https://www.instagram.com/doctorhasia/',
    description: 'The anchor brand: advanced aesthetic medicine for skin that ages beautifully.',
    niche: 'Aesthetic medicine · Dubai & UK',
    channels: ['Website', 'Instagram'], followers: '[N]', reach: '[N]', growth: '[N]',
    proof: 'Featured in The New York Times, Vogue, GQ, Marie Claire and The Independent',
    summary: 'Doctor Hasia is a board-certified aesthetic doctor and clinical director, and the brand every other brand in the ecosystem grows from. The task was to turn one doctor\u2019s expertise in collagen science and skin ageing into a recognisable public presence: a clear position, a consistent identity, one home online, and a content system that could sustain it week after week.',
    built: ['Positioning', 'Visual identity', 'Website', 'Content strategy', 'Videography', 'Social media'],
    approach: [
      ['Position', 'One clear line, \u201cadvanced aesthetic medicine for skin that ages beautifully\u201d, and the audiences it speaks to: patients, peers and the press.'],
      ['Build', 'A visual identity, the doctorhasia.com hub that houses every sub-brand, and an inquiry pathway that turns attention into consultations.'],
      ['Grow', 'A monthly content cycle, scripted, filmed and edited by one team, published on a steady rhythm across Instagram and the site.'],
    ],
    results: ['Press features in The New York Times, Vogue, GQ, Marie Claire and The Independent', 'One hub site that launches every other brand in the ecosystem', '[N] followers and [N] monthly reach, to be confirmed'],
  },
  {
    slug: 'doctors-dose', number: '02 / 04', name: 'Doctors Dose', handle: '@doctorsdose',
    site: 'https://www.doctorsdose.co.uk/', instagram: 'https://www.instagram.com/doctorsdose/',
    description: 'A doctor-formulated skincare brand, led by science.',
    niche: 'Skincare brand · e-commerce',
    channels: ['Website', 'Instagram'], followers: '17.6K', reach: '[N]', growth: '[N]',
    proof: 'Founded 2021 · collagen and peptide skincare · as seen in Vogue and GQ',
    summary: 'Doctors Dose takes Doctor Hasia\u2019s clinical thinking into a product brand: evidence-led, protocol-first skincare, dosed at the level the science supports, inclusive of all skin types. The challenge was building a brand and a shop that could stand on its own while clearly being hers, and keeping the content engine running through every launch.',
    built: ['Positioning', 'Visual identity', 'Website', 'Content strategy', 'Video editing', 'Social media'],
    approach: [
      ['Position', '\u201cSkincare, led by science.\u201d A protocol-first brand organised around four concerns: hyperpigmentation, longevity, acne and barrier repair.'],
      ['Build', 'Brand identity, an e-commerce site with protocol pages and product launches such as The Collagen Serum and Fade & Brighten.'],
      ['Grow', 'Launch content, education-led reels and a publishing calendar that keeps the channel consistent between drops.'],
    ],
    results: ['17.6K Instagram followers', 'A standalone shop with four protocol lines and ongoing product launches', 'Press in Vogue, GQ and Marie Claire'],
  },
  {
    slug: 'doctor-hasia-bespoke', number: '03 / 04', name: 'Doctor Hasia Bespoke', handle: '@doctorhasiabespoke',
    site: 'https://www.doctorhasia.com/bespoke', instagram: 'https://www.instagram.com/doctorhasiabespoke/',
    description: 'Personalised, doctor-reviewed skincare and haircare, made accessible.',
    niche: 'Personalised skincare · UK',
    channels: ['Website', 'Instagram'], followers: '1.8K', reach: '[N]', growth: '[N]',
    proof: '8,000+ patients treated',
    summary: 'Bespoke makes prescription-grade, personalised skincare and haircare accessible: a three-minute diagnostic quiz, a review by Doctor Hasia\u2019s team, and a compounded formula delivered to the door. It needed to feel precise and discreet while still being unmistakably part of the family, with a site that qualifies the right patients rather than chasing volume.',
    built: ['Positioning', 'Website', 'Custom build', 'CRM setup', 'Inquiry pathway', 'Content strategy'],
    approach: [
      ['Position', '\u201cYour skin. Your hair. Your personalised plan.\u201d Defined against generic routines, not against the anchor brand.'],
      ['Build', 'A quiz-led site on the doctorhasia.com hub, a CRM-backed review and payment flow, and repeat-order refinement.'],
      ['Grow', 'Low-volume, high-intent content that explains the process and the actives, and supports the UK-only positioning.'],
    ],
    results: ['8,000+ patients treated', 'A quiz-to-prescription pathway with doctor review built in', '[N] monthly reach, to be confirmed'],
  },
  {
    slug: 'the-collagen-doctor', number: '04 / 04', name: 'The Collagen Doctor', handle: '@thecollagendoctor', wordmark: true,
    site: 'https://www.doctorhasia.com/academy-live', instagram: 'https://www.instagram.com/thecollagendoctor/',
    description: 'Collagen-first aesthetics and a clinical programme for practitioners.',
    niche: 'Collagen medicine · education',
    channels: ['Website', 'Instagram'], followers: '6.2K', reach: '[N]', growth: '[N]',
    proof: 'Creator of the Collagen-First Philosophy · 23-module academy programme',
    summary: 'The Collagen Doctor is Doctor Hasia\u2019s clinical voice: collagen medicine and biostimulators, taught to the practitioners who use them. It proves the playbook works for a niche and an online course: one subject owned completely, a channel built for peers rather than patients, and Doctor Hasia Academy, a 23-module programme with live sessions.',
    built: ['Positioning', 'Online course development', 'Script writing', 'Videography', 'Social media', 'Website'],
    approach: [
      ['Position', 'One subject, one audience: collagen medicine for aesthetic doctors and nurses, under the Collagen-First Philosophy.'],
      ['Build', 'The academy: 23 modules, live sessions and written guides on a course platform, with a sales page on the hub site.'],
      ['Grow', 'Educational carousels and video for practitioners, and a launch rhythm tied to each live cohort.'],
    ],
    results: ['A 23-module online programme with live sessions, now running', '6.2K Instagram followers among a practitioner audience', 'Student feedback: \u201cclinically grounded\u201d, \u201cpractical consultation language\u201d'],
  },
];

export const aed = (n) => `AED ${n.toLocaleString('en-GB')}`;
export const tierNames = ['Essential', 'Authority', 'Elite'];

export const packages = [
  {
    id: 'essential', name: 'Essential', price: 18000, total: 54000,
    bestFor: 'building a professional personal brand foundation',
    session: '1 private session with Dr Hasia', includesFrom: null, cta: 'Start with Essential',
    highlights: ['Personal brand strategy', 'Brand positioning and niche', 'Monthly content strategy with full scripting', '10 edited social videos per month', 'Personal-brand website', 'Profile and bio optimisation', 'Content pillars and messaging'],
  },
  {
    id: 'authority', name: 'Authority', featured: true, badge: 'Most popular', price: 30000, total: 90000,
    bestFor: 'becoming a recognised authority in your niche',
    session: '2 private sessions with Dr Hasia', includesFrom: 'Essential', cta: 'Build authority',
    highlights: ['Advanced authority positioning', '15 edited social videos per month', 'Premium personal-brand website', 'Dedicated social media expert', 'Personal Branding Course and Blueprint', 'Competitor review and signature content series', '90-day authority roadmap with advanced monthly analytics'],
  },
  {
    id: 'elite', name: 'Elite', price: 45000, total: 135000,
    bestFor: 'building a full-scale personal media brand and digital ecosystem',
    session: 'A private session with Dr Hasia every month', includesFrom: 'Authority', cta: 'Go Elite',
    highlights: ['Full authority and growth strategy', 'In-depth and premium positioning', 'Full monthly media strategy', 'Premium full personal-brand website', 'Priority expert support', '6 AI branded videos per month', 'Dubai professional videography for Dubai-based clients'],
  },
];

// [label, essential, authority, elite] — booleans render as icons, strings as text.
export const comparison = [
  { group: 'Strategy & positioning', rows: [
    ['Dr Hasia 1:1', '1 private session', '2 private sessions', '1 private session every month'],
    ['Personal brand strategy', 'Included', 'Advanced authority positioning', 'Full authority & growth strategy'],
    ['Brand positioning & niche', 'Included', 'In-depth', 'In-depth + premium positioning'],
    ['Competitor positioning review', false, true, true],
    ['90-day authority roadmap', false, true, true],
  ] },
  { group: 'Content & production', rows: [
    ['Content strategy', 'Monthly', 'Monthly + authority roadmap', 'Full monthly media strategy'],
    ['Full scripting', true, true, true],
    ['Trend forecasting', true, true, true],
    ['Edited social videos', '10 / month', '15 / month', '15 / month'],
    ['Signature content series', false, true, true],
    ['AI branded videos', false, false, '6 / month'],
    ['Dubai professional videography', false, false, 'Dubai-based clients'],
  ] },
  { group: 'Digital presence', rows: [
    ['Website', 'Personal-brand website', 'Premium personal-brand website', 'Premium full personal-brand website'],
    ['Profile & bio optimisation', true, true, true],
    ['Content pillars & messaging', true, true, true],
  ] },
  { group: 'Support & learning', rows: [
    ['Social media expert support', 'Strategy + support', 'Dedicated expert support', 'Priority expert support'],
    ['Personal Branding Course', false, true, true],
    ['Dr Hasia Personal Branding Blueprint', false, true, true],
    ['Analytics & optimisation', 'Basic', 'Advanced monthly review', 'Advanced monthly review'],
  ] },
];

