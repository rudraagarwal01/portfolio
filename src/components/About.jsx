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
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="group relative rounded-2xl p-[1.5px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-600 to-purple-600 opacity-20 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl" />

          <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 shadow-[0_0_40px_rgba(59,130,246,0.4)] pointer-events-none" />

          <div className="relative w-full h-full rounded-[calc(theme(borderRadius.2xl)-1.5px)] bg-black overflow-hidden z-10 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight uppercase">
              About
            </h2>

            <div className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed">
              <p>
                Hello! I’m{" "}
                <span className="text-blue-400 font-semibold">
                  Rudra Agarwal
                </span>
                , a{" "}
                <span className="text-blue-400 font-semibold">
                  Computer Science student at the University of Maryland
                </span>{" "}
                studying{" "}
                <span className="text-blue-400 font-semibold">
                  Machine Learning
                </span>{" "}
                with a{" "}
                <span className="text-blue-400 font-semibold">
                  Business minor
                </span>
                . I’m drawn to the tech industry for a simple reason:
                building things has always felt like the most direct way
                to turn curiosity into impact. My goal is to{" "}
                <span className="text-blue-400 font-semibold">
                  use technological advancements to solve real world problems
                </span>
                , especially in areas where innovation can meaningfully
                improve people’s daily lives. I like problems where the
                “right” answer isn’t obvious, where you have to test,
                learn, and iterate until something actually works for
                real people.
              </p>

              <p>
                A big part of my identity is being someone who{" "}
                <span className="text-blue-400 font-semibold">
                  shows up consistently
                </span>
                . Working in technical roles taught me that progress is
                usually made in the unglamorous moments, debugging a
                driver issue, tracing a network configuration, or
                cleaning up an integration that nobody will notice
                unless it breaks. That mindset carries into how I learn:
                I’m not chasing perfect code on the first try; I’m
                chasing{" "}
                <span className="text-blue-400 font-semibold">
                  clarity, reliability, and a system I can explain and maintain
                </span>
                .
              </p>

              <p>
                My experiences also shaped the values behind the work I
                choose. Through tutoring and leading peers, I learned how
                much{" "}
                <span className="text-blue-400 font-semibold">
                  access and confidence affect outcomes
                </span>
                , some people just need the space to ask questions
                without feeling judged. Through projects like building
                community tools and student initiatives, I saw that
                technology is only “smart” if it’s{" "}
                <span className="text-blue-400 font-semibold">
                  usable, inclusive, and built with empathy
                </span>
                .
              </p>
            </div>

            {/* Bottom Stats Section */}
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