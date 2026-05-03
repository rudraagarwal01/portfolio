import { motion } from "framer-motion";
import { Shield, Lock, Scale, EyeOff } from "lucide-react";
import {
  SiPython, SiCplusplus, SiJavascript, SiSwift,
  SiPytorch, SiNeo4J, SiOpenai, SiHuggingface, SiFastapi,
  SiReact, SiAmazonwebservices, SiDocker, SiPostgresql, SiGit, SiMongodb,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

function hexGlow(hex, alpha = 0.32) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `drop-shadow(0 0 8px rgba(${r},${g},${b},${alpha}))`;
}

// ─── Quadrant data ────────────────────────────────────────────────────────────
const quadrants = [
  {
    id: "languages",
    num: "01",
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
    num: "02",
    label: "AI & Machine Learning",
    desc: "Models, frameworks & intelligent systems",
    skills: [
      { name: "PyTorch",     Icon: SiPytorch,     color: "#EE4C2C" },
      { name: "Neo4j",       Icon: SiNeo4J,       color: "#008CC1" },
      { name: "OpenAI",      Icon: SiOpenai,      color: "#412991" },
      { name: "HuggingFace", Icon: SiHuggingface, color: "#FFD21E" },
      { name: "FastAPI",     Icon: SiFastapi,     color: "#05998B" },
    ],
  },
  {
    id: "engineering",
    num: "03",
    label: "Engineering & Cloud",
    desc: "Full-stack, cloud & DevOps tooling",
    skills: [
      { name: "React",      Icon: SiReact,              color: "#61DAFB" },
      { name: "AWS",        Icon: SiAmazonwebservices,  color: "#FF9900" },
      { name: "Docker",     Icon: SiDocker,             color: "#2496ED" },
      { name: "PostgreSQL", Icon: SiPostgresql,         color: "#4169E1" },
      { name: "Git",        Icon: SiGit,                color: "#F05032" },
      { name: "MongoDB",    Icon: SiMongodb,            color: "#47A248" },
    ],
  },
  {
    id: "security",
    num: "04",
    label: "Security & Ethics",
    desc: "Risk management, privacy & AI ethics",
    skills: [
      { name: "Risk Management", Icon: Shield, color: "#10B981" },
      { name: "Privacy",         Icon: EyeOff, color: "#A78BFA" },
      { name: "AI Ethics",       Icon: Scale,  color: "#0EA5E9" },
      { name: "Data Protection", Icon: Lock,   color: "#F97316" },
    ],
  },
];

// ─── Pill ─────────────────────────────────────────────────────────────────────
function Pill({ name, Icon, color }) {
  return (
    <motion.span
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      style={{ filter: hexGlow(color) }}
      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] font-mono cursor-default select-none bg-white/5 border border-white/8 hover:bg-white/10 transition-colors duration-200"
    >
      <Icon size={14} style={{ color }} className="flex-shrink-0" />
      <span className="text-zinc-300">{name}</span>
    </motion.span>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function QuadrantCard({ q }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.015, boxShadow: "0 0 32px rgba(59,130,246,0.06)" }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className="bg-[#141418] border border-white/5 rounded-2xl p-8 flex flex-col gap-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1.5">
            {q.desc}
          </p>
          <h3 className="font-mono font-bold text-sm text-zinc-100 tracking-tight">
            {q.label}
          </h3>
        </div>
        <span className="text-[11px] font-mono text-zinc-700 bg-white/4 border border-white/6 px-2 py-1 rounded-lg flex-shrink-0">
          {q.num}
        </span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {q.skills.map((s) => (
          <Pill key={s.name} {...s} />
        ))}
      </div>
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
