import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, BarChart2, Activity, AlertTriangle, CheckCircle2 } from "lucide-react";
import ProjectDemo from "../../components/ProjectDemo";
import { DEMO_DESCRIPTIONS } from "../../lib/projectDemoConfigs";

const steps = [
  { label: "Ingest telemetry stream", icon: Radio },
  { label: "Compute rolling baseline", icon: BarChart2 },
  { label: "Monitor demand slots", icon: Activity },
  { label: "Alert on anomaly", icon: AlertTriangle },
];

const W = 480;
const H = 140;
const MIN_VAL = 30;
const MAX_VAL = 160;
const BASELINE_AVG = 45;
const BAND_UPPER = 52;
const BAND_LOWER = 38;

const BASE_POINTS  = [44, 46, 43, 47, 44, 46, 45, 48, 43, 45, 47, 44, 46, 43, 45, 47, 44, 46, 45, 44];
const SPIKE_POINTS = [44, 46, 43, 47, 44, 46, 45, 48, 43, 45, 47, 44, 46, 43, 45, 47, 143, 149, 145, 44];
const SPIKE_INDICES = new Set([16, 17, 18]);

function toY(v) {
  return H - ((v - MIN_VAL) / (MAX_VAL - MIN_VAL)) * H;
}

function toX(i, len) {
  return (i / (len - 1)) * W;
}

function toPath(points) {
  return points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i, points.length).toFixed(1)} ${toY(v).toFixed(1)}`)
    .join(" ");
}

const bandUpperY  = toY(BAND_UPPER);
const bandLowerY  = toY(BAND_LOWER);
const baselineY   = toY(BASELINE_AVG);

function SparklineOutput() {
  const [phase, setPhase] = useState("normal"); // "normal" | "anomaly" | "resolved"
  const timerRef = useRef(null);

  function simulateSpike() {
    setPhase("anomaly");
    timerRef.current = setTimeout(() => setPhase("resolved"), 1600);
  }

  function reset() {
    clearTimeout(timerRef.current);
    setPhase("normal");
  }

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const isAnomaly = phase !== "normal";
  const points = isAnomaly ? SPIKE_POINTS : BASE_POINTS;
  const lineColor = isAnomaly ? "#ef4444" : "#3b82f6";
  const bandFill = isAnomaly ? "rgba(239,68,68,0.06)" : "rgba(59,130,246,0.08)";
  const baselineStroke = isAnomaly ? "rgba(239,68,68,0.3)" : "rgba(59,130,246,0.3)";

  return (
    <div className="bg-zinc-950 border border-white/10 rounded-2xl p-5 space-y-4">

      {/* Header row */}
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
            BLDG-42 · Demand (kW)
          </p>
          <p className="font-mono text-[9px] text-zinc-600 mt-0.5">
            Rolling 20-slot baseline
          </p>
        </div>
        <AnimatePresence mode="wait">
          {isAnomaly && (
            <motion.div
              key="alert-badge"
              initial={{ opacity: 0, scale: 0.85, x: 8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/40 rounded-full px-3 py-1"
            >
              <AlertTriangle size={11} className="text-red-400 shrink-0" />
              <span className="font-mono text-[10px] text-red-400 font-semibold">
                Anomaly detected · 3.2× above baseline · 14:32:07
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chart */}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 140 }}>
        {/* Baseline band */}
        <rect
          x={0}
          y={bandUpperY}
          width={W}
          height={bandLowerY - bandUpperY}
          fill={bandFill}
          rx={2}
        />
        {/* Band boundary lines */}
        <line x1={0} y1={bandUpperY} x2={W} y2={bandUpperY} stroke={baselineStroke} strokeWidth={0.5} strokeDasharray="2 3" />
        <line x1={0} y1={bandLowerY} x2={W} y2={bandLowerY} stroke={baselineStroke} strokeWidth={0.5} strokeDasharray="2 3" />
        {/* Baseline center line */}
        <line
          x1={0} y1={baselineY}
          x2={W} y2={baselineY}
          stroke={baselineStroke}
          strokeDasharray="5 3"
          strokeWidth={1}
        />
        {/* Band label */}
        <text
          x={W - 4}
          y={bandUpperY - 4}
          textAnchor="end"
          fill={isAnomaly ? "rgba(239,68,68,0.4)" : "rgba(59,130,246,0.45)"}
          fontSize={7.5}
          fontFamily="monospace"
        >
          rolling baseline ~45 kW
        </text>

        {/* Data line */}
        <path
          d={toPath(points)}
          fill="none"
          stroke={lineColor}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dots */}
        {points.map((v, i) => {
          const isSpikeDot = isAnomaly && SPIKE_INDICES.has(i);
          return (
            <circle
              key={i}
              cx={toX(i, points.length)}
              cy={toY(v)}
              r={isSpikeDot ? 5 : 3}
              fill={lineColor}
            />
          );
        })}

        {/* Spike annotation: vertical gap line */}
        {isAnomaly && (
          <>
            <line
              x1={toX(17, points.length)}
              y1={toY(SPIKE_POINTS[17])}
              x2={toX(17, points.length)}
              y2={baselineY}
              stroke="rgba(239,68,68,0.35)"
              strokeWidth={1}
              strokeDasharray="3 2"
            />
            <text
              x={toX(17, points.length) + 6}
              y={toY(SPIKE_POINTS[17]) + 14}
              fill="rgba(239,68,68,0.7)"
              fontSize={8}
              fontFamily="monospace"
              fontWeight="bold"
            >
              149 kW
            </text>
          </>
        )}
      </svg>

      {/* Resolution card */}
      <AnimatePresence>
        {phase === "resolved" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-start gap-3 bg-zinc-900 border border-white/10 rounded-xl p-4"
          >
            <CheckCircle2 size={14} className="text-cyan-400 mt-0.5 shrink-0" />
            <div className="font-mono text-xs space-y-1">
              <p>
                <span className="text-zinc-500">Flagged at </span>
                <span className="text-zinc-300">14:32:07</span>
              </p>
              <p>
                <span className="text-zinc-500">Routed to </span>
                <span className="text-zinc-300">facilities alert queue</span>
              </p>
              <p className="text-cyan-400 font-semibold">Reaction time: 187ms</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase button */}
      <div className="pt-1">
        {phase === "normal" && (
          <button
            onClick={simulateSpike}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/40 text-amber-400 font-mono text-[11px] hover:bg-amber-500/10 transition-all duration-200 cursor-pointer"
          >
            <AlertTriangle size={11} />
            Simulate spike
          </button>
        )}
        {phase === "anomaly" && (
          <span className="inline-flex items-center gap-2 font-mono text-[11px] text-red-400">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse block" />
            Routing alert…
          </span>
        )}
        {phase === "resolved" && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-700 text-zinc-400 font-mono text-[11px] hover:bg-white/5 transition-all duration-200 cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>
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
      tagline="Event-driven telemetry with <200ms anomaly detection via Redis Streams"
      steps={steps}
      description={DEMO_DESCRIPTIONS.urbanEnergy}
      renderOutput={renderOutput}
    />
  );
}
