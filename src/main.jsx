import { StrictMode, useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import './style.css';
import SmoothScroll from './SmoothScroll';
import { Footer, Landing, Navigation } from './sections';
import CaseStudyPage from './pages/CaseStudy';
import ComparePage from './pages/Compare';

// New route → start at the top. A hash on a new route (e.g. /#blueprint from a sub-page) lands on
// that section. This runs as a layout effect: the new page is in the DOM but not yet painted, so the
// jump is applied before the first frame (no flash of the top, no reliance on rAF timing while the
// landing page's videos and blur layers are still decoding). In-page anchor clicks are handled by Lenis.
function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const lenis = useLenis();
  useLayoutEffect(() => {
    const jump = (y) => {
      if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
      else window.scrollTo(0, y);
    };
    if (!hash) { jump(0); return; }
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    jump(target.getBoundingClientRect().top + window.scrollY - 96);
  }, [pathname, hash, key, lenis]);
  return null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SmoothScroll>
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/case-study/:slug" element={<CaseStudyPage />} />
          <Route path="/packages/compare" element={<ComparePage />} />
          <Route path="*" element={<Landing />} />
        </Routes>
        <Footer />
      </SmoothScroll>
    </BrowserRouter>
  </StrictMode>
);
