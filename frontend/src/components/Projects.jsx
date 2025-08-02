import { motion } from "framer-motion";

const projects = [
  {
    title: "AI EchoMail",
    desc: "Generated AI-powered email drafts using GPT-4, built with React, FastAPI, PostgreSQL, and HuggingFace moderation.",
    tech: ["React", "Python", "FastAPI", "PostgreSQL"],
    type: "Web App"
  },
  {
    title: "AuthGuard Extension",
    desc: "Chrome extension using Levenshtein distance to flag phishing login pages with alert reporting.",
    tech: ["JavaScript", "HTML", "CSS", "Chrome Storage API"],
    type: "Extension"
  },
  {
    title: "Fitness Genius",
    desc: "Launched iOS fitness app with real-time tracking, haptic feedback, and 2,000+ downloads.",
    tech: ["Swift", "Xcode", "JavaScript", "HTML"],
    type: "iOS App"
  }
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="mt-24 py-24 px-6 md:px-20 bg-gradient-to-b from-zinc-900 to-black"
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-cyan-400 mb-14 text-center"
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
            className="bg-gradient-to-br from-zinc-800 to-zinc-700 hover:from-zinc-700 hover:to-zinc-600 transition-all duration-300 p-6 rounded-3xl shadow-lg hover:shadow-cyan-500/30 border border-zinc-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-2xl font-bold text-white">{p.title}</h3>
              {p.type && (
                <span className="bg-cyan-900 text-cyan-300 text-xs px-3 py-1 rounded-full">
                  {p.type}
                </span>
              )}
            </div>

            <p className="text-gray-300 mb-4">{p.desc}</p>

            <div className="flex flex-wrap gap-2">
              {p.tech.map((tech, j) => (
                <span
                  key={j}
                  className="bg-cyan-700/20 text-cyan-300 text-xs font-medium px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
