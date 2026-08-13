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
