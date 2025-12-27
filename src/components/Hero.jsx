import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaAws } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TypeAnimation } from "react-type-animation";
import { useMemo } from "react";

// 1. Shooting Star Component - Fixed Coordinates
const ShootingStar = ({ delay, top, duration, color }) => (
  <motion.div
    initial={{ x: "-20vw", opacity: 0 }}
    animate={{ 
      x: ["0vw", "110vw"], 
      y: ["0vh", "30vh"],
      opacity: [0, 1, 1, 0] 
    }}
    transition={{
      duration: duration,
      delay: delay,
      ease: "linear",
      repeat: Infinity,
      repeatDelay: Math.random() * 5 + 2,
    }}
    className="absolute h-[2px] z-0 pointer-events-none"
    style={{ 
      top: top, 
      left: "-10%", 
      width: "150px",
      background: `linear-gradient(to right, transparent, ${color}, white)`,
      transform: "rotate(20deg)"
    }}
  />
);

const generateStars = (count = 200) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
    sparkle: Math.random() > 0.6,
  }));
};

export default function Hero() {
  // Memoize stars so they don't re-roll on every tiny state change
  const staticStars = useMemo(() => generateStars(150), []);
  
  // Create a dense shower of 15 stars
  const shootingStars = useMemo(() => 
    Array.from({ length: 15 }, () => ({
      top: `${Math.random() * 70}%`,
      delay: Math.random() * 15,
      duration: Math.random() * 1.5 + 1,
      color: Math.random() > 0.5 ? "#00ffff" : "#a855f7",
    })), []
  );

  const popIn = {
    hidden: { scale: 0, opacity: 0, filter: "brightness(2)" },
    visible: { 
      scale: 1, 
      opacity: 1, 
      filter: "brightness(1)",
      transition: { type: "spring", stiffness: 120, damping: 10 } 
    },
  };

  const socialBtnClass =
    "flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full glass-card text-[#0ff] hover:text-white hover:shadow-[0_0_25px_rgba(0,255,255,0.8)] transition-all duration-300 text-2xl md:text-3xl border border-[#0ff]/20";

  return (
    <section
      id="home"
      className="relative flex flex-col items-center min-h-screen text-center overflow-hidden bg-black px-4 pt-20 pb-12 md:pt-28"
    >
      {/* Background Static Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {staticStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            animate={star.sparkle ? { opacity: [0.2, 0.8, 0.2] } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: star.delay }}
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
          />
        ))}
      </div>

      {/* Background Shooting Stars */}
      {shootingStars.map((s, i) => (
        <ShootingStar 
          key={i} 
          top={s.top} 
          delay={s.delay} 
          duration={s.duration} 
          color={s.color} 
        />
      ))}

      {/* Main Content Container */}
      <motion.div 
        className="relative z-10 flex flex-col items-center"
        initial="hidden"
        animate="visible"
      >
        {/* Profile Picture */}
        <motion.div variants={popIn} className="relative group">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -inset-6 border border-[#0ff]/30 rounded-full" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, delay: 1, repeat: Infinity }}
            className="absolute -inset-10 border border-purple-500/20 rounded-full" 
          />
          <div className="relative rounded-full p-1 bg-gradient-to-tr from-[#0ff] via-purple-500 to-blue-500 shadow-[0_0_50px_rgba(0,255,255,0.3)]">
            <img
              src="/profile.png"
              alt="Rudra Agarwal"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-black"
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={popIn}
          className="mt-10 text-5xl md:text-8xl font-black text-white tracking-tighter"
        >
          RUDRA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ff] to-blue-500">AGARWAL</span>
        </motion.h1>

        {/* Type animation */}
        <motion.div variants={popIn} className="mt-4 mb-6">
          <TypeAnimation
            sequence={[
              "Aspiring Software Engineer", 2000,
              "Product Manager", 2000,
              "AI & ML Enthusiast", 2000,
              "Web & App Developer", 2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-xl md:text-2xl text-gray-400 font-mono tracking-widest uppercase"
          />
        </motion.div>

        {/* Social buttons */}
        <motion.div
          variants={popIn}
          className="flex items-center justify-center space-x-6 mt-4"
        >
          {[
            { icon: <MdEmail />, href: "mailto:rudra.agarwal06@gmail.com" },
            { icon: <FaGithub />, href: "https://github.com/rudraagarwal01" },
            { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/rudra-agarwal01/" },
            { icon: <FaAws />, href: "https://www.credly.com/badges/1239a737-51c7-46bf-aa56-eed2c2a0ebb2/public_url" }
          ].map((item, i) => (
            <motion.a
              key={i}
              whileHover={{ y: -10, filter: "brightness(1.5)" }}
              href={item.href}
              target={item.href.startsWith('http') ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={socialBtnClass}
            >
              {item.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* View projects button */}
        <motion.div variants={popIn} className="mt-10 mb-6">
          <a
            href="#projects"
            className="group relative px-12 py-4 bg-transparent font-bold text-white transition-all duration-300 inline-block"
          >
            <span className="absolute inset-0 w-full h-full border-2 border-[#0ff] rounded-lg group-hover:bg-[#0ff] transition-all" />
            <span className="absolute inset-0 w-full h-full border-2 border-[#0ff] rounded-lg animate-ping opacity-20" />
            <span className="relative group-hover:text-black uppercase tracking-widest transition-colors duration-300">
              View Projects
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}