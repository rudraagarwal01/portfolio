import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { SiPython, SiNeo4J, SiReact, SiFastapi, SiAmazonwebservices, SiOpenai, SiLinux, SiGit, SiWolframmathematica, SiKhanacademy } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { Shield } from "lucide-react";

const M = ({ children }) => (
  <span className="font-bold text-white">{children}</span>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const jobs = [
  {
    title: "Software Engineering Intern",
    company: "Fannie Mae",
    location: "Reston, VA",
    date: "Jun 2026 – Aug 2026",
    logo: "fanniemae.png",
    incoming: true,
    points: [],
    tech: [
      { Icon: FaJava,              color: "#ED8B00" },
      { Icon: SiAmazonwebservices, color: "#FF9900" },
    ],
    statusBar: "STATUS: INCOMING | TERM: SUMMER 2026 | LOC: RESTON, VA",
  },
  {
    title: "IT Technician",
    company: "UMD – Division of Information Technology",
    location: "College Park, MD",
    date: "Sept 2025 – Present",
    logo: "UMD.jpeg",
    points: [
      <>Diagnosed kernel, driver, and network issues, supporting <M>40k+ users</M> across campus infrastructure</>,
      <>Automated OS imaging via WDS and Ninite — cut device setup time by <M>~40%</M></>,
      <>Configured BIOS and endpoint security settings for <M>200+ computers</M></>,
    ],
    tech: [
      { Icon: SiLinux, color: "#FCC624" },
      { Icon: Shield,  color: "#60A5FA" },
    ],
    statusBar: "NODES: 40K+ USERS | LEVEL: KERNEL/DRIVERS | UPTIME: 99.9%",
  },
  {
    title: "Software Engineering Intern",
    company: "Mphasis",
    location: "New York, NY",
    date: "Jun 2025 – Aug 2025",
    logo: "mphasis.png",
    points: [
      <>Built a <M>Neo4j knowledge graph</M> for <M>30,000+ documents</M>, improving semantic search speed by 20%</>,
      <>Designed embedding pipelines with a <M>35% reduction</M> in processing overhead and improved consistency</>,
      <>Integrated GPT + RAG into a Flask–React chat interface supporting 500+ Cypher queries</>,
    ],
    tech: [
      { Icon: SiPython, color: "#3776AB" },
      { Icon: SiNeo4J,  color: "#008CC1" },
    ],
    statusBar: "DATA: 30K+ DOCS | GAIN: +35% EFFICIENCY | ENGINE: NEO4J",
  },
  {
    title: "AI Software Engineer Intern",
    company: "Apollonian.AI",
    location: "Washington, DC",
    date: "Feb 2025 – Jun 2025",
    logo: "apollonian.png",
    points: [
      <>Shipped backend for real-time chat platform delivering <M>1,000+ daily messages</M> using React and Firebase</>,
      <>Integrated OpenAI and HuggingFace APIs for context-aware virtual mental health conversations</>,
      <>Prototyped SadTalker avatars with emotion mapping and lip-sync at <M>sub-250ms</M> latency</>,
    ],
    tech: [
      { Icon: SiFastapi, color: "#05998B" },
      { Icon: SiReact,   color: "#61DAFB" },
    ],
    statusBar: "TRAFFIC: 1K+ MSGS/DAY | LATENCY: <250MS | STACK: FASTAPI",
  },
  {
    title: "AI Trainer",
    company: "Alignerr",
    location: "Fremont, CA",
    date: "Feb 2025 – Jun 2025",
    logo: "alignerr.png",
    points: [
      <>Improved LLM accuracy by evaluating and refining AI-generated replies across diverse domains</>,
      <>Authored red-team scenarios and reasoning examples to strengthen model reliability</>,
      <>Partnered with ML engineers to optimize data pipelines, reducing model bias by <M>25%</M></>,
    ],
    tech: [
      { Icon: SiPython, color: "#3776AB" },
      { Icon: SiOpenai, color: "#412991" },
    ],
    statusBar: "MODELS: LLMs | ROLE: EVALUATOR | BIAS: −25%",
  },
  {
    title: "Lead Java Lecturer & Tutor",
    company: "Alpha Centauri",
    location: "Remote",
    date: "Feb 2023 – Dec 2024",
    logo: "alpha-centauri.png",
    points: [
      <>Led <M>10+</M> tutors delivering structured Java lessons to <M>50+</M> students</>,
      <>Designed instructional materials reducing administrative overhead by <M>25%</M></>,
      <>Implemented feedback loops and mentored junior tutors to maintain high teaching standards</>,
    ],
    tech: [
      { Icon: FaJava, color: "#ED8B00" },
      { Icon: SiGit,  color: "#F05032" },
    ],
    statusBar: "STUDENTS: 50+ | TEAM: 10+ TUTORS | LANG: JAVA",
  },
  {
    title: "Teacher Assistant",
    company: "Math Plus",
    location: "Hockessin, DE",
    date: "Apr 2022 – Dec 2024",
    logo: "mathplus.png",
    points: [
      <>Provided personalized mathematics tutoring, tracking student progress and knowledge gaps</>,
      <>Fostered a learning environment encouraging curiosity, critical thinking, and consistent growth</>,
      <>Assisted in curriculum design and implemented interactive exercises to boost engagement</>,
    ],
    tech: [
      { Icon: SiWolframmathematica, color: "#DD1100" },
      { Icon: SiKhanacademy,        color: "#14BF96" },
    ],
    statusBar: "ROLE: TA | DURATION: 2+ YEARS | FOCUS: MATHEMATICS",
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

          <div className="flex items-center gap-2 flex-shrink-0">
            {job.incoming && (
              <span className="text-[9px] font-mono font-bold text-blue-400 bg-blue-500/15 border border-blue-500/25 px-2.5 py-1 rounded-full uppercase tracking-widest animate-pulse">
                Incoming
              </span>
            )}
            <span className="text-[10px] font-mono text-zinc-600 bg-white/4 border border-white/6 px-2.5 py-1 rounded-md whitespace-nowrap">
              {job.date}
            </span>
          </div>
        </div>

        {/* Body */}
        {job.incoming ? (
          <p className="text-sm text-blue-400/60 italic">
            Excited to join Fannie Mae as a Software Engineering Intern — more details to come.
          </p>
        ) : (
          <ul className="space-y-2">
            {job.points.map((pt, j) => (
              <li key={j} className="flex items-start gap-3 text-sm text-slate-50 leading-relaxed">
                <span className="mt-[7px] w-1 h-1 rounded-full bg-blue-500/60 flex-shrink-0" />
                {pt}
              </li>
            ))}
          </ul>
        )}
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
    <section id="experience" className="py-24 px-6">
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
