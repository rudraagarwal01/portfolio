import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PROJECTS_DATA = [
  {
    title: "DocFlow",
    desc: "Automated document intake and classification pipeline simulating AWS Tools",
    primaryMetric: "Auto-Classified",
    tech: ["AWS Textract", "Bedrock", "pytest"],
    link: "https://github.com/rudraagarwal01/DocFlow",
    type: "Featured",
    statusColor: "bg-violet-500"
  },
  {
    title: "AI EchoMail",
    desc: "Automated drafting engine with HuggingFace safety moderation.",
    primaryMetric: "-60% Draft Time",
    tech: ["FastAPI", "Python", "OpenAI"],
    link: "https://github.com/rudraagarwal01/AI-Email-Drafting-Tool",
    type: "Featured",
    statusColor: "bg-blue-500"
  },
  {
    title: "MealMatch",
    desc: "Platform mapping surplus commercial food to community groups.",
    primaryMetric: "1,000+ Listings",
    tech: ["React", "SQLite", "Leaflet"],
    link: "https://github.com/rudraagarwal01/MealMatch",
    type: "Featured",
    statusColor: "bg-indigo-500"
  },
  {
    title: "AuthGuard Extension",
    desc: "Chrome client blocking typo-squatting and phishing URLs.",
    primaryMetric: "95% Detection",
    tech: ["JavaScript", "HTML", "Chrome API"],
    link: "https://github.com/rudraagarwal01/authGaurd",
    type: "Independent",
    statusColor: "bg-zinc-500"
  },
  {
    title: "Fitness Genius",
    desc: "Native iOS biometric fitness logger with Apple HealthKit.",
    primaryMetric: "2,000+ Users",
    tech: ["Swift", "HealthKit", "Xcode"],
    link: "https://fitnessgenius28.wixsite.com/gym-genius",
    type: "Independent",
    statusColor: "bg-zinc-500"
  },
];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Projects() {
  return (
    <section id="projects" className="px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-3">
            Selected Work
          </p>
          <h2 className="font-mono font-bold text-3xl md:text-4xl text-zinc-50 tracking-tight uppercase">
            Projects
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

        {/* The "Process Monitor" List */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col border-y border-white/10"
        >
          {/* Table Header (Hidden on small screens) */}
          <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto] gap-8 items-center px-4 py-3 border-b border-white/5 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            <span className="w-24">Status</span>
            <span>Process / Description</span>
            <span className="w-48">Core Metric / Stack</span>
            <span className="w-24 text-right">Action</span>
          </div>

          {/* Project Rows */}
          {PROJECTS_DATA.map((p, index) => (
            <motion.div
              key={p.title}
              variants={rowVariants}
              className="group grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto] gap-4 md:gap-8 items-start md:items-center px-4 py-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors duration-200"
            >
              {/* Column 1: Status */}
              <div className="flex items-center gap-2.5 w-24 pt-1 md:pt-0">
                <span className={`w-1.5 h-1.5 rounded-full ${p.statusColor} shadow-[0_0_8px_currentColor]`} />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  {p.type}
                </span>
              </div>

              {/* Column 2: Name & Description */}
              <div className="flex flex-col pr-4">
                <h3 className="font-mono font-bold text-lg text-zinc-100 group-hover:text-blue-400 transition-colors duration-200">
                  {p.title}
                </h3>
                <p className="text-sm text-zinc-400 mt-1 max-w-xl">
                  {p.desc}
                </p>
              </div>

              {/* Column 3: Metrics & Stack */}
              <div className="flex flex-col md:w-48 gap-2">
                <span className="font-mono font-bold text-zinc-200 text-sm">
                  {p.primaryMetric}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span 
                      key={t} 
                      className="text-[9px] font-mono text-zinc-500 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Column 4: Action */}
              <div className="md:w-24 md:text-right pt-2 md:pt-0">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-blue-400 transition-colors duration-200"
                >
                  {p.link.includes("github.com") ? "src_code" : "live_deploy"}
                  <ArrowUpRight size={14} className="text-zinc-600 group-hover:text-blue-400 transition-colors" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}