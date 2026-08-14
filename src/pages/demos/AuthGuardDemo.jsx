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
      description={DEMO_DESCRIPTIONS.authguard}
      renderOutput={renderOutput}
    />
  );
}
