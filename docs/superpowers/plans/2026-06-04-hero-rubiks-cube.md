# Hero Rubik's Cube Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `SystemStatus` terminal widget in `Hero.jsx` with a realistic, interactive 3D Rubik's Cube rendered with `@react-three/fiber` + `@react-three/drei`.

**Architecture:** A new self-contained `HeroRubiksCube.jsx` component wraps an R3F `<Canvas>` containing 27 rounded cubies (3×3×3), three-point lighting, delta-based auto-rotation via `useFrame`, and `OrbitControls` with zoom disabled. `Hero.jsx` drops the terminal entirely and mounts `<HeroRubiksCube />` in its place.

**Tech Stack:** React 19, `@react-three/fiber`, `@react-three/drei`, `three`, Framer Motion (hero layout unchanged), Tailwind CSS.

---

## File Map

| Action | Path | Purpose |
|--------|------|---------|
| Create | `src/components/HeroRubiksCube.jsx` | Self-contained R3F 3D cube component |
| Modify | `src/components/Hero.jsx` | Remove terminal, CSS cube accent, dead imports; wire in `HeroRubiksCube` |
| No change | `src/components/RubiksCube.jsx` | CSS cube — left on disk but no longer imported |

---

## Task 1: Install R3F dependencies

**Files:** `package.json`, `package-lock.json`

- [ ] **Step 1: Install the three packages**

```bash
cd /Users/rudraagarwal/portfolio
npm install three @react-three/fiber @react-three/drei
```

Expected output ends with something like:
```
added N packages, and audited M packages in Xs
found 0 vulnerabilities
```
(Peer-dependency warnings about React version are non-fatal — ignore them.)

- [ ] **Step 2: Confirm the three entries exist in package.json**

```bash
grep -E '"three"|"@react-three' package.json
```

Expected (versions may differ):
```
"@react-three/drei": "^9.x.x",
"@react-three/fiber": "^8.x.x",
"three": "^0.x.x",
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add @react-three/fiber, drei, three dependencies"
```

---

## Task 2: Create HeroRubiksCube.jsx

**Files:**
- Create: `src/components/HeroRubiksCube.jsx`

- [ ] **Step 1: Create the file with the full component**

Write `src/components/HeroRubiksCube.jsx` with exactly this content:

```jsx
import { useRef, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";

// ─── Color palette (premium, slightly desaturated, dark-mode friendly) ─────────
const FACE_COLORS = {
  px: "#C84B4B",  // +X right   — muted crimson
  nx: "#3DA05A",  // -X left    — sage green
  py: "#D8D8D0",  // +Y top     — pearl white
  ny: "#D4902A",  // -Y bottom  — warm amber
  pz: "#2E72CC",  // +Z front   — steel blue (echoes site accent)
  nz: "#C96A35",  // -Z back    — terracotta orange
};

// ─── Geometry constants ───────────────────────────────────────────────────────
const SIZE   = 0.905;             // cubie side length (gap = 0.095 per side between adjacent cubies)
const RADIUS = 0.055;             // RoundedBox bevel radius
const SW     = 0.76;              // sticker quad size
const SD     = SIZE / 2 + 0.003; // sticker offset from cubie center (just in front of face)

// ─── Sticker tile ─────────────────────────────────────────────────────────────
function Sticker({ pos, rot, color }) {
  return (
    <mesh position={pos} rotation={rot}>
      <planeGeometry args={[SW, SW]} />
      <meshStandardMaterial
        color={color}
        roughness={0.20}
        metalness={0}
        emissive={color}
        emissiveIntensity={0.06}
      />
    </mesh>
  );
}

// ─── Single cubie: rounded body + exterior-face stickers ─────────────────────
function Cubie({ cx, cy, cz }) {
  return (
    <group position={[cx, cy, cz]}>
      <RoundedBox args={[SIZE, SIZE, SIZE]} radius={RADIUS} smoothness={3}>
        <meshStandardMaterial color="#191920" roughness={0.80} metalness={0.20} />
      </RoundedBox>

      {cx ===  1 && <Sticker pos={[ SD,  0,  0]} rot={[0,  Math.PI / 2, 0]} color={FACE_COLORS.px} />}
      {cx === -1 && <Sticker pos={[-SD,  0,  0]} rot={[0, -Math.PI / 2, 0]} color={FACE_COLORS.nx} />}
      {cy ===  1 && <Sticker pos={[0,  SD,  0]}  rot={[-Math.PI / 2, 0, 0]} color={FACE_COLORS.py} />}
      {cy === -1 && <Sticker pos={[0, -SD,  0]}  rot={[ Math.PI / 2, 0, 0]} color={FACE_COLORS.ny} />}
      {cz ===  1 && <Sticker pos={[0,  0,  SD]}  rot={[0, 0, 0]}            color={FACE_COLORS.pz} />}
      {cz === -1 && <Sticker pos={[0,  0, -SD]}  rot={[0, Math.PI,   0]}    color={FACE_COLORS.nz} />}
    </group>
  );
}

// ─── All 27 cubie positions ───────────────────────────────────────────────────
const COORDS = [-1, 0, 1];
const ALL_CUBIES = COORDS.flatMap(cx =>
  COORDS.flatMap(cy =>
    COORDS.map(cz => ({ cx, cy, cz }))
  )
);

// ─── R3F scene: lights + rotating cube group + orbit controls ─────────────────
function RubiksScene() {
  const groupRef    = useRef(null);
  const interacting = useRef(false);
  const resumeTimer = useRef(null);

  // Delta-based rotation — frame-rate independent
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

  return (
    <>
      {/* Three-point lighting for depth and realism */}
      <ambientLight     intensity={0.40}  color="#dde8ff" />
      <directionalLight position={[8, 10, 6]}  intensity={1.35} color="#ffffff" />
      <pointLight       position={[-5, -4, -5]} intensity={0.55} color="#3355ee" />
      <pointLight       position={[ 4,  6,  4]} intensity={0.22} color="#ffffff" />

      {/* Cube group — initial angle shows top + front + right faces */}
      <group ref={groupRef} rotation={[0.30, 0.50, 0]}>
        {ALL_CUBIES.map(({ cx, cy, cz }) => (
          <Cubie key={`${cx}|${cy}|${cz}`} cx={cx} cy={cy} cz={cz} />
        ))}
      </group>

      {/* Orbit controls: drag to inspect, no zoom, no pan */}
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

// ─── Canvas wrapper (transparent — starfield shows through) ───────────────────
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
```

- [ ] **Step 2: Verify the file exists**

```bash
wc -l src/components/HeroRubiksCube.jsx
```

Expected: `≥ 90` lines

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroRubiksCube.jsx
git commit -m "feat: add HeroRubiksCube R3F 3D component"
```

---

## Task 3: Clean up Hero.jsx

**Files:**
- Modify: `src/components/Hero.jsx`

Six surgical edits, applied in order. Each edit is a complete old→new replacement.

---

### Edit A — Fix React import (remove `useEffect`, which was only used by `SystemStatus`)

- [ ] **Step 1: Replace the React import line**

Find:
```
import { useState, useEffect, useRef } from "react";
```

Replace with:
```
import { useState, useRef } from "react";
```

---

### Edit B — Swap RubiksCube import for HeroRubiksCube

- [ ] **Step 1: Replace the CSS cube import with the R3F cube import**

Find:
```
import RubiksCube from "./RubiksCube";
```

Replace with:
```
import HeroRubiksCube from "./HeroRubiksCube";
```

---

### Edit C — Delete LOG_LINES array and its comment

- [ ] **Step 1: Remove the LOG_LINES block**

Find (exact):
```
// ─── System Status Terminal ───────────────────────────────────────────────────
// Lines cycle through the core stack: React, FastAPI, Neo4j, PyTorch.
const LOG_LINES = [
  { body: "Checking React renderer...",         ok: true },
  { body: "Verifying FastAPI endpoints...",     ok: true },
  { body: "Connecting to Neo4j graph DB...",   ok: true },
  { body: "Loading PyTorch model weights...",  ok: true },
  { body: "Mounting Leaflet map tiles...",      ok: true },
  { body: "Compiling Tailwind styles...",       ok: true },
  { stack: "React · FastAPI · Neo4j · PyTorch · Leaflet · Tailwind" },
];
```

Replace with: *(empty string — delete the block)*

---

### Edit D — Delete SystemStatus function

- [ ] **Step 1: Remove the entire SystemStatus function**

Find (exact, from opening comment to closing brace + blank line):
```
function SystemStatus() {
  const [gen, setGen]         = useState(0);   // increments to restart loop
  const [done, setDone]       = useState(0);
  const [partial, setPartial] = useState("");
  const [blink, setBlink]     = useState(true);
  const lineIdx = useRef(0);
  const charIdx = useRef(0);

  // Cursor blink — always running
  useEffect(() => {
    const id = setInterval(() => setBlink((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Typing loop — re-runs on every `gen` increment.
  // Never empty: cursor is always visible from the first render.
  useEffect(() => {
    lineIdx.current = 0;
    charIdx.current = 0;
    setDone(0);
    setPartial("");

    const strings = LOG_LINES.map((l) =>
      l.stack ? `> Stack: ${l.stack}` : `> ${l.body} [OK]`
    );

    let timer;
    function tick() {
      const li = lineIdx.current;

      if (li >= strings.length) {
        // All lines done — pause 3 s then restart
        timer = setTimeout(() => setGen((g) => g + 1), 3000);
        return;
      }

      const str = strings[li];
      const ci  = charIdx.current;

      if (ci < str.length) {
        setPartial(str.slice(0, ci + 1));
        charIdx.current++;
        timer = setTimeout(tick, 26);
      } else {
        setDone((d) => d + 1);
        lineIdx.current++;
        charIdx.current = 0;
        setPartial("");
        timer = setTimeout(tick, 260);
      }
    }

    // Start immediately — no leading delay so the terminal is never blank
    timer = setTimeout(tick, 0);
    return () => clearTimeout(timer);
  }, [gen]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative w-full max-w-md mx-auto"
    >
      <div className="rounded-xl overflow-hidden shadow-2xl border border-white/8 bg-[#0d0d10]">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#161619] border-b border-white/6">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-[11px] font-mono text-zinc-500">system_status.sh</span>
        </div>

        {/* Log area */}
        <div className="p-5 space-y-2.5 min-h-[260px]">
          {/* Completed lines */}
          {LOG_LINES.slice(0, done).map((line, i) => (
            <div key={i} className="flex items-center gap-2 font-mono text-[12px] leading-5 w-full">
              <span className="text-emerald-400 select-none flex-shrink-0">&gt;</span>
              {line.stack ? (
                <>
                  <span className="text-zinc-500 flex-shrink-0">Stack:</span>
                  <span className="text-blue-400">{line.stack}</span>
                </>
              ) : (
                <>
                  <span className="text-zinc-400 flex-1">{line.body}</span>
                  <span className="text-emerald-400 flex-shrink-0">[OK]</span>
                </>
              )}
            </div>
          ))}

          {/* Currently-typing line */}
          {done < LOG_LINES.length && (
            <div className="flex items-center font-mono text-[12px] leading-5">
              <span className="text-zinc-400">{partial}</span>
              <span
                className="inline-block w-[7px] h-[13px] bg-blue-400 ml-px align-middle"
                style={{ opacity: blink ? 1 : 0 }}
              />
            </div>
          )}

          {/* Idle cursor after all lines done */}
          {done >= LOG_LINES.length && (
            <div className="flex items-center gap-2 font-mono text-[12px] leading-5">
              <span className="text-emerald-400">&gt;</span>
              <span
                className="inline-block w-[7px] h-[13px] bg-blue-400"
                style={{ opacity: blink ? 1 : 0 }}
              />
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-blue-600 text-[10px] font-mono text-white">
          <span>system · online</span>
          <span className="opacity-60">stack v2.0</span>
        </div>
      </div>

      {/* Ambient glow behind terminal */}
      <div className="absolute -inset-4 bg-blue-600/10 blur-2xl rounded-2xl -z-10 pointer-events-none" />
    </motion.div>
  );
}
```

Replace with: *(empty string — delete the function entirely)*

---

### Edit E — Remove `terminalY` transform

- [ ] **Step 1: Remove the unused terminalY line**

Find (exact):
```
  const terminalY      = useTransform(scrollYProgress, [0, 0.5], [0, -20]);
```

Replace with: *(empty string)*

---

### Edit F — Remove CSS cube background accent + replace terminal right column with R3F cube

- [ ] **Step 1: Remove the CSS cube `<motion.div>` and replace the terminal column in one edit**

Find (exact):
```
      {/* ── 3D Rubik's cube — background accent, large screens only ── */}
      <motion.div
        className="absolute top-24 right-6 hidden lg:block pointer-events-none select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.38 }}
        transition={{ duration: 1.4, delay: 0.9 }}
      >
        <RubiksCube size={148} />
      </motion.div>

      <div className="relative max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

        {/* ── Left: Text content ── */}
        <motion.div className="flex flex-col items-start" style={{ opacity: contentOpacity, y: contentY }}>
```

Replace with:
```
      <div className="relative max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

        {/* ── Left: Text content ── */}
        <motion.div className="flex flex-col items-start" style={{ opacity: contentOpacity, y: contentY }}>
```

- [ ] **Step 2: Replace the terminal right column**

Find (exact):
```
        {/* ── Right: System Status terminal (desktop only) ── */}
        <motion.div
          className="hidden md:flex items-center justify-center"
          style={{ y: terminalY }}
        >
          <SystemStatus />
        </motion.div>
```

Replace with:
```
        {/* ── Right: 3D Rubik's Cube ── */}
        <motion.div
          className="hidden md:flex items-center justify-center"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <HeroRubiksCube />
        </motion.div>
```

- [ ] **Step 3: Verify Hero.jsx has no references to removed symbols**

```bash
grep -n "SystemStatus\|terminalY\|LOG_LINES\|RubiksCube" src/components/Hero.jsx
```

Expected: **no output** (zero matches)

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "feat: replace terminal with 3D R3F Rubik's Cube in hero"
```

---

## Task 4: Verify production build

**Files:** none (verification only)

- [ ] **Step 1: Run production build**

```bash
npm run build 2>&1 | tail -25
```

Expected last lines:
```
Compiled successfully.

File sizes after gzip:
  ...
The build folder is ready to be deployed.
```

Any `ERROR` line means something broke — check the full output for the offending file.

- [ ] **Step 2: Confirm no unused-import warnings for removed symbols**

```bash
npm run build 2>&1 | grep -E "useEffect|SystemStatus|terminalY|RubiksCube"
```

Expected: **no output**

- [ ] **Step 3: Commit build confirmation note (optional — skip if CI handles this)**

```bash
git add -A
git status
```

Confirm there are no unexpected modified files. If clean:

```bash
git commit --allow-empty -m "chore: verified R3F Rubik's Cube hero build passes"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Remove `SystemStatus` terminal — Edit D
- ✅ Remove CSS cube background accent — Edit F (first replacement)
- ✅ `RoundedBox` geometry with gap — Task 2 (SIZE=0.905, gap=0.095)
- ✅ Matte dark body (`#191920`, roughness 0.80) — Task 2 `Cubie`
- ✅ Premium desaturated palette — Task 2 `FACE_COLORS`
- ✅ `ambientLight` low intensity — Task 2 `RubiksScene`
- ✅ `directionalLight` for crisp highlights — Task 2 `RubiksScene`
- ✅ `pointLight` for depth — Task 2 (two point lights)
- ✅ Auto-rotation multi-axis + delta time — Task 2 `useFrame`
- ✅ OrbitControls, zoom disabled — Task 2 `OrbitControls`
- ✅ Canvas same spatial bounds as terminal — Task 2 `max-w-[400px] aspect-square`, right column `hidden md:flex`
- ✅ No layout breakage left column — only right column modified, grid unchanged

**Placeholder scan:** No TBDs, no "similar to above", all code blocks complete.

**Type consistency:** `FACE_COLORS` keys (`px/nx/py/ny/pz/nz`) used consistently between definition and `Cubie` JSX. `SD`, `SW`, `SIZE`, `RADIUS` defined once at top, referenced once each in component.
