import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { aed, brandLogos, caseStudies, comparison, packages, tierNames, trustedBrands } from './data';
import { ArrowUpRight, Check, Globe2, Minus, Share2 } from 'lucide-react';
import './style.css';
import ScrollBackground from './ScrollBackground';
import Reveal from './Reveal';
import ScrambleText from './ScrambleText';
import ServicesBentoSection from './ServicesBento';

const channelIcons = { Website: Globe2, 'Social media': Share2 };

export function Button({ children, href = '#contact', variant = 'primary' }) {
  return <a className={`button button--${variant}`} href={href}>{children}</a>;
}

export function Navigation() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const hero = document.getElementById('hero');
      if (!hero) { setOverHero(false); return; }
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
  }, [pathname]); // re-check on route change: sub-pages have no hero

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
    const desktopQuery = window.matchMedia('(min-width: 1081px)'); // matches the ≤1080px burger breakpoint in style.css
    const closeOnDesktop = (event) => event.matches && setMenuOpen(false);
    desktopQuery.addEventListener('change', closeOnDesktop);
    return () => desktopQuery.removeEventListener('change', closeOnDesktop);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const at = (id) => (pathname === '/' ? `#${id}` : `/#${id}`); // sub-pages link back to the landing sections

  return (
    <header className={`nav shell${scrolled ? ' nav--scrolled' : ''}${overHero ? ' nav--over-hero' : ''}${menuOpen ? ' nav--menu-open' : ''}`}>
      <Link className="wordmark" to="/" aria-label="EVAE home">EVAE</Link>
      <nav className="nav__links" aria-label="Primary navigation">
        <a href={at('services')}>Services</a>
        <a href={at('blueprint')}>Blueprint</a>
        <a href={at('process')}>Process</a>
        <a href={at('packages')}>Packages</a>
        <a href="#faq">FAQ</a>
      </nav>
      <Button variant="nav" href={at('contact')}>Book a call</Button>
      <button className="nav__menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
      <nav id="mobile-navigation" className="nav__mobile" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        <div className="nav__mobile-links">
          <a href={at('services')} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>Services</a>
          <a href={at('blueprint')} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>Blueprint</a>
          <a href={at('process')} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>Process</a>
          <a href={at('packages')} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>Packages</a>
          <a href={at('faq')} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>FAQ</a>
        </div>
        <a className="button button--mobile" href={at('contact')} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>book a call</a>
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

export function Hero() {
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

export function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M8 5h11v11" /></svg>;
}

export function BrandMark({ brand }) {
  return brandLogos[brand.name]
    ? <span className="blueprint-card__logo" role="img" aria-label={brand.name} style={{ '--logo': `url(${brandLogos[brand.name]})` }} />
    : <span className="blueprint-card__wordmark" role="img" aria-label={brand.name}>The Collagen<br />Doctor</span>;
}

export function BlueprintSection() {
  const brands = caseStudies;

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
              <BrandMark brand={brand} />
            </div>
            <div className="blueprint-card__info">
              <span className="blueprint-card__number">{brand.number}</span>
              <ScrambleText as="h3" text={brand.name} />
              <ScrambleText as="p" className="blueprint-card__description" text={brand.description} />
              <div className="blueprint-card__rule" />
              <div className="blueprint-card__metrics"><span><b>Followers</b>{brand.followers}</span><span><b>Reach</b>{brand.reach}</span></div>
              <div className="blueprint-card__footer"><div className="blueprint-card__chips">{brand.channels.map((channel) => { const Icon = channelIcons[channel] || Globe2; return <span key={channel}><Icon aria-hidden="true" strokeWidth={1.7} />{channel}</span>; })}</div><Link to={`/case-study/${brand.slug}`}>Explore the full case study <ArrowIcon /></Link></div>
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

export function HowWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [userPicked, setUserPicked] = useState(false); // a tap on a step stops the mobile timer overriding it
  const [inView, setInView] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const visualRef = useRef(null);
  const active = processSteps[activeStep];

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanHover(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

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
    if (!autoplay || !inView || userPicked) return undefined;
    const id = setTimeout(() => setActiveStep((step) => (step + 1) % processSteps.length), STEP_MS);
    return () => clearTimeout(id);
  }, [autoplay, inView, activeStep, userPicked]);

  const pickStep = (index) => { setUserPicked(true); setActiveStep(index); };

  return (
    <section className="process" id="process" aria-labelledby="process-title">
      <Reveal className="process__layout shell">
        <div className="process__intro">
          <div className="eyebrow eyebrow--light">How it works</div>
          <ScrambleText as="h2" id="process-title" text={"A clear process,\nbuilt around you."} />
          <ScrambleText as="p" text="From the first conversation to ongoing growth, every stage is managed by one team." />
          <div className="process__visual liquid-glass-frost" ref={visualRef} data-autoplay={autoplay && !userPicked} style={{ '--step-ms': `${STEP_MS}ms` }}>
            <div className="process__visual-art">
              <span className="process__visual-index" key={active.number} aria-hidden="true">{active.number}</span>
              <ol className="process__visual-ticks" aria-label="Steps">
                {processSteps.map((step, i) => (
                  <li key={step.number} className={i < activeStep ? 'is-done' : i === activeStep ? 'is-active' : ''}>
                    <button type="button" aria-label={`Step ${step.number}: ${step.title}`} aria-current={i === activeStep ? 'step' : undefined} onClick={() => pickStep(i)}><span><i /></span></button>
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
            <Reveal delayMs={index * 60} key={step.number}><button className={`process-step liquid-glass-frost${activeStep === index ? ' process-step--active' : ''}`} type="button" aria-expanded={activeStep === index} onMouseEnter={() => canHover && setActiveStep(index)} onFocus={() => canHover && setActiveStep(index)} onClick={() => pickStep(index)}>
              <span className="process-step__top"><span className="process-step__number">{step.number}</span><ScrambleText className="process-step__title" text={step.title} /><span className="process-step__icon">{activeStep === index ? '−' : '+'}</span></span>
              <span className="process-step__content"><strong>{step.summary}</strong><span>{step.body}</span></span>
            </button></Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function CompareTable() {
  return (
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
  );
}

export function CompareCell({ value, tier, featured }) {
  const isBool = typeof value === 'boolean';
  return (
    <td className={featured ? 'compare__cell--featured' : undefined} data-tier={tier} data-value={isBool ? String(value) : 'text'}>
      {!isBool && value}
      {isBool && value && <><Check aria-hidden="true" strokeWidth={2} /><span className="sr-only">Included</span></>}
      {isBool && !value && <><Minus aria-hidden="true" strokeWidth={2} /><span className="sr-only">Not included</span></>}
    </td>
  );
}

export function PackagesSection() {
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
            <article id={`package-panel-${tier.id}`} className={`package-card liquid-glass-frost${tier.featured ? ' package-card--featured' : ''}`} aria-labelledby={`package-${tier.id}`}>
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
        <div className="packages__clinics liquid-glass-frost">
          <div>
            <p className="packages__clinics-kicker">Clinics and group practices</p>
            <ScrambleText as="h3" text="Multiple practitioners? We build bespoke clinic packages." />
            <p>We create bespoke packages for clinics depending on their requirements.</p>
          </div>
          <Button variant="primary">Request a clinic proposal</Button>
        </div>
      </Reveal>
      <Reveal className="shell">
        <div className="packages__compare liquid-glass-frost">
          <div><strong>Compare all inclusions</strong><small>19 inclusions across three tiers, side by side</small></div>
          <Link className="button button--primary" to="/packages/compare">Compare tiers</Link>
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

export function WhoItsForSection() {
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

export function FounderSection() {
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

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <Reveal className="faq__layout shell">
        <div className="faq__intro">
          <div className="eyebrow eyebrow--light">FAQ</div>
          <ScrambleText as="h2" id="faq-title" text={"Questions,\nanswered."} />
        </div>
        <div className="faq__surface liquid-glass-frost">
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

export function BeginSection() {
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

export function BackgroundFader({ fixedState }) {
  const [active, setActive] = useState(fixedState ?? 0);

  useEffect(() => {
    if (fixedState) return undefined;
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
  }, [fixedState]);

  return (
    <div className="background-fader" aria-hidden="true">
      {!fixedState && <ScrollBackground active={active === 0} />}
      {[1, 2, 3, 4].map((state) => <img className={`background-fader__media background-fader__media--${state}${active === state ? ' background-fader__media--active' : ''}`} key={state} src={`/assets/evae-bg-${state}.png`} alt="" />)}
    </div>
  );
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);
  return matches;
}

// A footer column: a plain heading + links on desktop, an accordion on phones.
function FooterGroup({ title, collapsible, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  const expanded = !collapsible || open;
  const id = `footer-group-${title.toLowerCase().replace(/[^a-z]+/g, '-')}`;
  return (
    <div className={`footer__col${collapsible ? ' footer__col--collapsible' : ''}${expanded ? ' footer__col--open' : ''}`}>
      {collapsible
        ? <button type="button" className="footer__col-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}><h3>{title}</h3><span className="footer__col-icon" aria-hidden="true">{open ? '−' : '+'}</span></button>
        : <h3>{title}</h3>}
      <div className="footer__col-body" id={id} inert={!expanded}><div>{children}</div></div>
    </div>
  );
}

export function Footer() {
  const { pathname } = useLocation();
  const at = (id) => (pathname === '/' ? `#${id}` : `/#${id}`);
  const year = new Date().getFullYear();
  const phone = useMediaQuery('(max-width: 720px)');
  return (
    <footer className="footer" aria-labelledby="footer-title">
      <div className="shell footer__inner">
        <div className="footer__brand">
          <Link className="wordmark" to="/" aria-label="EVAE home">EVAE</Link>
          <p id="footer-title" className="footer__tagline">Elevating the digital presence of medical professionals.</p>
          <Button variant="cta" href={at('contact')}><span>Book a discovery call</span><span className="button__icon" aria-hidden="true"><ArrowUpRight strokeWidth={2.2} /></span></Button>
        </div>
        <FooterGroup title="Explore" collapsible={phone} defaultOpen>
          <a href={at('services')}>Services</a>
          <a href={at('blueprint')}>Blueprint</a>
          <a href={at('process')}>Process</a>
          <a href={at('packages')}>Packages</a>
          <Link to="/packages/compare">Compare tiers</Link>
          <a href={at('faq')}>FAQ</a>
        </FooterGroup>
        <FooterGroup title="Case studies" collapsible={phone}>
          {caseStudies.map((study) => <Link key={study.slug} to={`/case-study/${study.slug}`}>{study.name}</Link>)}
        </FooterGroup>
        <FooterGroup title="Social" collapsible={phone}>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://tiktok.com/" target="_blank" rel="noreferrer">TikTok</a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
        </FooterGroup>
        <FooterGroup title="Contact" collapsible={phone}>
          <a href="mailto:hello@evae.co">[hello@evae.co]</a>
          <a href="https://wa.me/" target="_blank" rel="noreferrer">WhatsApp</a>
          <span className="footer__muted">Dubai, UAE</span>
        </FooterGroup>
      </div>
      <div className="shell footer__bottom">
        <span>© {year} EVAE. All rights reserved.</span>
        <span className="footer__muted">Personal branding for the modern doctor.</span>
      </div>
    </footer>
  );
}

export function Landing() {
  return (
    <div className="landing">
      <BackgroundFader />
      <Hero />
      <BlueprintSection />
      <ServicesBentoSection />
      <HowWorksSection />
      <PackagesSection />
      <WhoItsForSection />
      <FounderSection />
      <FAQSection />
      <BeginSection />
    </div>
  );
}
