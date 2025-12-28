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
    tech: ["JavaScript", "HTML", "CSS", "Chrome API"],
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
        className="text-4xl md:text-5xl font-extrabold text-blue-500 mb-16 text-center tracking-tight"
        style={{ textShadow: "0 0 10px rgba(59, 130, 246, 0.4)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((p, i) => (
          <motion.a
            key={i}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }} // Faster entrance
            viewport={{ once: true }}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.2, ease: "easeOut" } // Faster hover popup
            }}
            className="group relative p-[1.5px] rounded-3xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(59, 130, 246, 0.25)] overflow-hidden block cursor-pointer"
          >
            {/* Outline Gradient - Transition duration lowered to 200ms */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-600 to-purple-600 opacity-70 group-hover:opacity-100 transition-opacity duration-200" />

            {/* Inner Content Card */}
            <div className="relative bg-black rounded-[calc(1.5rem-1.5px)] p-7 h-full flex flex-col border border-blue-500/10">
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200">
                    {p.title}
                  </h3>
                  {p.type && (
                    <span className="text-[10px] uppercase tracking-widest text-blue-500 font-semibold mt-1">
                      {p.type}
                    </span>
                  )}
                </div>

                {/* Visit Link Icon */}
                <div className="p-2 rounded-xl bg-white/5 text-blue-400 hover:text-white hover:bg-blue-600 transition-all duration-200 border border-white/10 hover:border-blue-500 relative z-20">
                  {p.isGithub ? (
                    <Github size={20} />
                  ) : (
                    <ExternalLink size={20} />
                  )}
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                {p.desc}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {p.tech.map((tech, j) => (
                  <span
                    key={j}
                    className="bg-blue-900/20 text-blue-300 text-xs font-medium px-3 py-1 rounded-full border border-blue-700/30 group-hover:border-blue-400/40 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}