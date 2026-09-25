import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { aed, packages } from '../data';
import { ArrowIcon, BackgroundFader, BeginSection, Button, CompareTable } from '../sections';
import Reveal from '../Reveal';
import ScrambleText from '../ScrambleText';

export default function ComparePage() {
  return (
    <div className="landing page">
      <BackgroundFader fixedState={2} />
      <section className="compare-page" aria-labelledby="compare-title">
        <Reveal className="shell compare-page__header">
          <Link className="page__back" to="/#packages"><ArrowIcon /> Back to packages</Link>
          <div className="eyebrow eyebrow--light">3-month programme</div>
          <ScrambleText as="h1" id="compare-title" text={"*Every* inclusion,\nside by side."} />
          <p className="packages__lede">Nineteen inclusions across three tiers. Every tier includes private 1:1 time with Dr Hasia.</p>
        </Reveal>
        <Reveal className="shell compare-page__tiers" delayMs={60}>
          {packages.map((tier) => (
            <div className={`compare-tier liquid-glass-frost${tier.featured ? ' compare-tier--featured' : ''}`} key={tier.id}>
              {tier.badge && <span className="package-card__badge">{tier.badge}</span>}
              <h2>{tier.name}</h2>
              <p className="package-card__price"><span className="package-card__currency">AED</span><span className="package-card__amount">{tier.price.toLocaleString('en-GB')}</span><span className="package-card__per">/ month</span><span className="package-card__total">{aed(tier.total)} for the 3-month programme</span></p>
              <Button variant="cta"><span>{tier.cta}</span><span className="button__icon" aria-hidden="true"><ArrowUpRight strokeWidth={2.2} /></span></Button>
            </div>
          ))}
        </Reveal>
        <Reveal className="shell" delayMs={100}>
          <div className="compare-page__table liquid-glass-frost"><CompareTable /></div>
          <p className="packages__note">All tiers are a 3-month minimum programme, billed monthly in AED. Every tier includes private 1:1 time with Dr Hasia.</p>
        </Reveal>
      </section>
      <BeginSection />
    </div>
  );
}
