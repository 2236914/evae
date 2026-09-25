import { Link, Navigate, useParams } from 'react-router-dom';
import { AtSign, Globe2 } from 'lucide-react';
import { caseStudies } from '../data';
import { ArrowIcon, BackgroundFader, BeginSection, BrandMark } from '../sections';
import Reveal from '../Reveal';
import ScrambleText from '../ScrambleText';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const index = caseStudies.findIndex((c) => c.slug === slug);
  if (index === -1) return <Navigate to="/" replace />;
  const study = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <div className="landing page" key={study.slug}>
      <BackgroundFader fixedState={2} />
      <article className="case" aria-labelledby="case-title">
        <Reveal className="shell case__hero">
          <div className="case__hero-copy">
            <Link className="page__back" to="/#blueprint"><ArrowIcon /> All case studies</Link>
            <div className="eyebrow eyebrow--light">Case study · {study.number}</div>
            <ScrambleText as="h1" id="case-title" text={study.name} />
            <p className="case__lede">{study.description} {study.summary}</p>
            <div className="case__chips">
              {study.site && <a href={study.site} target="_blank" rel="noreferrer"><Globe2 aria-hidden="true" strokeWidth={1.7} />Website</a>}
              {study.instagram && <a href={study.instagram} target="_blank" rel="noreferrer"><AtSign aria-hidden="true" strokeWidth={1.7} />{study.handle}</a>}
            </div>
          </div>
          <div className="case__mark blueprint-card__image liquid-glass-strong"><BrandMark brand={study} /></div>
        </Reveal>

        <Reveal className="shell case__metrics liquid-glass-frost" delayMs={80}>
          <div><b>Followers</b><span>{study.followers}</span></div>
          <div><b>Monthly reach</b><span>{study.reach}</span></div>
          <div><b>Niche</b><span className="case__metric-text">{study.niche}</span></div>
          <div><b>Proof</b><span className="case__metric-text">{study.proof}</span></div>
        </Reveal>

        <div className="shell case__body">
          <Reveal className="case__section">
            <p className="case__kicker">What we built</p>
            <h2>One playbook, applied to this brand.</h2>
            <div className="bento-tile__tags case__built">{study.built.map((item) => <span key={item}>{item}</span>)}</div>
          </Reveal>

          <Reveal className="case__section" delayMs={60}>
            <p className="case__kicker">Approach</p>
            <h2>Position, build, grow.</h2>
            <ol className="case__steps">
              {study.approach.map(([title, body], i) => (
                <li className="liquid-glass-frost" key={title}><span>{String(i + 1).padStart(2, '0')}</span><strong>{title}</strong><p>{body}</p></li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="case__section" delayMs={60}>
            <p className="case__kicker">Results</p>
            <h2>What changed.</h2>
            <ul className="case__results">
              {study.results.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="case__note">Figures in brackets are placeholders until the per-brand numbers are confirmed.</p>
          </Reveal>

          <Reveal className="case__section" delayMs={60}>
            <p className="case__kicker">In the wild</p>
            <h2>Selected work.</h2>
            <div className="case__gallery" aria-label="Selected work (placeholders)">
              {['Identity', 'Website', 'Content'].map((label) => (
                <figure className="liquid-glass-frost" key={label}><span className="preview__main" /><span className="preview__line preview__line--one" /><span className="preview__line preview__line--two" /><figcaption>{label} · [asset]</figcaption></figure>
              ))}
            </div>
          </Reveal>

          <Reveal className="case__next liquid-glass-frost" delayMs={60}>
            <div><p className="case__kicker">Next case study</p><strong>{next.name}</strong><span>{next.description}</span></div>
            <Link className="button button--primary" to={`/case-study/${next.slug}`}>Read {next.name}</Link>
          </Reveal>
        </div>
      </article>
      <BeginSection />
    </div>
  );
}
