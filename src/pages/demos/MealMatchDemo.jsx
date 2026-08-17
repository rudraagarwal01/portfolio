import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Search, Cpu, CheckCircle, Heart, X, Lock } from "lucide-react";
import ProjectDemo from "../../components/ProjectDemo";
import { DEMO_DESCRIPTIONS } from "../../lib/projectDemoConfigs";

const steps = [
  { label: "Scan active listings", icon: Search },
  { label: "Acquire row lock", icon: Lock },
  { label: "Run match algorithm", icon: Cpu },
  { label: "Confirm reservation", icon: CheckCircle },
];

const swipeCards = [
  { name: "Golden Garden Restaurant", portions: 40, cuisine: "Chinese", pickup: "8:00 PM", distance: "0.8 mi", accent: "from-amber-950/50" },
  { name: "Bella Italia", portions: 25, cuisine: "Italian", pickup: "9:30 PM", distance: "1.2 mi", accent: "from-rose-950/50" },
  { name: "Sunrise Diner", portions: 15, cuisine: "American", pickup: "7:45 PM", distance: "0.4 mi", accent: "from-sky-950/50" },
  { name: "Lotus Garden", portions: 60, cuisine: "Thai", pickup: "8:30 PM", distance: "2.1 mi", accent: "from-emerald-950/50" },
];

function SwipeCard({ card, onDecide }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 0, 150], [-12, 0, 12]);
  const claimOpacity = useTransform(x, [30, 90], [0, 1]);
  const passOpacity = useTransform(x, [-90, -30], [1, 0]);

  function handleDragEnd(_, info) {
    if (info.offset.x > 80) onDecide("claim");
    else if (info.offset.x < -80) onDecide("pass");
  }

  return (
    <div className="relative flex justify-center items-center h-52">
      <div className="absolute w-full max-w-[260px] h-44 rounded-2xl bg-zinc-900 border border-white/5 scale-95 translate-y-2 opacity-40" />
      <div className="absolute w-full max-w-[260px] h-44 rounded-2xl bg-zinc-900 border border-white/5 scale-90 translate-y-4 opacity-20" />

      <motion.div
        drag="x"
        dragConstraints={{ left: -200, right: 200 }}
        dragElastic={0.35}
        style={{ x, rotate }}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 1.02 }}
        className={`relative w-full max-w-[260px] h-44 rounded-2xl bg-gradient-to-b ${card.accent} to-zinc-900 border border-white/10 p-5 cursor-grab active:cursor-grabbing select-none`}
      >
        <motion.div
          style={{ opacity: claimOpacity }}
          className="absolute top-3 right-3 bg-emerald-500/20 border border-emerald-500/40 rounded-lg px-2 py-0.5"
        >
          <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Claim</span>
        </motion.div>

        <motion.div
          style={{ opacity: passOpacity }}
          className="absolute top-3 left-3 bg-red-500/20 border border-red-500/40 rounded-lg px-2 py-0.5"
        >
          <span className="font-mono text-[10px] text-red-400 font-bold uppercase tracking-wider">Pass</span>
        </motion.div>

        <div className="mt-2">
          <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider mb-1">Surplus Listing</p>
          <p className="font-mono text-sm text-zinc-100 font-bold leading-tight">{card.name}</p>
          <p className="font-mono text-xs text-zinc-400 mt-2">{card.portions} portions · {card.cuisine}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="font-mono text-xs text-zinc-500">Pickup {card.pickup}</span>
            <span className="font-mono text-xs text-cyan-400">{card.distance}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SwipeView() {
  const [index, setIndex] = useState(0);
  const [decisions, setDecisions] = useState([]);

  function decide(action) {
    setDecisions((d) => [...d, { card: swipeCards[index], action }]);
    setIndex((i) => i + 1);
  }

  if (index >= swipeCards.length) {
    const claimed = decisions.filter((d) => d.action === "claim");
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 py-4"
      >
        <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl px-5 py-3">
          <CheckCircle size={14} className="text-cyan-400" />
          <span className="font-mono text-xs text-cyan-400 font-semibold">
            {claimed.length} listing{claimed.length !== 1 ? "s" : ""} claimed
          </span>
        </div>
        {claimed.length > 0 && (
          <div className="w-full space-y-2">
            {claimed.map(({ card }) => (
              <div
                key={card.name}
                className="flex items-center justify-between bg-zinc-900 border border-white/10 rounded-xl px-4 py-2"
              >
                <span className="font-mono text-xs text-zinc-300">{card.name}</span>
                <span className="font-mono text-xs text-zinc-500">{card.portions} portions</span>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => { setIndex(0); setDecisions([]); }}
          className="font-mono text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2 cursor-pointer"
        >
          Start over
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.15 }}
        >
          <SwipeCard card={swipeCards[index]} onDecide={decide} />
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-1.5">
        {swipeCards.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
              i < index ? "bg-cyan-500" : i === index ? "bg-blue-400" : "bg-zinc-700"
            }`}
          />
        ))}
      </div>

      <div className="flex justify-center gap-5">
        <button
          onClick={() => decide("pass")}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-xs hover:bg-red-500/20 transition-all cursor-pointer"
        >
          <X size={12} /> Pass
        </button>
        <button
          onClick={() => decide("claim")}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs hover:bg-emerald-500/20 transition-all cursor-pointer"
        >
          <Heart size={12} /> Claim
        </button>
      </div>

      <p className="text-center font-mono text-[9px] text-zinc-600 uppercase tracking-wider">
        Drag left to pass · right to claim
      </p>
    </div>
  );
}

function PartnerView() {
  return (
    <div className="bg-zinc-950 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center gap-4">
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

        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="w-8 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400" />
          <span className="font-mono text-[9px] text-blue-400 uppercase tracking-wider">Match</span>
        </div>

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

      <div className="mt-3 flex items-center justify-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl py-2">
        <Lock size={11} className="text-amber-400" />
        <span className="font-mono text-[10px] text-amber-400">
          SELECT FOR UPDATE — row locked during claim
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-2 flex items-center justify-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl py-3"
      >
        <CheckCircle size={14} className="text-cyan-400" />
        <span className="font-mono text-xs text-cyan-400 font-semibold">
          Match Confirmed: 40 portions · 0.8 mi
        </span>
      </motion.div>
    </div>
  );
}

function MealMatchOutput() {
  const [tab, setTab] = useState("swipe");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[
          { id: "swipe", label: "Recipient Swipe" },
          { id: "partner", label: "Partner Match" },
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

      {tab === "swipe" ? <SwipeView /> : <PartnerView />}
    </div>
  );
}

function renderOutput() {
  return <MealMatchOutput />;
}

export default function MealMatchDemo() {
  return (
    <ProjectDemo
      title="MealMatch"
      tagline="Food recovery platform with distributed claim locking and swipe-based browsing"
      steps={steps}
      description={DEMO_DESCRIPTIONS.mealMatch}
      renderOutput={renderOutput}
    />
  );
}
