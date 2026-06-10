# Certifications Badge Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace flat cert cards with mouse-tracked 3D tilt cards featuring a holographic shimmer overlay and logo glow ring.

**Architecture:** Single file rewrite of `CertCard` in `Certifications.jsx`. All motion state lives inside the component using framer-motion v12 primitives (`useMotionValue`, `useTransform`, `useSpring`). No new dependencies, no new files.

**Tech Stack:** React 19, framer-motion v12, Tailwind CSS v3

---

### Task 1: Add motion imports and 3D tilt to CertCard

**Files:**
- Modify: `src/components/Certifications.jsx`

- [ ] **Step 1: Replace the import line**

Current line 1:
```jsx
import { motion } from "framer-motion";
```
Replace with:
```jsx
import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
```

- [ ] **Step 2: Add tilt motion values inside CertCard (above the cardBody JSX)**

Add this block at the top of the `CertCard` function body, before the `isVerified` / `isInProgress` lines:

```jsx
const cardRef   = useRef(null);
const [hovered, setHovered] = useState(false);

const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 400, damping: 30 });
const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 400, damping: 30 });

const shimmerPos = useTransform(mouseX, [-0.5, 0.5], ["-60%", "160%"]);
// Derive the full gradient string as a MotionValue so it can be passed to style without breaking hooks rules
const shimmerGradient = useTransform(
  shimmerPos,
  (x) =>
    `linear-gradient(105deg, transparent calc(${x} - 20%), rgba(59,130,246,0.10) ${x}, rgba(139,92,246,0.07) calc(${x} + 12%), rgba(6,182,212,0.08) calc(${x} + 24%), transparent calc(${x} + 44%))`
);

const handleMouseMove = (e) => {
  const rect = cardRef.current?.getBoundingClientRect();
  if (!rect) return;
  mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
  mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
};

const handleMouseLeave = () => {
  mouseX.set(0);
  mouseY.set(0);
  setHovered(false);
};

const handleMouseEnter = () => setHovered(true);
```

- [ ] **Step 3: Wrap cardBody in a perspective container**

Replace the existing `const cardBody = (...)` outer div:

```jsx
const cardBody = (
  <div style={{ perspective: "1200px" }}>
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="relative group rounded-2xl overflow-hidden backdrop-blur-md border border-white/5 hover:border-white/20 bg-[#141418]/60 transition-colors duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
    >
      {/* Holographic shimmer overlay — added in Task 2 */}

      <div className="p-6 md:p-7">
        {/* card content — unchanged from current */}
      </div>

      {/* status bar — unchanged from current */}
    </motion.div>
  </div>
);
```

Keep all internal card content (logo row, badges, focus areas, status bar) exactly as it is — only the outer wrapper changes.

- [ ] **Step 4: Verify dev server starts without errors**

```bash
cd /Users/rudraagarwal/portfolio && npm start
```

Expected: compiles with no errors, cards visible in browser. Tilt won't be obvious yet without the shimmer — verify the cards still render correctly before continuing.

- [ ] **Step 5: Commit**

```bash
git add src/components/Certifications.jsx
git commit -m "feat(certs): add mouse-tracked 3D tilt with perspective wrapper"
```

---

### Task 2: Add holographic shimmer overlay

**Files:**
- Modify: `src/components/Certifications.jsx`

- [ ] **Step 1: Insert shimmer overlay as first child of the motion.div**

Inside the `motion.div` from Task 1, add this as the first child (before the `<div className="p-6 md:p-7">`):

```jsx
{/* Holographic shimmer — shimmerGradient is a MotionValue defined at top of CertCard */}
<motion.div
  aria-hidden
  className="pointer-events-none absolute inset-0 rounded-2xl z-10"
  animate={{ opacity: hovered ? 1 : 0 }}
  transition={{ duration: 0.2 }}
  style={{ background: shimmerGradient }}
/>
```

- [ ] **Step 2: Verify shimmer in browser**

Open the certifications section. Hover a card and move the mouse left/right — you should see a faint blue-violet-cyan diagonal streak slide across the card following your cursor. It should be subtle, not garish.

- [ ] **Step 3: Commit**

```bash
git add src/components/Certifications.jsx
git commit -m "feat(certs): add holographic shimmer overlay driven by mouseX"
```

---

### Task 3: Logo glow ring on hover

**Files:**
- Modify: `src/components/Certifications.jsx`

- [ ] **Step 1: Replace the static logo `<img>` container div with a motion.div**

Find this in `cardBody`:
```jsx
<img
  src={`/logos/${cert.logo}`}
  alt={`${cert.issuer} logo`}
  className="w-10 h-10 rounded-xl border border-white/8 object-contain p-1.5 bg-[#1e1e24] flex-shrink-0"
  ...
/>
```

Wrap just the logo container (the `<img>` + its fallback `<div>`) in a `motion.div`:

```jsx
<motion.div
  className="flex-shrink-0"
  whileHover={{
    boxShadow: "0 0 0 2px rgba(59,130,246,0.45), 0 0 22px rgba(59,130,246,0.18)",
  }}
  transition={{ duration: 0.2 }}
  style={{ borderRadius: "0.75rem" }}
>
  <img
    src={`/logos/${cert.logo}`}
    alt={`${cert.issuer} logo`}
    className="w-14 h-14 rounded-xl border border-white/8 object-contain p-2 bg-[#1e1e24]"
    onError={(e) => {
      e.target.style.display = "none";
      e.target.nextSibling.style.display = "flex";
    }}
  />
  <div
    style={{ display: "none" }}
    className="w-14 h-14 rounded-xl border border-white/8 bg-[#1e1e24] items-center justify-center text-blue-400 font-bold text-sm"
  >
    {cert.issuer.charAt(0)}
  </div>
</motion.div>
```

Note: logo size bumped from `w-10 h-10` to `w-14 h-14` and padding from `p-1.5` to `p-2`.

- [ ] **Step 2: Verify in browser**

Hover a card — the logo container should get a soft blue ring + diffuse glow. It should appear when the whole card is hovered (the `whileHover` on this inner element triggers independently of the card tilt).

- [ ] **Step 3: Commit**

```bash
git add src/components/Certifications.jsx
git commit -m "feat(certs): add logo glow ring and bump logo size to 14"
```

---

### Task 4: Final visual QA and cleanup

**Files:**
- Modify: `src/components/Certifications.jsx`

- [ ] **Step 1: Visual check — tilt**

Hover each of the 4 cards and move the mouse to all four corners. The card should tilt ~7° toward the mouse with a smooth spring snap-back when you leave.

- [ ] **Step 2: Visual check — shimmer**

On each verified card, move the mouse slowly left-to-right. A faint diagonal shimmer should sweep across. On the in-progress card, same behavior.

- [ ] **Step 3: Visual check — logo glow**

Logo ring should appear on hover and disappear on leave. Glow should not be so bright it looks like a bug.

- [ ] **Step 4: Visual check — entry animation**

Scroll the certifications section out of view, then back in. Cards should still do the `x:-24→0, opacity:0→1` slide-in stagger as before.

- [ ] **Step 5: Visual check — mobile (375px)**

In Chrome DevTools, set viewport to 375px wide. Cards should still be readable, no horizontal overflow. Tilt effect won't fire on touch but layout should be clean.

- [ ] **Step 6: Commit**

```bash
git add src/components/Certifications.jsx
git commit -m "feat(certs): 3D tilt + holographic shimmer + logo glow — complete"
```
