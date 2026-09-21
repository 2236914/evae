import { useEffect, useRef } from 'react';

const vertexSource = `
attribute vec2 position;
varying vec2 uv;
void main() { uv = position * .5 + .5; gl_Position = vec4(position, 0., 1.); }
`;

const fragmentSource = `
precision mediump float;
varying vec2 uv;
uniform sampler2D landscape;
uniform sampler2D opening;
uniform vec2 viewport;
uniform vec2 mediaSize;
uniform vec2 pointer;
uniform float progress;
uniform float mobile;
uniform float seam;
uniform float elapsed;
uniform float breeze;
uniform float motion;
vec3 sampleScene(vec2 p) { return mix(texture2D(landscape, clamp(p, .001, .999)).rgb, texture2D(opening, clamp(p, .001, .999)).rgb, seam); }
void main() {
  float reality = smoothstep(.35, .7, progress);
  float blueprint = smoothstep(.7, 1., progress);
  float fog = reality * .24 - blueprint * .09;
  float zoom = 1. + progress * mix(.065, .025, mobile);
  vec2 cover = vec2(1.);
  float screenAspect = viewport.x / viewport.y;
  float imageAspect = mediaSize.x / mediaSize.y;
  if (screenAspect > imageAspect) cover.y = imageAspect / screenAspect;
  else cover.x = screenAspect / imageAspect;
  vec2 p = (uv - .5) * cover / zoom + .5;
  // Very small screen-space parallax, stronger in the foreground.
  p += pointer * .003 * (1. - mobile) * (.3 + .7 * (1. - uv.y));
  float blur = reality * (1. - blueprint * .45) * mix(1.7, .65, mobile);
  vec2 px = blur / mediaSize;
  vec3 color = sampleScene(p) * .4;
  color += sampleScene(p + vec2(px.x, 0.)) * .15;
  color += sampleScene(p - vec2(px.x, 0.)) * .15;
  color += sampleScene(p + vec2(0., px.y)) * .15;
  color += sampleScene(p - vec2(0., px.y)) * .15;
  float luminance = dot(color, vec3(.2126, .7152, .0722));
  color = mix(vec3(luminance), color, 1. - reality * .14 + blueprint * .05);
  color = (color - .5) * (1. - reality * .05 + blueprint * .09) + .5;
  color *= mix(vec3(1.), vec3(1.015, 1.018, .97), blueprint * .6);
  color = mix(color, vec3(.86, .88, .9), fog * (.55 + .45 * (1. - uv.y)));
  // Sparse ivory/lavender petals, rendered behind all HTML. Six on phones.
  for (int i = 0; i < 12; i++) {
    float seed = float(i);
    if (mobile > .5 && i >= 6) continue;
    float depth = fract(sin(seed * 31.7 + 2.) * 4375.);
    float t = elapsed * (.022 + depth * .016);
    vec2 center = vec2(fract(seed * .618 + t * .24), fract(seed * .381 - t));
    center.x += sin(elapsed * .32 + seed * 2.4) * .025;
    center += pointer * .017 * (1. - mobile) * (.4 + depth);
    center.y += breeze * .028 * depth;
    vec2 delta = (uv - center) * vec2(screenAspect, 1.);
    vec2 cursorDelta = (center - (pointer * .5 + .5)) * vec2(screenAspect, 1.);
    delta -= cursorDelta * exp(-dot(cursorDelta, cursorDelta) * 35.) * .25 * (1. - mobile);
    float angle = elapsed * .65 + seed * 3.;
    delta = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * delta;
    float size = .003 + depth * .0035;
    delta /= vec2(size, size * (.42 + .2 * sin(elapsed + seed)));
    float shape = 1. - smoothstep(.6, 1., length(delta));
    float edge = smoothstep(0., .06, center.y) * (1. - smoothstep(.94, 1., center.y));
    // Keep the central text area quiet.
    float quiet = mix(.3, 1., smoothstep(.18, .4, abs(uv.x - .5)));
    vec3 petalColor = mix(vec3(.8, .75, .86), vec3(.98, .94, .87), depth);
    color = mix(color, petalColor, shape * edge * quiet * .65 * motion);
  }
  gl_FragColor = vec4(color, 1.);
}
`;

// One media element: normal forward playback at the top, paused seeking on scroll.
export default function LandscapeBackground({ active }) {
  const canvasRef = useRef(null);
  const hostRef = useRef(null);
  const activeRef = useRef(active);
  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const narrow = window.matchMedia('(max-width: 700px)');
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, powerPreference: 'low-power' });
    if (!gl) return;
    let program, texture, openingTexture, buffer;
    const shaders = [];
    try {
      const compile = (type, source) => {
        const shader = gl.createShader(type);
        shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
        return shader;
      };
      program = gl.createProgram();
      gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
      gl.useProgram(program);
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      openingTexture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, openingTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([240, 241, 244]));
      gl.uniform1i(gl.getUniformLocation(program, 'opening'), 1);
      gl.activeTexture(gl.TEXTURE0);
    } catch (error) {
      console.warn('Landscape uses the still image because WebGL could not initialize.', error);
      shaders.forEach(shader => gl.deleteShader(shader));
      if (program) gl.deleteProgram(program);
      return;
    }

    const uniforms = Object.fromEntries(['viewport', 'mediaSize', 'pointer', 'progress', 'mobile', 'seam', 'elapsed', 'breeze', 'motion'].map(name => [name, gl.getUniformLocation(program, name)]));
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.loop = true;
    video.playbackRate = 1;
    const poster = new Image();
    poster.src = '/assets/evae-landscape.png';
    let disposed = false, frame = 0, lastFrame = 0, lastScroll = performance.now();
    let time = 0, smoothProgress = 0, uploadedTime = -1;
    let elapsed = 0, breeze = 0, lastY = window.scrollY, playbackMode = '', playPending = false;
    let openingReady = false, playBlocked = false;
    let pointer = [0, 0], smoothPointer = [0, 0];
    let bounds = [1, 2, 3], posterDirty = true;
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, narrow.matches ? 1 : 1.5);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      bounds = ['reality', 'blueprint', 'services'].map(id => {
        const section = document.getElementById(id);
        return section ? section.getBoundingClientRect().top + window.scrollY : 0;
      });
    };
    const onScroll = () => {
      lastScroll = performance.now();
      video.pause();
      playbackMode = 'scroll';
      time = video.currentTime;
      breeze = clamp(breeze + (window.scrollY - lastY) / 300, -1, 1);
      lastY = window.scrollY;
    };
    const onPointer = event => { pointer = [event.clientX / window.innerWidth * 2 - 1, 1 - event.clientY / window.innerHeight * 2]; };
    const clearPointer = () => { pointer = [0, 0]; };
    const loadVideo = () => {
      uploadedTime = -1;
      if (!reduced.matches && !video.getAttribute('src')) {
    video.src = '/assets/evae-landscape-8s.mp4';
        video.load();
      }
      if (reduced.matches) { video.pause(); posterDirty = true; }
    };
    const lost = event => { event.preventDefault(); host.dataset.ready = 'false'; cancelAnimationFrame(frame); };
    const upload = source => {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, source);
      gl.uniform2f(uniforms.mediaSize, source.videoWidth || source.naturalWidth, source.videoHeight || source.naturalHeight);
      host.dataset.ready = 'true';
    };
    const draw = now => {
      if (disposed) return;
      frame = requestAnimationFrame(draw);
      if (document.hidden || !activeRef.current) { video.pause(); playbackMode = ''; return; }
      if (now - lastFrame < (narrow.matches ? 1000 / 24 : 1000 / 30)) return;
      const dt = Math.min((now - lastFrame) / 1000 || .033, .1);
      lastFrame = now;
      const y = Math.max(0, window.scrollY);
      const [reality, blueprint, end] = bounds;
      const p = y < reality ? .35 * y / Math.max(1, reality)
        : y < blueprint ? .35 + .35 * (y - reality) / Math.max(1, blueprint - reality)
          : .7 + .3 * (y - blueprint) / Math.max(1, end - blueprint);
      smoothProgress += (clamp(p, 0, 1) - smoothProgress) * (1 - Math.exp(-dt * 6));
      const idle = y <= 3 && now - lastScroll > 350;
      host.dataset.mode = reduced.matches ? 'reduced-motion' : idle ? 'idle' : 'scroll';
      const duration = Number.isFinite(video.duration) ? Math.max(0, video.duration - .06) : 0;
      if (idle && !reduced.matches) {
        playbackMode = 'idle';
        if (video.paused && !playPending && !playBlocked && video.readyState >= 2) {
          playPending = true;
          video.play().then(() => {
            if (playbackMode !== 'idle' || reduced.matches || !activeRef.current) video.pause();
          }).catch(() => { playBlocked = true; }).finally(() => { playPending = false; });
        }
        time = video.currentTime;
      } else {
        video.pause();
        playbackMode = 'scroll';
        time += (smoothProgress * duration - time) * (1 - Math.exp(-dt * 9));
      }
      if (!openingReady && poster.complete && poster.naturalWidth) {
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, openingTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, poster);
        gl.activeTexture(gl.TEXTURE0);
        openingReady = true;
      }
      try {
        if (!reduced.matches && video.readyState >= 2 && !video.seeking) {
          if (uploadedTime !== video.currentTime) { upload(video); uploadedTime = video.currentTime; }
        } else if (posterDirty && poster.complete && poster.naturalWidth) {
          upload(poster); posterDirty = false;
        }
      } catch { host.dataset.ready = 'false'; }
      // Upload the completed seek before requesting another, so continuous
      // scrolling cannot starve the texture of decoded frames.
      if (!idle && !reduced.matches && duration && video.readyState >= 2 && !video.seeking && Math.abs(video.currentTime - time) > .022) video.currentTime = time;
      if (!reduced.matches) elapsed += dt * (1 + Math.abs(breeze) * .8);
      breeze *= Math.exp(-dt * 3);
      smoothPointer = smoothPointer.map((v, i) => v + (pointer[i] - v) * .06);
      gl.uniform2f(uniforms.viewport, canvas.width, canvas.height);
      gl.uniform2f(uniforms.pointer, reduced.matches ? 0 : smoothPointer[0], reduced.matches ? 0 : smoothPointer[1]);
      gl.uniform1f(uniforms.progress, reduced.matches ? 0 : smoothProgress);
      gl.uniform1f(uniforms.mobile, narrow.matches ? 1 : 0);
      gl.uniform1f(uniforms.seam, idle && openingReady && !reduced.matches ? clamp((video.currentTime - (duration - .3)) / .3, 0, 1) : 0);
      gl.uniform1f(uniforms.elapsed, elapsed);
      gl.uniform1f(uniforms.breeze, breeze);
      gl.uniform1f(uniforms.motion, reduced.matches ? 0 : 1);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (import.meta.env.DEV) {
        host.dataset.videoTime = video.currentTime.toFixed(2);
        host.dataset.videoDuration = String(video.duration);
        host.dataset.videoPaused = String(video.paused);
      }
    };
    const observer = new ResizeObserver(resize);
    observer.observe(document.querySelector('.landing'));
    resize(); loadVideo();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.documentElement.addEventListener('pointerleave', clearPointer);
    reduced.addEventListener('change', loadVideo);
    canvas.addEventListener('webglcontextlost', lost);
    frame = requestAnimationFrame(draw);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointer);
      document.documentElement.removeEventListener('pointerleave', clearPointer);
      reduced.removeEventListener('change', loadVideo);
      canvas.removeEventListener('webglcontextlost', lost);
      video.pause(); video.removeAttribute('src'); video.load();
      gl.deleteTexture(texture); gl.deleteTexture(openingTexture); gl.deleteBuffer(buffer);
      shaders.forEach(shader => gl.deleteShader(shader)); gl.deleteProgram(program);
    };
  }, []);

  return <div ref={hostRef} className={`landscape-background${active ? ' landscape-background--active' : ''}`} aria-hidden="true">
    <img src="/assets/evae-landscape.png" alt="" />
    <canvas ref={canvasRef} />
  </div>;
}
