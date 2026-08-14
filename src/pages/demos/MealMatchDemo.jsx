import { motion } from "framer-motion";
import { Search, MapPin, Cpu, CheckCircle } from "lucide-react";
import ProjectDemo from "../../components/ProjectDemo";
import { DEMO_DESCRIPTIONS } from "../../lib/projectDemoConfigs";

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
          Match Confirmed: 40 portions · 0.8 mi
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
      description={DEMO_DESCRIPTIONS.mealMatch}
      renderOutput={renderOutput}
    />
  );
}
