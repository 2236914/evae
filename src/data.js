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
    slug: 'doctor-hasia', number: '01 / 04', name: 'Doctor Hasia', handle: '@doctorshasia',
    description: 'The anchor personal brand.',
    niche: 'Personal brand · medicine',
    channels: ['Website', 'Social media'], followers: '[N]', reach: '[N]', growth: '[N]',
    summary: 'Doctor Hasia is the brand every other brand in the ecosystem grows from. The task was to turn one doctor\u2019s expertise into a recognisable public presence: a clear position, a consistent identity and a content system that could sustain it week after week.',
    built: ['Positioning', 'Visual identity', 'Website', 'Content strategy', 'Videography', 'Social media'],
    approach: [
      ['Position', 'We defined the space Doctor Hasia could own and the audiences that mattered: patients, peers and the media.'],
      ['Build', 'A visual identity, a personal-brand website and an inquiry pathway that turns attention into conversations.'],
      ['Grow', 'A monthly content cycle, scripted, filmed and edited by one team, published on a steady rhythm.'],
    ],
    results: ['[N] followers across channels', '[N] monthly reach', '[Outcome placeholder, e.g. press features, panel invitations or private-client inquiries]'],
  },
  {
    slug: 'doctors-dose', number: '02 / 04', name: 'Doctors Dose', handle: '@doctorsdose',
    description: 'Medical education made accessible.',
    niche: 'Medical education · content',
    channels: ['Website', 'Social media'], followers: '[N]', reach: '[N]', growth: '[N]',
    summary: 'Doctors Dose takes the same operator and the same playbook into medical education: short, credible explanations of health topics that patients actually search for. The challenge was scale, publishing often without losing accuracy or tone.',
    built: ['Positioning', 'Content strategy', 'Script writing', 'Video editing', 'Social media', 'Website'],
    approach: [
      ['Position', 'A distinct voice from Doctor Hasia: educational, plain-spoken and built around questions people already ask.'],
      ['Build', 'Content pillars, a scripting system and an editing style that could be repeated at volume.'],
      ['Grow', 'A publishing calendar and reporting loop that keeps the channel consistent and improving.'],
    ],
    results: ['[N] followers', '[N] monthly reach', '[Outcome placeholder, e.g. top-performing topics or audience growth over 90 days]'],
  },
  {
    slug: 'doctor-hasia-bespoke', number: '03 / 04', name: 'Doctor Hasia Bespoke', handle: '@doctorhasiabespoke',
    description: 'A premium private-client experience.',
    niche: 'Private clients · premium tier',
    channels: ['Website', 'Social media'], followers: '[N]', reach: '[N]', growth: '[N]',
    summary: 'Bespoke is the premium, private-client tier of the ecosystem. It needed to feel quieter and more exclusive than the anchor brand while still being unmistakably part of the same family, with a website that qualifies inquiries rather than chasing volume.',
    built: ['Positioning', 'Visual identity', 'Website', 'CRM setup', 'Inquiry pathway', 'Content strategy'],
    approach: [
      ['Position', 'A premium offer with its own tone, defined against the anchor brand rather than in competition with it.'],
      ['Build', 'A restrained identity, a custom-built site and a CRM-backed inquiry pathway for a small number of the right clients.'],
      ['Grow', 'Low-volume, high-intent content that supports the private-client positioning.'],
    ],
    results: ['[N] followers', '[N] monthly reach', '[Outcome placeholder, e.g. qualified private-client inquiries per month]'],
  },
  {
    slug: 'the-collagen-doctor', number: '04 / 04', name: 'The Collagen Doctor', handle: '@thecollagendoctor', wordmark: true,
    description: 'A focused voice in aesthetics and skincare.',
    niche: 'Aesthetics · skincare',
    channels: ['Social media'], followers: '[N]', reach: '[N]', growth: '[N]',
    summary: 'The Collagen Doctor proves the playbook works in a single, tightly defined niche. One topic, one audience, one channel-first strategy, built to be recognised quickly in a crowded category.',
    built: ['Positioning', 'Content strategy', 'Script writing', 'Videography', 'Video editing', 'Social media'],
    approach: [
      ['Position', 'One subject owned completely, with a name and voice that say what the brand is about in two words.'],
      ['Build', 'A social-first content system: formats, scripts and an editing style tuned to the platform.'],
      ['Grow', 'Consistent publishing and trend forecasting to keep the brand present in a fast-moving niche.'],
    ],
    results: ['[N] followers', '[N] monthly reach', '[Outcome placeholder, e.g. growth rate since launch]'],
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

