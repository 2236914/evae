import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Check, Globe2, Minus, Share2 } from 'lucide-react';
import './style.css';
import ScrollBackground from './ScrollBackground';
import Reveal from './Reveal';
import SmoothScroll from './SmoothScroll';
import ScrambleText from './ScrambleText';

const trustedBrands = [
  { name: 'Doctor Hasia', src: '/assets/doctorhasia.svg' },
  { name: 'Doctors Dose', src: '/assets/doctorsdose.svg' },
  { name: 'Doctor Hasia Bespoke', src: '/assets/bespoke.svg' },
  { name: 'Doctor Hasia Academy', src: '/assets/academy.svg' },
];

const channelIcons = { Website: Globe2, 'Social media': Share2 };

function Button({ children, href = '#contact', variant = 'primary' }) {
  return <a className={`button button--${variant}`} href={href}>{children}</a>;
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const hero = document.getElementById('hero');
      if (!hero) return;
      const scrollRange = Math.max(window.innerHeight, hero.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, (window.scrollY - hero.offsetTop) / scrollRange));
      setOverHero(window.scrollY < hero.offsetTop + hero.offsetHeight && progress < .86);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 901px)');
    const closeOnDesktop = (event) => event.matches && setMenuOpen(false);
    desktopQuery.addEventListener('change', closeOnDesktop);
    return () => desktopQuery.removeEventListener('change', closeOnDesktop);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`nav shell${scrolled ? ' nav--scrolled' : ''}${overHero ? ' nav--over-hero' : ''}${menuOpen ? ' nav--menu-open' : ''}`}>
      <a className="wordmark" href="/" aria-label="EVAE home">EVAE</a>
      <nav className="nav__links" aria-label="Primary navigation">
        <a href="#services">Services</a>
        <a href="#blueprint">Blueprint</a>
        <a href="#process">Process</a>
        <a href="#packages">Packages</a>
        <a href="#faq">FAQ</a>
      </nav>
      <Button variant="nav">Book a call</Button>
      <button className="nav__menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
      <nav id="mobile-navigation" className="nav__mobile" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        <div className="nav__mobile-links">
          <a href="#services" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>Services</a>
          <a href="#blueprint" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>Blueprint</a>
          <a href="#process" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>Process</a>
          <a href="#packages" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>Packages</a>
          <a href="#faq" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>FAQ</a>
        </div>
        <a className="button button--mobile" href="#contact" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>book a call</a>
      </nav>
    </header>
  );
}

function HeroContent() {
  return (
    <div className="hero__content shell">
      <h1 id="hero-title">
        <ScrambleText className="hero__line hero__line--soft" text="Elevate your" />
        <ScrambleText className="hero__line hero__line--strong" text="digital presence." />
      </h1>
      <ScrambleText as="p" className="hero__lede" text={"Personal branding for the modern doctor.\nOne team. One point of contact."} />
      <Button variant="cta">
        <span>book a strategy call</span>
        <span className="button__icon" aria-hidden="true"><ArrowUpRight strokeWidth={2.2} /></span>
      </Button>
    </div>
  );
}

function BrandFooter() {
  return (
    <footer className="hero__footer">
      <div className="footer__label">
        <span>The team behind</span>
        <span className="footer__portrait" aria-hidden="true"><img src="/assets/dr-hasia.jpg" alt="" /></span>
        <span>Dr. Hasia</span>
      </div>
      <div className="brand-row" aria-label="Brands built by the team behind Doctor Hasia">
        <div className="brand-row__track">
          {[0, 1, 2, 3].map((groupIndex) => (
            <div className="brand-row__group" aria-hidden={groupIndex > 0 ? 'true' : undefined} key={groupIndex}>
              {trustedBrands.map((brand) => (
                <a href="#blueprint" className="brand-row__item" tabIndex={groupIndex > 0 ? -1 : undefined} key={`${groupIndex}-${brand.name}`}>
                  <img src={brand.src} alt={groupIndex === 0 ? brand.name : ''} draggable="false" />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

function Hero() {
  return (
    <main className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero__sticky">
        <div className="hero__shade" aria-hidden="true" />
        <HeroContent />
        <BrandFooter />
      </div>
    </main>
  );
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M8 5h11v11" /></svg>;
}

function ServicesSection() {
  const [openService, setOpenService] = useState(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanHover(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  const services = [
    { number: '01', title: 'Positioning & Brand Identity', description: 'We define the space you can own, then create the positioning, messaging and visual identity that make it recognisably yours.', chips: ['Positioning', 'Messaging', 'Visual identity', 'Brand guidelines'], visual: 'identity' },
    { number: '02', title: 'Content & Social', description: 'We plan, script, film, edit and publish content that builds recognition without making you look or sound like an influencer.', chips: ['Content strategy', 'Filming', 'Editing', 'Social management'], visual: 'content' },
    { number: '03', title: 'Website & Digital Home', description: 'We design and build a custom website that brings your brand, expertise and proof together—and gives the right people a clear way to contact you.', chips: ['UX/UI', 'Website design', 'Framer development', 'Inquiry pathway'], visual: 'website' },
    { number: '04', title: 'Online Courses & Digital Products', description: 'We turn your medical expertise into a credible, structured learning experience—from the initial offer and curriculum to production, platform setup and launch.', chips: ['Course strategy', 'Curriculum design', 'Video production', 'Platform build', 'Launch assets'], visual: 'course' },
  ];

  const toggleService = (index) => setOpenService((current) => current === index ? null : index);

  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <Reveal className="shell services__inner">
      <div className="eyebrow eyebrow--light">Services</div>
        <ScrambleText as="h2" id="services-title" text={"Everything a doctor\nneeds to be known online."} />
        <p className="services__prompt">Hover to explore</p>
      </Reveal>
      <Reveal className="services__list" delayMs={80}>
        {services.map((service, index) => {
          const isOpen = openService === index;
          return <article
            className={`service-row${isOpen ? ' service-row--open' : ''}`}
            key={service.number}
            tabIndex="0"
            aria-expanded={isOpen}
            onMouseEnter={() => canHover && setOpenService(index)}
            onMouseLeave={() => canHover && setOpenService(null)}
            onFocus={() => canHover && setOpenService(index)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleService(index);
              }
            }}
            onClick={(event) => {
              if (!canHover && !event.target.closest('a')) toggleService(index);
            }}
          >
            <div className="service-row__number">{service.number}</div>
            <div className="service-row__body">
              <ScrambleText as="h3" text={service.title} />
              <div className="service-row__details">
                <p className="service-row__description">{service.description}</p>
                <div className="service-row__tags">{service.chips.map((chip) => <span key={chip}>{chip}</span>)}</div>
              </div>
            </div>
            <div className={`service-row__preview service-row__preview--${service.visual}`} aria-hidden="true">
              <span className="preview__main" /><span className="preview__line preview__line--one" /><span className="preview__line preview__line--two" /><span className="preview__line preview__line--three" />
            </div>
            <a className="service-row__arrow" href="#contact" aria-label={`Explore ${service.title}`}><ArrowIcon /></a>
          </article>;
        })}
      </Reveal>
    </section>
  );
}

// Blueprint tiles paint the logo through a CSS mask, so they use the transparent *-mark.svg variants.
const brandLogos = Object.fromEntries(trustedBrands.map((brand) => [brand.name, brand.src.replace('.svg', '-mark.svg')]));

function BlueprintSection() {
  const brands = [
    { number: '01 / 04', name: 'Doctor Hasia', description: 'The anchor personal brand.', channels: ['Website', 'Social media'], followers: '[N]', reach: '[N]' },
    { number: '02 / 04', name: 'Doctors Dose', description: 'Medical education made accessible.', channels: ['Website', 'Social media'], followers: '[N]', reach: '[N]' },
    { number: '03 / 04', name: 'Doctor Hasia Bespoke', description: 'A premium private-client experience.', channels: ['Website', 'Social media'], followers: '[N]', reach: '[N]' },
    { number: '04 / 04', name: 'The Collagen Doctor', description: 'A focused voice in aesthetics and skincare.', channels: ['Social media'], followers: '[N]', reach: '[N]' },
  ];

  return (
    <section className="blueprint" id="blueprint" aria-labelledby="blueprint-title">
      <div className="blueprint__ambient blueprint__ambient--one" />
      <div className="blueprint__ambient blueprint__ambient--two" />
      <Reveal className="shell blueprint__header">
        <div className="eyebrow eyebrow--light">The blueprint at work</div>
        <p className="blueprint__kicker">Our proof of method</p>
        <ScrambleText as="h2" id="blueprint-title" text={"Everything we do,\nwe’ve done for ourselves first."} />
        <p className="blueprint__lede"><ScrambleText as="strong" text="Four brands. Four distinct audiences. One proven approach." /><br /><ScrambleText text="The Doctor Hasia ecosystem shows how clear positioning, a consistent identity and the right content system can build authority across different areas of medicine." /></p>
      </Reveal>
      <div className="blueprint__stack shell">
        {brands.map((brand, index) => (
          <article className="blueprint-card" key={brand.name} style={{ '--card-index': index }}>
            <div className="blueprint-card__image liquid-glass-strong">
              {brandLogos[brand.name]
                ? <span className="blueprint-card__logo" role="img" aria-label={brand.name} style={{ '--logo': `url(${brandLogos[brand.name]})` }} />
                : <span className="blueprint-card__wordmark" role="img" aria-label={brand.name}>The Collagen<br />Doctor</span>}
            </div>
            <div className="blueprint-card__info">
              <span className="blueprint-card__number">{brand.number}</span>
              <ScrambleText as="h3" text={brand.name} />
              <ScrambleText as="p" className="blueprint-card__description" text={brand.description} />
              <div className="blueprint-card__rule" />
              <div className="blueprint-card__metrics"><span><b>Followers</b>{brand.followers}</span><span><b>Reach</b>{brand.reach}</span></div>
              <div className="blueprint-card__footer"><div className="blueprint-card__chips">{brand.channels.map((channel) => { const Icon = channelIcons[channel] || Globe2; return <span key={channel}><Icon aria-hidden="true" strokeWidth={1.7} />{channel}</span>; })}</div><a href="#contact">Explore the full case study <ArrowIcon /></a></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const processSteps = [
  { number: '01', title: 'Discovery Call', summary: 'Start with where you are—and where you want to be seen.', body: 'A focused conversation with our operations lead about where you are, what you want to build and where you want to be known.', visual: 'Call details, goals and availability' },
  { number: '02', title: 'Strategy', summary: 'A plan that makes your expertise recognisably yours.', body: 'A one-to-one session with Doctor Hasia to define your niche, positioning, audience and plan.', visual: 'Positioning, audience and content pillars' },
  { number: '03', title: 'Build', summary: 'Your identity, website and first content cycle come to life.', body: 'Your identity, website, inquiry pathway and first content cycle are created by your dedicated team. If your strategy includes an online course, its offer and learning structure begin here too.', visual: 'Identity, website and production components' },
  { number: '04', title: 'Grow', summary: 'A consistent system that keeps moving forward.', body: 'We manage the ongoing content and systems that keep your presence active, consistent and moving forward. Future offers—including courses and digital products—can grow from this foundation.', visual: 'Publishing rhythm, reporting and future offers' },
];

const STEP_MS = 4500;

function HowWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [inView, setInView] = useState(false);
  const visualRef = useRef(null);
  const active = processSteps[activeStep];

  // Mobile: the step list is hidden and the visual tile plays through the steps on a timer.
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 900px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setAutoplay(mobile.matches && !reduced.matches);
    sync();
    mobile.addEventListener('change', sync);
    reduced.addEventListener('change', sync);
    return () => { mobile.removeEventListener('change', sync); reduced.removeEventListener('change', sync); };
  }, []);

  useEffect(() => {
    const el = visualRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || !inView) return undefined;
    const id = setTimeout(() => setActiveStep((step) => (step + 1) % processSteps.length), STEP_MS);
    return () => clearTimeout(id);
  }, [autoplay, inView, activeStep]);

  return (
    <section className="process" id="process" aria-labelledby="process-title">
      <Reveal className="process__layout shell">
        <div className="process__intro">
          <div className="eyebrow eyebrow--light">How it works</div>
          <ScrambleText as="h2" id="process-title" text={"A clear process,\nbuilt around you."} />
          <ScrambleText as="p" text="From the first conversation to ongoing growth, every stage is managed by one team." />
          <div className="process__visual" ref={visualRef} data-autoplay={autoplay} style={{ '--step-ms': `${STEP_MS}ms` }}>
            <div className="process__visual-art">
              <span className="process__visual-index" key={active.number} aria-hidden="true">{active.number}</span>
              <ol className="process__visual-ticks" aria-label="Steps">
                {processSteps.map((step, i) => (
                  <li key={step.number} className={i < activeStep ? 'is-done' : i === activeStep ? 'is-active' : ''}>
                    <button type="button" aria-label={`Step ${step.number}: ${step.title}`} aria-current={i === activeStep ? 'step' : undefined} onClick={() => setActiveStep(i)}><span><i /></span></button>
                  </li>
                ))}
              </ol>
            </div>
            <div className="process__visual-caption" key={autoplay ? active.number : 'static'}>
              <span>{active.number}</span>
              <strong>{active.title}</strong>
              <small>{active.visual}</small>
              <p className="process__visual-summary">{active.summary}</p>
            </div>
          </div>
        </div>
        <div className="process__steps">
          {processSteps.map((step, index) => (
            <Reveal delayMs={index * 60} key={step.number}><button className={`process-step${activeStep === index ? ' process-step--active' : ''}`} type="button" aria-expanded={activeStep === index} onMouseEnter={() => setActiveStep(index)} onFocus={() => setActiveStep(index)} onClick={() => setActiveStep(index)}>
              <span className="process-step__top"><span className="process-step__number">{step.number}</span><ScrambleText className="process-step__title" text={step.title} /><span className="process-step__icon">{activeStep === index ? '−' : '+'}</span></span>
              <span className="process-step__content"><strong>{step.summary}</strong><span>{step.body}</span></span>
            </button></Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

const aed = (n) => `AED ${n.toLocaleString('en-GB')}`;
const tierNames = ['Essential', 'Authority', 'Elite'];

const packages = [
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
const comparison = [
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

function CompareCell({ value, tier, featured }) {
  const isBool = typeof value === 'boolean';
  return (
    <td className={featured ? 'compare__cell--featured' : undefined} data-tier={tier} data-value={isBool ? String(value) : 'text'}>
      {!isBool && value}
      {isBool && value && <><Check aria-hidden="true" strokeWidth={2} /><span className="sr-only">Included</span></>}
      {isBool && !value && <><Minus aria-hidden="true" strokeWidth={2} /><span className="sr-only">Not included</span></>}
    </td>
  );
}

function PackagesSection() {
  const [compareOpen, setCompareOpen] = useState(false);
  const [activeTier, setActiveTier] = useState('authority'); // mobile tab pill; desktop shows all three

  return (
    <section className="packages" id="packages" aria-labelledby="packages-title">
      <Reveal className="packages__inner shell">
        <div className="eyebrow eyebrow--light">Packages</div>
        <p className="packages__kicker">3-month programme</p>
        <ScrambleText as="h2" id="packages-title" text={"Three ways to begin.\nOne dedicated team."} />
        <ScrambleText as="p" className="packages__lede" text="Strategy, authority building and content execution. Every tier includes private 1:1 time with Dr Hasia." />
      </Reveal>
      <div className="packages__tabs-wrap shell">
        <div className="packages__tabs liquid-glass" role="tablist" aria-label="Choose a package">
          {packages.map((tier) => (
            <button key={tier.id} className={`packages__tab${tier.id === activeTier ? ' is-active' : ''}`} type="button" role="tab" aria-selected={tier.id === activeTier} aria-controls={`package-panel-${tier.id}`} onClick={() => setActiveTier(tier.id)}>{tier.name}</button>
          ))}
        </div>
      </div>
      <div className="packages__grid shell">
        {packages.map((tier, index) => (
          <Reveal delayMs={index * 70} key={tier.id} className={tier.id === activeTier ? 'is-active' : ''}>
            <article id={`package-panel-${tier.id}`} className={`package-card liquid-glass-strong${tier.featured ? ' package-card--featured' : ''}`} aria-labelledby={`package-${tier.id}`}>
              {tier.badge && <span className="package-card__badge">{tier.badge}</span>}
              <ScrambleText as="h3" id={`package-${tier.id}`} text={tier.name} />
              <p className="package-card__price">
                <span className="package-card__currency">AED</span>
                <span className="package-card__amount">{tier.price.toLocaleString('en-GB')}</span>
                <span className="package-card__per">/ month</span>
                <span className="package-card__total">{aed(tier.total)} for the 3-month programme</span>
              </p>
              <p className="package-card__fit"><b>Best for</b> {tier.bestFor}.</p>
              <p className="package-card__session">{tier.session}</p>
              <ul className="package-card__list">
                {tier.includesFrom && <li className="package-card__list-lead">Everything in {tier.includesFrom}, plus</li>}
                {tier.highlights.map((item) => <li key={item}><Check aria-hidden="true" strokeWidth={2} /><span>{item}</span></li>)}
              </ul>
              <div className="package-card__cta">
                <Button variant="cta"><span>{tier.cta}</span><span className="button__icon" aria-hidden="true"><ArrowUpRight strokeWidth={2.2} /></span></Button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal className="shell">
        <div className="packages__clinics liquid-glass-strong">
          <div>
            <p className="packages__clinics-kicker">Clinics and group practices</p>
            <ScrambleText as="h3" text="Multiple practitioners? We build bespoke clinic packages." />
            <p>We create bespoke packages for clinics depending on their requirements.</p>
          </div>
          <Button variant="primary">Request a clinic proposal</Button>
        </div>
      </Reveal>
      <Reveal className="shell">
        <div className={`packages__compare liquid-glass-strong${compareOpen ? ' packages__compare--open' : ''}`}>
          <button className="packages__compare-toggle" type="button" aria-expanded={compareOpen} aria-controls="packages-compare" onClick={() => setCompareOpen((open) => !open)}>
            <span><strong>Compare all inclusions</strong><small>19 inclusions across three tiers</small></span>
            <span className="faq-item__icon" aria-hidden="true">{compareOpen ? '−' : '+'}</span>
          </button>
          <div className="packages__compare-body" id="packages-compare" inert={!compareOpen}>
            <div>
              <table className="compare">
                <thead>
                  <tr>
                    <th scope="col">Inclusion</th>
                    {tierNames.map((name) => <th scope="col" key={name} className={name === 'Authority' ? 'compare__cell--featured' : undefined}>{name}</th>)}
                  </tr>
                </thead>
                {comparison.map((group) => (
                  <tbody key={group.group}>
                    <tr className="compare__group"><th colSpan={4} scope="colgroup">{group.group}</th></tr>
                    {group.rows.map(([label, ...values]) => (
                      <tr key={label}>
                        <th scope="row">{label}</th>
                        {values.map((value, i) => <CompareCell key={tierNames[i]} value={value} tier={tierNames[i]} featured={i === 1} />)}
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </Reveal>
      <p className="packages__note shell">All tiers are a 3-month minimum programme, billed monthly in AED. Every tier includes private 1:1 time with Dr Hasia.</p>
    </section>
  );
}

const fitStatements = [
  'You have established expertise and a specialty you want to be known for.',
  'You would rather have an experienced team manage your digital presence than learn to do everything yourself.',
  'You want a brand that feels credible to patients and respected by your peers—not one that makes you look like an influencer.',
  'You are ready to invest properly in building a long-term professional presence.',
];

function WhoItsForSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: .15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`fit${visible ? ' fit--visible' : ''}`} id="who-its-for" ref={sectionRef} aria-labelledby="fit-title">
      <div className="fit__inner shell">
        <div className="eyebrow eyebrow--light">Who it’s for</div>
        <p className="fit__kicker">Is EVAE right for you?</p>
        <ScrambleText as="h2" id="fit-title" text={"EVAE is for doctors\nwho are ready to be visible."} />
        <div className="fit__grid">
          {fitStatements.map((statement, index) => <article className="fit-item" key={statement}><span>{String(index + 1).padStart(2, '0')}</span><ScrambleText as="p" text={statement} /></article>)}
        </div>
        <p className="fit__closing">If that sounds like you, we should talk.</p>
        <Button href="#contact">Start the conversation</Button>
      </div>
    </section>
  );
}

function FounderSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: .2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`founder${visible ? ' founder--visible' : ''}`} id="founder" ref={sectionRef} aria-labelledby="founder-title">
      <div className="founder__layout shell">
        <div className="founder__portrait"><img src="/assets/dr-hasia.jpg" alt="Doctor Hasia, founder of EVAE" loading="lazy" /></div>
        <div className="founder__copy">
          <div className="eyebrow eyebrow--light">From the founder</div>
          <ScrambleText as="h2" id="founder-title" text={"The blueprint was built\nfrom experience."} />
          <blockquote>“I built my own digital presence one brand at a time. What changed my practice was not simply being seen—it was being understood. EVAE brings that same clarity, consistency and support to other doctors.”</blockquote>
          <p className="founder__byline"><strong>Doctor Hasia</strong><span>Founder, EVAE</span></p>
          <p className="founder__status">Working quotation — subject to founder approval before launch.</p>
        </div>
      </div>
    </section>
  );
}

const faqItems = [
  ['What exactly is included?', 'Every engagement is tailored, but EVAE can cover positioning, brand identity, content strategy and production, social media management, a custom website and online-course creation. We confirm the right combination during the discovery process.'],
  ['Can EVAE help me create an online course?', 'Yes. We can help shape the offer and curriculum, produce the lessons, build the course platform and sales page, and create the supporting launch assets.'],
  ['Do I need to film myself or be on camera?', 'Not all the time. We develop a content format around your strengths and comfort level. When filming is recommended, the team handles the planning, scripting and production direction.'],
  ['Is this appropriate for a medical professional?', 'Yes. EVAE is built specifically for doctors. The aim is to create a presence that feels credible to patients and respected by peers—not one that makes you look like an influencer.'],
  ['How long does the process take?', 'Timing depends on the final scope. Your brand and digital foundation are developed through a structured build phase, while recognition, reach and authority grow over time through consistent execution.'],
  ['How do we get started?', 'Book a discovery call. We will discuss your goals, current presence and the support you need before recommending the right scope.'],
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <Reveal className="faq__layout shell">
        <div className="faq__intro">
          <div className="eyebrow eyebrow--light">FAQ</div>
          <ScrambleText as="h2" id="faq-title" text={"Questions,\nanswered."} />
        </div>
        <div className="faq__surface">
          {faqItems.map(([question, answer], index) => (
            <div className={`faq-item${openIndex === index ? ' faq-item--open' : ''}`} key={question}>
              <button type="button" aria-expanded={openIndex === index} onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
                <span className="faq-item__number">{String(index + 1).padStart(2, '0')}</span><ScrambleText className="faq-item__question" text={question} /><span className="faq-item__icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              <div className="faq-item__answer"><p>{answer}</p></div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.4a8.5 8.5 0 0 1-12.6 7.4L3.7 20l1.3-4.1A8.5 8.5 0 1 1 20.5 11.4Z" /><path d="M8.4 7.7c.2-.4.4-.5.7-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.7.7c.7 1.2 1.7 2.1 2.9 2.7l.7-.7c.2-.2.4-.2.6-.1l1.7.8c.2.1.3.3.3.5v.5c0 .3-.1.5-.4.7-.5.3-1.1.4-1.7.2-3.8-1.1-6.6-3.7-7.7-7.4-.2-.7-.1-1.4.2-1.9Z" /></svg>;
}

function BeginSection() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset((window.scrollY * .02) % 100 - 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="begin" id="contact" style={{ '--begin-parallax': `${offset}px` }} aria-labelledby="begin-title">
      <Reveal className="begin__inner shell">
        <div className="eyebrow eyebrow--light">Begin</div>
        <p className="begin__kicker">Your expertise is already there</p>
        <ScrambleText as="h2" id="begin-title" text={"Ready to be known\nfor more than your credentials?"} />
        <ScrambleText as="p" className="begin__lede" text="Build a digital presence that reflects the quality of your work—and makes it easier for the right people to find you." />
        <div className="begin__actions">
          <Button href="#contact" variant="primary">Book a discovery call</Button>
          <a className="button button--whatsapp" href="https://wa.me/" target="_blank" rel="noreferrer"><WhatsAppIcon />Message on WhatsApp</a>
        </div>
      </Reveal>
    </section>
  );
}

function BackgroundFader() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sectionOrder = [
      ['services', 1, -.42], ['process', 2, 0], ['packages', 2, 0],
      ['who-its-for', 3, .45], ['founder', 3, .45], ['faq', 4, 0], ['contact', 4, 0],
    ];
    const update = () => {
      const trigger = window.scrollY + window.innerHeight * .42;
      let next = 0;
      sectionOrder.forEach(([id, state, lead]) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop - window.innerHeight * lead <= trigger) next = state;
      });
      setActive(next);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="background-fader" aria-hidden="true">
      <ScrollBackground active={active === 0} />
      {[1, 2, 3, 4].map((state) => <img className={`background-fader__media background-fader__media--${state}${active === state ? ' background-fader__media--active' : ''}`} key={state} src={`/assets/evae-bg-${state}.png`} alt="" />)}
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SmoothScroll>
      <Navigation />
      <div className="landing">
      <BackgroundFader />
      <Hero />
      <BlueprintSection />
      <ServicesSection />
      <HowWorksSection />
      <PackagesSection />
      <WhoItsForSection />
      <FounderSection />
      <FAQSection />
      <BeginSection />
      </div>
    </SmoothScroll>
  </StrictMode>
);
