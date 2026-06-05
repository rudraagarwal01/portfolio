import { motion } from "framer-motion";
import { Shield, Lock, Scale, EyeOff } from "lucide-react";
import {
  SiPython, SiCplusplus, SiJavascript, SiSwift,
  SiPytorch, SiNeo4J, SiOpenai, SiHuggingface, SiFastapi,
  SiReact, SiAmazonwebservices, SiDocker, SiPostgresql, SiGit, SiMongodb,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

// ─── Quadrant data ────────────────────────────────────────────────────────────
const quadrants = [
  {
    id: "languages",
    label: "Core Languages",
    desc: "Primary programming languages",
    skills: [
      { name: "Python",     Icon: SiPython,     color: "#3776AB" },
      { name: "Java",       Icon: FaJava,        color: "#ED8B00" },
      { name: "C++",        Icon: SiCplusplus,  color: "#00599C" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "Swift",      Icon: SiSwift,      color: "#FA7343" },
    ],
  },
  {
    id: "ai-ml",
    label: "AI & Machine Learning",
    desc: "Models, frameworks & intelligent systems",
    skills: [
      { name: "PyTorch",     Icon: SiPytorch,     color: "#EE4C2C" },
      { name: "Neo4j",       Icon: SiNeo4J,       color: "#008CC1" },
      { name: "OpenAI",      Icon: SiOpenai,      color: "#74aa9c" },
      { name: "HuggingFace", Icon: SiHuggingface, color: "#FFD21E" },
      { name: "FastAPI",     Icon: SiFastapi,     color: "#05998B" },
    ],
  },
  {
    id: "engineering",
    label: "Engineering & Cloud",
    desc: "Full-stack, cloud & DevOps tooling",
    skills: [
      { name: "React",      Icon: SiReact,             color: "#61DAFB" },
      { name: "AWS",        Icon: SiAmazonwebservices, color: "#FF9900" },
      { name: "Docker",     Icon: SiDocker,            color: "#2496ED" },
      { name: "PostgreSQL", Icon: SiPostgresql,        color: "#4169E1" },
      { name: "Git",        Icon: SiGit,               color: "#F05032" },
      { name: "MongoDB",    Icon: SiMongodb,           color: "#47A248" },
    ],
  },
  {
    id: "security",
    label: "Security & Ethics",
    desc: "Risk management, privacy & AI ethics",
    skills: [
      { name: "Risk Mgmt",       Icon: Shield, color: "#10B981" },
      { name: "Privacy",         Icon: EyeOff, color: "#A78BFA" },
      { name: "AI Ethics",       Icon: Scale,  color: "#38BDF8" },
      { name: "Protection",      Icon: Lock,   color: "#FB923C" },
    ],
  },
];

// ─── Skill icon with lift + glow hover ────────────────────────────────────────
function SkillIcon({ name, Icon, color }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2.5 cursor-default"
      whileHover="hover"
      initial="rest"
    >
      <motion.div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center border"
        style={{ backgroundColor: `${color}12`, borderColor: `${color}22` }}
        variants={{
          rest:  { y: 0, borderColor: `${color}22` },
          hover: { y: -6, borderColor: `${color}55` },
        }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
      >
        {/* Colour wash */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{ background: `radial-gradient(circle at 50% 60%, ${color}30, transparent 72%)` }}
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.2 }}
        />
        {/* Icon */}
        <motion.div
          variants={{
            rest:  { filter: "drop-shadow(0 0 0px transparent)" },
            hover: { filter: `drop-shadow(0 0 10px ${color}cc)` },
          }}
          transition={{ duration: 0.2 }}
        >
          <Icon size={26} style={{ color }} />
        </motion.div>
      </motion.div>

      <motion.span
        className="text-[11px] font-mono font-semibold uppercase tracking-wider text-center leading-tight max-w-[80px]"
        variants={{
          rest:  { color: "#f4f4f5" }, 
          hover: { color: "#ffffff" }, 
        }}
        transition={{ duration: 0.15 }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
const cardVariants = {
  hidden:   { opacity: 0, y: 24 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function QuadrantCard({ q }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative rounded-2xl bg-[#0e0e18] border border-white/6 p-8 flex flex-col gap-8 hover:border-white/10 transition-colors duration-300 overflow-hidden"
    >
      {/* Subtle corner glow on hover */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-blue-500/0 group-hover:bg-blue-500/5 blur-3xl transition-all duration-700 pointer-events-none" />

      {/* Header — FIXED: Removed number badge structure */}
      <div className="flex items-start">
        <div>
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
            {q.desc}
          </p>
          <h3 className="font-mono font-bold text-sm text-zinc-100 tracking-tight">
            {q.label}
          </h3>
        </div>
      </div>

      {/* Icons grid */}
      <motion.div
        className="flex flex-wrap gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } } }}
      >
        {q.skills.map((s) => (
          <motion.div
            key={s.name}
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
          >
            <SkillIcon {...s} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <p className="text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-3">
            Technical Stack
          </p>
          <h2 className="font-mono font-bold text-3xl md:text-4xl text-zinc-50 tracking-tight uppercase">
            Skills
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

        <motion.div
          className="grid sm:grid-cols-2 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {quadrants.map((q) => (
            <QuadrantCard key={q.id} q={q} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}