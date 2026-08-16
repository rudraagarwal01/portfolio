import { useState } from "react";
import { motion } from "framer-motion";
import { Link2, Search, ScanFace, ShieldAlert } from "lucide-react";
import ProjectDemo from "../../components/ProjectDemo";
import { DEMO_DESCRIPTIONS } from "../../lib/projectDemoConfigs";

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

const kpis = [
  { label: "Domains Tracked", value: "104", color: "text-blue-400" },
  { label: "Reports Filed", value: "23", color: "text-amber-400" },
  { label: "Avg Risk Score", value: "6.2 / 10", color: "text-orange-400" },
  { label: "Active Threats", value: "7", color: "text-red-400" },
];

const chartDomains = [
  { name: "paypa1", risk: 9.1 },
  { name: "faceb00k", risk: 8.4 },
  { name: "amzn-secure", risk: 7.6 },
  { name: "boa-login", risk: 6.8 },
  { name: "secure-ebay", risk: 5.2 },
  { name: "google", risk: 1.1 },
];

function barColor(risk) {
  if (risk >= 7) return "bg-red-500";
  if (risk >= 4) return "bg-amber-500";
  return "bg-green-500";
}

function ExtensionOutput() {
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

function DashboardOutput() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {kpis.map(({ label, value, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className="bg-zinc-900 border border-white/10 rounded-xl p-3 text-center"
          >
            <p className={`font-mono font-bold text-lg ${color}`}>{value}</p>
            <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider mt-0.5">
              {label}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="bg-zinc-950 border border-white/10 rounded-xl p-4">
        <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-4">
          Domain Risk Scores
        </p>
        <div className="flex items-end gap-2 h-20">
          {chartDomains.map(({ name, risk }, i) => (
            <div key={name} className="flex flex-col items-center flex-1 gap-1 h-full justify-end">
              <motion.div
                className={`w-full rounded-t ${barColor(risk)}`}
                initial={{ height: 0 }}
                animate={{ height: `${(risk / 10) * 80}px` }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.35, ease: "easeOut" }}
              />
              <p className="font-mono text-[8px] text-zinc-600 truncate w-full text-center">
                {name}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/10">
          <span className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-500">
            <span className="w-2 h-2 rounded-sm bg-red-500 inline-block" /> High ≥7
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-500">
            <span className="w-2 h-2 rounded-sm bg-amber-500 inline-block" /> Medium 4–7
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-500">
            <span className="w-2 h-2 rounded-sm bg-green-500 inline-block" /> Low &lt;4
          </span>
        </div>
      </div>
    </div>
  );
}

function AuthGuardOutput() {
  const [tab, setTab] = useState("extension");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[
          { id: "extension", label: "Extension" },
          { id: "dashboard", label: "Dashboard" },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
              tab === id
                ? "border-blue-500/50 bg-blue-500/15 text-blue-400"
                : "border-white/10 text-zinc-500 hover:text-zinc-300 hover:border-white/20"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "extension" ? <ExtensionOutput /> : <DashboardOutput />}
    </div>
  );
}

function renderOutput() {
  return <AuthGuardOutput />;
}

export default function AuthGuardDemo() {
  return (
    <ProjectDemo
      title="AuthGuard"
      tagline="Chrome extension + FastAPI backend for real-time phishing detection and domain risk tracking"
      steps={steps}
      description={DEMO_DESCRIPTIONS.authguard}
      renderOutput={renderOutput}
    />
  );
}
