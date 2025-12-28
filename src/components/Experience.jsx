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

  return (
    <section className="relative py-16 px-6 md:px-16 overflow-hidden bg-transparent">
      <h2
        className="text-4xl md:text-5xl font-extrabold mb-16 text-center text-blue-500 tracking-tight z-10 relative uppercase"
        style={{ textShadow: "0 0 15px rgba(59, 130, 246, 0.4)" }}
      >
        Experience
      </h2>

      <div className="space-y-12 relative z-10 max-w-5xl mx-auto">
        {jobs.map((job, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="relative"
          >
            {/* Integrated Gradient Box Wrapper */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group relative rounded-2xl p-[1.5px] overflow-hidden"
            >
              {/* 1. Border Layer: Dull (opacity-20) to bright on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-600 to-purple-600 opacity-20 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl" />

              {/* 2. Outer Glow Layer */}
              <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 shadow-[0_0_40px_rgba(59,130,246,0.3)] pointer-events-none" />

              {/* 3. Inner Content Container */}
              <div className="relative w-full h-full rounded-[calc(theme(borderRadius.2xl)-1.5px)] bg-black overflow-hidden z-10 p-6 md:p-8">
                
                {/* Job Number Bubble */}
                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 text-white font-bold text-lg shadow-lg z-20">
                  {idx + 1}
                </div>

                <div className="flex items-center space-x-4 mb-3">
                  <img
                    src={`/logos/${job.logo}`}
                    alt={`${job.company} logo`}
                    className="w-12 h-12 rounded-full border border-blue-500/30 object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-blue-400">{job.title}</h3>
                    <div className="text-gray-300 font-semibold text-sm">
                      {job.company}
                      {job.location && (
                        <span className="text-xs text-gray-400 ml-2">
                          • {job.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <span className="inline-block text-xs text-gray-500 mb-4 px-2 py-1 bg-white/5 rounded-md border border-white/10">
                  {job.date}
                </span>

                <p className="text-gray-300 leading-relaxed text-base">
                  {job.details}
                </p>

                {/* Animated Hover Line - Bottom (Center-out) */}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-center" />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}