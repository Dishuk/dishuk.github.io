<template>
  <canvas v-show="supported" ref="canvas" class="eclipse-canvas" aria-hidden="true" />
  <div v-if="!supported" class="eclipse-fallback" aria-hidden="true" />
  <p v-if="supported" class="eclipse-hint t-label" :class="{ gone: hintGone }" aria-hidden="true">
    The light follows your cursor · scroll to eclipse
  </p>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { SCENE, fragmentShader, vertexShader } from './shaders';

const props = withDefaults(defineProps<{ textSelector?: string }>(), { textSelector: '' });

const canvas = ref<HTMLCanvasElement | null>(null);
const supported = ref(true);
const hintGone = ref(false);

const UNIFORMS = ['uRes', 'uL', 'uCam', 'uC', 'uR', 'uDim', 'uCorona', 'uCell', 'uTime', 'uTextX', 'uVoyager'] as const;

type UniformName = typeof UNIFORMS[number];
type Motion = { lx: number; ly: number; yaw: number; pitch: number; dim: number; corona: number };

const NARROW = 860;
const TEXT_GAP = 48;
const NO_TEXT_X = -1e5;
const MAX_DPR = 1.5;
const FULLSCREEN_TRIANGLE = [-1, -1, 3, -1, -1, 3];
const VERTEX_SIZE = 2;
const MASK_VARS = ['--mx', '--my', '--zin', '--zout'];

const MOON_NARROW = { x: 0.3, y: 0.62 };
const MOON_WIDE = { x: -0.88, y: -0.04, minVisible: 0.4 };

const LIGHT_START = { x: 0.8, y: -0.6 };
const REST_SPREAD = 1.15;
const MIN_SPREAD = 0.22;
const NARROW_DIM = { start: 0.1, range: 0.4 };
const CAMERA_SWAY = { yaw: 0.14, pitch: 0.08 };

const CLOCK_START = 40;
const EASE_RATE = 2.4;
const MAX_FRAME_DT = 0.05;
const SETTLE_EPSILON = 0.0005;
const IDLE_FRAME_MS = 32;

const VOYAGER_SAMPLES = 720;
const VOYAGER_OCCLUSION = 1.05;
const VOYAGER_ENTRY_DELAY = 12;
const VOYAGER_ENTRY_NUDGE = 0.03;
const VOYAGER_FALLBACK_PHASE = 1.3;

let dispose: () => void = () => undefined;

function voyagerPhase(width: number, height: number, moon: { cx: number; cy: number; r: number }, clock: number, still: boolean): number {
  const m = Math.min(width, height);
  const scale = SCENE.focal * m;
  const orbit = SCENE.voyagerRing * SCENE.ringStep * SCENE.orbitScale;
  const omega = SCENE.orbitSpeed * Math.pow(SCENE.firstRing / SCENE.voyagerRing, SCENE.kepler);
  const sunX = width / 2 + moon.cx / SCENE.cameraDistance * scale;
  const sunY = height / 2 - moon.cy / SCENE.cameraDistance * scale;
  const sunR = moon.r / SCENE.cameraDistance * scale;

  const angle = (i: number) => i / VOYAGER_SAMPLES * Math.PI * 2;
  const visible = Array.from({ length: VOYAGER_SAMPLES }, (_, i) => {
    const a = angle(i);
    const z = -orbit * Math.sin(a) * Math.sin(SCENE.tilt);
    const depth = SCENE.cameraDistance - z;
    const x = width / 2 + (moon.cx + orbit * Math.cos(a)) / depth * scale;
    const y = height / 2 - (moon.cy + orbit * Math.sin(a) * Math.cos(SCENE.tilt)) / depth * scale;

    const onScreen = x > 0 && x < width && y > 0 && y < height;
    const hidden = z < 0 && Math.hypot(x - sunX, y - sunY) < sunR * VOYAGER_OCCLUSION;

    return onScreen && !hidden;
  });

  const entry = visible.findIndex((v, i) => v && !visible[(i - 1 + VOYAGER_SAMPLES) % VOYAGER_SAMPLES]);

  if (entry < 0) {
    return VOYAGER_FALLBACK_PHASE;
  }

  if (still) {
    let end = entry;

    while (visible[(end + 1) % VOYAGER_SAMPLES] && end - entry < VOYAGER_SAMPLES) {
      end++;
    }

    return angle((entry + end) / 2) - clock * omega;
  }

  return angle(entry) + VOYAGER_ENTRY_NUDGE - (clock + VOYAGER_ENTRY_DELAY) * omega;
}

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error('Shader allocation failed');
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? 'Shader compile failed');
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext): WebGLProgram {
  const program = gl.createProgram();

  if (!program) {
    throw new Error('Program allocation failed');
  }

  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertexShader));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentShader));
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? 'Program link failed');
  }

  return program;
}

function start(el: HTMLCanvasElement): () => void {
  const gl = el.getContext('webgl', { antialias: false, alpha: false });

  if (!gl) {
    throw new Error('WebGL unavailable');
  }

  const program = createProgram(gl);

  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(FULLSCREEN_TRIANGLE), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'p');

  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, VERTEX_SIZE, gl.FLOAT, false, 0, 0);

  const u = {} as Record<UniformName, WebGLUniformLocation | null>;

  UNIFORMS.forEach(name => { u[name] = gl.getUniformLocation(program, name); });

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const dir = { ...LIGHT_START };
  const tgt: Motion = { lx: 0, ly: 0, yaw: 0, pitch: 0, dim: 0, corona: 0 };
  const cur: Motion = { ...tgt };
  const moon = { cx: 0, cy: 0, r: SCENE.moonRadius };

  let width = 0, height = 0, halfW = 1, halfH = 1, dpr = 1, narrow = false, textX = NO_TEXT_X;
  let running = false, last = 0, lastDraw = 0, clock = CLOCK_START, frameId = 0, voyager = VOYAGER_FALLBACK_PHASE;

  function moonScreen() {
    return { x: width / 2 + moon.cx / halfW * width / 2, y: height / 2 - moon.cy / halfH * height / 2 };
  }

  function layout() {
    dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    width = window.innerWidth;
    height = window.innerHeight;
    el.width = Math.round(width * dpr);
    el.height = Math.round(height * dpr);
    gl?.viewport(0, 0, el.width, el.height);

    narrow = width <= NARROW;
    const unit = SCENE.cameraDistance * 0.5 / SCENE.focal / Math.min(width, height);

    halfW = unit * width;
    halfH = unit * height;

    const column = props.textSelector ? document.querySelector(props.textSelector) : null;

    textX = narrow || !column ? NO_TEXT_X : column.getBoundingClientRect().left;

    if (narrow) {
      Object.assign(moon, { cx: halfW * MOON_NARROW.x, cy: halfH * MOON_NARROW.y });
    } else {
      const limb = column ? (textX - TEXT_GAP - width / 2) / (width / 2) * halfW : Infinity;
      const cx = Math.max(Math.min(halfW * MOON_WIDE.x, limb - moon.r), -halfW - moon.r + MOON_WIDE.minVisible);

      Object.assign(moon, { cx, cy: halfH * MOON_WIDE.y });
    }

    const center = moonScreen();
    const radius = moon.r / halfH * height / 2;

    root.style.setProperty('--mx', `${center.x}px`);
    root.style.setProperty('--my', `${center.y}px`);
    root.style.setProperty('--zin', `${radius * SCENE.haloInner}px`);
    root.style.setProperty('--zout', `${radius * SCENE.haloOuter}px`);
  }

  function progress() {
    const max = root.scrollHeight - height;

    return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  }

  function retarget() {
    const p = progress();
    const eased = p * p * (3 - 2 * p);
    const spread = REST_SPREAD + (MIN_SPREAD - REST_SPREAD) * eased;

    tgt.lx = dir.x * spread;
    tgt.ly = dir.y * spread;
    tgt.corona = eased;
    tgt.dim = narrow ? Math.min(1, Math.max(0, (window.scrollY - height * NARROW_DIM.start) / (height * NARROW_DIM.range))) : 0;

    kick();
  }

  function aim(x: number, y: number) {
    const center = moonScreen();
    const dx = x - center.x, dy = center.y - y;
    const length = Math.hypot(dx, dy);

    if (length < 1) {
      return;
    }

    dir.x = dx / length;
    dir.y = dy / length;
    tgt.yaw = (x / width - 0.5) * CAMERA_SWAY.yaw;
    tgt.pitch = -(y / height - 0.5) * CAMERA_SWAY.pitch;

    retarget();
  }

  function draw() {
    if (!gl) {
      return;
    }

    const l = Math.hypot(cur.lx, cur.ly, 1);

    gl.uniform2f(u.uRes, el.width, el.height);
    gl.uniform3f(u.uL, cur.lx / l, cur.ly / l, -1 / l);
    gl.uniform2f(u.uCam, cur.yaw, cur.pitch);
    gl.uniform3f(u.uC, moon.cx, moon.cy, 0);
    gl.uniform1f(u.uR, moon.r);
    gl.uniform1f(u.uDim, cur.dim);
    gl.uniform1f(u.uCorona, cur.corona);
    gl.uniform1f(u.uCell, dpr);
    gl.uniform1f(u.uTime, clock);
    gl.uniform1f(u.uTextX, textX * dpr);
    gl.uniform1f(u.uVoyager, voyager);

    gl.drawArrays(gl.TRIANGLES, 0, FULLSCREEN_TRIANGLE.length / VERTEX_SIZE);
  }

  function frame(now: number) {
    const dt = Math.min(MAX_FRAME_DT, (now - last) / 1000);

    last = now;

    const k = reduce ? 1 : 1 - Math.exp(-dt * EASE_RATE);
    let settled = true;

    (Object.keys(tgt) as Array<keyof Motion>).forEach(key => {
      const delta = tgt[key] - cur[key];

      cur[key] += delta * k;
      if (Math.abs(delta) > SETTLE_EPSILON) {
        settled = false;
      }
    });

    if (!reduce) {
      clock += dt;
    }

    if (!settled || reduce || now - lastDraw > IDLE_FRAME_MS) {
      draw();
      lastDraw = now;
    }

    if (reduce && settled) {
      running = false;

      return;
    }

    frameId = requestAnimationFrame(frame);
  }

  function kick() {
    if (!running) {
      running = true;
      last = performance.now();
      frameId = requestAnimationFrame(frame);
    }
  }

  const onPointer = (e: PointerEvent) => {
    aim(e.clientX, e.clientY);
    if (e.pointerType === 'mouse') {
      hintGone.value = true;
    }
  };
  const onTouch = (e: TouchEvent) => {
    if (e.touches[0]) {
      aim(e.touches[0].clientX, e.touches[0].clientY);
    }
  };
  const onResize = () => { layout(); retarget(); draw(); };

  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('pointerdown', onPointer, { passive: true });
  window.addEventListener('touchmove', onTouch, { passive: true });
  window.addEventListener('scroll', retarget, { passive: true });
  window.addEventListener('resize', onResize);

  const contentObserver = new ResizeObserver(retarget);

  contentObserver.observe(document.body);

  layout();
  voyager = voyagerPhase(width, height, moon, clock, reduce);
  retarget();
  Object.assign(cur, tgt);
  draw();
  kick();

  return () => {
    cancelAnimationFrame(frameId);
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('pointerdown', onPointer);
    window.removeEventListener('touchmove', onTouch);
    window.removeEventListener('scroll', retarget);
    window.removeEventListener('resize', onResize);
    contentObserver.disconnect();
    MASK_VARS.forEach(name => root.style.removeProperty(name));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  };
}

onMounted(() => {
  if (!canvas.value) {
    return;
  }

  try {
    dispose = start(canvas.value);
  } catch {
    supported.value = false;
  }
});

onBeforeUnmount(() => dispose());
</script>

<style scoped>
.eclipse-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 0;
}

.eclipse-fallback {
  position: fixed;
  left: -18vw;
  top: 50%;
  width: min(80vh, 70vw);
  aspect-ratio: 1;
  transform: translateY(-50%);
  border-radius: 50%;
  background: #0d1430;
  box-shadow: inset -34px -18px 0 0 var(--highlight), inset -40px -8px 0 0 #d4381e;
  z-index: 0;
}

.eclipse-hint {
  position: fixed;
  left: 20px;
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  z-index: 3;
  transition: opacity 0.6s ease;
}

.eclipse-hint.gone {
  opacity: 0;
}

@media (max-width: 1199px) {
  .eclipse-hint {
    display: none;
  }
}
</style>
