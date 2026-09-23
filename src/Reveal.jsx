import { useEffect, useRef, useState } from 'react';

export default function Reveal({
  children,
  className = '',
  delayMs = 0,
  rootRef,
  eager = false,
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(eager);

  useEffect(() => {
    if (eager) {
      setShown(true);
      return undefined;
    }

    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      rootRef?.current
        ? { root: rootRef.current, threshold: .05, rootMargin: '0px' }
        : { threshold: .12, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [eager, rootRef]);

  return (
    <div
      ref={ref}
      className={`reveal${shown ? ' in' : ''}${className ? ` ${className}` : ''}`}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
