import { useRef, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// ── Geometry constants ─────────────────────────────────────────────────────────
const SIZE   = 0.905;
const RADIUS = 0.055;
const GAP    = 0.095;
const STEP   = SIZE + GAP * 2;      // 1.095 — centre-to-centre spacing
const SF     = 0.78;                // circuit face plane size
const SD     = SIZE / 2 + 0.003;   // offset from cubie face centre

const COORDS    = [-1, 0, 1];
const AXIS_VECS = [
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, 0, 1),
];

// ── Circuit board GLSL shaders ─────────────────────────────────────────────────
const VERT = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv         = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */`
  uniform float uTime;
  varying vec2  vUv;

  float h11(float n) { return fract(sin(n  * 127.1 ) * 43758.5453); }
  float h21(vec2  p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  // Returns (traceStrength, nodeStrength)
  vec2 circuitGrid(vec2 uv) {
    const float G = 5.0;
    vec2 gUv = uv * G;
    vec2 cId = floor(gUv);
    vec2 cUv = fract(gUv);

    float hOn = step(0.42, h21(cId));
    float vOn = step(0.42, h21(cId + vec2(47.3, 19.7)));
    float nOn = step(0.50, h21(cId + vec2(91.7, 61.2)));

    // Thin orthogonal traces through cell centres
    float hLine = smoothstep(0.055, 0.010, abs(cUv.y - 0.5)) * hOn;
    float vLine = smoothstep(0.055, 0.010, abs(cUv.x - 0.5)) * vOn;
    float trace = max(hLine, vLine);

    // Dot at junction
    float node = smoothstep(0.13, 0.0, length(cUv - 0.5)) * nOn;

    return vec2(trace, node);
  }

  // Tiny binary characters streaming downward
  float dataStream(vec2 uv) {
    const float COLS  = 7.0;
    const float CHARS = 15.0;

    float col   = floor(uv.x * COLS);
    float spd   = 0.22 + h11(col * 3.7) * 0.30;
    float shift = uTime * spd + h11(col * 9.1);
    float row   = floor((uv.y + shift) * CHARS);

    float bit   = step(0.5, h21(vec2(col, row)));
    float cx    = fract(uv.x * COLS);
    float cy    = fract((uv.y + shift) * CHARS);
    float glyph = step(0.18, cx) * step(cx, 0.82)
                * step(0.22, cy) * step(cy, 0.78);

    // Fade near the face edges so it looks inset
    float fade = smoothstep(0.0, 0.12, uv.x) * smoothstep(1.0, 0.88, uv.x)
               * smoothstep(0.0, 0.12, uv.y) * smoothstep(1.0, 0.88, uv.y);

    return bit * glyph * fade * 0.80;
  }

  // Slow pulsing hotspots
  float pulsed(vec2 uv) {
    const float G = 4.0;
    vec2 cId = floor(uv * G);
    float p  = sin(uTime * 0.85 + h21(cId) * 6.2832) * 0.5 + 0.5;
    float d  = length(fract(uv * G) - 0.5);
    return smoothstep(0.20, 0.0, d) * step(0.68, p);
  }

  void main() {
    vec2  cn  = circuitGrid(vUv);
    float tr  = cn.x;
    float nd  = cn.y;
    float ds  = dataStream(vUv);
    float pl  = pulsed(vUv);

    // Slow shimmer on traces
    float shimmer = 0.75 + 0.25 * sin(uTime * 1.3 + h21(floor(vUv * 9.0)) * 6.2832);

    // Electric blue traces, deep purple nodes, cyan data, blue-white pulse
    vec3 col = vec3(0.06, 0.48, 1.00) * tr * shimmer    // trace
             + vec3(0.55, 0.05, 0.95) * nd               // node
             + vec3(0.00, 0.90, 1.00) * ds               // data
             + vec3(0.30, 0.60, 1.00) * pl * 0.50;       // pulse

    float alpha = max(tr * 0.80, max(nd * 0.75, max(ds * 0.65, pl * 0.55)));

    gl_FragColor = vec4(col, alpha);
  }
`;

// Single shared ShaderMaterial instance — uTime updated once per frame.
const circuitMat = new THREE.ShaderMaterial({
  vertexShader:   VERT,
  fragmentShader: FRAG,
  uniforms:       { uTime: { value: 0.0 } },
  transparent:    true,
  depthWrite:     false,
  blending:       THREE.AdditiveBlending,
  side:           THREE.FrontSide,
});

// ── Cubie data ─────────────────────────────────────────────────────────────────
function makeInitialCubies() {
  return COORDS.flatMap((cx) =>
    COORDS.flatMap((cy) =>
      COORDS.map((cz) => ({
        icx: cx,
        icy: cy,
        icz: cz,
        settled:     new THREE.Vector3(cx * STEP, cy * STEP, cz * STEP),
        settledQuat: new THREE.Quaternion(),
      }))
    )
  );
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// ── CircuitFace ────────────────────────────────────────────────────────────────
function CircuitFace({ position, rotation }) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[SF, SF]} />
      <primitive object={circuitMat} attach="material" />
    </mesh>
  );
}

// ── Cubie ──────────────────────────────────────────────────────────────────────
// meshRef is a plain { current: null } — R3F assigns .current on mount.
// icx/icy/icz are initial grid coords; they determine which circuit faces render.
function Cubie({ meshRef, icx, icy, icz }) {
  return (
    <group ref={meshRef}>
      <RoundedBox args={[SIZE, SIZE, SIZE]} radius={RADIUS} smoothness={3}>
        <meshPhysicalMaterial
          color="#080818"
          transparent
          opacity={0.40}
          roughness={0.10}
          metalness={0.08}
          clearcoat={0.55}
          clearcoatRoughness={0.18}
        />
      </RoundedBox>

      {/* Circuit overlays on exterior faces only */}
      {icz ===  1 && <CircuitFace position={[0, 0,  SD]} rotation={[0, 0, 0]}            />}
      {icz === -1 && <CircuitFace position={[0, 0, -SD]} rotation={[0, Math.PI, 0]}      />}
      {icx ===  1 && <CircuitFace position={[ SD, 0, 0]} rotation={[0,  Math.PI / 2, 0]} />}
      {icx === -1 && <CircuitFace position={[-SD, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />}
      {icy ===  1 && <CircuitFace position={[0,  SD, 0]} rotation={[-Math.PI / 2, 0, 0]} />}
      {icy === -1 && <CircuitFace position={[0, -SD, 0]} rotation={[ Math.PI / 2, 0, 0]} />}
    </group>
  );
}

// ── Scene ──────────────────────────────────────────────────────────────────────
function RubiksScene() {
  const groupRef    = useRef(null);
  const interacting = useRef(false);
  const resumeTimer = useRef(null);

  const cubiesData   = useRef(makeInitialCubies());
  const cubieRefs    = useRef(cubiesData.current.map(() => ({ current: null })));
  const activeTwists = useRef([]);
  const nextTwistIn  = useRef(0.6);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  function tryStartTwist() {
    const busySet = new Set(activeTwists.current.flatMap((t) => t.indices));

    for (let attempt = 0; attempt < 12; attempt++) {
      const axisIdx   = Math.floor(Math.random() * 3);
      const axisVec   = AXIS_VECS[axisIdx];
      const layer     = COORDS[Math.floor(Math.random() * 3)];
      const dir       = Math.random() < 0.5 ? 1 : -1;
      const targetPos = layer * STEP;

      const indices = [];
      cubiesData.current.forEach((c, i) => {
        if (Math.abs(c.settled.getComponent(axisIdx) - targetPos) < STEP * 0.4) {
          indices.push(i);
        }
      });

      if (indices.length === 9 && !indices.some((i) => busySet.has(i))) {
        activeTwists.current.push({
          axisVec,
          targetAngle:    dir * Math.PI / 2,
          progress:       0,
          indices,
          startQuats:     indices.map((i) => cubiesData.current[i].settledQuat.clone()),
          startPositions: indices.map((i) => cubiesData.current[i].settled.clone()),
        });
        return;
      }
    }
  }

  useFrame(({ clock }, delta) => {
    // Drive circuit board animation
    circuitMat.uniforms.uTime.value = clock.elapsedTime;

    // Gentle global auto-rotation — the layer twists provide the main kinetics
    if (!interacting.current && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
      groupRef.current.rotation.x += delta * 0.07;
    }

    // ── Process all active layer twists ────────────────────────────────────────
    const DURATION = 0.30;
    const toRemove = [];

    activeTwists.current.forEach((ts, idx) => {
      ts.progress += delta / DURATION;
      const t     = Math.min(ts.progress, 1);
      const angle = easeInOut(t) * ts.targetAngle;
      const tq    = new THREE.Quaternion().setFromAxisAngle(ts.axisVec, angle);

      for (let j = 0; j < ts.indices.length; j++) {
        const ref = cubieRefs.current[ts.indices[j]].current;
        if (!ref) continue;
        ref.position.copy(ts.startPositions[j]).applyQuaternion(tq);
        ref.quaternion.multiplyQuaternions(tq, ts.startQuats[j]);
      }

      if (ts.progress >= 1) {
        const finalQ = new THREE.Quaternion().setFromAxisAngle(ts.axisVec, ts.targetAngle);
        for (let j = 0; j < ts.indices.length; j++) {
          const i   = ts.indices[j];
          const c   = cubiesData.current[i];
          const ref = cubieRefs.current[i].current;
          c.settled.copy(ts.startPositions[j]).applyQuaternion(finalQ);
          c.settled.x = Math.round(c.settled.x / STEP) * STEP;
          c.settled.y = Math.round(c.settled.y / STEP) * STEP;
          c.settled.z = Math.round(c.settled.z / STEP) * STEP;
          c.settledQuat.multiplyQuaternions(finalQ, ts.startQuats[j]);
          if (ref) {
            ref.position.copy(c.settled);
            ref.quaternion.copy(c.settledQuat);
          }
        }
        toRemove.push(idx);
      }
    });

    // Remove completed twists (reverse-order splice preserves remaining indices)
    for (let i = toRemove.length - 1; i >= 0; i--) {
      activeTwists.current.splice(toRemove[i], 1);
    }

    // Kick off new twists at a rapid, hypnotic cadence
    nextTwistIn.current -= delta;
    if (nextTwistIn.current <= 0) {
      tryStartTwist();
      nextTwistIn.current = 0.50 + Math.random() * 0.80;
    }

    // Pin non-busy cubies to their settled positions
    const busySet = new Set(activeTwists.current.flatMap((t) => t.indices));
    cubiesData.current.forEach((c, i) => {
      const ref = cubieRefs.current[i].current;
      if (!ref || busySet.has(i)) return;
      ref.position.copy(c.settled);
      ref.quaternion.copy(c.settledQuat);
    });
  });

  const onStart = useCallback(() => {
    interacting.current = true;
    clearTimeout(resumeTimer.current);
  }, []);

  const onEnd = useCallback(() => {
    resumeTimer.current = setTimeout(() => {
      interacting.current = false;
    }, 1200);
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={55} />

      {/* Cool-blue ambient to tint the transparent bodies */}
      <ambientLight intensity={0.30} color="#8899ff" />
      <directionalLight position={[8, 10, 6]} intensity={1.20} color="#ffffff" />
      <pointLight position={[-5, -4, -5]} intensity={0.70} color="#2244ff" />
      <pointLight position={[4, 6, 4]}   intensity={0.28} color="#9933ff" />
      {/* Inner blue glow bleeds through the transparent bodies */}
      <pointLight position={[0, 0, 0]}   intensity={0.45} color="#0055ff" distance={3.5} />

      <group ref={groupRef} rotation={[0.30, 0.50, 0]} scale={2.25}>
        {cubiesData.current.map((c, i) => (
          <Cubie
            key={`${c.icx}|${c.icy}|${c.icz}`}
            meshRef={cubieRefs.current[i]}
            icx={c.icx}
            icy={c.icy}
            icz={c.icz}
          />
        ))}
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.07}
        onStart={onStart}
        onEnd={onEnd}
      />
    </>
  );
}

// ── HeroRubiksCube ─────────────────────────────────────────────────────────────
// Canvas is sized wider than the cube's diagonal bounding sphere so rotation
// never clips at any angle — achieved through FOV + camera distance alone.
export default function HeroRubiksCube() {
  return (
    <div className="w-full aspect-square max-w-[440px] mx-auto">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
      >
        <RubiksScene />
      </Canvas>
    </div>
  );
}
