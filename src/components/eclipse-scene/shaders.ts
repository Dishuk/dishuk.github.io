export const vertexShader = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

export const SCENE = {
  focal: 1.8,
  cameraDistance: 6,
  tilt: 0.85,
  orbitScale: 0.5,
  ringStep: 0.19,
  firstRing: 21,
  orbitSpeed: 0.08,
  kepler: 1.5,
  voyagerRing: 53,
  moonRadius: 1.5,
  haloInner: 1.3,
  haloOuter: 1.85,
};

const f = (n: number) => (Number.isInteger(n) ? n.toFixed(1) : String(n));

export const fragmentShader = `
precision highp float;
uniform vec2 uRes;
uniform vec3 uL;
uniform vec2 uCam;
uniform vec3 uC;
uniform float uR;
uniform float uDim;
uniform float uCorona;
uniform float uCell;
uniform float uTime;
uniform float uTextX;
uniform float uVoyager;

const float FOCAL = ${f(SCENE.focal)};
const float TILT = ${f(SCENE.tilt)};
const float ORBIT_SCALE = ${f(SCENE.orbitScale)};
const float RING_STEP = ${f(SCENE.ringStep)};
const float ORBIT_SPEED = ${f(SCENE.orbitSpeed)};
const vec3 GROUND = vec3(0.063, 0.094, 0.22);
const vec3 BODY = vec3(0.047, 0.07, 0.175);
const vec3 CREAM = vec3(0.937, 0.902, 0.812);
const vec3 ORANGE = vec3(0.957, 0.627, 0.227);
const vec3 RED = vec3(0.83, 0.22, 0.118);
const vec3 RUST = vec3(0.71, 0.325, 0.165);
const vec3 PEACH = vec3(0.965, 0.659, 0.553);
const vec3 GOLD = vec3(0.949, 0.831, 0.608);
const vec3 AMBER = vec3(0.851, 0.643, 0.255);
const int PLANETS = 7;
const float FIRST_RING = ${f(SCENE.firstRing)};
const float RING_GAP = 4.0;
const float GOLDEN_ANGLE = 2.39996;
const float VOYAGER_RING = ${f(SCENE.voyagerRing)};
const float VOYAGER_SCALE = 0.75;
const float KEPLER = ${f(SCENE.kepler)};
const float HALO_INNER = ${f(SCENE.haloInner)};
const float HALO_OUTER = ${f(SCENE.haloOuter)};
const float PLANET_CLEARANCE = 0.12;
const float RING_OPACITY = 0.1;
const float LIGHT_CLEAR = 0.62;
const float LIGHT_UNDER_TEXT = 0.32;
const float TEXT_FADE_BEFORE = 60.0;
const float TEXT_FADE_AFTER = 40.0;
const float DIM_STRENGTH = 0.85;
const float GRAIN_STRENGTH = 0.84;
const float DITHER = 3.0 / 255.0;

float orbitRadius(float ring) {
  return ring * RING_STEP * ORBIT_SCALE;
}

float orbitAngle(float ring, float phase) {
  return phase + uTime * ORBIT_SPEED * pow(FIRST_RING / ring, KEPLER);
}

float exposure(vec3 p) {
  return smoothstep(-0.55, 0.35, dot(normalize(p - uC), uL));
}

float coverage(float d, float px) {
  return clamp(0.5 - d / px, 0.0, 1.0);
}

vec3 planetTone(int i) {
  if (i == 1) return RUST;
  if (i == 2) return ORANGE;
  if (i == 3) return PEACH;
  if (i == 4) return GOLD;
  if (i == 5) return RED;
  if (i == 6) return AMBER;
  return CREAM;
}

float planetRadius(int i) {
  if (i == 0) return 0.055;
  if (i == 1) return 0.065;
  if (i == 2) return 0.05;
  if (i == 3) return 0.07;
  if (i == 4) return 0.06;
  if (i == 5) return 0.052;
  return 0.062;
}

float sdBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float sdSegment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  return length(pa - ba * clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0));
}

float sdEllipse(vec2 p, vec2 r) {
  return (length(p / r) - 1.0) * min(r.x, r.y);
}

float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  float m = min(uRes.x, uRes.y);
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / m;
  float pixAng = 1.0 / (m * FOCAL);

  vec3 ro = vec3(sin(uCam.x) * cos(uCam.y), sin(uCam.y), cos(uCam.x) * cos(uCam.y)) * ${f(SCENE.cameraDistance)};
  vec3 fw = normalize(-ro);
  vec3 rt = normalize(cross(fw, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(rt, fw);
  vec3 rd = normalize(fw * FOCAL + rt * uv.x + up * uv.y);

  vec3 pn = vec3(0.0, sin(TILT), cos(TILT));
  vec3 pu = vec3(1.0, 0.0, 0.0);
  vec3 pv = vec3(0.0, cos(TILT), -sin(TILT));
  vec3 p0 = uC;

  vec3 oc = ro - uC;
  float b = -dot(oc, rd);
  vec3 pc = ro + rd * b;
  float dc = length(pc - uC);
  float cover = coverage(dc - uR, b * pixAng);

  vec3 n;
  float tm = b;
  if (dc < uR) {
    tm = b - sqrt(uR * uR - dc * dc);
    n = normalize(ro + rd * tm - uC);
  } else {
    n = normalize(pc - uC);
  }

  vec3 glow = uC + uL * (uR * 0.5);
  float d = dot(n, uL);
  float lit = smoothstep(-0.012, 0.03, d);
  vec3 cres = mix(RED, ORANGE, smoothstep(0.03, 0.42, d));
  cres = mix(cres, mix(cres, CREAM, 0.35), smoothstep(0.25, 0.9, d));
  vec3 moon = mix(BODY, cres, lit);

  float ringA = 0.0;
  bool ringFront = false;
  float dn = dot(rd, pn);
  float tp = dot(p0 - ro, pn) / dn;
  if (tp > 0.0) {
    vec3 p = ro + rd * tp;
    float r = length(vec2(dot(p - p0, pu), dot(p - p0, pv)));
    float sp = RING_STEP * ORBIT_SCALE;
    float fr = abs(fract(r / sp + 0.5) - 0.5) * sp;
    float px = tp * pixAng / max(abs(dn), 0.3);
    float line = clamp(1.0 - fr / (px * 1.1), 0.0, 1.0);
    float fade = smoothstep(4.8, uR * 0.9, r) * smoothstep(4.2, 2.8, p.z);
    ringA = line * RING_OPACITY * fade;
    ringFront = tp < tm;
  }

  float quiet = mix(LIGHT_CLEAR, LIGHT_UNDER_TEXT,
    smoothstep(uTextX - TEXT_FADE_BEFORE * uCell, uTextX + TEXT_FADE_AFTER * uCell, gl_FragCoord.x));

  vec3 col = GROUND;
  if (!ringFront) col = mix(col, CREAM, ringA);

  for (int layer = 0; layer < 2; layer++) {
    if (layer == 1) {
      if (dc > uR) {
        float fall = exp(-(dc - uR) / uR * 6.0);
        float side = smoothstep(-0.1, 0.5, d);
        col = mix(col, mix(RED, ORANGE, side), fall * (side * 0.35 + uCorona * 0.3));
      }
      col = mix(col, moon, cover);
      if (ringFront) col = mix(col, CREAM, ringA);
    }
    for (int i = 0; i < PLANETS; i++) {
      float fi = float(i);
      float ring = FIRST_RING + RING_GAP * fi;
      float orbit = orbitRadius(ring);
      float ang = orbitAngle(ring, fi * GOLDEN_ANGLE);
      float rb = planetRadius(i);
      vec3 bp = p0 + pu * (orbit * cos(ang)) + pv * (orbit * sin(ang));
      vec3 dv = bp - uC;
      float dl = length(dv);
      float minD = uR + rb + PLANET_CLEARANCE;
      if (dl < minD) bp = uC + dv / max(dl, 1e-4) * minD;
      float bb = -dot(ro - bp, rd);
      bool front = bb < tm;
      if ((layer == 0 && front) || (layer == 1 && !front)) continue;
      vec3 bpc = ro + rd * bb;
      float bd = length(bpc - bp);
      float bcov = coverage(bd - rb, bb * pixAng);
      if (bcov > 0.0 && bb > 0.0) {
        vec3 bn = bd < rb ? normalize(ro + rd * (bb - sqrt(rb * rb - bd * bd)) - bp) : normalize(bpc - bp);
        float exposed = exposure(bp);
        vec3 ls = normalize(glow - bp);
        float nd = dot(bn, ls);
        float blit = smoothstep(-0.005, 0.03, nd) * exposed;
        float backlit = smoothstep(0.2, 0.95, dot(rd, ls)) * exposed;
        float rim = pow(1.0 - clamp(dot(bn, -rd), 0.0, 1.0), 3.0) * backlit * smoothstep(-0.5, 0.1, nd);
        vec3 tone = planetTone(i);
        vec3 litTone = tone * quiet + GROUND * (1.0 - quiet) * 0.35;
        col = mix(col, mix(mix(GROUND, tone, 0.1), litTone, max(blit, rim * 0.85)), bcov);
      }
    }

    float orbitV = orbitRadius(VOYAGER_RING);
    float angV = orbitAngle(VOYAGER_RING, uVoyager);
    vec3 vp = p0 + pu * (orbitV * cos(angV)) + pv * (orbitV * sin(angV));
    vec3 toV = vp - ro;
    float vz = dot(toV, fw);
    bool vFront = length(toV) < tm;
    if (vz > 0.0 && ((layer == 0 && !vFront) || (layer == 1 && vFront))) {
      vec3 toC = uC - ro;
      vec2 vs = vec2(dot(toV, rt), dot(toV, up)) / vz * FOCAL;
      vec2 cs = vec2(dot(toC, rt), dot(toC, up)) / dot(toC, fw) * FOCAL;
      vec2 ax = normalize(cs - vs);
      vec2 ay = vec2(-ax.y, ax.x);
      vec2 w = (uv - vs) * vz / FOCAL;
      vec2 q = vec2(dot(w, ax), dot(w, ay)) / VOYAGER_SCALE;
      float px = vz * pixAng / VOYAGER_SCALE;
      float stroke = max(0.0022, px * 0.55);
      float thin = stroke * 0.7;
      float frame = sdBox(q - vec2(-0.022, 0.0), vec2(0.009, 0.012));
      frame = min(frame, sdSegment(q, vec2(-0.016, 0.01), vec2(-0.016, 0.1)) - stroke);
      frame = min(frame, sdSegment(q, vec2(-0.024, -0.02), vec2(0.01, -0.095)) - stroke);
      frame = min(frame, sdSegment(q, vec2(-0.03, 0.0), vec2(-0.042, 0.0)) - stroke);
      frame = min(frame, length(q - vec2(-0.044, 0.0)) - 0.005);
      frame = min(frame, sdBox(q - vec2(-0.036, 0.016), vec2(0.006, 0.003)));
      frame = min(frame, sdSegment(q, vec2(0.004, 0.038), vec2(0.038, 0.0)) - thin);
      frame = min(frame, sdSegment(q, vec2(0.004, -0.038), vec2(0.038, 0.0)) - thin);
      frame = min(frame, length(q - vec2(0.038, 0.0)) - 0.003);
      float dish = sdEllipse(q, vec2(0.012, 0.048));
      float bright = mix(0.5, 1.0, exposure(vp)) * min(1.0, quiet * 1.35);
      vec3 frameTone = mix(GROUND, CREAM, 0.55 * bright);
      vec3 dishTone = mix(GROUND, CREAM, bright * (0.75 + 0.25 * smoothstep(-0.012, 0.012, q.x)));
      col = mix(col, frameTone, coverage(frame, px));
      col = mix(col, dishTone, coverage(dish, px));
    }
  }

  col = mix(col, GROUND, uDim * DIM_STRENGTH);

  vec2 cell = floor(gl_FragCoord.xy / uCell);
  float g = (grainHash(cell) + grainHash(cell + vec2(17.0, 59.0)) + grainHash(cell + vec2(83.0, 11.0))) / 3.0;
  float zone = 1.0 - smoothstep(HALO_INNER, HALO_OUTER, dc / uR);
  col *= 1.0 + (g - 0.5) * GRAIN_STRENGTH * zone;
  col += (grainHash(gl_FragCoord.xy + vec2(131.0, 7.0)) - 0.5) * DITHER;

  gl_FragColor = vec4(col, 1.0);
}
`;
