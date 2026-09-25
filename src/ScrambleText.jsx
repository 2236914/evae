import { useEffect, useRef } from 'react';

// Pointer-proximity scramble, no dependencies. Each character keeps its real glyph in the
// layout and a second glyph is stacked on top for the scramble, so word widths never jitter.
// Line breaks: pass "\n" inside `text`.
const REDUCED = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function ScrambleText({
  text,
  as: Tag = 'span',
  radius = 56,
  duration = 0.45,
  speed = 0.85,
  scrambleChars = 'abcdefghijklmnopqrstuvwxyz',
  className = '',
  breakClassName,
  ...rest
}) {
  const rootRef = useRef(null);
  const activeRef = useRef(new Map());
  const frameRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || REDUCED) return undefined;

    const chars = Array.from(root.querySelectorAll('.scramble__char'));
    const swapEvery = 16 + (1 - speed) * 90; // ms between glyph swaps (0.85 → ~30ms)
    const active = activeRef.current;

    const tick = (now) => {
      active.forEach((state, el) => {
        if (now >= state.end) {
          el.classList.remove('is-scrambling');
          el.lastChild.textContent = '';
          active.delete(el);
          return;
        }
        if (now >= state.next) {
          const pick = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          el.lastChild.textContent = state.upper ? pick.toUpperCase() : pick.toLowerCase();
          state.next = now + swapEvery;
        }
      });
      frameRef.current = active.size ? requestAnimationFrame(tick) : 0;
    };

    let pending = null;
    const handleMove = (e) => {
      pending = { x: e.clientX, y: e.clientY };
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame((now) => {
        const { x, y } = pending;
        chars.forEach((el) => {
          const { left, top, width, height } = el.getBoundingClientRect();
          const dist = Math.hypot(x - (left + width / 2), y - (top + height / 2));
          if (dist >= radius) return;
          const ch = el.firstChild.textContent;
          if (ch.toLowerCase() === ch.toUpperCase()) return; // punctuation stays put
          const length = duration * 1000 * (1 - dist / radius);
          const state = active.get(el);
          const end = now + length;
          if (state) { state.end = Math.max(state.end, end); return; }
          el.classList.add('is-scrambling');
          active.set(el, { end, next: now, upper: ch === ch.toUpperCase() });
        });
        frameRef.current = 0;
        tick(now);
      });
    };

    root.addEventListener('pointermove', handleMove);
    return () => {
      root.removeEventListener('pointermove', handleMove);
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      active.forEach((_, el) => { el.classList.remove('is-scrambling'); el.lastChild.textContent = ''; });
      active.clear();
    };
  }, [radius, duration, speed, scrambleChars, text]);

  const lines = String(text).split('\n');
  let charIndex = 0; // running index across all lines, exposed as --i for staggered load animations

  return (
    <Tag ref={rootRef} className={`scramble${className ? ` ${className}` : ''}`} aria-label={lines.join(' ')} {...rest}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} aria-hidden="true">
          {lineIndex > 0 && <br className={breakClassName} />}
          {line.split(' ').map((word, wordIndex) => (
            <span key={wordIndex}>
              {wordIndex > 0 && ' '}
              <span className="scramble__word">
                {Array.from(word).map((ch, i) => (
                  <span className="scramble__char" key={i} style={{ '--i': charIndex++ }}><span>{ch}</span><span /></span>
                ))}
              </span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
