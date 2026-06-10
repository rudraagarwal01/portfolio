# Certifications Section — 3D Tilt + Holographic Shimmer Redesign

**Date:** 2026-06-10  
**Status:** Approved  
**Scope:** `src/components/Certifications.jsx` only

---

## Goal

Upgrade the certifications section from plain dark cards to visually distinctive credential cards with mouse-tracked 3D tilt and a holographic shimmer effect, while preserving the site's OLED dark / `font-mono` / blue-accent design language.

---

## Component Architecture

Single file: `Certifications.jsx`. No new files or dependencies needed — everything uses framer-motion v12 APIs already installed.

**CertCard** receives `cert` data and `i` (index for stagger delay). It owns all motion state internally.

---

## Motion Implementation

### 3D Tilt
- `useRef` on the card DOM node to compute mouse position
- `useMotionValue` for `mouseX` and `mouseY` (normalized `-0.5 → 0.5`)
- `useTransform` maps to `rotateX` (±7°) and `rotateY` (±7°)
- `useSpring` wraps both with `{ stiffness: 400, damping: 30 }` for smooth snap-back
- Applied to inner `motion.div` via `style={{ rotateX, rotateY }}`
- Outer wrapper holds `style={{ perspective: "1200px" }}`
- `onMouseMove` updates motion values; `onMouseLeave` resets to `0`

### Holographic Shimmer
- Absolutely-positioned `motion.div` overlay, `pointer-events-none`, `rounded-2xl`, `inset-0`
- `opacity` animates `0 → 1` on hover via framer `animate` prop, driven by React `useState` hover flag
- Background: diagonal gradient `105deg`, colors `blue-500/12 → violet-500/8 → cyan-400/10 → transparent`
- Gradient `backgroundPosition` driven by `mouseX` via `useTransform` — shimmer slides laterally as mouse moves
- Implemented as inline `style` on the overlay div

### Logo Glow Ring
- Logo container: `w-14 h-14`, `bg-[#1e1e24]`, `rounded-xl`
- `whileHover={{ boxShadow: "0 0 0 2px rgba(59,130,246,0.45), 0 0 20px rgba(59,130,246,0.2)" }}`
- Transition: `{ duration: 0.2 }`

### Card Hover Lift
- `whileHover={{ y: -2 }}` on the outer wrapper
- Border lifts from `white/5` → `white/20` via CSS group-hover
- Box shadow: `0 20px 60px rgba(0,0,0,0.55)` on hover via CSS

---

## Entry Animation

Unchanged from current — `initial: { opacity: 0, x: -24 }`, `whileInView: { opacity: 1, x: 0 }`, `once: true`, `delay: i * 0.04`. Consistent with Experience section.

---

## Layout

Vertical stack unchanged (`flex flex-col gap-4`). Card internal layout unchanged (logo left, text center, badge right, status bar footer).

---

## Data

No data changes. `certs` array stays as-is.

---

## What Does NOT Change

- Section header (label, h2, blue underline bar)
- Status bar footer pattern
- Verified / In-Progress badges
- Logo `<img>` with letter fallback
- Responsive behavior
- Link wrapping for verified certs
