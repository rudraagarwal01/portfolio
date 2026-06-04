import { useRef, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// ── Color palette ──────────────────────────────────────────────────────────────
const FACE_COLORS = {
  px: "#C84B4B", // right  +X  muted crimson
  nx: "#3DA05A", // left   −X  sage green
  py: "#D8D8D0", // top    +Y  pearl white
  ny: "#D4902A", // bottom −Y  warm amber
  pz: "#2E72CC", // front  +Z  steel blue
  nz: "#C96A35", // back   −Z  terracotta
};

// ── Geometry constants ─────────────────────────────────────────────────────────
const SIZE   = 0.905;
const RADIUS = 0.055;
const GAP    = 0.095;
const STEP   = SIZE + GAP * 2;          // 1.095 — centre-to-centre distance
const SW     = 0.76;                    // sticker plane width/height
const SD     = SIZE / 2 + 0.003;       // sticker offset from cubie face centre

const COORDS   = [-1, 0, 1];
const AXIS_VECS = [
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, 0, 1),
];

// Each cubie carries its settled position + accumulated quaternion.
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

// Quadratic ease-in-out (0 → 1)
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// ── Sticker ────────────────────────────────────────────────────────────────────
function Sticker({ position, rotation, color }) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[SW, SW]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.92}
        roughness={0.08}
        metalness={0.0}
        emissive={color}
        emissiveIntensity={0.09}
      />
    </mesh>
  );
}

// ── Cubie ──────────────────────────────────────────────────────────────────────
// meshRef is a plain { current: null } object; R3F assigns it on mount.
// icx/icy/icz are the initial grid coords and never change — they determine
// which sticker faces exist on this cubie.
function Cubie({ meshRef, icx, icy, icz }) {
  return (
    <group ref={meshRef}>
      <RoundedBox args={[SIZE, SIZE, SIZE]} radius={RADIUS} smoothness={3}>
        <meshPhysicalMaterial
          color="#0c0c1e"
          transparent
          opacity={0.52}
          roughness={0.08}
          metalness={0.05}
          clearcoat={0.7}
          clearcoatRoughness={0.12}
        />
      </RoundedBox>

      {/* Stickers rendered only on the originally-exterior faces */}
      {icz ===  1 && <Sticker position={[0, 0,  SD]} rotation={[0, 0, 0]}            color={FACE_COLORS.pz} />}
      {icz === -1 && <Sticker position={[0, 0, -SD]} rotation={[0, Math.PI, 0]}      color={FACE_COLORS.nz} />}
      {icx ===  1 && <Sticker position={[ SD, 0, 0]} rotation={[0,  Math.PI / 2, 0]} color={FACE_COLORS.px} />}
      {icx === -1 && <Sticker position={[-SD, 0, 0]} rotation={[0, -Math.PI / 2, 0]} color={FACE_COLORS.nx} />}
      {icy ===  1 && <Sticker position={[0,  SD, 0]} rotation={[-Math.PI / 2, 0, 0]} color={FACE_COLORS.py} />}
      {icy === -1 && <Sticker position={[0, -SD, 0]} rotation={[ Math.PI / 2, 0, 0]} color={FACE_COLORS.ny} />}
    </group>
  );
}

// ── Scene ──────────────────────────────────────────────────────────────────────
function RubiksScene() {
  const groupRef    = useRef(null);
  const interacting = useRef(false);
  const resumeTimer = useRef(null);

  const cubiesData  = useRef(makeInitialCubies());
  // Plain ref objects — R3F sets .current = Three.js Group on mount.
  const cubieRefs   = useRef(cubiesData.current.map(() => ({ current: null })));

  const twistState  = useRef(null);   // active layer twist
  const nextTwistIn = useRef(2.0);    // seconds until the next twist starts

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  useFrame((_, delta) => {
    // ── Global slow auto-rotation ──────────────────────────────────────────────
    if (!interacting.current && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
      groupRef.current.rotation.x += delta * 0.08;
    }

    // ── Layer twist state machine ──────────────────────────────────────────────
    if (!twistState.current) {
      nextTwistIn.current -= delta;

      if (nextTwistIn.current <= 0) {
        // Pick a random axis, layer, and direction
        const axisIdx   = Math.floor(Math.random() * 3);
        const axisVec   = AXIS_VECS[axisIdx];
        const layer     = COORDS[Math.floor(Math.random() * 3)];
        const dir       = Math.random() < 0.5 ? 1 : -1;
        const targetPos = layer * STEP;

        // Collect the 9 cubies in this layer
        const indices = [];
        cubiesData.current.forEach((c, i) => {
          if (Math.abs(c.settled.getComponent(axisIdx) - targetPos) < STEP * 0.4) {
            indices.push(i);
          }
        });

        // Only start if we found exactly 9 (sanity check)
        if (indices.length === 9) {
          twistState.current = {
            axisVec,
            dir,
            targetAngle:    dir * Math.PI / 2,
            progress:       0,
            indices,
            startQuats:     indices.map((i) => cubiesData.current[i].settledQuat.clone()),
            startPositions: indices.map((i) => cubiesData.current[i].settled.clone()),
          };
        }

        nextTwistIn.current = 2.0 + Math.random() * 2.5;
      }
    } else {
      const DURATION = 0.48;
      const ts       = twistState.current;
      ts.progress   += delta / DURATION;

      const t     = Math.min(ts.progress, 1);
      const angle = easeInOut(t) * ts.targetAngle;
      const tq    = new THREE.Quaternion().setFromAxisAngle(ts.axisVec, angle);

      for (let j = 0; j < ts.indices.length; j++) {
        const ref = cubieRefs.current[ts.indices[j]].current;
        if (!ref) continue;
        // Rotate the original position by the current partial angle
        ref.position.copy(ts.startPositions[j]).applyQuaternion(tq);
        // Compose: twist rotation applied AFTER the cubie's accumulated rotation
        ref.quaternion.multiplyQuaternions(tq, ts.startQuats[j]);
      }

      // Twist complete — commit to settled state and snap to grid
      if (ts.progress >= 1) {
        const finalQ = new THREE.Quaternion().setFromAxisAngle(ts.axisVec, ts.targetAngle);
        for (let j = 0; j < ts.indices.length; j++) {
          const i   = ts.indices[j];
          const c   = cubiesData.current[i];
          const ref = cubieRefs.current[i].current;

          c.settled.copy(ts.startPositions[j]).applyQuaternion(finalQ);
          // Snap to avoid floating-point drift over many moves
          c.settled.x = Math.round(c.settled.x / STEP) * STEP;
          c.settled.y = Math.round(c.settled.y / STEP) * STEP;
          c.settled.z = Math.round(c.settled.z / STEP) * STEP;

          c.settledQuat.multiplyQuaternions(finalQ, ts.startQuats[j]);

          if (ref) {
            ref.position.copy(c.settled);
            ref.quaternion.copy(c.settledQuat);
          }
        }
        twistState.current = null;
      }
    }
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
      <ambientLight intensity={0.55} color="#dde8ff" />
      <directionalLight position={[8, 10, 6]} intensity={1.60} color="#ffffff" />
      <pointLight position={[-5, -4, -5]} intensity={0.65} color="#3355ee" />
      <pointLight position={[4, 6, 4]} intensity={0.30} color="#ffffff" />

      <group ref={groupRef} rotation={[0.30, 0.50, 0]}>
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
export default function HeroRubiksCube() {
  return (
    <div className="w-full aspect-square max-w-[400px] mx-auto">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 46 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
      >
        <RubiksScene />
      </Canvas>
    </div>
  );
}
