import { useRef, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";

// ── Constants ────────────────────────────────────────────────────────────────
const FACE_COLORS = {
  px: "#C84B4B", // right  +X  muted crimson
  nx: "#3DA05A", // left   −X  sage green
  py: "#D8D8D0", // top    +Y  pearl white
  ny: "#D4902A", // bottom −Y  warm amber
  pz: "#2E72CC", // front  +Z  steel blue
  nz: "#C96A35", // back   −Z  terracotta
};

const SIZE   = 0.905;  // cubie body edge length
const RADIUS = 0.055;  // RoundedBox corner radius
const GAP    = 0.095;  // half-gap between adjacent cubie centres → step = SIZE + GAP*2 = 1.095 → actually step = 1.0
const STEP   = SIZE + GAP * 2; // 1.095 — distance between cubie centers
const SW     = 0.76;   // sticker plane width/height
const SD     = SIZE / 2 + 0.003; // sticker offset from cubie face center

const COORDS = [-1, 0, 1];
const ALL_CUBIES = COORDS.flatMap((cx) =>
  COORDS.flatMap((cy) =>
    COORDS.map((cz) => ({ cx, cy, cz }))
  )
);

// ── Sticker ──────────────────────────────────────────────────────────────────
function Sticker({ position, rotation, color }) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[SW, SW]} />
      <meshStandardMaterial
        color={color}
        roughness={0.20}
        metalness={0.0}
        emissive={color}
        emissiveIntensity={0.06}
      />
    </mesh>
  );
}

// ── Cubie ─────────────────────────────────────────────────────────────────────
function Cubie({ cx, cy, cz }) {
  const x = cx * STEP;
  const y = cy * STEP;
  const z = cz * STEP;

  return (
    <group position={[x, y, z]}>
      {/* Body */}
      <RoundedBox args={[SIZE, SIZE, SIZE]} radius={RADIUS} smoothness={3}>
        <meshStandardMaterial color="#191920" roughness={0.80} metalness={0.20} />
      </RoundedBox>

      {/* Stickers — only on exterior faces */}
      {cz ===  1 && <Sticker position={[0, 0,  SD]} rotation={[0, 0, 0]}              color={FACE_COLORS.pz} />}
      {cz === -1 && <Sticker position={[0, 0, -SD]} rotation={[0, Math.PI, 0]}        color={FACE_COLORS.nz} />}
      {cx ===  1 && <Sticker position={[ SD, 0, 0]} rotation={[0,  Math.PI / 2, 0]}   color={FACE_COLORS.px} />}
      {cx === -1 && <Sticker position={[-SD, 0, 0]} rotation={[0, -Math.PI / 2, 0]}   color={FACE_COLORS.nx} />}
      {cy ===  1 && <Sticker position={[0,  SD, 0]} rotation={[-Math.PI / 2, 0, 0]}   color={FACE_COLORS.py} />}
      {cy === -1 && <Sticker position={[0, -SD, 0]} rotation={[ Math.PI / 2, 0, 0]}   color={FACE_COLORS.ny} />}
    </group>
  );
}

// ── Scene ─────────────────────────────────────────────────────────────────────
function RubiksScene() {
  const groupRef    = useRef(null);
  const interacting = useRef(false);
  const resumeTimer = useRef(null);

  useFrame((_, delta) => {
    if (!interacting.current && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.38;
      groupRef.current.rotation.x += delta * 0.13;
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

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  return (
    <>
      <ambientLight intensity={0.40} color="#dde8ff" />
      <directionalLight position={[8, 10, 6]} intensity={1.35} color="#ffffff" />
      <pointLight position={[-5, -4, -5]} intensity={0.55} color="#3355ee" />
      <pointLight position={[4, 6, 4]} intensity={0.22} color="#ffffff" />

      <group ref={groupRef} rotation={[0.30, 0.50, 0]}>
        {ALL_CUBIES.map(({ cx, cy, cz }) => (
          <Cubie key={`${cx}|${cy}|${cz}`} cx={cx} cy={cy} cz={cz} />
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

// ── HeroRubiksCube ────────────────────────────────────────────────────────────
export default function HeroRubiksCube() {
  return (
    <div className="w-full aspect-square max-w-[400px] mx-auto">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
      >
        <RubiksScene />
      </Canvas>
    </div>
  );
}
