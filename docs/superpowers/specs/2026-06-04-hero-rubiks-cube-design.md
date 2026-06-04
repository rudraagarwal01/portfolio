# Hero Rubik's Cube — Design Spec
**Date:** 2026-06-04
**Status:** Approved

## Goal
Replace the `SystemStatus` terminal widget on the hero's right column with a realistic, interactive 3D Rubik's Cube rendered via `@react-three/fiber` + `@react-three/drei`. The cube should act as a dynamic visual centerpiece that complements the dark space/cyberpunk theme without competing with the left-column typography.

---

## What Gets Removed
| Item | Location |
|------|----------|
| `LOG_LINES` constant | `Hero.jsx` top-level |
| `SystemStatus` function component | `Hero.jsx` |
| `terminalY` useTransform | `Hero.jsx` Hero() function |
| CSS `RubiksCube` background-accent `<motion.div>` | `Hero.jsx` (added in prior session) |
| `import RubiksCube from "./RubiksCube"` | `Hero.jsx` |

`RubiksCube.jsx` (CSS cube) can remain in the file tree but is no longer imported/used.

---

## New File: `src/components/HeroRubiksCube.jsx`

### Component Structure
```
HeroRubiksCube (default export)
  └── <Canvas> (R3F)
        └── RubiksScene
              ├── Lights (4)
              ├── <group ref> (auto-rotating cube)
              │     └── 27× Cubie
              │           ├── <RoundedBox> body
              │           └── up to 3× Sticker <mesh>
              └── <OrbitControls>
```

### Geometry
- **Body:** `<RoundedBox>` from drei — size `0.905³`, radius `0.055`, smoothness `3`
- **Gap between cubies:** `0.095` per side (total `0.19` between adjacent faces)
- **Stickers:** `<planeGeometry args={[0.76, 0.76]}>` offset `size/2 + 0.003` from face center; 54 total
- **Body material:** `#191920`, roughness `0.80`, metalness `0.20`
- **Sticker material:** roughness `0.20`, metalness `0.0`, emissiveIntensity `0.06`

### Color Palette (premium, slightly desaturated)
| Face | Direction | Hex | Description |
|------|-----------|-----|-------------|
| Front | +Z | `#2E72CC` | Steel blue — echoes site accent |
| Back | −Z | `#C96A35` | Terracotta orange |
| Right | +X | `#C84B4B` | Muted crimson |
| Left | −X | `#3DA05A` | Sage green |
| Top | +Y | `#D8D8D0` | Pearl white |
| Bottom | −Y | `#D4902A` | Warm amber |

### Lighting (three-point)
```
ambientLight    intensity=0.40  color="#dde8ff"          — cool diffuse fill
directionalLight pos=[8,10,6]   intensity=1.35           — key light, crisp highlights
pointLight      pos=[-5,-4,-5]  intensity=0.55 color="#3355ee" — cyberpunk blue rim
pointLight      pos=[4,6,4]     intensity=0.22           — soft bounce fill
```

### Motion
- **Auto-rotation:** `useFrame` delta-based — `rotation.y += delta * 0.38`, `rotation.x += delta * 0.13`
- **Initial angle:** `[0.30, 0.50, 0]` — shows top + front + right faces simultaneously
- **Interaction pause:** `isInteracting` ref set in `OrbitControls.onStart`; cleared 1.2 s after `onEnd`
- **OrbitControls:** `enableZoom={false}`, `enablePan={false}`, `enableDamping`, `dampingFactor=0.07`

### Canvas Config
```jsx
<Canvas
  camera={{ position: [0, 0, 6.5], fov: 38 }}
  gl={{ antialias: true, alpha: true }}   // transparent — stars show through
  dpr={[1, 2]}
>
```

### Layout Wrapper
```jsx
<div className="w-full aspect-square max-w-[400px] mx-auto">
```
Square, responsive, `max-w-[400px]` (slightly narrower than original terminal's `max-w-md`).

---

## Hero.jsx Changes
1. Remove items listed in "What Gets Removed" above
2. Add `import HeroRubiksCube from "./HeroRubiksCube"`
3. Right-column `<motion.div>`: remove `style={{ y: terminalY }}`, add entrance animation:
   ```jsx
   initial={{ opacity: 0, x: 24 }}
   animate={{ opacity: 1, x: 0 }}
   transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
   ```
4. Replace `<SystemStatus />` with `<HeroRubiksCube />`

---

## Dependencies to Install
```
npm install three @react-three/fiber @react-three/drei
```

---

## Non-Goals
- No Rubik's cube solve animation
- No individual cubie rotation (cube is always "solved" state)
- No mobile 3D canvas (right column remains `hidden md:flex`, cube invisible on mobile)
