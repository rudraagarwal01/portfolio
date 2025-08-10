import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center min-h-screen text-center"
    >
      {/* Animated Gradient Border */}
      <motion.div
        className="rounded-full p-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-border hover:scale-105 transition-transform shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <img
          src="/profile.jpg"
          alt="Rudra Agarwal"
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-zinc-900"
        />
      </motion.div>

      {/* Name */}
      <motion.h1
        className="mt-6 text-4xl md:text-5xl font-extrabold text-cyan-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Rudra Agarwal
      </motion.h1>

      {/* Typewriter Roles */}
      <TypeAnimation
        sequence={[
          "Aspiring Software Engineer",
          2000,
          "AI & ML Enthusiast",
          2000,
          "Web & App Developer",
          2000,
        ]}
        wrapper="span"
        speed={50}
        repeat={Infinity}
        className="text-lg md:text-xl text-gray-300 mb-4 mt-2"
      />

      {/* Email & Icons */}
      <motion.div
        className="flex items-center justify-center space-x-6 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <a
          href="mailto:rudra.agarwal06@gmail.com"
          className="text-cyan-300 underline text-md hover:text-cyan-400 transition"
        >
          rudra.agarwal06@gmail.com
        </a>
        <a
          href="https://github.com/rudraagarwal01"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-cyan-400 text-2xl"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/rudra-agarwal01/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-cyan-400 text-2xl"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="mt-6 flex gap-4 flex-wrap justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <a
          href="#projects"
          className="px-6 py-2 rounded-full border border-cyan-400 text-cyan-300 hover:bg-cyan-500 hover:text-white transition"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="px-6 py-2 rounded-full border border-cyan-400 text-cyan-300 hover:bg-cyan-500 hover:text-white transition"
        >
          Contact Me
        </a>
      </motion.div>
    </section>
  );
}
