# Project Demo Pages — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add six interactive demo pages (one per project) reachable from "Try it" buttons on the Projects page, simulating each project's core interaction with mock data — no network requests, no real APIs.

**Architecture:** A shared `ProjectDemo.jsx` shell handles the step-animation loop and result reveal; each demo page imports it and passes `{ title, tagline, steps, renderOutput }`. Routes are added to `App.jsx`; the "Try it" button in `Projects.jsx` becomes a React Router `<Link>`.

**Tech Stack:** React 19, Framer Motion v12, Lucide React, React Router v7, Tailwind CSS

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `src/components/ProjectDemo.jsx` | Shared shell: back link, header, step pipeline, run button, result reveal |
| Create | `src/pages/demos/DocFlowDemo.jsx` | DocFlow mock pipeline + JSON output |
| Create | `src/pages/demos/AIEchoMailDemo.jsx` | EchoMail scoring panel + email draft |
| Create | `src/pages/demos/MealMatchDemo.jsx` | Listing + claimant cards + match confirmation |
| Create | `src/pages/demos/UrbanEnergyDemo.jsx` | SVG sparkline + anomaly trigger |
| Create | `src/pages/demos/AuthGuardDemo.jsx` | URL threat report |
| Create | `src/pages/demos/FitnessGeniusDemo.jsx` | Weekly biometric snapshot |
| Modify | `src/App.jsx` | Add 6 `/demos/*` routes |
| Modify | `src/components/Projects.jsx` | Add `demoPath` per project + "Try it" `<Link>` |

---

## Task 1: Create `ProjectDemo.jsx` — shared shell

**Files:**
- Create: `src/components/ProjectDemo.jsx`

- [ ] **Step 1: Create the file**

```jsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Loader2 } from "lucide-react";

export default function ProjectDemo({ title, tagline, steps, renderOutput }) {
  const [status, setStatus] = useState("idle"); // "idle" | "running" | "done"
  const [activeStep, setActiveStep] = useState(-1);
  const timersRef = useRef([]);

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  function runDemo() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setStatus("running");
    setActiveStep(0);

    steps.forEach((_, i) => {
      const t = setTimeout(() => {
        setActiveStep(i + 1);
        if (i === steps.length - 1) setStatus("done");
      }, 700 * (i + 1));
      timersRef.current.push(t);
    });
  }

  function reset() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setStatus("idle");
    setActiveStep(-1);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0e] px-6 py-12">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-blue-400 font-mono text-xs hover:text-blue-300 transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Projects
        </Link>

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-3">
            Live Demo
          </p>
          <h1 className="font-mono font-bold text-3xl md:text-4xl text-zinc-50 uppercase tracking-tight">
            {title}
          </h1>
          <div className="mt-3 h-[2px] w-16 bg-gradient-to-r from-blue-500 to-transparent mb-4" />
          <p className="text-zinc-400 text-sm">{tagline}</p>
        </div>

        {/* Step pipeline */}
        <div className="mb-8 space-y-3">
          {steps.map((step, i) => {
            const done = activeStep > i;
            const active = activeStep === i && status === "running";
            return (
              <div
                key={i}
                className={`flex items-center gap-3 font-mono text-sm transition-colors duration-300 ${
                  done ? "text-cyan-400" : active ? "text-blue-400" : "text-zinc-500"
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  {done ? (
                    <Check size={14} />
                  ) : active ? (
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse block" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-zinc-700 block" />
                  )}
                </div>
                <step.icon size={14} className="shrink-0" />
                {step.label}
              </div>
            );
          })}
        </div>

        {/* Run / Reset button */}
        <button
          onClick={status === "done" ? reset : runDemo}
          disabled={status === "running"}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/50 text-blue-400 font-mono text-sm hover:bg-blue-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-10"
        >
          {status === "running" && <Loader2 size={14} className="animate-spin" />}
          {status === "idle" && "Run demo"}
          {status === "running" && "Running…"}
          {status === "done" && "Reset"}
        </button>

        {/* Result */}
        {status === "done" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {renderOutput()}
          </motion.div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify it renders without errors**

Run `npm start` and visit any route — no new routes yet, just confirm the dev server compiles clean.

Expected: no compile errors in terminal.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectDemo.jsx
git commit -m "feat: add ProjectDemo shared shell component"
```

---

## Task 2: Wire routes in `App.jsx`

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Create `src/pages/demos/` and stub files first** (imports in App.jsx must resolve before saving)

```bash
mkdir -p src/pages/demos
```

Create these six files. Use the same stub template for each, changing only the function name:

`src/pages/demos/DocFlowDemo.jsx`:
```jsx
export default function DocFlowDemo() {
  return <div className="p-10 text-zinc-400 font-mono">Coming soon</div>;
}
```

`src/pages/demos/AIEchoMailDemo.jsx`:
```jsx
export default function AIEchoMailDemo() {
  return <div className="p-10 text-zinc-400 font-mono">Coming soon</div>;
}
```

`src/pages/demos/MealMatchDemo.jsx`:
```jsx
export default function MealMatchDemo() {
  return <div className="p-10 text-zinc-400 font-mono">Coming soon</div>;
}
```

`src/pages/demos/UrbanEnergyDemo.jsx`:
```jsx
export default function UrbanEnergyDemo() {
  return <div className="p-10 text-zinc-400 font-mono">Coming soon</div>;
}
```

`src/pages/demos/AuthGuardDemo.jsx`:
```jsx
export default function AuthGuardDemo() {
  return <div className="p-10 text-zinc-400 font-mono">Coming soon</div>;
}
```

`src/pages/demos/FitnessGeniusDemo.jsx`:
```jsx
export default function FitnessGeniusDemo() {
  return <div className="p-10 text-zinc-400 font-mono">Coming soon</div>;
}
```

- [ ] **Step 2: Add imports at the top of `App.jsx`** (after existing page imports)

```jsx
import DocFlowDemo from "./pages/demos/DocFlowDemo";
import AIEchoMailDemo from "./pages/demos/AIEchoMailDemo";
import MealMatchDemo from "./pages/demos/MealMatchDemo";
import UrbanEnergyDemo from "./pages/demos/UrbanEnergyDemo";
import AuthGuardDemo from "./pages/demos/AuthGuardDemo";
import FitnessGeniusDemo from "./pages/demos/FitnessGeniusDemo";
```

- [ ] **Step 3: Add routes inside the `<Routes>` block** (after the existing `/contact` route)

```jsx
<Route path="/demos/docflow" element={<DocFlowDemo />} />
<Route path="/demos/aiechomail" element={<AIEchoMailDemo />} />
<Route path="/demos/mealmatch" element={<MealMatchDemo />} />
<Route path="/demos/urban-energy" element={<UrbanEnergyDemo />} />
<Route path="/demos/authguard" element={<AuthGuardDemo />} />
<Route path="/demos/fitness-genius" element={<FitnessGeniusDemo />} />
```

- [ ] **Step 4: Verify the app compiles**

Run `npm start`. Visit `/demos/docflow` in the browser.
Expected: "Coming soon" text renders. No console errors.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx src/pages/demos/
git commit -m "feat: add demo routes and stub pages"
```

---

## Task 3: Add "Try it" button to `Projects.jsx`

**Files:**
- Modify: `src/components/Projects.jsx`

- [ ] **Step 1: Add `Link` import at the top**

```jsx
import { Link } from "react-router-dom";
```

- [ ] **Step 2: Add `demoPath` to each entry in `PROJECTS_DATA`**

```js
const PROJECTS_DATA = [
  {
    title: "Urban Energy Insights",
    // ...existing fields...
    demoPath: "/demos/urban-energy",
  },
  {
    title: "DocFlow",
    // ...existing fields...
    demoPath: "/demos/docflow",
  },
  {
    title: "AI EchoMail",
    // ...existing fields...
    demoPath: "/demos/aiechomail",
  },
  {
    title: "MealMatch",
    // ...existing fields...
    demoPath: "/demos/mealmatch",
  },
  {
    title: "AuthGuard Extension",
    // ...existing fields...
    demoPath: "/demos/authguard",
  },
  {
    title: "Fitness Genius",
    // ...existing fields...
    demoPath: "/demos/fitness-genius",
  },
];
```

- [ ] **Step 3: Add "Try it" button in the footer action row**

Find the footer action row (currently has the Source/Live `<a>` tag). Replace the entire `<div className="flex items-center justify-between mt-auto pt-2">` block with:

```jsx
<div className="flex items-center justify-between mt-auto pt-2">
  {/* Left Side Metric */}
  <div className="flex items-center text-zinc-500">
    <span className="text-[11px] font-mono font-medium group-hover:text-zinc-300 transition-colors">
      {p.primaryMetric}
    </span>
  </div>

  {/* Right Side Buttons */}
  <div className="flex items-center gap-2">
    <Link
      to={p.demoPath}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-mono font-semibold transition-all duration-300 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20"
    >
      Try it
    </Link>
    <a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-mono font-semibold transition-all duration-300 border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
    >
      <span>
        {p.link.includes("github.com") ? "Source" : "Live"}
      </span>
      <ArrowUpRight size={12} strokeWidth={2.5} />
    </a>
  </div>
</div>
```

- [ ] **Step 4: Verify in browser**

Run `npm start`. Navigate to `/projects`. 
Expected: each card has two buttons — "Try it" (cyan) and "Source" / "Live" (blue). Clicking "Try it" navigates to the stub demo page.

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects.jsx
git commit -m "feat: add Try it button to project cards"
```

---

## Task 4: `DocFlowDemo.jsx`

**Files:**
- Replace stub: `src/pages/demos/DocFlowDemo.jsx`

- [ ] **Step 1: Write the component**

```jsx
import { FileText, ScanText, BrainCircuit, GitBranch } from "lucide-react";
import ProjectDemo from "../../components/ProjectDemo";

const steps = [
  { label: "Upload document", icon: FileText },
  { label: "OCR extraction", icon: ScanText },
  { label: "Bedrock classification", icon: BrainCircuit },
  { label: "Route to queue", icon: GitBranch },
];

const mockPayload = {
  invoice_id: "INV-2024-08471",
  vendor: "Apex Industrial Supply Co.",
  amount: "$14,302.50",
  confidence: 0.97,
  route_to: "accounts_payable_queue",
};

function renderOutput() {
  return (
    <div className="bg-zinc-950 border border-white/10 rounded-2xl p-5">
      <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-3">
        Classified Payload
      </p>
      <pre className="font-mono text-xs text-green-400 leading-relaxed whitespace-pre">
        {JSON.stringify(mockPayload, null, 2)}
      </pre>
    </div>
  );
}

export default function DocFlowDemo() {
  return (
    <ProjectDemo
      title="DocFlow"
      tagline="Simulated AWS Textract + Bedrock classification pipeline"
      steps={steps}
      renderOutput={renderOutput}
    />
  );
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `/demos/docflow`. Click "Run demo". 
Expected: four steps animate with pulsing dot, each turning cyan with a checkmark. JSON payload fades in after final step.

- [ ] **Step 3: Commit**

```bash
git add src/pages/demos/DocFlowDemo.jsx
git commit -m "feat: add DocFlow demo page"
```

---

## Task 5: `AIEchoMailDemo.jsx`

**Files:**
- Replace stub: `src/pages/demos/AIEchoMailDemo.jsx`

- [ ] **Step 1: Write the component**

```jsx
import { motion } from "framer-motion";
import { FileText, Smile, CheckCircle, Shield, Wand2 } from "lucide-react";
import ProjectDemo from "../../components/ProjectDemo";

const steps = [
  { label: "Parse note", icon: FileText },
  { label: "Tone analysis", icon: Smile },
  { label: "Grammar check", icon: CheckCircle },
  { label: "Compliance scan", icon: Shield },
  { label: "Draft generation", icon: Wand2 },
];

const scores = [
  { label: "Tone", value: 91 },
  { label: "Grammar", value: 96 },
  { label: "Compliance", value: 88 },
  { label: "Overall", value: 92 },
];

const draft = `Subject: Follow-Up on Project Proposal — Q3 Partnership

Hi Sarah,

Thank you for taking the time to connect last week. I wanted to follow up on our discussion regarding the Q3 partnership opportunity.

Based on our conversation, I've outlined a preliminary scope that aligns with both teams' objectives. I'd love to schedule a 30-minute call to walk through the details and address any questions you may have.

Would Thursday at 2:00 PM EST work for you?

Best regards,
Rudra`;

function renderOutput() {
  return (
    <div className="space-y-4">
      <div className="bg-zinc-950 border border-white/10 rounded-2xl p-5">
        <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-4">
          Quality Scores
        </p>
        <div className="space-y-3">
          {scores.map(({ label, value }) => (
            <div key={label}>
              <div className="flex justify-between font-mono text-xs mb-1">
                <span className="text-zinc-400">{label}</span>
                <span className="text-blue-400">{value}/100</span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-zinc-950 border border-white/10 rounded-2xl p-5">
        <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-3">
          Generated Draft
        </p>
        <pre className="font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed">
          {draft}
        </pre>
      </div>
    </div>
  );
}

export default function AIEchoMailDemo() {
  return (
    <ProjectDemo
      title="AI EchoMail"
      tagline="GPT-4 powered email generation with multi-agent moderation — 60% faster drafting"
      steps={steps}
      renderOutput={renderOutput}
    />
  );
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `/demos/aiechomail`. Click "Run demo".
Expected: five steps animate. Score bars animate from 0 to their target widths. Draft appears below.

- [ ] **Step 3: Commit**

```bash
git add src/pages/demos/AIEchoMailDemo.jsx
git commit -m "feat: add AI EchoMail demo page"
```

---

## Task 6: `MealMatchDemo.jsx`

**Files:**
- Replace stub: `src/pages/demos/MealMatchDemo.jsx`

- [ ] **Step 1: Write the component**

```jsx
import { motion } from "framer-motion";
import { Search, MapPin, Cpu, CheckCircle } from "lucide-react";
import ProjectDemo from "../../components/ProjectDemo";

const steps = [
  { label: "Scan active listings", icon: Search },
  { label: "Score proximity", icon: MapPin },
  { label: "Run match algorithm", icon: Cpu },
  { label: "Confirm reservation", icon: CheckCircle },
];

function renderOutput() {
  return (
    <div className="bg-zinc-950 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center gap-4">
        {/* Listing card */}
        <div className="flex-1 border border-white/10 rounded-xl p-4 bg-[#0a0a0e]">
          <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider mb-2">
            Surplus Listing
          </p>
          <p className="font-mono text-sm text-zinc-100 font-bold">
            Golden Garden Restaurant
          </p>
          <p className="font-mono text-xs text-zinc-400 mt-1">40 portions · Chinese cuisine</p>
          <p className="font-mono text-xs text-zinc-500 mt-1">Pickup by 8:00 PM</p>
        </div>

        {/* Match connector */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="w-8 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400" />
          <span className="font-mono text-[9px] text-blue-400 uppercase tracking-wider">Match</span>
        </div>

        {/* Claimant card */}
        <div className="flex-1 border border-white/10 rounded-xl p-4 bg-[#0a0a0e]">
          <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider mb-2">
            Claimant
          </p>
          <p className="font-mono text-sm text-zinc-100 font-bold">
            Sunrise Community Center
          </p>
          <p className="font-mono text-xs text-zinc-400 mt-1">0.8 mi away</p>
          <p className="font-mono text-xs text-zinc-500 mt-1">Capacity: 60 people</p>
        </div>
      </div>

      {/* Confirmation badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-4 flex items-center justify-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl py-3"
      >
        <CheckCircle size={14} className="text-cyan-400" />
        <span className="font-mono text-xs text-cyan-400 font-semibold">
          Match Confirmed — 40 portions · 0.8 mi
        </span>
      </motion.div>
    </div>
  );
}

export default function MealMatchDemo() {
  return (
    <ProjectDemo
      title="MealMatch"
      tagline="Smart-matching surplus restaurant food to communities across 1,000+ active listings"
      steps={steps}
      renderOutput={renderOutput}
    />
  );
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `/demos/mealmatch`. Click "Run demo".
Expected: four steps animate. Two cards appear side-by-side with a match connector. Confirmation badge fades up after 0.4s.

- [ ] **Step 3: Commit**

```bash
git add src/pages/demos/MealMatchDemo.jsx
git commit -m "feat: add MealMatch demo page"
```

---

## Task 7: `UrbanEnergyDemo.jsx`

**Files:**
- Replace stub: `src/pages/demos/UrbanEnergyDemo.jsx`

- [ ] **Step 1: Write the component**

```jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Radio, BarChart2, Zap, Activity, AlertTriangle } from "lucide-react";
import ProjectDemo from "../../components/ProjectDemo";

const steps = [
  { label: "Ingest telemetry", icon: Radio },
  { label: "Compute rolling baseline", icon: BarChart2 },
  { label: "Evaluate slot", icon: Zap },
  { label: "Normal state", icon: Activity },
];

const BASE_POINTS = [42, 45, 43, 47, 44, 46, 45, 48, 43, 45, 47, 44, 46, 43, 45, 47, 44, 46, 45, 44];
const ANOMALY_POINTS = [42, 45, 43, 47, 44, 46, 45, 48, 43, 45, 47, 44, 46, 43, 45, 47, 78, 82, 75, 44];

const W = 480;
const H = 120;

function toPath(points) {
  const minVal = 35;
  const maxVal = 90;
  return points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * W;
      const y = H - ((v - minVal) / (maxVal - minVal)) * H;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function SparklineOutput() {
  const [points, setPoints] = useState(BASE_POINTS);
  const [alert, setAlert] = useState(false);

  function triggerAnomaly() {
    setPoints(ANOMALY_POINTS);
    setAlert(true);
  }

  function resetChart() {
    setPoints(BASE_POINTS);
    setAlert(false);
  }

  const minVal = 35;
  const maxVal = 90;
  const baselineY = H - ((45 - minVal) / (maxVal - minVal)) * H;

  return (
    <div className="bg-zinc-950 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
          Building Telemetry — Demand (kW)
        </p>
        {alert && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/40 rounded-full px-3 py-1"
          >
            <AlertTriangle size={11} className="text-red-400" />
            <span className="font-mono text-[10px] text-red-400 font-semibold">
              ALERT: Demand spike +34% above baseline
            </span>
          </motion.div>
        )}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-28">
        {/* Baseline dashed reference */}
        <line
          x1={0} y1={baselineY}
          x2={W} y2={baselineY}
          stroke="rgba(255,255,255,0.12)"
          strokeDasharray="4 4"
          strokeWidth={1}
        />
        {/* Data line */}
        <path
          d={toPath(points)}
          fill="none"
          stroke={alert ? "#ef4444" : "#3b82f6"}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Data dots */}
        {points.map((v, i) => {
          const x = (i / (points.length - 1)) * W;
          const y = H - ((v - minVal) / (maxVal - minVal)) * H;
          const isSpike = alert && v > 60;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={isSpike ? 5 : 3}
              fill={isSpike ? "#ef4444" : "#3b82f6"}
            />
          );
        })}
      </svg>

      <button
        onClick={alert ? resetChart : triggerAnomaly}
        className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/40 text-red-400 font-mono text-[11px] hover:bg-red-500/10 transition-all duration-300"
      >
        <AlertTriangle size={11} />
        {alert ? "Reset Chart" : "Trigger Anomaly"}
      </button>
    </div>
  );
}

function renderOutput() {
  return <SparklineOutput />;
}

export default function UrbanEnergyDemo() {
  return (
    <ProjectDemo
      title="Urban Energy Insights"
      tagline="Event-driven telemetry with &lt;200ms anomaly detection via Redis Streams"
      steps={steps}
      renderOutput={renderOutput}
    />
  );
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `/demos/urban-energy`. Click "Run demo".
Expected: four steps animate. SVG sparkline renders with a dashed baseline. "Trigger Anomaly" button turns three data points red and shows the alert badge. "Reset Chart" restores the blue line.

- [ ] **Step 3: Commit**

```bash
git add src/pages/demos/UrbanEnergyDemo.jsx
git commit -m "feat: add Urban Energy Insights demo page with SVG sparkline"
```

---

## Task 8: `AuthGuardDemo.jsx`

**Files:**
- Replace stub: `src/pages/demos/AuthGuardDemo.jsx`

- [ ] **Step 1: Write the component**

```jsx
import { Link2, Search, ScanFace, ShieldAlert } from "lucide-react";
import ProjectDemo from "../../components/ProjectDemo";

const steps = [
  { label: "Parse URL", icon: Link2 },
  { label: "Domain entropy check", icon: Search },
  { label: "Typosquat scan", icon: ScanFace },
  { label: "Form security audit", icon: ShieldAlert },
];

const threats = [
  { label: "Typosquatting", value: "HIGH", variant: "red" },
  { label: "Insecure Form", value: "YES", variant: "red" },
  { label: "Phishing Score", value: "87 / 100", variant: "orange" },
];

function renderOutput() {
  return (
    <div className="bg-zinc-950 border border-white/10 rounded-2xl p-5 space-y-4">
      <div>
        <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-2">
          Analyzed URL
        </p>
        <p className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-white/10 rounded px-3 py-2 break-all">
          http://paypa1-secure-login.com/verify
        </p>
      </div>

      <div className="space-y-2">
        {threats.map(({ label, value, variant }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="font-mono text-xs text-zinc-400">{label}</span>
            <span
              className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                variant === "red"
                  ? "bg-red-500/15 text-red-400 border-red-500/30"
                  : "bg-orange-500/15 text-orange-400 border-orange-500/30"
              }`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <span className="font-mono text-xs text-zinc-500">Verdict</span>
        <span className="font-mono text-sm font-bold text-red-400 tracking-widest">BLOCK</span>
      </div>
    </div>
  );
}

export default function AuthGuardDemo() {
  return (
    <ProjectDemo
      title="AuthGuard Extension"
      tagline="Real-time phishing and typosquatting detection with 95% accuracy"
      steps={steps}
      renderOutput={renderOutput}
    />
  );
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `/demos/authguard`. Click "Run demo".
Expected: four steps animate. Threat report fades in — URL shown, three colored badges, BLOCK verdict.

- [ ] **Step 3: Commit**

```bash
git add src/pages/demos/AuthGuardDemo.jsx
git commit -m "feat: add AuthGuard demo page"
```

---

## Task 9: `FitnessGeniusDemo.jsx`

**Files:**
- Replace stub: `src/pages/demos/FitnessGeniusDemo.jsx`

- [ ] **Step 1: Write the component**

```jsx
import { motion } from "framer-motion";
import { Heart, Footprints, Flame, Moon } from "lucide-react";
import ProjectDemo from "../../components/ProjectDemo";

const steps = [
  { label: "Connect HealthKit", icon: Heart },
  { label: "Read activity ring", icon: Footprints },
  { label: "Aggregate biometrics", icon: Flame },
  { label: "Build snapshot", icon: Moon },
];

const metrics = [
  { label: "Steps", value: "68,420", sub: "/ 88k goal", progress: 78, gradient: "from-blue-500 to-cyan-400" },
  { label: "Active Calories", value: "2,847", sub: "kcal", progress: 91, gradient: "from-orange-500 to-amber-400" },
  { label: "Avg Heart Rate", value: "72", sub: "bpm", progress: 60, gradient: "from-red-500 to-rose-400" },
  { label: "Avg Sleep", value: "7h 14m", sub: "/ night", progress: 85, gradient: "from-violet-500 to-purple-400" },
];

function renderOutput() {
  return (
    <div className="bg-zinc-950 border border-white/10 rounded-2xl p-5">
      <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-4">
        Weekly Biometric Snapshot
      </p>
      <div className="space-y-4">
        {metrics.map(({ label, value, sub, progress, gradient }) => (
          <div key={label}>
            <div className="flex justify-between font-mono text-xs mb-1">
              <span className="text-zinc-400">{label}</span>
              <span className="text-zinc-100">
                {value} <span className="text-zinc-500">{sub}</span>
              </span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FitnessGeniusDemo() {
  return (
    <ProjectDemo
      title="Fitness Genius"
      tagline="Native iOS fitness app integrating Apple HealthKit for 2,000+ users"
      steps={steps}
      renderOutput={renderOutput}
    />
  );
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `/demos/fitness-genius`. Click "Run demo".
Expected: four steps animate. Four metric rows appear with animated progress bars in distinct gradient colors.

- [ ] **Step 3: Final end-to-end check**

Visit `/projects`. Confirm all six cards show both "Try it" (cyan) and "Source"/"Live" (blue) buttons. Click each "Try it", run each demo, click "Reset" — verify the pipeline resets cleanly. Click "← Projects" — confirm navigation back to `/projects`.

- [ ] **Step 4: Commit**

```bash
git add src/pages/demos/FitnessGeniusDemo.jsx
git commit -m "feat: add Fitness Genius demo page"
```
