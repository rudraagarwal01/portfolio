import { motion } from "framer-motion";

export default function Experience() {
  const jobs = [
    {
      title: "IT Technician",
      company: "UMD - Division of Information Technology",
      location: "College Park, MD",
      date: "Sept 2025 – Present",
      logo: "UMD.jpeg",
      details:
        "Diagnosed kernel, driver, and network configuration issues across 100+ devices, improving overall system efficiency. Automated OS imaging using WDS, Bomgar, and Ninite, reducing setup and configuration time by roughly 40%. Configured BIOS and drivers for 200+ computers to meet university endpoint security and compliance standards, ensuring a stable and secure IT environment.",
    },
    {
      title: "Software Engineering Intern",
      company: "Mphasis",
      location: "New York, NY",
      date: "Jun 2025 – Aug 2025",
      logo: "mphasis.png",
      details:
        "Built a Neo4j knowledge graph for 30,000+ documents, improving semantic search precision and query speed by 20%. Designed comprehensive data pipelines for embeddings, reducing ingestion time by 35% and improving consistency. Integrated GPT and RAG models into a Flask–React app to support 500+ Cypher queries through an interactive chat interface.",
    },
    {
      title: "AI Software Engineer Intern",
      company: "Apollonian.AI",
      location: "Washington, DC",
      date: "Feb 2025 – Jun 2025",
      logo: "apollonian.png",
      details:
        "Developed a chat application delivering 1,000+ real-time AI therapy messages daily using React, Firebase, and JavaScript. Integrated OpenAI and Hugging Face APIs for dynamic, context-aware virtual mental health conversations. Prototyped SadTalker avatars with real-time emotion mapping and lip-sync, achieving sub-250 ms reaction latency for seamless user experience.",
    },
    {
      title: "AI Trainer",
      company: "Alignerr",
      location: "Fremont, CA",
      date: "Feb 2025 – Jun 2025",
      logo: "alignerr.png",
      details:
        "Improved LLM accuracy by evaluating and refining complex AI-generated replies across diverse domains and tasks. Authored detailed red-team scenarios and reasoning examples to strengthen overall model reliability. Partnered with machine learning engineers to optimize data pipelines, cutting processing overhead and reducing model bias by 25%.",
    },
    {
      title: "Lead Java Lecturer & Tutor",
      company: "Alpha Centauri",
      location: "Remote",
      date: "Feb 2023 – Dec 2024",
      logo: "alpha-centauri.png",
      details:
        "Led a team of 10+ tutors, delivering structured Java lessons to 50+ students. Designed optimized data pipelines and instructional materials, reducing administrative overhead by 25% while increasing engagement. Mentored junior tutors and implemented feedback loops to maintain high-quality teaching standards.",
    },
    {
      title: "Teacher Assistant",
      company: "Math Plus",
      location: "Hockessin, DE",
      date: "Apr 2022 – Dec 2024",
      logo: "mathplus.png",
      details:
        "Provided personalized tutoring in mathematics, tracking student progress and identifying gaps. Fostered a supportive learning environment that encouraged curiosity, critical thinking, and consistent improvement. Assisted in curriculum design and implemented interactive exercises to enhance engagement.",
    },
  ];

  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: 20 + Math.random() * 20,
    delay: Math.random() * 10,
  }));

  return (
    <section className="relative py-16 px-6 md:px-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-[#0ff] opacity-30"
            style={{
              width: star.size,
              height: star.size,
              top: `${star.top}%`,
              left: `${star.left}%`,
            }}
            animate={{
              x: [0, 20, 0, -20, 0],
              y: [0, -10, 0, 10, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: star.duration,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <h2
        className="text-4xl md:text-5xl font-extrabold mb-16 text-center text-[#0ff] tracking-tight z-10 relative"
        style={{ textShadow: "0 0 10px rgba(0,255,255,0.4)" }}
      >
        Experience
      </h2>

      <div className="space-y-16 relative z-10 max-w-5xl mx-auto">
        {jobs.map((job, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="relative flex flex-col md:flex-row items-start group"
          >
            <motion.div
              className="glass-card flex flex-col md:w-full p-6 border border-[#0ff] group-hover:scale-105 group-hover:shadow-[#0ff]/40 transition-transform duration-300 relative"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 12px 48px rgba(0,255,255,0.4)",
              }}
            >
              <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#0ff] to-purple-500 text-white font-bold text-lg shadow-lg">
                {idx + 1}
              </div>

              <div className="flex items-center space-x-3 mb-2">
                <img
                  src={`/logos/${job.logo}`}
                  alt={`${job.company} logo`}
                  className="w-10 h-10 rounded-full border border-[#0ff]"
                />
                <h3 className="text-xl font-bold text-[#0ff]">{job.title}</h3>
              </div>
              <span className="text-xs text-gray-400 mb-2">{job.date}</span>
              <div className="text-gray-300 font-semibold mb-2">
                {job.company}
                {job.location ? (
                  <span className="text-xs text-gray-400 ml-2">
                    {job.location}
                  </span>
                ) : null}
              </div>
              <p className="text-gray-200 mt-2 leading-relaxed">
                {job.details}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
