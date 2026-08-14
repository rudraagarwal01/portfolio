import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Loader2 } from "lucide-react";

export default function ProjectDemo({ title, tagline, steps, renderOutput, description }) {
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
        <div className="mb-8">
          <p className="text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-3">
            Live Demo
          </p>
          <h1 className="font-mono font-bold text-3xl md:text-4xl text-zinc-50 uppercase tracking-tight">
            {title}
          </h1>
          <div className="mt-3 h-[2px] w-16 bg-gradient-to-r from-blue-500 to-transparent mb-4" />
          <p className="text-zinc-400 text-sm">{tagline}</p>
        </div>

        {/* Description card */}
        {description && (
          <div className="mb-8 border border-white/8 rounded-xl overflow-hidden divide-y divide-white/8">
            <div className="p-5 space-y-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600 mb-1.5">
                  Problem
                </p>
                <p className="text-[13px] text-zinc-400 leading-relaxed">{description.problem}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600 mb-1.5">
                  Approach
                </p>
                <p className="text-[13px] text-zinc-400 leading-relaxed">{description.approach}</p>
              </div>
            </div>
            <div className="px-5 py-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                {description.stack.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded uppercase tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="font-mono text-[11px] font-semibold text-cyan-400 shrink-0">
                {description.outcome}
              </span>
            </div>
          </div>
        )}

        {/* Step pipeline */}
        <div className="mb-8 space-y-3">
          {steps.map((step, i) => {
            const done = activeStep > i;
            const active = activeStep === i && status === "running";
            return (
              <div
                key={step.label}
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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/50 text-blue-400 font-mono text-sm hover:bg-blue-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-10 cursor-pointer"
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
