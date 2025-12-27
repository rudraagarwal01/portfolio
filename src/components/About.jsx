import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 md:px-16 max-w-4xl mx-auto relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="glass-card p-8 md:p-12 border border-blue-500/20 relative overflow-hidden"
      >
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-500" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500" />

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
          About
        </h2>

        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            I’m a{" "}
            <span className="text-blue-400 font-semibold">
              Computer Science student at University of Maryland{" "}
            </span>
            concentrating in{" "}
            <span className="text-blue-400 font-semibold">
              Machine Learning
            </span>{" "}
            with a
            <span className="text-blue-400 font-semibold"> Business </span>{" "}
            minor. I’m driven to solve meaningful problems with software and AI,
            creating solutions that have a tangible impact in the real world.
          </p>

          <p>
            <span className="text-blue-400 font-semibold">
              Recent highlights:
            </span>{" "}
            as an IT Technician, I resolved{" "}
            <span className="text-white font-medium">
              kernel and driver issues across 100+ devices
            </span>{" "}
            and automated OS imaging to cut setup time by{" "}
            <span className="text-white font-bold">40%</span>. At Mphasis, I
            built a{" "}
            <span className="text-white font-medium">
              Neo4j knowledge graph for 30k+ documents
            </span>{" "}
            and integrated{" "}
            <span className="text-white font-medium">
              GPT-powered retrieval pipelines
            </span>{" "}
            into a full-stack Flask + React app. At Apollonian.AI, I shipped the
            backend for a{" "}
            <span className="text-white font-medium">
              real-time chat platform handling 1,000+ messages daily
            </span>{" "}
            and prototyped{" "}
            <span className="text-white font-medium">
              low-latency SadTalker avatars
            </span>{" "}
            for conversational AI demos.
          </p>

          <p>
            My expertise spans{" "}
            <span className="text-white font-medium">
              Full-Stack development, AI systems, and product-driven engineering
            </span>
            . I enjoy turning prototypes into production-ready solutions and
            collaborating with PMs, designers, and engineers to define success
            metrics and deliver impact.
          </p>
        </div>

        {/* Centered Academic & Professional Highlights Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-gray-800/50 pt-10">
          <div className="flex flex-col items-center text-center">
            <span className="text-gray-500 text-xs uppercase tracking-widest mb-2 font-semibold">
              Major
            </span>
            <span className="text-blue-500 font-bold text-xl">
              Computer Science
            </span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-gray-500 text-xs uppercase tracking-widest mb-2 font-semibold">
              Minor
            </span>
            <span className="text-blue-500 font-bold text-xl">
              Business
            </span>
          </div>
          <div className="flex flex-col items-center text-center col-span-2 md:col-span-1">
            <span className="text-gray-500 text-xs uppercase tracking-widest mb-2 font-semibold">
              Graduation
            </span>
            <span className="text-blue-500 font-bold text-xl">May 2027</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}