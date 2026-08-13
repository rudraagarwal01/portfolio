# Project Demo Pages — Design Spec
**Date:** 2026-08-12  
**Status:** Approved

---

## Overview

Add interactive "live demo" pages to the portfolio. Each project card on the Projects page gets a "Try it" button that navigates to a dedicated route simulating that project's core interaction using mock data — no network requests, no real APIs, entirely client-side.

---

## Architecture

### Routing

Six new routes added to `App.jsx` (React Router):

```
/demos/docflow
/demos/aiechomail
/demos/mealmatch
/demos/urban-energy
/demos/authguard
/demos/fitness-genius
```

### File Layout

```
src/
  components/
    ProjectDemo.jsx          ← shared page shell
  pages/demos/
    DocFlowDemo.jsx
    AIEchoMailDemo.jsx
    MealMatchDemo.jsx
    UrbanEnergyDemo.jsx
    AuthGuardDemo.jsx
    FitnessGeniusDemo.jsx
```

### Component Responsibilities

**`ProjectDemo.jsx` (shared shell)** owns:
- Back arrow → `/#projects` (React Router `<Link>`)
- Title + tagline header
- Step pipeline: renders step list, animates sequentially on "Run demo" click
- "Run demo" pill button (disabled + spinner while running, resets on re-click)
- Result area: fades in via Framer Motion once all steps complete, renders `renderOutput()` return value

**Props interface:**
```js
{
  title: string,
  tagline: string,
  steps: [{ label: string, icon: LucideIcon }],
  renderOutput: () => JSX
}
```

**Each demo page** imports `ProjectDemo`, passes its config. All per-project mock data and JSX lives inside `renderOutput`. No shared state between demos.

**`Projects.jsx`** changes:
- Each project object in `PROJECTS_DATA` gets a `demoPath` string (e.g. `"/demos/docflow"`)
- "Try it" button added next to "Source" as a React Router `<Link>`, matching existing pill button style

---

## Visual / UX Spec

### Page Layout
- Full-height dark page: `bg-[#0a0a0e]`
- Max-width container, centered
- Top-left: `← Projects` in `font-mono text-blue-400` linking to `/#projects`
- Title: `font-mono font-bold text-3xl text-zinc-50 uppercase`
- Tagline: `text-zinc-400 text-sm`
- Thin blue gradient rule under title: `h-[2px] w-16 bg-gradient-to-r from-blue-500 to-transparent`

### Step Pipeline
- Vertical list; each row: Lucide icon + label in `font-mono text-zinc-500`
- Active step: `text-blue-400` + pulsing dot
- Completed step: cyan checkmark
- Timing: 700ms per step, `setTimeout` chain cleaned up on unmount

### "Run demo" Button
- `border border-blue-500/50 text-blue-400 font-mono text-sm px-4 py-2 rounded-full hover:bg-blue-500/20`
- Disabled + spinner while running
- Resets to idle after completion (allows re-run)

### Result Area
- Fades in: Framer Motion `opacity: 0 → 1`
- Container: `bg-zinc-950 border border-white/10 rounded-2xl p-5`
- JSON output: `font-mono text-xs text-green-400`
- Score bars: Framer Motion `animate={{ width: "X%" }}`
- SVG sparkline: blue-500 stroke, anomaly spike in red-500

---

## Per-Demo Content

### DocFlow — "Auto-Classified"
**Steps:** Upload document → OCR extraction → Bedrock classification → Route to queue  
**Output:** JSON payload
```json
{
  "invoice_id": "INV-2024-08471",
  "vendor": "Apex Industrial Supply Co.",
  "amount": "$14,302.50",
  "confidence": 0.97,
  "route_to": "accounts_payable_queue"
}
```

### AI EchoMail — "-60% Draft Time"
**Steps:** Parse note → Tone analysis → Grammar check → Compliance scan → Draft generation  
**Output:** Score panel (each score animates 0 → target) + polished email draft
- Tone: 91/100
- Grammar: 96/100
- Compliance: 88/100
- Overall: 92/100

### MealMatch — "1,000+ Listings"
**Steps:** Scan listings → Score proximity → Run match algorithm → Confirm reservation  
**Output:** Two cards side-by-side (Surplus Listing + Claimant) connected by a glowing match line, then a confirmation badge
- Listing: "Golden Garden Restaurant — 40 portions, Chinese cuisine"
- Claimant: "Sunrise Community Center — 0.8 mi away"

### Urban Energy Insights — "<200ms Reaction Time"
**Steps:** Ingest telemetry → Compute rolling baseline → Evaluate slot → (normal state)  
**Output:** SVG sparkline (20 data points); "Trigger Anomaly" button spikes line + fires red alert badge: `ALERT: Demand spike +34% above baseline`
- Chart: pure React SVG, no chart library
- Normal line: blue-500; anomaly spike: red-500

### AuthGuard Extension — "95% Detection"
**Steps:** Parse URL → Domain entropy check → Typosquat scan → Form security audit  
**Output:** Threat report
- URL: `http://paypa1-secure-login.com/verify`
- Typosquatting: HIGH (red badge)
- Insecure Form: YES (red badge)
- Phishing Score: 87/100
- Verdict: `BLOCK` (red, bold)

### Fitness Genius — "2,000+ Users"
**Steps:** Connect HealthKit → Read activity ring → Aggregate biometrics → Build snapshot  
**Output:** Weekly summary card
- Steps: 68,420
- Active Calories: 2,847 kcal
- Avg Heart Rate: 72 bpm
- Sleep: 7h 14m avg
- Each metric has a small colored progress bar

---

## Constraints

- No `fetch`, no `axios`, no external requests anywhere in demo components
- No new npm dependencies (chart = pure SVG)
- All metrics match portfolio copy (1,000+ listings, 95% detection, etc.)
- Files are `.jsx` to match existing codebase convention
