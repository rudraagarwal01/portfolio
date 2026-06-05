import { motion } from "framer-motion";
import { ExternalLink, HeartHandshake, Trophy } from "lucide-react";

const items = [
  {
    org: "A.C.E Cricket",
    Icon: Trophy,
    tag: "Founder & Head Training Coach",
    link: "https://acecricket01.wixsite.com/ace-cricket",
    points: [
      <>Initiated a cricket program engaging <b>50+</b> enthusiasts online and in-person.</>,
      "Offered comprehensive training and mentorship to foster skill development and teamwork.",
      "Built a community that raised awareness of cricket and promoted the sport at school.",
    ],
  },
  {
    org: "Merch of Hope",
    Icon: HeartHandshake,
    tag: "Founder, Non-profit E-commerce",
    link: "https://merchofhope01.wixsite.com/merchofhope",
    points: [
      <>Launched a non-profit e-commerce platform, raising <b>$2,500</b> for the Make-A-Wish Foundation.</>,
      <>Sold <b>75+</b> custom merchandise items at school, boosting engagement and fundraising awareness.</>,
      "Led weekly meetings and created presentations to drive cross-functional impact initiatives.",
    ],
  },
];

// ─── Animated data stream connector ──────────────────────────────────────────
function DataStream({ direction }) {
  const offset = direction === "left" ? "10" : "-10";
  return (
    <div className="hidden md:block w-20 flex-shrink-0 px-1">
      <svg width="100%" height="6" style={{ overflow: "visible" }}>
        {/* Glow bloom */}
        <line x1="0" y1="3" x2="100%" y2="3"
          stroke="rgba(59,130,246,0.18)" strokeWidth="5" strokeDasharray="6 4" strokeLinecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to={offset} dur="1.2s" repeatCount="indefinite" />
        </line>
        {/* Core line */}
        <line x1="0" y1="3" x2="100%" y2="3"
          stroke="rgba(59,130,246,0.65)" strokeWidth="1.5" strokeDasharray="6 4" strokeLinecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to={offset} dur="1.2s" repeatCount="indefinite" />
        </line>
      </svg>
    </div>
  );
}

// ─── Central hub node ─────────────────────────────────────────────────────────
function HubNode() {
  return (
    <div className="hidden md:flex flex-shrink-0 w-[140px] h-[140px] relative items-center justify-center">
      {/* Outer pulse ring */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full border border-blue-500/40"
      />
      {/* Mid ring */}
      <div className="absolute inset-4 rounded-full border border-blue-500/20 bg-blue-500/4" />
      {/* Inner core */}
      <div className="relative w-[72px] h-[72px] rounded-full bg-[#141418] border-2 border-blue-500/60 shadow-[0_0_24px_rgba(59,130,246,0.45),inset_0_0_12px_rgba(59,130,246,0.08)] flex flex-col items-center justify-center gap-0.5">
        <span className="text-[7px] font-mono font-bold text-blue-300 uppercase tracking-[0.2em] leading-tight">
          Community
        </span>
        <span className="text-[7px] font-mono font-bold text-blue-300 uppercase tracking-[0.2em] leading-tight">
          Core
        </span>
      </div>
    </div>
  );
}

// ─── Mobile hub (compact) ─────────────────────────────────────────────────────
function HubNodeMobile() {
  return (
    <div className="md:hidden flex items-center justify-center mb-2">
      <div className="relative w-16 h-16 rounded-full bg-[#141418] border-2 border-blue-500/60 shadow-[0_0_16px_rgba(59,130,246,0.4)] flex flex-col items-center justify-center">
        <span className="text-[7px] font-mono font-bold text-blue-300 uppercase tracking-widest leading-tight">
          Community
        </span>
        <span className="text-[7px] font-mono font-bold text-blue-300 uppercase tracking-widest leading-tight">
          Core
        </span>
      </div>
    </div>
  );
}

// ─── Satellite card ───────────────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function LeadershipCard({ item }) {
  return (
    <motion.div
      variants={cardVariants}
      className="flex-1 bg-white/5 backdrop-blur-md border border-white/8 rounded-2xl p-7 flex flex-col gap-5 hover:border-white/16 transition-colors duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className="mt-0.5 flex-shrink-0 text-blue-400"
            style={{ filter: "drop-shadow(0 0 8px rgba(59,130,246,0.55))" }}
          >
            <item.Icon size={24} />
          </div>
          <div>
            <h3 className="font-mono font-bold text-lg text-zinc-50 tracking-tight mb-1">
              {item.org}
            </h3>
            <p className="text-[11px] font-mono text-blue-400 tracking-wide whitespace-nowrap">
              {item.tag}
            </p>
          </div>
        </div>

        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-blue-400 hover:text-blue-300 transition-colors duration-200 flex-shrink-0"
          >
            <ExternalLink size={11} />
            Visit Website
          </a>
        )}
      </div>

      <div className="h-px bg-white/5" />

      <ul className="flex flex-col gap-2.5">
        {item.points.map((pt, i) => (
          <li key={i} className="flex items-baseline gap-2.5 text-sm text-zinc-300 leading-relaxed">
            <span className="text-slate-400 flex-shrink-0 text-xs">→</span>
            <span>{pt}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Leadership() {
  return (
    <section id="leadership" className="relative py-24 px-6 overflow-hidden">

      {/* Faint dot-grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="ldr-dots" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="18" cy="18" r="0.7" fill="rgba(255,255,255,0.06)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ldr-dots)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-3">
            Community
          </p>
          <h2 className="font-mono font-bold text-3xl md:text-4xl text-zinc-50 tracking-tight uppercase">
            Leadership & Impact
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ originX: 0 }}
            className="mt-3 h-[2px] w-16 bg-gradient-to-r from-blue-500 to-transparent"
          />
        </motion.div>

        {/* Mobile hub */}
        <HubNodeMobile />

        {/* Desktop: [Card] [Stream] [Hub] [Stream] [Card] */}
        {/* Mobile: stacked cards */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center gap-5 md:gap-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <LeadershipCard item={items[0]} />
          <DataStream direction="left" />
          <HubNode />
          <DataStream direction="right" />
          <LeadershipCard item={items[1]} />
        </motion.div>

      </div>
    </section>
  );
}
