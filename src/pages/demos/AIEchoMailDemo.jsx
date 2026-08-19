import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  LayoutTemplate,
  Clock,
  Settings,
  Inbox,
  CheckCircle2,
  XCircle,
  Send,
  Sparkles,
  Scissors,
  FileText,
  ChevronsUpDown,
} from "lucide-react";
import { DEMO_DESCRIPTIONS } from "../../lib/projectDemoConfigs";

const CIRCUM = 238.76; // 2π × 38

// ── Drafts ─────────────────────────────────────────────────────
const DRAFT_V1 = `Subject: Q3 Report Delay – My Bad

Hey [Client Name],

So about that Q3 report deadline – yeah, I dropped the ball on that one. Things got pretty hectic on our end and the report just didn't make it out on time. Really sorry about that.

New date: we'll have everything to you by November 15th. Should be solid by then.

Sorry again for the hassle.

Best,
Rudra`;

const DRAFT_V2 = `Subject: Apology for Q3 Report Delay & Revised Timeline

Dear [Client Name],

I want to sincerely apologize for missing the Q3 report deadline. I understand this may have impacted your planning, and I take full responsibility for the delay.

We are committed to delivering the complete report by November 15th. I will personally ensure it meets the expected standard and will provide a progress update by November 10th.

Thank you for your patience and understanding.

Sincerely,
Rudra Agarwal`;

const DRAFT_V3 = `Subject: Apology for Q3 Report Delay & Revised Timeline

Dear [Client Name],

I sincerely apologize for missing the Q3 report deadline and understand this impacted your planning.

We will deliver the complete report by November 15th, with a brief progress update on November 10th.

Thank you for your patience.

Sincerely,
Rudra Agarwal`;

// ── Scores ─────────────────────────────────────────────────────
const SCORES = [
  [
    { label: "Tone",       value: 58, stroke: "#f87171", flag: true  },
    { label: "Grammar",    value: 96, stroke: "#34d399", flag: false },
    { label: "Length",     value: 91, stroke: "#34d399", flag: false },
    { label: "Compliance", value: 94, stroke: "#34d399", flag: false },
  ],
  [
    { label: "Tone",       value: 94, stroke: "#34d399", flag: false },
    { label: "Grammar",    value: 96, stroke: "#34d399", flag: false },
    { label: "Length",     value: 89, stroke: "#34d399", flag: false },
    { label: "Compliance", value: 94, stroke: "#34d399", flag: false },
  ],
];

const OVERALL = [
  { value: 72, stroke: "#fbbf24" },
  { value: 93, stroke: "#34d399" },
];

// ── RAG ────────────────────────────────────────────────────────
const RAG_ENTRIES = [
  { sim: "0.81", file: "deadline-apology-enterprise.eml",    tone: "apologetic",         purpose: "deadline notice"  },
  { sim: "0.74", file: "missed-delivery-followup.eml",       tone: "apologetic",         purpose: "client recovery"  },
  { sim: "0.69", file: "project-delay-notification.eml",     tone: "neutral-professional", purpose: "status update"  },
];

// ── Critique ───────────────────────────────────────────────────
const CRITIQUE = [
  {
    pass: false,
    label: "Tone Mismatch",
    detail: "Expected: apologetic, professional\nFound: casual, informal (\"Hey\", \"My Bad\")\nImpact: High — client may perceive lack of accountability",
  },
  { pass: true, label: "Grammar",    detail: "All structures correct." },
  { pass: true, label: "Length",     detail: "Appropriate for context." },
  { pass: true, label: "Compliance", detail: "No restricted language detected." },
];

// ── Nav ────────────────────────────────────────────────────────
const NAV = [
  { label: "Compose",   icon: Mail           },
  { label: "Templates", icon: LayoutTemplate },
  { label: "History",   icon: Clock          },
  { label: "Settings",  icon: Settings       },
  { label: "Inbox",     icon: Inbox          },
];

const TONES = ["Formal", "Apology", "Professional", "Friendly"];

// ── Score ring component ───────────────────────────────────────
function Ring({ label, value, stroke, flag, go, delay = 0, sv }) {
  const offset = CIRCUM - (value / 100) * CIRCUM;
  const textColor = flag ? "#f87171" : value >= 80 ? "#34d399" : "#fbbf24";
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-[68px] h-[68px]">
        <svg viewBox="0 0 84 84" className="w-full h-full -rotate-90">
          <circle cx="42" cy="42" r="38" fill="none" stroke="#1a1a2e" strokeWidth="6" />
          <motion.circle
            key={`ring-${label}-${sv}`}
            cx="42" cy="42" r="38"
            fill="none"
            stroke={stroke}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUM}
            initial={{ strokeDashoffset: CIRCUM }}
            animate={{ strokeDashoffset: go ? offset : CIRCUM }}
            transition={{ duration: 1.1, ease: "easeOut", delay }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={`val-${label}-${sv}`}
            className="text-[13px] font-mono font-bold leading-none"
            style={{ color: textColor }}
            initial={{ opacity: 0 }}
            animate={{ opacity: go ? 1 : 0 }}
            transition={{ delay: delay + 0.55 }}
          >
            {value}
          </motion.span>
          {flag && go && (
            <span className="text-[8px] text-red-400 font-mono mt-0.5 leading-none">LOW</span>
          )}
        </div>
      </div>
      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}

// ── Pulse dot ─────────────────────────────────────────────────
function PulseDot({ label, onClick, color = "blue", disabled = false }) {
  const dotCls =
    color === "amber"
      ? "bg-amber-400/80 ring-amber-400/30"
      : "bg-blue-400/80 ring-blue-400/30";
  const textCls = color === "amber" ? "text-amber-400" : "text-blue-400";
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={`flex items-center gap-2 group ${disabled ? "opacity-50 cursor-default" : "cursor-pointer"}`}
    >
      <span className={`w-2.5 h-2.5 rounded-full ring-4 animate-pulse block ${dotCls}`} />
      <span className={`font-mono text-xs ${textCls} ${!disabled ? "group-hover:underline" : ""}`}>
        {label}
      </span>
    </button>
  );
}

// ── Main demo ─────────────────────────────────────────────────
export default function AIEchoMailDemo() {
  // phase 0: idle
  // phase 1: streaming
  // phase 2: rings visible
  // phase 3: critique dot visible
  // phase 4: critique panel open
  // phase 5: revise dot visible
  // phase 6: revised draft + rings re-animate
  // phase 7: refinement row visible
  // phase 8: shortened
  // phase 9: gmail success
  const [phase, setPhase]       = useState(0);
  const [streamed, setStreamed]  = useState("");
  const [sv, setSv]             = useState(0); // score version 0|1
  const [dv, setDv]             = useState(1); // draft version 1|2|3
  const [ragVisible, setRagVis] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [gmailOk, setGmailOk]   = useState(false);
  const timers = useRef([]);
  const iRef   = useRef(null);

  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
    if (iRef.current) clearInterval(iRef.current);
  }, []);

  function later(fn, ms) {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  }

  function handleGenerate() {
    if (phase !== 0) return;
    setPhase(1);
    setStreamed("");
    let idx = 0;
    iRef.current = setInterval(() => {
      idx = Math.min(idx + 5, DRAFT_V1.length);
      setStreamed(DRAFT_V1.slice(0, idx));
      if (idx >= DRAFT_V1.length) {
        clearInterval(iRef.current);
        later(() => {
          setPhase(2);                              // rings animate
          later(() => setRagVis(true), 700);        // RAG panel
          later(() => setPhase(3), 1600);           // critique dot
        }, 350);
      }
    }, 22);
  }

  function handleCritique() {
    if (phase !== 3) return;
    setPhase(4);
    later(() => setPhase(5), 700); // revise dot
  }

  function handleRevise() {
    if (phase !== 5) return;
    setPhase(6);
    setDv(2);
    setSv(1);
    setHighlight(true);
    later(() => setHighlight(false), 2000);
    later(() => setPhase(7), 1500);
  }

  function handleShorten() {
    if (phase < 7) return;
    setDv(3);
    setPhase(8);
  }

  function handleGmail() {
    setGmailOk(true);
    setPhase(9);
  }

  function handleReset() {
    timers.current.forEach(clearTimeout);
    if (iRef.current) clearInterval(iRef.current);
    setPhase(0);
    setStreamed("");
    setSv(0);
    setDv(1);
    setRagVis(false);
    setHighlight(false);
    setGmailOk(false);
  }

  const scores      = SCORES[sv];
  const overall     = OVERALL[sv];
  const ringsGo     = phase >= 2;
  const draftToShow = phase === 1 ? streamed : (dv === 1 ? DRAFT_V1 : dv === 2 ? DRAFT_V2 : DRAFT_V3);
  const desc        = DEMO_DESCRIPTIONS.aiEchoMail;

  return (
    <div className="min-h-screen bg-[#0a0a0e] px-4 sm:px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-blue-400 font-mono text-xs hover:text-blue-300 transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Projects
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-3">Live Demo</p>
          <h1 className="font-mono font-bold text-3xl md:text-4xl text-zinc-50 uppercase tracking-tight">
            AI EchoMail
          </h1>
          <div className="mt-3 h-[2px] w-16 bg-gradient-to-r from-blue-500 to-transparent mb-4" />
          <p className="text-zinc-400 text-sm">
            Three-stage agentic loop — draft, critique, revise — with live scoring rings and RAG context retrieval
          </p>
        </div>

        {/* Description card */}
        {desc && (
          <div className="mb-8 border border-white/8 rounded-xl overflow-hidden divide-y divide-white/8">
            <div className="p-5 space-y-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600 mb-1.5">Problem</p>
                <p className="text-[13px] text-zinc-400 leading-relaxed">{desc.problem}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600 mb-1.5">Approach</p>
                <p className="text-[13px] text-zinc-400 leading-relaxed">{desc.approach}</p>
              </div>
            </div>
            <div className="px-5 py-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                {desc.stack.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded uppercase tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="font-mono text-[11px] font-semibold text-cyan-400 shrink-0">
                {desc.outcome}
              </span>
            </div>
          </div>
        )}

        {/* App shell */}
        <div className="border border-white/10 rounded-2xl overflow-hidden bg-zinc-950">

          {/* Window chrome bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 bg-zinc-950/90">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
            <span className="ml-3 font-mono text-[10px] text-zinc-600 tracking-wider">
              AI EchoMail — Compose
            </span>
          </div>

          <div className="flex min-h-[460px]">

            {/* Sidebar */}
            <div className="w-36 sm:w-44 shrink-0 border-r border-white/8 p-3 flex flex-col gap-0.5">
              <p className="font-mono text-[8px] text-zinc-700 uppercase tracking-widest px-2 pt-2 pb-1.5">
                Navigation
              </p>
              {NAV.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-colors select-none ${
                    label === "Compose"
                      ? "bg-blue-500/15 text-blue-400"
                      : "text-zinc-700 hover:text-zinc-500"
                  }`}
                >
                  <Icon size={11} />
                  {label}
                </div>
              ))}
            </div>

            {/* Compose pane */}
            <div className="flex-1 p-5 space-y-5 min-w-0 overflow-hidden">

              {/* Tone pills */}
              <div>
                <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mb-2">Tone</p>
                <div className="flex flex-wrap gap-2">
                  {TONES.map((t) => (
                    <span
                      key={t}
                      className={`px-3 py-1 rounded-full text-xs font-mono border select-none ${
                        t === "Apology"
                          ? "border-blue-500/60 bg-blue-500/12 text-blue-400"
                          : "border-white/10 text-zinc-600"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prompt */}
              <div>
                <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mb-2">Prompt</p>
                <div className="bg-zinc-900/70 border border-white/8 rounded-lg p-3 font-mono text-xs text-zinc-400 leading-relaxed">
                  Missed the client deadline for the Q3 report, need to apologize and give a new date
                </div>
              </div>

              {/* Action row */}
              <div className="flex items-center gap-3">
                {phase === 0 ? (
                  <button
                    onClick={handleGenerate}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/50 text-blue-400 font-mono text-sm hover:bg-blue-500/20 transition-all duration-300 cursor-pointer"
                  >
                    <Sparkles size={13} />
                    Generate
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-700/60 text-zinc-600 font-mono text-xs hover:border-zinc-500 hover:text-zinc-400 transition-all cursor-pointer"
                  >
                    Reset
                  </button>
                )}
                {phase === 1 && (
                  <span className="font-mono text-xs text-zinc-600 animate-pulse">Generating draft…</span>
                )}
              </div>

              {/* Everything below Generate */}
              <AnimatePresence>
                {phase >= 1 && (
                  <motion.div
                    key="output"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-5"
                  >
                    {/* Draft box */}
                    <div>
                      <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mb-2">Draft</p>
                      <motion.div
                        className="rounded-lg border p-4"
                        animate={{
                          borderColor: highlight
                            ? "rgba(251,191,36,0.35)"
                            : "rgba(255,255,255,0.08)",
                          backgroundColor: highlight
                            ? "rgba(251,191,36,0.03)"
                            : "rgba(0,0,0,0)",
                        }}
                        transition={{ duration: 0.35 }}
                      >
                        <pre className="font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed">
                          {phase >= 2 ? draftToShow : streamed}
                          {phase === 1 && (
                            <span className="inline-block w-0.5 h-3.5 bg-blue-400 ml-0.5 animate-pulse align-middle" />
                          )}
                        </pre>
                      </motion.div>
                    </div>

                    {/* Scores + RAG row */}
                    <AnimatePresence>
                      {phase >= 2 && (
                        <motion.div
                          key="scores-rag"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                          {/* Scoring rings panel */}
                          <div className="bg-zinc-900/50 border border-white/8 rounded-xl p-4">
                            <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mb-4">
                              Quality Scores
                            </p>
                            {/* 4 rings in a row */}
                            <div className="grid grid-cols-4 gap-1 mb-3">
                              {scores.map((s, i) => (
                                <Ring
                                  key={`ring-${s.label}-${sv}`}
                                  {...s}
                                  go={ringsGo}
                                  delay={i * 0.12}
                                  sv={sv}
                                />
                              ))}
                            </div>
                            {/* Overall ring centered below */}
                            <div className="border-t border-white/6 pt-3 flex justify-center">
                              <div className="flex flex-col items-center gap-1.5">
                                <div className="relative w-14 h-14">
                                  <svg viewBox="0 0 84 84" className="w-full h-full -rotate-90">
                                    <circle cx="42" cy="42" r="38" fill="none" stroke="#1a1a2e" strokeWidth="6" />
                                    <motion.circle
                                      key={`overall-${sv}`}
                                      cx="42" cy="42" r="38"
                                      fill="none"
                                      stroke={overall.stroke}
                                      strokeWidth="6"
                                      strokeLinecap="round"
                                      strokeDasharray={CIRCUM}
                                      initial={{ strokeDashoffset: CIRCUM }}
                                      animate={{
                                        strokeDashoffset: ringsGo
                                          ? CIRCUM - (overall.value / 100) * CIRCUM
                                          : CIRCUM,
                                      }}
                                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.span
                                      key={`oval-${sv}`}
                                      className="text-xs font-mono font-bold"
                                      style={{ color: sv === 0 ? "#fbbf24" : "#34d399" }}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: ringsGo ? 1 : 0 }}
                                      transition={{ delay: 1.1 }}
                                    >
                                      {overall.value}
                                    </motion.span>
                                  </div>
                                </div>
                                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                                  Overall
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* RAG inspector panel */}
                          <AnimatePresence>
                            {ragVisible && (
                              <motion.div
                                key="rag"
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4 }}
                                className="bg-zinc-900/50 border border-white/8 rounded-xl p-4"
                              >
                                <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mb-3">
                                  RAG Context
                                </p>
                                <div className="space-y-3.5">
                                  {RAG_ENTRIES.map((r, i) => (
                                    <motion.div
                                      key={r.file}
                                      initial={{ opacity: 0, x: -6 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.1 + i * 0.14 }}
                                    >
                                      <div className="flex items-center gap-2 mb-0.5">
                                        <span className="font-mono text-[11px] font-bold text-cyan-400 tabular-nums shrink-0">
                                          {r.sim}
                                        </span>
                                        <div className="flex-1 h-0.5 bg-zinc-800 rounded-full overflow-hidden">
                                          <motion.div
                                            className="h-full bg-cyan-500/50 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${parseFloat(r.sim) * 100}%` }}
                                            transition={{ delay: 0.2 + i * 0.14, duration: 0.5 }}
                                          />
                                        </div>
                                      </div>
                                      <p className="font-mono text-[9px] text-zinc-500 truncate">{r.file}</p>
                                      <p className="font-mono text-[8px] text-zinc-700 mt-0.5">
                                        {r.tone} · {r.purpose}
                                      </p>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Pulse dots row */}
                    <AnimatePresence>
                      {phase >= 3 && (
                        <motion.div
                          key="dots"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-6"
                        >
                          <PulseDot
                            label="Critique round"
                            onClick={handleCritique}
                            color="amber"
                            disabled={phase !== 3}
                          />
                          <AnimatePresence>
                            {phase >= 5 && (
                              <motion.div
                                key="revise-dot"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                <PulseDot
                                  label="Revise"
                                  onClick={handleRevise}
                                  color="blue"
                                  disabled={phase !== 5}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Critique annotation panel */}
                    <AnimatePresence>
                      {phase >= 4 && (
                        <motion.div
                          key="critique"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35 }}
                          className="bg-zinc-900/50 border border-white/8 rounded-xl p-4"
                        >
                          <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mb-3">
                            Critique Annotations
                          </p>
                          <div className="space-y-2.5">
                            {CRITIQUE.map((c, i) => (
                              <motion.div
                                key={c.label}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.09 }}
                                className={`flex gap-2.5 p-2.5 rounded-lg border ${
                                  c.pass
                                    ? "bg-emerald-500/5 border-emerald-500/15"
                                    : "bg-red-500/7 border-red-500/25"
                                }`}
                              >
                                {c.pass
                                  ? <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                                  : <XCircle     size={13} className="text-red-400 shrink-0 mt-0.5" />}
                                <div>
                                  <p className={`font-mono text-[10px] font-semibold mb-0.5 ${
                                    c.pass ? "text-emerald-400" : "text-red-400"
                                  }`}>
                                    {c.label}
                                  </p>
                                  <p className="font-mono text-[9px] text-zinc-500 whitespace-pre-line leading-relaxed">
                                    {c.detail}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Refinement row + Gmail */}
                    <AnimatePresence>
                      {phase >= 7 && (
                        <motion.div
                          key="refine"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4"
                        >
                          <div>
                            <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mb-2">
                              Refine
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {[
                                { label: "Improve",   Icon: Sparkles         },
                                { label: "Shorten",   Icon: Scissors,  action: phase === 7 ? handleShorten : undefined },
                                { label: "Formalize", Icon: FileText         },
                                { label: "Expand",    Icon: ChevronsUpDown   },
                              ].map(({ label, Icon, action }) => (
                                <button
                                  key={label}
                                  onClick={action}
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-mono transition-all duration-300 ${
                                    phase === 8 && label === "Shorten"
                                      ? "border-cyan-500/50 text-cyan-400 bg-cyan-500/10 cursor-default"
                                      : action
                                      ? "border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300 cursor-pointer"
                                      : "border-white/8 text-zinc-700 cursor-default"
                                  }`}
                                >
                                  <Icon size={10} />
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Gmail button / success */}
                          {!gmailOk ? (
                            <motion.button
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              onClick={handleGmail}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white font-mono text-xs hover:bg-blue-500 transition-all duration-300 cursor-pointer"
                            >
                              <Send size={12} />
                              Push to Gmail
                            </motion.button>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 font-mono text-xs"
                            >
                              <CheckCircle2 size={12} />
                              Saved to Gmail Drafts
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
