import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "AI EchoMail",
    desc: "Architected a high-context email orchestration engine utilizing GPT-4 and FastAPI. Integrated a multi-layered moderation system via HuggingFace to ensure enterprise-grade content safety and drafting precision.",
    tech: ["React", "Python", "FastAPI", "PostgreSQL"],
    type: "Web App",
    link: "https://github.com/rudraagarwal01/AI-Email-Drafting-Tool",
    isGithub: true,
  },
  {
    title: "AuthGuard Extension",
    desc: "Engineered a real-time cybersecurity extension that implements Levenshtein distance algorithms to detect zero-day phishing attempts. Features a proactive reporting dashboard and encrypted storage for threat intelligence.",
    tech: ["JavaScript", "HTML", "CSS", "Chrome Storage API"],
    type: "Extension",
    link: "https://github.com/rudraagarwal01/authGaurd",
    isGithub: true,
  },
  {
    title: "Fitness Genius",
    desc: "Developed a high-performance iOS fitness ecosystem featuring a native haptic feedback engine and real-time biometric tracking. Scaled the platform to 2,000+ active users with 99.9% crash-free sessions.",
    tech: ["Swift", "Xcode", "JavaScript", "HTML"],
    type: "iOS App",
    link: "https://fitnessgenius28.wixsite.com/gym-genius",
    isGithub: false,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="mt-24 py-24 px-6 md:px-20">
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-[#0ff] mb-16 text-center tracking-tight"
        style={{ textShadow: "0 0 10px rgba(0,255,255,0.4)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative p-[1.5px] rounded-3xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.25)] overflow-hidden"
          >
            {/* Outline Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 opacity-70 group-hover:opacity-100 transition-opacity" />

            {/* Inner Content Card - Set to Solid Black */}
            <div className="relative bg-black rounded-[calc(1.5rem-1.5px)] p-7 h-full flex flex-col border border-cyan-500/10">
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {p.title}
                  </h3>
                  {p.type && (
                    <span className="text-[10px] uppercase tracking-widest text-cyan-500 font-semibold mt-1">
                      {p.type}
                    </span>
                  )}
                </div>

                {/* Visit Link Icon */}
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 text-cyan-400 hover:text-white hover:bg-cyan-600/50 transition-all duration-300 border border-white/10 hover:border-cyan-500/50"
                >
                  {p.isGithub ? (
                    <Github size={20} />
                  ) : (
                    <ExternalLink size={20} />
                  )}
                </a>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                {p.desc}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {p.tech.map((tech, j) => (
                  <span
                    key={j}
                    className="bg-cyan-900/20 text-cyan-300 text-xs font-medium px-3 py-1 rounded-full border border-cyan-700/30 group-hover:border-cyan-400/40 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
