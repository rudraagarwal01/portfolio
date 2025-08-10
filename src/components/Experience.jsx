import { motion } from "framer-motion";

export default function Experience() {
  const jobs = [
    {
      title: "Software Engineering Intern",
      company: "Mphasis",
      location: "New York, NY",
      date: "Jun 2025 – Aug 2025",
      logo: "mphasis.png",
      details: [
        "Transformed documents into a Neo4j knowledge graph using Python for semantic search and relationship mapping",
        "Built a robust pipeline for metadata tagging, semantic embedding, and CSV generation for Neo4j graph ingestion",
        "Integrated OpenAI and RAG to enable natural language queries via React UI and Flask API for Cypher generation"
      ]
    },
    {
      title: "Software Engineering Intern",
      company: "Apollonian.AI",
      location: "Washington, DC",
      date: "Feb 2025 – Jun 2025",
      logo: "apollonian.png",
      details: [
        "Developed responsive web pages using React, JavaScript, HTML/CSS, and integrated Firebase for real-time chat",
        "Integrated OpenAI and Hugging Face models via RESTful APIs using Postman to power a 24/7 AI psychiatrist",
        "Prototyped SadTalker for avatar-driven therapy, exploring emotion mapping and lip-sync for digital psychiatry"
      ]
    },
    {
      title: "AI Trainer",
      company: "Alignerr",
      location: "Fremont, CA",
      date: "February 2025 – June 2025",
      logo: "alignerr.png",
      details: [
        "Educated LLMs by refining AI-generated outputs, providing feedback to improve accuracy and domain relevance.",
        "Guided reasoning by crafting step-by-step solutions to complex prompts, helping the model handle specific topics.",
        "Conducted red-teaming to identify biases and limitations, testing model boundaries to ensure reliability."
      ]
    },
    {
      title: "Lead Java Lecturer & Tutor",
      company: "Alpha Centauri",
      location: "Remote",
      date: "February 2023 – December 2024",
      logo: "alpha-centauri.png",
      details: [
        "Led team of 10+ tutors to deliver instruction and improve student outcomes through personalized guidance",
        "Launched an online platform to streamline tutoring, increasing academic scores and student commitment by 30%",
        "Tutored students of all ages, particularly in underserved communities, to enhance skills in programming languages"
      ]
    },
    {
      title: "Teacher Assistant",
      company: "Math Plus",
      location: "Hockessin, DE",
      date: "April 2022 – December 2024",
      logo: "mathplus.png",
      details: [
        "Provided personalized one-on-one and general group tutoring sessions for various levels of mathematics",
        "Monitored each student’s progress to ensure student’s understanding of complex mathematical problems",
        "Fostered a supportive learning environment, boosting students’ confidence and making math enjoyable"
      ]
    }
  ];

  return (
    <section>
      <h2 className="text-3xl font-extrabold mb-8 text-center text-cyan-400 tracking-wide">Experience</h2>
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-400 to-purple-500 opacity-40 z-0" />
        <div className="space-y-12 relative z-10">
          {jobs.map((job, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`flex flex-col md:flex-row items-center md:items-start ${idx % 2 === 0 ? "md:flex-row-reverse" : ""} group`}
            >
              {/* Timeline dot */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 border-4 border-zinc-900 flex items-center justify-center z-20 shadow-lg md:mx-8 mb-4 md:mb-0">
                <span className="text-white font-bold">{idx + 1}</span>
              </div>

              {/* Card */}
              <div className="bg-zinc-800 rounded-xl shadow-xl p-6 w-full md:w-2/3 border border-cyan-700 group-hover:scale-105 transition-transform duration-300">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`/logos/${job.logo}`}
                      alt={`${job.company} logo`}
                      className="w-10 h-10 rounded-full border border-cyan-400"
                    />
                    <h3 className="text-xl font-bold text-cyan-300">{job.title}</h3>
                  </div>
                  <span className="text-xs text-gray-400">{job.date}</span>
                </div>
                <div className="text-gray-300 font-semibold mb-1">
                  {job.company}
                  {job.location ? <span className="text-xs text-gray-400 ml-2">{job.location}</span> : null}
                </div>
                <ul className="list-disc list-inside mt-2 text-gray-200 space-y-1">
                  {job.details.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
