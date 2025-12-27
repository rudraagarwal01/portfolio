import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaAws } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TypeAnimation } from "react-type-animation";

const ParticleBurst = () => {
  const particles = Array.from({ length: 12 });
  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-400 rounded-full"
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            x: Math.cos((i * 30 * Math.PI) / 180) * 120,
            y: Math.sin((i * 30 * Math.PI) / 180) * 120,
            scale: [0, 1.5, 0],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const popIn = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 10 },
    },
  };

  const socialBtnContainer = "group relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-all duration-300";

  return (
    <section
      id="home"
      className="relative flex flex-col items-center min-h-screen h-screen text-center overflow-hidden bg-transparent px-4 pt-16 md:pt-20"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-type-wrapper .type-animation-cursor::after {
          content: '|' !important;
          color: #60a5fa !important; 
          text-shadow: 0 0 10px #3b82f6 !important;
          opacity: 1 !important;
        }
        .custom-type-wrapper span::after {
          color: #60a5fa !important;
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}} />

      <div className="flex-grow-[1]" />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={popIn} className="relative group">
          <ParticleBurst />
          
          {/* STABLE RIPPLE 1: Box-Shadow Pulse */}
          <motion.div
            key="ripple-1"
            animate={{ 
              boxShadow: ["0 0 0 0px rgba(59, 130, 246, 0.4)", "0 0 0 40px rgba(59, 130, 246, 0)"]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute inset-0 rounded-full pointer-events-none"
          />

          {/* STABLE RIPPLE 2: Delayed Box-Shadow Pulse */}
          <motion.div
            key="ripple-2"
            animate={{ 
              boxShadow: ["0 0 0 0px rgba(96, 165, 250, 0.4)", "0 0 0 60px rgba(96, 165, 250, 0)"]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              delay: 1.25,
              ease: "linear" 
            }}
            className="absolute inset-0 rounded-full pointer-events-none"
          />
          
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -inset-10 bg-blue-600/20 blur-3xl rounded-full"
          />

          <div className="relative rounded-full p-1 bg-gradient-to-tr from-blue-400 via-blue-600 to-indigo-700 shadow-[0_0_60px_rgba(59,130,246,0.5)] transition-transform duration-500 group-hover:scale-105">
            <img
              src="/profile.png"
              alt="Rudra Agarwal"
              className="w-44 h-44 md:w-64 md:h-64 rounded-full object-cover border-4 border-black"
            />
          </div>
        </motion.div>

        <motion.h1
          variants={popIn}
          className="mt-8 md:mt-10 text-5xl md:text-8xl font-black tracking-tighter"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 to-blue-600 inline-block">
            RUDRA AGARWAL
          </span>
        </motion.h1>

        <motion.div variants={popIn} className="mt-3 mb-5 custom-type-wrapper">
          <TypeAnimation
            sequence={[
              "Technical Problem Solver", 2000,
              "Digital Innovator", 2000,
              "Systems Thinker", 2000,
              "Solution Designer", 2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            cursor={true}
            className="text-xl md:text-2xl text-blue-100/60 font-mono tracking-widest uppercase"
          />
        </motion.div>

        <motion.div
          variants={popIn}
          className="flex items-center justify-center space-x-6 mt-4"
        >
          {[
            { icon: <MdEmail />, href: "mailto:rudra.agarwal06@gmail.com" },
            { icon: <FaGithub />, href: "https://github.com/rudraagarwal01" },
            { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/rudra-agarwal01/" },
            { icon: <FaAws />, href: "https://www.credly.com/badges/1239a737-51c7-46bf-aa56-eed2c2a0ebb2/public_url" },
          ].map((item, i) => (
            <motion.a
              key={i}
              whileHover={{ y: -5, scale: 1.05 }}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={socialBtnContainer}
            >
              <span className="absolute inset-0 w-full h-full bg-blue-600/10 blur-lg group-hover:bg-blue-500/30 transition-all rounded-full" />
              <span className="absolute inset-0 w-full h-full border border-blue-400/30 rounded-full group-hover:border-blue-400 transition-all" />
              <span className="absolute inset-0 w-full h-full border border-blue-500 rounded-full animate-[ping_2s_linear_infinite] opacity-20 pointer-events-none" />
              
              <span className="relative z-10 text-2xl md:text-3xl text-blue-400 group-hover:text-white transition-colors duration-300">
                {item.icon}
              </span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div variants={popIn} className="mt-12 mb-6">
          <a
            href="#projects"
            className="group relative px-12 py-5 bg-transparent font-bold text-white transition-all duration-300 inline-flex items-center justify-center"
          >
            <span className="absolute inset-0 w-full h-full bg-blue-600/20 blur-xl group-hover:bg-blue-500/40 transition-all rounded-lg" />
            <span className="absolute inset-0 w-full h-full border-2 border-blue-400/50 rounded-lg group-hover:border-blue-400 group-hover:bg-blue-900/20 transition-all" />
            <span className="absolute inset-0 w-full h-full border-2 border-blue-500 rounded-lg animate-[ping_1.5s_linear_infinite] opacity-40 pointer-events-none" />
            
            <span className="relative z-10 flex items-center gap-3 group-hover:text-white uppercase tracking-[0.2em] text-sm md:text-base transition-colors duration-300">
              Explore My Work
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block"
              >
                →
              </motion.span>
            </span>
          </a>
        </motion.div>
      </motion.div>

      <div className="flex-grow-[1.2]" />
    </section>
  );
}