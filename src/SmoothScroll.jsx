import { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';

// Lenis drives the real window scroll (no transformed wrapper), so position: sticky,
// IntersectionObserver and the scroll listeners in ScrollBackground keep working.
const options = {
  lerp: 0.1,
  smoothWheel: true,
  syncTouch: false,
  anchors: true, // honours the scroll-margin-top on sections, so anchors land clear of the fixed nav
  allowNestedScroll: true,
  stopInertiaOnNavigate: true,
  autoRaf: true,
};

// The mobile menu locks scrolling by setting body.style.overflow = 'hidden' (see Navigation).
// Watch for that and pause Lenis while it is set so the page can't glide behind the menu.
function PauseWhileLocked() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return undefined;
    const sync = () => {
      if (document.body.style.overflow === 'hidden') lenis.stop();
      else lenis.start();
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={options}>
      <PauseWhileLocked />
      {children}
    </ReactLenis>
  );
}
