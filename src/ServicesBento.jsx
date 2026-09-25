import { Clapperboard, Code, Compass, Database, Inbox, LayoutTemplate, ListChecks, MessageSquare, Mic, MonitorPlay, Palette, PenLine, Rocket, Scissors, Share2, Sparkles, Video } from 'lucide-react';
import Reveal from './Reveal';
import ScrambleText from './ScrambleText';

// Services — four outcome tiles; the nine services Hasia offers live as chips inside them.
const tiles = [
  { number: '01', title: 'Positioning & brand identity', description: 'We define the space you can own, then build the messaging and visual identity that make it recognisably yours.', span: '2x2', preview: true,
    chips: [['Positioning', Compass], ['Messaging', MessageSquare], ['Visual identity', Palette]] },
  { number: '02', title: 'Content & social', description: 'Script to published post, planned, produced and managed by one team. Over one billion views generated so far.', span: '2x1',
    chips: [['Script writing', PenLine], ['Videography', Video], ['Video editing', Scissors], ['Podcasts', Mic], ['Social media', Share2], ['Creative AI', Sparkles]] },
  { number: '03', title: 'Website & digital home', description: 'A custom-built site that carries your brand and your proof, wired to the systems that turn visitors into inquiries.', span: '1x1',
    chips: [['Design', LayoutTemplate], ['Custom build', Code], ['CRM setup', Database], ['Inquiry pathway', Inbox]] },
  { number: '04', title: 'Online course', description: 'Your expertise as a structured learning experience—offer, curriculum, production, platform and launch.', span: '1x1',
    chips: [['Curriculum', ListChecks], ['Production', Clapperboard], ['Platform', MonitorPlay], ['Launch', Rocket]] },
];

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M8 5h11v11" /></svg>;
}

export default function ServicesBentoSection() {
  return (
    <section className="services-bento" id="services" aria-labelledby="services-title">
      <Reveal className="shell services-bento__inner">
        <div className="eyebrow eyebrow--light">Services</div>
        <ScrambleText as="h2" id="services-title" text={"Everything a doctor\nneeds to be *known* online."} />
        <p className="services-bento__lede">Four things we build. Nine ways we do it. One team.</p>
      </Reveal>
      <div className="bento shell">
        {tiles.map((tile, index) => {
          return (
            <Reveal key={tile.number} delayMs={index * 50} className={`bento-tile liquid-glass-frost bento-tile--${tile.span}${tile.accent ? ' bento-tile--accent' : ''}`}>
              <span className="bento-tile__number">{tile.number}</span>
              <h3>{tile.title}</h3>
              <p>{tile.description}</p>
              {tile.chips && <div className="bento-tile__tags">{tile.chips.map(([label, ChipIcon]) => <span key={label}><ChipIcon aria-hidden="true" strokeWidth={1.8} />{label}</span>)}</div>}
              {tile.preview && (
                <div className="bento-tile__preview" aria-hidden="true">
                  <span className="preview__main" /><span className="preview__line preview__line--one" /><span className="preview__line preview__line--two" /><span className="preview__line preview__line--three" />
                </div>
              )}
              <a className="bento-tile__arrow" href="#contact" aria-label={`Talk to us about ${tile.title.toLowerCase()}`}><ArrowIcon /></a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
