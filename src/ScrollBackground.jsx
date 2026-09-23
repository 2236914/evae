import { useEffect, useRef } from 'react';

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothstep = value => value * value * (3 - 2 * value);
const mix = (from, to, amount) => from + (to - from) * amount;
const remap = (value, start, end) => clamp((value - start) / Math.max(.001, end - start));

const IDLE_SEGMENT = { start: 1, end: 4 };
const WHITEOUT_SEGMENT = { start: 1, end: 5 };

export default function ScrollBackground({ active }) {
  const hostRef = useRef(null);
  const sceneRef = useRef(null);
  const mediaRef = useRef(null);
  const scrimRef = useRef(null);
  const whiteRef = useRef(null);
  const idleRef = useRef(null);
  const whiteoutRef = useRef(null);
  const activeRef = useRef(active);

  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const host = hostRef.current;
    const scene = sceneRef.current;
    const media = mediaRef.current;
    const scrim = scrimRef.current;
    const white = whiteRef.current;
    const idle = idleRef.current;
    const whiteout = whiteoutRef.current;
    if (!host || !scene || !media || !scrim || !white || !idle || !whiteout) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 700px)');
    const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sections = ['hero', 'blueprint', 'services']
      .map(id => document.getElementById(id))
      .filter(Boolean);

    let disposed = false;
    let frame = 0;
    let targetProgress = 0;
    let easedProgress = 0;
    let activeClip = '1';
    let lastScrollY = window.scrollY;
    let lastScrollAt = performance.now() - 500;
    let clip3Loaded = false;
    let playPending = false;
    let pointerTarget = [0, 0];
    let pointerCurrent = [0, 0];
    let metrics = { start: 0, end: 1, blueprint: .5 };

    const updateMetrics = () => {
      const [hero, blueprint, services] = sections;
      if (!hero || !blueprint || !services) return;
      const pageTop = element => element.getBoundingClientRect().top + window.scrollY;
      const start = pageTop(hero);
      const end = Math.max(start + 1, pageTop(services));
      const span = end - start;
      metrics = { start, end, blueprint: clamp((pageTop(blueprint) - start) / span) };
      targetProgress = clamp((window.scrollY - start) / span);
      host.style.setProperty('--blueprint-start', metrics.blueprint.toFixed(4));
    };

    const loadClip3 = () => {
      if (clip3Loaded || reducedMotion.matches) return;
      clip3Loaded = true;
      whiteout.src = whiteout.dataset.src;
      whiteout.load();
    };

    const seekTime = (video, time) => {
      if (video.readyState < 1 || !Number.isFinite(video.duration) || video.seeking) return;
      const nextTime = clamp(time, 0, Math.max(0, video.duration - 1 / 30));
      if (Math.abs(video.currentTime - nextTime) > 1 / 60) video.currentTime = nextTime;
    };

    const seekSegment = (video, segment, progress) => {
      seekTime(video, mix(segment.start, segment.end, clamp(progress)));
    };

    const setActiveClip = nextClip => {
      if (activeClip === nextClip) return;
      activeClip = nextClip;
      host.dataset.activeClip = nextClip;
    };

    const pauseIdle = () => {
      if (!idle.paused) idle.pause();
    };

    const playIdle = () => {
      if (!idle.paused || playPending || reducedMotion.matches || !activeRef.current) return;
      if (idle.currentTime < IDLE_SEGMENT.start || idle.currentTime >= IDLE_SEGMENT.end) {
        seekTime(idle, IDLE_SEGMENT.start);
      }
      playPending = true;
      idle.play().catch(() => {}).finally(() => { playPending = false; });
    };

    const enforceIdleLoop = () => {
      if (idle.currentTime >= IDLE_SEGMENT.end || idle.currentTime < IDLE_SEGMENT.start - .05) {
        seekTime(idle, IDLE_SEGMENT.start);
      }
    };

    const updateScrollTarget = () => {
      const nextY = window.scrollY;
      if (Math.abs(nextY - lastScrollY) > .5) lastScrollAt = performance.now();
      lastScrollY = nextY;
      targetProgress = clamp((nextY - metrics.start) / Math.max(1, metrics.end - metrics.start));
      if (targetProgress > Math.max(0, metrics.blueprint - .1)) loadClip3();
    };

    const updatePointer = event => {
      if (!precisePointer.matches || reducedMotion.matches) return;
      pointerTarget = [
        -((event.clientX / window.innerWidth) * 2 - 1) * 12,
        -((event.clientY / window.innerHeight) * 2 - 1) * 12,
      ];
    };

    const resetPointer = () => { pointerTarget = [0, 0]; };

    const applyGrade = progress => {
      let blur = 0;
      let saturation = 1;
      let contrast = 1;
      let brightness = 1;
      let scrimColor = [75, 87, 110];
      let scrimAlpha = 0;

      if (progress >= metrics.blueprint) {
        const amount = smoothstep(clamp((progress - metrics.blueprint) / Math.max(.001, 1 - metrics.blueprint)));
        blur = mix(0, 1.5, amount);
        saturation = mix(1, .92, amount);
        contrast = mix(1, 1.05, amount);
        scrimColor = [
          Math.round(mix(75, 132, amount)),
          Math.round(mix(87, 113, amount)),
          Math.round(mix(110, 99, amount)),
        ];
        scrimAlpha = mix(0, .12, amount);
      }

      const blurScale = mobile.matches ? .5 : 1;
      media.style.filter = `blur(${(blur * blurScale).toFixed(2)}px) saturate(${saturation.toFixed(3)}) contrast(${contrast.toFixed(3)}) brightness(${brightness.toFixed(3)})`;
      scrim.style.backgroundColor = `rgba(${scrimColor.join(',')},${scrimAlpha.toFixed(3)})`;
    };

    const draw = now => {
      if (disposed) return;
      frame = requestAnimationFrame(draw);

      if (reducedMotion.matches) {
        pauseIdle();
        whiteout.pause();
        host.dataset.reducedMotion = 'true';
        host.dataset.activeClip = 'poster';
        media.style.filter = 'none';
        scrim.style.backgroundColor = 'transparent';
        white.style.opacity = '0';
        scene.style.transform = 'translate3d(0,0,0)';
        return;
      }

      host.dataset.reducedMotion = 'false';
      easedProgress += (targetProgress - easedProgress) * .075;
      if (Math.abs(targetProgress - easedProgress) < .0001) easedProgress = targetProgress;

      const atRestAtTop = activeRef.current && targetProgress <= .0005 && now - lastScrollAt >= 400;
      if (atRestAtTop) {
        setActiveClip('1');
        enforceIdleLoop();
        playIdle();
      } else if (easedProgress < metrics.blueprint) {
        // Hero: keep the idle loop running while the page scrolls toward Blueprint.
        setActiveClip('1');
        enforceIdleLoop();
        playIdle();
      } else {
        pauseIdle();
        loadClip3();
        setActiveClip('3');
        // Blueprint cards through Services: clip 3 from 00:01 to 00:05.
        seekSegment(whiteout, WHITEOUT_SEGMENT, remap(easedProgress, metrics.blueprint, 1));
      }

      applyGrade(easedProgress);
      white.style.opacity = String(clamp((easedProgress - .88) / .12));

      if (!precisePointer.matches) pointerTarget = [0, 0];
      pointerCurrent = pointerCurrent.map((value, index) => value + (pointerTarget[index] - value) * .05);
      scene.style.transform = `translate3d(${pointerCurrent[0].toFixed(2)}px, ${pointerCurrent[1].toFixed(2)}px, 0)`;

      if (import.meta.env.DEV) {
        host.dataset.progress = easedProgress.toFixed(4);
        host.dataset.targetProgress = targetProgress.toFixed(4);
        host.dataset.clip3Time = whiteout.currentTime.toFixed(2);
        host.dataset.timelineSegment = easedProgress < metrics.blueprint ? 'idle-1-4' : 'whiteout-1-5';
      }
    };

    const handlePreferenceChange = () => {
      pauseIdle();
      whiteout.pause();
      if (!mobile.matches) loadClip3();
    };

    const observer = new ResizeObserver(() => {
      updateMetrics();
      updateScrollTarget();
    });
    sections.forEach(section => observer.observe(section));
    updateMetrics();
    updateScrollTarget();
    if (!mobile.matches) loadClip3();
    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    window.addEventListener('resize', updateMetrics);
    window.addEventListener('pointermove', updatePointer, { passive: true });
    document.documentElement.addEventListener('pointerleave', resetPointer);
    reducedMotion.addEventListener('change', handlePreferenceChange);
    mobile.addEventListener('change', handlePreferenceChange);
    precisePointer.addEventListener('change', resetPointer);
    idle.addEventListener('timeupdate', enforceIdleLoop);
    idle.addEventListener('loadedmetadata', enforceIdleLoop);
    frame = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', updateScrollTarget);
      window.removeEventListener('resize', updateMetrics);
      window.removeEventListener('pointermove', updatePointer);
      document.documentElement.removeEventListener('pointerleave', resetPointer);
      reducedMotion.removeEventListener('change', handlePreferenceChange);
      mobile.removeEventListener('change', handlePreferenceChange);
      precisePointer.removeEventListener('change', resetPointer);
      idle.removeEventListener('timeupdate', enforceIdleLoop);
      idle.removeEventListener('loadedmetadata', enforceIdleLoop);
      [idle, whiteout].forEach(video => video.pause());
    };
  }, []);

  return (
    <div ref={hostRef} className={`scroll-background${active ? ' scroll-background--active' : ''}`} data-active-clip="1" aria-hidden="true">
      <div ref={sceneRef} className="scroll-background__scene">
        <div ref={mediaRef} className="scroll-background__media">
          <img className="scroll-background__poster" src="/hero/poster.jpg" alt="" />
          <video ref={idleRef} className="scroll-background__video scroll-background__video--idle" src="/hero/clip1.mp4" poster="/hero/poster.jpg" muted playsInline preload="auto" />
          <video ref={whiteoutRef} className="scroll-background__video scroll-background__video--whiteout" data-src="/hero/clip3-whiteout.mp4" poster="/hero/poster.jpg" muted playsInline preload="auto" />
        </div>
        <div ref={scrimRef} className="scroll-background__scrim" />
      </div>
      <div ref={whiteRef} className="scroll-background__white" />
    </div>
  );
}
