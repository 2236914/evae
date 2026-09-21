import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import LandscapeBackground from './LandscapeBackground';

const trustedBrands = [
  { name: 'Doctor Hasia', src: '/assets/doctorhasia.svg' },
  { name: 'Doctors Dose', src: '/assets/doctorsdose.svg' },
  { name: 'Doctor Hasia Bespoke', src: '/assets/bespoke.svg' },
  { name: 'Doctor Hasia Academy', src: '/assets/academy.svg' },
];

function Button({ children, href = '#contact', variant = 'primary' }) {
  return <a className={`button button--${variant}`} href={href}>{children}</a>;
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    <header className={`nav shell${scrolled ? ' nav--scrolled' : ''}${menuOpen ? ' nav--menu-open' : ''}`}>
      <a className="wordmark" href="/" aria-label="EVAE home">EVAE</a>
      <nav className="nav__links" aria-label="Primary navigation">
        <a href="#services">Services</a>
        <a href="#blueprint">Blueprint</a>
        <a href="#process">Process</a>
        <a href="#faq">FAQ</a>
      </nav>
      <Button variant="nav">Book a call</Button>
      <button className="nav__menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
      <nav id="mobile-navigation" className="nav__mobile" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        <div className="nav__mobile-links">
          <a href="#services" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>Services</a>
          <a href="#blueprint" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>Blueprint</a>
          <a href="#process" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>Process</a>
          <a href="#faq" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>FAQ</a>
        </div>
        <a className="button button--mobile" href="#contact" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>book a call</a>
      </nav>
    </header>
  );
}

function HeroContent() {
  return (
    <section className="hero__content shell">
      <h1 id="hero-title">Personal branding,<br />for the modern doctor.</h1>
      <p className="hero__lede">
        One team, one point of contact—for positioning, identity, content, social,
        <br className="desktop-break" /> and a custom website. Built for doctors who want to be known for more
        <br className="desktop-break" /> than their credentials.
      </p>
      <Button>Book a discovery call</Button>
    </section>
  );
}

function BrandFooter() {
  return (
    <footer className="hero__footer shell">
      <div className="footer__label">
        <span className="footer__portrait" aria-hidden="true"><img src="/assets/dr-hasia.jpg" alt="" /></span>
        <span className="footer__label-copy">
          <span>Built on the</span>
          <span>Dr. Hasia blueprint</span>
        </span>
      </div>
      <div className="brand-row" aria-label="Trusted brands">
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
    <main className="hero" aria-labelledby="hero-title">
      <div className="hero__ambient hero__ambient--one" />
      <div className="hero__ambient hero__ambient--two" />
      <div className="hero__ambient hero__ambient--three" />
      <div className="hero__ambient hero__ambient--four" />
      <div className="hero__grain" />
      <HeroContent />
      <BrandFooter />
    </main>
  );
}

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3" /><path d="m16 16 4.5 4.5" /></svg>;
}

function CalendarIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5.5" width="16" height="14" rx="2" /><path d="M8 3.8v3.5M16 3.8v3.5M4 9.5h16" /></svg>;
}

function OpportunityIcon({ type }) {
  if (type === 'panel') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="4" width="14" height="16" rx="2" /><path d="M9 20v-5h6v5M8.5 8h1M14.5 8h1M8.5 11h1M14.5 11h1" /></svg>;
  if (type === 'referral') return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3" /><path d="M6.5 19c.6-3 2.3-4.5 5.5-4.5s4.9 1.5 5.5 4.5M4 12.5c1.8-.1 3 .4 3.8 1.5M20 12.5c-1.8-.1-3 .4-3.8 1.5" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="3" /><path d="M5.5 20c.6-3.3 2.8-5 6.5-5s5.9 1.7 6.5 5" /></svg>;
}

function ProfileCard() {
  return (
    <div className="profile-card">
      <div className="profile-card__top">
        <div className="profile-card__avatar" />
        <div className="profile-card__copy">
          <span className="profile-card__role">Dermatologist</span>
          <i /><i /><i className="profile-card__line--short" />
        </div>
      </div>
      <div className="profile-card__bottom">
        <span><b className="mini-icon">⌁</b> Board certified</span>
        <span><b className="mini-icon">▤</b> Publications</span>
        <span><b className="mini-icon">♧</b> Speaker</span>
      </div>
    </div>
  );
}

function RealitySection() {
  const opportunities = [
    ['referral', 'Referrals'],
    ['panel', 'Panels'],
    ['client', 'Private clients'],
  ];

  return (
    <section className="reality" id="reality" aria-labelledby="reality-title">
      <div className="reality__ambient reality__ambient--one" />
      <div className="reality__ambient reality__ambient--two" />
      <div className="shell reality__inner">
      <div className="eyebrow">02 The reality</div>
        <h2 id="reality-title">Being a great doctor<br />isn’t enough anymore.</h2>
        <p className="reality__lede">Patients search before they book. Colleagues, hospitals and media look you up<br className="desktop-break" /> before they call. Evae builds the presence your expertise already deserves—<br className="desktop-break" /> without you learning to be a content creator.</p>

        <div className="reality__cards">
          <article className="glass-card search-card">
            <h3>Before they call, they search.</h3>
            <p>Your digital presence is already part of the decision.</p>
            <div className="search-flow" aria-label="Search to booking flow illustration">
              <div className="search-pill"><SearchIcon /><span>best dermatologist near me</span></div>
              <div className="flow-line flow-line--search" />
              <ProfileCard />
              <div className="flow-line flow-line--book" />
              <div className="book-pill"><CalendarIcon /><span>Book</span></div>
            </div>
          </article>

          <article className="glass-card opportunity-card">
            <h3>Visibility creates<br />opportunity.</h3>
            <div className="opportunity-flow" aria-label="Visibility opportunity illustration">
              <div className="opportunity-orbit opportunity-orbit--one" />
              <div className="opportunity-orbit opportunity-orbit--two" />
              {opportunities.map(([type, label]) => <div className={`opportunity-pill opportunity-pill--${type}`} key={label}><span className="opportunity-icon"><OpportunityIcon type={type} /></span><span>{label}</span></div>)}
              <span className="orbit-dot orbit-dot--one" /><span className="orbit-dot orbit-dot--two" />
            </div>
          </article>
        </div>
      </div>
    </section>
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
      <div className="services__fade" />
      <div className="shell services__inner">
      <div className="eyebrow eyebrow--light">03 Services</div>
        <h2 id="services-title">Everything a doctor<br />needs to be known online.</h2>
        <p className="services__prompt">Hover to explore</p>
      </div>
      <div className="services__list">
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
              <h3>{service.title}</h3>
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
      </div>
    </section>
  );
}

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
      <div className="shell blueprint__header">
        <div className="eyebrow eyebrow--light">04 The blueprint at work</div>
        <p className="blueprint__kicker">Our proof of method</p>
        <h2 id="blueprint-title">Everything we do,<br />we’ve done for ourselves first.</h2>
        <p className="blueprint__lede"><strong>Four brands. Four distinct audiences. One proven approach.</strong><br />The Doctor Hasia ecosystem shows how clear positioning, a consistent identity and the right content system can build authority across different areas of medicine.</p>
      </div>
      <div className="blueprint__stack shell">
        {brands.map((brand, index) => (
          <article className="blueprint-card" key={brand.name} style={{ '--card-index': index }}>
            <div className="blueprint-card__image"><img src="/assets/blueprint-placeholder.webp" alt="" /></div>
            <div className="blueprint-card__info">
              <span className="blueprint-card__number">{brand.number}</span>
              <h3>{brand.name}</h3>
              <p className="blueprint-card__description">{brand.description}</p>
              <div className="blueprint-card__rule" />
              <div className="blueprint-card__metrics"><span><b>Followers</b>{brand.followers}</span><span><b>Reach</b>{brand.reach}</span></div>
              <div className="blueprint-card__footer"><div className="blueprint-card__chips">{brand.channels.map((channel) => <span key={channel}>{channel}</span>)}</div><a href="#contact">Explore the full case study <ArrowIcon /></a></div>
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

function HowWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const active = processSteps[activeStep];

  return (
    <section className="process" id="process" aria-labelledby="process-title">
      <div className="process__layout shell">
        <div className="process__intro">
          <div className="eyebrow eyebrow--light">05 How it works</div>
          <h2 id="process-title">A clear process,<br />built around you.</h2>
          <p>From the first conversation to ongoing growth, every stage is managed by one team.</p>
          <div className="process__visual">
            <img src="/assets/blueprint-placeholder.webp" alt="" />
            <div className="process__visual-caption"><span>{active.number}</span><strong>{active.title}</strong><small>{active.visual}</small></div>
          </div>
        </div>
        <div className="process__steps">
          {processSteps.map((step, index) => (
            <button className={`process-step${activeStep === index ? ' process-step--active' : ''}`} key={step.number} type="button" aria-expanded={activeStep === index} onMouseEnter={() => setActiveStep(index)} onFocus={() => setActiveStep(index)} onClick={() => setActiveStep(index)}>
              <span className="process-step__top"><span className="process-step__number">{step.number}</span><span className="process-step__title">{step.title}</span><span className="process-step__icon">{activeStep === index ? '−' : '+'}</span></span>
              <span className="process-step__content"><strong>{step.summary}</strong><span>{step.body}</span></span>
            </button>
          ))}
        </div>
      </div>
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
        <div className="eyebrow eyebrow--light">06 Who it’s for</div>
        <p className="fit__kicker">Is EVAE right for you?</p>
        <h2 id="fit-title">EVAE is for doctors<br />who are ready to be visible.</h2>
        <div className="fit__grid">
          {fitStatements.map((statement, index) => <article className="fit-item" key={statement}><span>{String(index + 1).padStart(2, '0')}</span><p>{statement}</p></article>)}
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
        <div className="founder__portrait"><img src="/assets/blueprint-placeholder.webp" alt="Doctor Hasia, founder of EVAE" /></div>
        <div className="founder__copy">
          <div className="eyebrow eyebrow--light">07 From the founder</div>
          <h2 id="founder-title">The blueprint was built<br />from experience.</h2>
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
      <div className="faq__layout shell">
        <div className="faq__intro">
          <div className="eyebrow eyebrow--light">08 FAQ</div>
          <h2 id="faq-title">Questions,<br />answered.</h2>
        </div>
        <div className="faq__surface">
          {faqItems.map(([question, answer], index) => (
            <div className={`faq-item${openIndex === index ? ' faq-item--open' : ''}`} key={question}>
              <button type="button" aria-expanded={openIndex === index} onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
                <span className="faq-item__number">{String(index + 1).padStart(2, '0')}</span><span className="faq-item__question">{question}</span><span className="faq-item__icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              <div className="faq-item__answer"><p>{answer}</p></div>
            </div>
          ))}
        </div>
      </div>
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
      <div className="begin__inner shell">
        <div className="eyebrow eyebrow--light">09 Begin</div>
        <p className="begin__kicker">Your expertise is already there</p>
        <h2 id="begin-title">Ready to be known<br />for more than your credentials?</h2>
        <p className="begin__lede">Build a digital presence that reflects the quality of your work—and makes it easier for the right people to find you.</p>
        <div className="begin__actions">
          <Button href="#contact" variant="primary">Book a discovery call</Button>
          <a className="button button--whatsapp" href="https://wa.me/" target="_blank" rel="noreferrer"><WhatsAppIcon />Message on WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

function BackgroundFader() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sectionOrder = [
      ['services', 5, 0], ['process', 4, 0],
      ['who-its-for', 5, .45], ['founder', 5, .45], ['faq', 2, 0], ['contact', 4, 0],
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
      <LandscapeBackground active={active === 0} />
      <div className={`background-fader__media background-fader__white${active === 5 ? ' background-fader__media--active' : ''}`} />
      {[1, 2, 3, 4].map((state) => <img className={`background-fader__media${active === state ? ' background-fader__media--active' : ''}`} key={state} src={`/assets/evae-bg-${state}.png`} alt="" />)}
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <Navigation />
      <div className="landing">
      <BackgroundFader />
      <Hero />
      <RealitySection />
      <BlueprintSection />
      <ServicesSection />
      <HowWorksSection />
      <WhoItsForSection />
      <FounderSection />
      <FAQSection />
      <BeginSection />
      </div>
    </>
  </StrictMode>
);
