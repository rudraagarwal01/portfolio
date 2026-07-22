import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

const quickStats = [
  { label: "Internships", value: "3+" },
  { label: "Projects", value: "6+" },
  { label: "Certifications", value: "5" },
  { label: "RAG QUERIES", value: "500+" },
];

const arsenal = [
  "AWS Bedrock",
  "SageMaker",
  "React",
  "FastAPI",
  "Python",
  "Java",
  "Pydantic",
  "RAG Pipelines",
];

const impactMetrics = [
  "Eliminated JSON contract failures across 8 AI routes via Pydantic.",
  "Built real-time AI chat backend processing 1,000+ daily messages.",
  "Achieved sub-250ms emotion mapping latency for AI avatars.",
  "Enabled 500+ Cypher query workflows via Neo4j Graph RAG.",
];

// UPDATED: The hover styling is now baked directly into the universal card component
const cardClass =
  "rounded-2xl border border-white/10 bg-[#141418]/70 backdrop-blur-md p-6 transition-all duration-300 hover:border-blue-400/35 hover:bg-blue-500/[0.06] hover:shadow-[0_0_0_1px_rgba(59,130,246,0.18),0_0_28px_rgba(59,130,246,0.12)]";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function ActionHint({ text }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-blue-300/90 group-hover:text-blue-200 transition-colors">
      {text}
      <ArrowUpRight size={12} />
    </span>
  );
}

export default function RecruiterDashboard() {
  const navigate = useNavigate();

  return (
    <section className="py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-3">
            Experience Snapshot
          </p>
          <h2 className="font-mono font-bold text-2xl md:text-3xl text-zinc-50 tracking-tight uppercase">
            Executive Dashboard
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ originX: 0 }}
            className="mt-3 h-[2px] w-16 bg-gradient-to-r from-blue-500 to-transparent"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* ROW 1 LEFT: QUICK STATS (1/3 Width) */}
          <motion.div variants={itemVariants} className={`${cardClass} md:col-span-1 group`}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-blue-400" />
              <h3 className="font-mono text-sm uppercase tracking-widest text-zinc-200">
                Quick Stats
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-black/25 px-3 py-3 transition-colors group-hover:border-white/20"
                >
                  <p className="text-xl font-bold text-zinc-100 leading-none">{stat.value}</p>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mt-1.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ROW 1 RIGHT: CURRENT FOCUS (2/3 Width) */}
          <motion.div variants={itemVariants} className={`${cardClass} md:col-span-2 group`}>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap size={16} className="text-blue-400" />
              <h3 className="font-mono text-sm uppercase tracking-widest text-zinc-200">
                Current Focus & Domain
              </h3>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl">
              CS @ UMD (Machine Learning). Currently engineering a division-wide enterprise AI intake portal at Fannie Mae using AWS Bedrock, SageMaker, and FastAPI.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-full border border-blue-400/30 bg-blue-500/10 text-[10px] font-mono text-blue-300 uppercase tracking-widest transition-colors group-hover:border-blue-400/50">
                UMD CS + ML
              </span>
              <span className="px-2.5 py-1 rounded-full border border-violet-400/30 bg-violet-500/10 text-[10px] font-mono text-violet-300 uppercase tracking-widest transition-colors group-hover:border-violet-400/50">
                Enterprise AI Automation
              </span>
              <span className="px-2.5 py-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 text-[10px] font-mono text-emerald-300 uppercase tracking-widest transition-colors group-hover:border-emerald-400/50">
                Graph RAG / Neo4j
              </span>
              <span className="px-2.5 py-1 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-[10px] font-mono text-cyan-300 uppercase tracking-widest transition-colors group-hover:border-cyan-400/50">
                Full-Stack Dev
              </span>
              <span className="px-2.5 py-1 rounded-full border border-amber-400/30 bg-amber-500/10 text-[10px] font-mono text-amber-300 uppercase tracking-widest transition-colors group-hover:border-amber-400/50">
                AWS Cloud & DevOps
              </span>
              <span className="px-2.5 py-1 rounded-full border border-rose-400/30 bg-rose-500/10 text-[10px] font-mono text-rose-300 uppercase tracking-widest transition-colors group-hover:border-rose-400/50">
                Risk & Privacy
              </span>
            </div>
          </motion.div>

          {/* ROW 2 LEFT: TECH ARSENAL (2/3 Width) */}
          <motion.button
            type="button"
            variants={itemVariants}
            onClick={() => navigate("/skills")}
            className={`${cardClass} md:col-span-2 text-left group cursor-pointer`}
          >
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-blue-400" />
                <h3 className="font-mono text-sm uppercase tracking-widest text-zinc-200">
                  Core Technical Skills
                </h3>
              </div>
              <ActionHint text="Open Skills" />
            </div>
            <div className="flex flex-wrap gap-2">
              {arsenal.map((item, idx) => (
                <span
                  key={item}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-colors ${
                    idx < 4
                      ? "border-blue-400/35 bg-blue-500/10 text-blue-200 group-hover:border-blue-400/50"
                      : idx < 8
                      ? "border-violet-400/30 bg-violet-500/10 text-violet-200 group-hover:border-violet-400/50"
                      : "border-white/15 bg-white/5 text-zinc-300 group-hover:border-white/30"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.button>

          {/* ROW 2 RIGHT: LEADERSHIP (1/3 Width) */}
          <motion.button
            type="button"
            variants={itemVariants}
            onClick={() => navigate("/leadership")}
            className={`${cardClass} md:col-span-1 text-left group cursor-pointer`}
          >
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-blue-400" />
                <h3 className="font-mono text-sm uppercase tracking-widest text-zinc-200">
                  Leadership
                </h3>
              </div>
              <ActionHint text="Open Leadership" />
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Adobe Student Ambassador - Leading campus workshops on Adobe Firefly generative AI.
            </p>
          </motion.button>

          {/* ROW 3: IMPACT METRICS (Full Width) */}
          <motion.button
            type="button"
            variants={itemVariants}
            onClick={() => navigate("/experience")}
            className={`${cardClass} md:col-span-3 text-left group cursor-pointer`}
          >
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-blue-400" />
                <h3 className="font-mono text-sm uppercase tracking-widest text-zinc-200">
                  Impact Metrics
                </h3>
              </div>
              <ActionHint text="Open Experience" />
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {impactMetrics.map((metric) => (
                <li
                  key={metric}
                  className="flex items-start gap-2 text-sm text-zinc-300 bg-black/20 border border-white/10 rounded-xl px-3.5 py-3 transition-colors group-hover:border-white/20"
                >
                  <ShieldCheck size={14} className="text-blue-300 mt-0.5 shrink-0" />
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}