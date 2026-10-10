import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { SiPython, SiNeo4J, SiReact, SiFastapi, SiAmazonwebservices, SiHuggingface, SiLinux} from "react-icons/si";
import { Shield } from "lucide-react";

const M = ({ children }) => (
  <span className="font-bold text-white">{children}</span>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const jobs = [
  {
    title: "Machine Learning Engineer, MITRE Project",
    company: "App Dev Club",
    location: "College Park, MD",
    date: "Sep 2026 – Present",
    logo: "appdev.png",
    incoming: true,
    points: [
      <>Building <M>classification and extraction</M> models for a MITRE-sponsored document pipeline, served through a <M>FastAPI</M> backend.</>,
      <>Most of the challenge is in output formatting and edge case handling, since the extracted data feeds into downstream processing that expects consistent structure.</>,
    ],
    tech: [
      { Icon: SiPython,  color: "#3776AB" },
      { Icon: SiFastapi, color: "#05998B" },
    ],
    statusBar: "STACK: PYTHON + FASTAPI | CLIENT: MITRE | ROLE: ML ENGINEER",
  },
  {
    title: "Software Engineering Intern",
    company: "Fannie Mae",
    location: "Reston, VA",
    date: "May 2026 – Aug 2026",
    logo: "fanniemae.png",
    badge: "Return Offer",
    points: [
      <>Built an AI chatbot and guided intake portal in <M>React</M> and <M>FastAPI</M> on EC2 that routes requests across five internal products, cutting triage time roughly in half.</>,
      <>Designed the retrieval layer as a <M>RAG</M> knowledge base on <M>S3</M> with event-driven <M>Lambda</M> re-chunking. Most of the time went into chunking strategy and token budgeting, since those directly drove per-request cost.</>,
      <>Added rules-based failover around <M>Claude Haiku 4.5</M> calls after structured JSON output failed in edge cases, and built <M>SageMaker</M> test harnesses to speed up inference prototyping.</>,
    ],
    tech: [
      { Icon: SiReact,             color: "#61DAFB" },
      { Icon: SiFastapi,           color: "#05998B" },
      { Icon: SiAmazonwebservices, color: "#FF9900" },
    ],
    statusBar: "PRODUCTS: 5 ROUTED | TOKENS: −60% | ENGINE: CLAUDE HAIKU 4.5",
  },
  {
    title: "Automation & Infrastructure Technician",
    company: "UMD – Division of Information Technology",
    location: "College Park, MD",
    date: "Sept 2025 – Present",
    logo: "UMD.jpeg",
    points: [
      <>Automate OS imaging pipelines across the division using custom <M>PowerShell</M> and <M>Bash</M> scripts, cutting provisioning time by about <M>40%</M>.</>,
      <>Maintain security across 200+ workstations by scripting driver update cycles to clear vulnerabilities each month.</>,
    ],
    tech: [
      { Icon: SiLinux, color: "#FCC624" },
      { Icon: Shield,  color: "#60A5FA" },
    ],
    statusBar: "WORKSTATIONS: 200+ | VULNS: 50+/MONTH | PROVISION: −40%",
  },
  {
    title: "Software Engineering Intern",
    company: "Mphasis",
    location: "New York, NY",
    date: "Jun 2025 – Aug 2025",
    logo: "mphasis.png",
    points: [
      <>Built a <M>Flask</M> microservice that compiled natural language inputs into Cypher queries for a <M>Neo4j</M> knowledge graph, covering the query patterns the data model needed to support.</>,
      <>Set up async embedding pipelines and tuned vector indexing to get retrieval to sub-second latency across the full document corpus.</>,
      <>Reworked graph indexing and batch ingestion to cut overall data load time by about <M>35%</M>.</>,
    ],
    tech: [
      { Icon: SiPython, color: "#3776AB" },
      { Icon: SiNeo4J,  color: "#008CC1" },
    ],
    statusBar: "DATA: 50K+ RECORDS | GAIN: −35% INGESTION | ENGINE: NEO4J",
  },
  {
    title: "AI Software Engineering Intern",
    company: "Apollonian.AI",
    location: "Washington, D.C.",
    date: "Feb 2025 – Jun 2025",
    logo: "apollonian.png",
    points: [
      <>Built the real-time <M>lip-sync avatar pipeline</M> using <M>HuggingFace</M> models, where the main challenge was keeping inference fast enough for video responses to stay synchronized.</>,
      <>Wrote async NLP pipelines with <M>dynamic caching</M> to maintain large token contexts across concurrent sessions.</>,
      <>Got streaming latency down to around <M>250ms</M> through serialization and real-time payload synchronization.</>,
    ],
    tech: [
      { Icon: SiHuggingface, color: "#FFD21E" },
      { Icon: SiFastapi,     color: "#05998B" },
    ],
    statusBar: "LATENCY: 250MS | CONTEXTS: 16K TOKENS | SESSIONS: 50 CONCURRENT",
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────
function ExperienceCard({ job, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group rounded-2xl overflow-hidden backdrop-blur-md border transition-all duration-300 ${
        job.incoming
          ? "bg-blue-500/8 border-blue-500/20"
          : "bg-[#141418]/60 border-white/5 hover:border-white/15"
      }`}
    >
      {/* ── Main body ── */}
      <div className="p-6 md:p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <img
              src={`/logos/${job.logo}`}
              alt={`${job.company} logo`}
              className="w-10 h-10 rounded-xl border border-white/8 object-cover bg-[#1e1e24] flex-shrink-0"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div
              style={{ display: "none" }}
              className="w-10 h-10 rounded-xl border border-white/8 bg-[#1e1e24] items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0"
            >
              {job.company.charAt(0)}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-zinc-100 font-mono leading-snug">{job.title}</h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                {job.company}
                {job.location && <span className="text-zinc-700"> · {job.location}</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {job.incoming && (
              <span className="text-[9px] font-mono font-bold text-blue-400 bg-blue-500/15 border border-blue-500/25 px-2.5 py-1 rounded-full uppercase tracking-widest animate-pulse">
                Current
              </span>
            )}
            {job.badge && (
              <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-500/15 border border-amber-500/25 px-2.5 py-1 rounded-full uppercase tracking-widest">
                {job.badge}
              </span>
            )}
            <span className="text-xs font-mono font-medium text-zinc-400 whitespace-nowrap">
              {job.date}
            </span>
          </div>
        </div>

        {/* Body */}
        <motion.ul
          className="space-y-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
        >
          {job.points.map((pt, j) => (
            <motion.li
              key={j}
              variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } } }}
              className="flex items-start gap-3 text-sm text-slate-50 leading-relaxed"
            >
              <span className="mt-[7px] w-1 h-1 rounded-full bg-blue-500/60 flex-shrink-0" />
              <span>{pt}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* ── Footer Row 1: Tech trace icons ── */}
      {job.tech.length > 0 && (
        <div className="px-6 py-3 border-t border-white/5 flex items-center gap-3">
          {job.tech.map((t, k) => (
            <t.Icon key={k} size={20} style={{ color: t.color }} className="flex-shrink-0" />
          ))}
        </div>
      )}

      {/* ── Footer Row 2: System status bar ── */}
      <div className="px-5 py-2.5 bg-black/40 border-t border-white/5 flex items-center gap-2.5 transition-all duration-300 group-hover:bg-blue-500/8 group-hover:shadow-[inset_0_1px_0_rgba(59,130,246,0.25)]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
        <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest truncate group-hover:text-zinc-400 transition-colors duration-300">
          {job.statusBar}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
export default function Experience() {
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.1"],
  });

  const lineScaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const glowTop    = useTransform(lineScaleY, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="px-6 pb-24">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-3">
            Work History
          </p>
          <h2 className="font-mono font-bold text-3xl md:text-4xl text-zinc-50 tracking-tight uppercase">
            Experience
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

        <div ref={timelineRef} className="relative">
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-white/5 hidden md:block" />
          <motion.div
            style={{ scaleY: lineScaleY, originY: 0 }}
            className="absolute left-[15px] top-0 bottom-0 w-px bg-blue-500/40 hidden md:block"
          />
          <motion.div
            style={{ top: glowTop }}
            className="absolute hidden md:block left-[9px] w-[13px] h-[13px] -translate-y-1/2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.9),0_0_20px_rgba(59,130,246,0.5)] z-10 pointer-events-none"
          />

          <div className="space-y-5">
            {jobs.map((job, i) => (
              <div key={i} className="relative md:ml-12">
                <div
                  className={`absolute hidden md:block -left-[37px] top-[26px] w-2.5 h-2.5 rounded-full border ${
                    job.incoming
                      ? "bg-blue-400 border-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                      : "bg-[#0c0c0e] border-white/20"
                  }`}
                />
                <div className="absolute hidden md:block -left-[27px] top-[30px] w-[27px] h-px bg-blue-500/20" />
                <ExperienceCard job={job} i={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}