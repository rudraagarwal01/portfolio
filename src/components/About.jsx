import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-16 px-6 md:px-16 max-w-5xl mx-auto relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Integrated Gradient Box Logic */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="group relative rounded-2xl p-[1.5px]"
        >
          {/* 1. The Border Layer (Dull by default, brightens on hover) */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-600 to-purple-600 opacity-20 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl" />

          {/* 2. The Outer Glow Layer (Appears only on hover) */}
          <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 shadow-[0_0_40px_rgba(59,130,246,0.4)] pointer-events-none" />

          {/* 3. The Inner Content Container */}
          <div className="relative w-full h-full rounded-[calc(theme(borderRadius.2xl)-1.5px)] bg-black overflow-hidden z-10 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight uppercase">
              About
            </h2>

            <div className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed">
              <p>
                I’m a{" "}
                <span className="text-blue-400 font-semibold">
                  Computer Science student at University of Maryland
                </span>{" "}
                concentrating in{" "}
                <span className="text-blue-400 font-semibold">
                  Machine Learning
                </span>{" "}
                with a{" "}
                <span className="text-blue-400 font-semibold">Business</span>{" "}
                minor. I’m driven to solve meaningful problems with software and
                AI, creating solutions that have a tangible impact in the real
                world.
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
                <span className="text-white font-semibold">40%</span>. At
                Mphasis, I built a{" "}
                <span className="text-white font-medium">
                  Neo4j knowledge graph for 30k+ documents
                </span>{" "}
                and integrated{" "}
                <span className="text-white font-medium">
                  GPT-powered retrieval pipelines
                </span>{" "}
                into a full-stack Flask + React app.
              </p>

              <p>
                My expertise spans{" "}
                <span className="text-white font-medium">
                  Full-Stack development, AI systems, and product-driven
                  engineering
                </span>
                . I enjoy turning prototypes into production-ready solutions and
                collaborating to deliver impact.
              </p>
            </div>

            {/* Stats/Highlights section */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-10">
              <div className="flex flex-col items-center text-center">
                <span className="text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-semibold">
                  Major
                </span>
                <span className="text-blue-400 font-bold text-lg md:text-xl">
                  Computer Science
                </span>
              </div>

              <div className="flex flex-col items-center text-center border-x border-white/5">
                <span className="text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-semibold">
                  Minor
                </span>
                <span className="text-blue-400 font-bold text-lg md:text-xl">
                  Business
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <span className="text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-semibold">
                  Graduation
                </span>
                <span className="text-blue-400 font-bold text-lg md:text-xl">
                  May 2027
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}