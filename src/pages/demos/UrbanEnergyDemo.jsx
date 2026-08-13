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
      tagline={`Event-driven telemetry with <200ms anomaly detection via Redis Streams`}
      steps={steps}
      renderOutput={renderOutput}
    />
  );
}
