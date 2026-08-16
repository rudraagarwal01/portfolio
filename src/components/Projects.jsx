import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import urbanenergyImage from "../images/urbanenergy.png";
import docflowImage from "../images/docflow.png";
import aiechomailImage from "../images/aiechomail.png";
import mealMatchImage from "../images/mealmatch.png";
import authguardImage from "../images/authguard.png";
import fitnessGeniusImage from "../images/fitnessgenius.jpeg";


const PROJECTS_DATA = [
  {
    title: "Urban Energy Insights",
    desc: "Event-driven platform for ingesting building telemetry, computing rolling slot baselines, and autonomously flagging demand anomalies via Redis Streams.",
    primaryMetric: "<200ms Reaction Time",
    tech: ["Docker", "Redis Streams", "PostgreSQL"],
    link: "https://github.com/rudraagarwal01/urban-energy-insights",
    demoPath: "/demos/urban-energy",
    image: urbanenergyImage
  },
  {
    title: "DocFlow",
    desc: "Simulates AWS Textract and Bedrock to automatically extract, classify, and route enterprise documents into typed data queues for streamlined downstream processing.",
    primaryMetric: "Auto-Classified",
    tech: ["AWS Textract", "Bedrock", "pytest"],
    link: "https://github.com/rudraagarwal01/DocFlow",
    demoPath: "/demos/docflow",
    image: docflowImage
  },
  {
    title: "AI EchoMail",
    desc: "Full-stack application using GPT-4, FAISS vector search, and multi-agent AI moderation to generate and refine professional emails.",
    primaryMetric: "-60% Draft Time",
    tech: ["FastAPI", "Python", "OpenAI"],
    link: "https://github.com/rudraagarwal01/AI-Email-Drafting-Tool",
    demoPath: "/demos/aiechomail",
    image: aiechomailImage
  },
  {
    title: "MealMatch",
    desc: "Real-time logistics platform connecting surplus restaurant food to communities using smart-matching algorithms and interactive maps.",
    primaryMetric: "1,000+ Listings",
    tech: ["React", "SQLite", "Leaflet"],
    link: "https://github.com/rudraagarwal01/MealMatch",
    demoPath: "/demos/mealmatch",
    image: mealMatchImage
  },
  {
    title: "AuthGuard",
    desc: "Chrome extension that flags typo-squatted and insecure login pages in real time, backed by a FastAPI service and PostgreSQL store that scores domain risk and logs reports. Includes an admin dashboard for reviewing flagged sites.",
    primaryMetric: "95% Detection Accuracy",
    tech: ["FastAPI", "PostgreSQL", "React", "Chrome API"],
    link: "https://github.com/rudraagarwal01/authGaurd",
    demoPath: "/demos/authguard",
    image: authguardImage
  },
  {
    title: "Fitness Genius",
    desc: "Native iOS fitness application leveraging Apple HealthKit to securely log, manage, and visualize personal biometric data and daily activity metrics.",
    primaryMetric: "2,000+ Users",
    tech: ["Swift", "HealthKit", "Xcode"],
    link: "https://fitnessgenius28.wixsite.com/gym-genius",
    demoPath: "/demos/fitness-genius",
    image: fitnessGeniusImage
  },
];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Projects() {
  return (
    <section id="projects" className="px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        
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

        {/* Bento Grid layout */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROJECTS_DATA.map((p) => (
            <motion.div
              key={p.title}
              variants={cardVariants}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#0a0a0e] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 min-h-[420px] hover:border-blue-500/80 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            >
              
              {/* TOP: Visual Mockup / App Image */}
              <div className="relative w-full h-[220px] shrink-0 overflow-hidden bg-zinc-950 flex items-center justify-center border-b border-white/5">
                {/* Subtle bottom shadow overlay on the image to blend into the text section */}
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0a0a0e] to-transparent z-10" />
                
                {p.image ? (
                  <img 
                    src={p.image} 
                    alt={`${p.title} preview`} 
                    className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : null}

                {/* Fallback Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
                <div className="absolute w-12 h-12 rounded-full border border-dashed border-white/10 animate-[spin_20s_linear_infinite]" />
              </div>

              {/* BOTTOM: Metadata & Details */}
              <div className="w-full flex-1 p-5 flex flex-col justify-between z-10 bg-gradient-to-b from-[#0a0a0e] to-zinc-950/80">
                <div>
                  <h3 className="font-sans font-bold text-lg tracking-tight text-zinc-100 group-hover:text-white transition-colors duration-200">
                    {p.title}
                  </h3>
                  
                  {/* Distinct UI tags for all 3 tech stack items */}
                  <div className="flex flex-wrap gap-1.5 mt-1.5 mb-2.5">
                    {p.tech.map((t) => (
                      <span 
                        key={t} 
                        className="text-[9px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded uppercase tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  {/* Removed line-clamp and fixed heights so the whole description displays uniformly */}
                  <p className="text-[12px] text-zinc-400 leading-relaxed mb-4">
                    {p.desc}
                  </p>
                </div>

                {/* Footer Action Row */}
                <div className="flex items-center justify-between mt-auto pt-2">
                  {/* Left Side Metric */}
                  <div className="flex items-center text-zinc-500">
                    <span className="text-[11px] font-mono font-medium group-hover:text-zinc-300 transition-colors">
                      {p.primaryMetric}
                    </span>
                  </div>

                  {/* Right Side Buttons */}
                  <div className="flex items-center gap-2">
                    <Link
                      to={p.demoPath}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-mono font-semibold transition-all duration-300 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20"
                    >
                      Try it
                    </Link>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-mono font-semibold transition-all duration-300 border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                    >
                      <span>
                        {p.link.includes("github.com") ? "Source" : "Live"}
                      </span>
                      <ArrowUpRight size={12} strokeWidth={2.5} />
                    </a>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}