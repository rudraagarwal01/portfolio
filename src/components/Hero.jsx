import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaAws } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import HeroRubiksCube from "./HeroRubiksCube";

const socials = [
  { Icon: MdEmail,    size: 22, href: "mailto:rudra.agarwal06@gmail.com",                                              label: "Email Me",      color: "#f87171" },
  { Icon: FaGithub,   size: 20, href: "https://github.com/rudraagarwal01",                                             label: "GitHub",        color: "#e4e4e7" },
  { Icon: FaLinkedin, size: 20, href: "https://www.linkedin.com/in/rudra-agarwal01/",                                  label: "LinkedIn",      color: "#0077B5" },
  { Icon: FaAws,      size: 20, href: "https://www.credly.com/badges/1239a737-51c7-46bf-aa56-eed2c2a0ebb2/public_url", label: "AWS Certified", color: "#FF9900" },
];

// ─── Animation helper ─────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

// ─── Magnetic button ──────────────────────────────────────────────────────────
function MagneticButton({ to, href, children, primary = false, external = false }) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: (e.clientX - (r.left + r.width  / 2)) * 0.28,
      y: (e.clientY - (r.top  + r.height / 2)) * 0.28,
    });
  };

  const handleClick = (e) => {
    if (to) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <motion.a
      ref={ref}
      href={external ? href : to}
      onClick={handleClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className={`cursor-pointer inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
        primary
          ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_32px_rgba(59,130,246,0.55)]"
          : "bg-white/5 border border-white/12 hover:border-white/24 text-zinc-300 hover:text-white"
      }`}
    >
      {children}
    </motion.a>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  return (
    <section
      id="home"
      ref={heroRef}
      // REMOVED pt-24, KEPT pb-16
      className="relative min-h-screen flex items-center pb-4 px-6"
    >
      <div className="relative max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

        {/* ── Left: Text content ── */}
        <motion.div className="flex flex-col items-start" style={{ opacity: contentOpacity, y: contentY }}>

          {/* Availability badge */}
          <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-500/40 ring-offset-2 ring-offset-[#06060e]">
                <img src="/profile.png" alt="Rudra Agarwal" className="w-full h-full object-cover" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#06060e]" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-blue-400 tracking-[0.2em] uppercase">
                Open to opportunities
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">Available for Summer 2027</p>
            </div>
          </motion.div>

          {/* Giant name with gradient shimmer on last name */}
          <motion.h1
            {...fadeUp(0.08)}
            className="font-mono font-black tracking-tighter leading-[0.88] mb-6 uppercase"
          >
            <span className="block text-[clamp(3.5rem,10vw,8rem)] text-zinc-50">Rudra</span>
            <span className="block text-[clamp(3.5rem,10vw,8rem)] text-gradient">Agarwal</span>
          </motion.h1>

          {/* Role headline inline style */}
          <motion.p 
            {...fadeUp(0.18)} 
            className="text-base md:text-lg text-zinc-400 font-medium tracking-tight mb-5"
          >
            Computer Science @ University of Maryland <span className="text-zinc-600 mx-2">·</span> AI & Software Engineering Enthusiast
          </motion.p>

          {/* Fannie Mae badge — OPTIMIZED: Scaled layout and text size up to match Screenshot 2026-06-04 at 7.54.26 PM.png */}
          <motion.div {...fadeUp(0.24)} className="mb-7">
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/8 border border-blue-500/20 text-sm font-mono font-semibold text-blue-400 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              SWE Intern @ Fannie Mae
            </span>
          </motion.div>

          {/* Magnetic CTA buttons */}
          <motion.div {...fadeUp(0.36)} className="flex flex-wrap gap-3 mb-9">
            {/* Swapped href for 'to' for React Router */}
            <MagneticButton to="/projects" primary>Explore My Work</MagneticButton>
            <MagneticButton to="/contact">Get in Touch</MagneticButton>
          </motion.div>

          {/* Social dock */}
          <motion.div
            {...fadeUp(0.42)}
            className="inline-flex items-center gap-0.5 px-3 py-2.5 rounded-full bg-white/4 backdrop-blur-md border border-white/8"
          >
            {socials.map((s) => (
              <div key={s.label} className="relative group">
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 pointer-events-none z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-150 bg-[#0e0e18] border border-white/10 text-zinc-300 text-[10px] font-mono px-2 py-1 rounded-md whitespace-nowrap"
                  >
                    {s.label}
                  </motion.div>
                </div>
                <motion.a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 cursor-pointer"
                  style={{ color: s.color }}
                  whileHover={{ scale: 1.18, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  <s.Icon size={s.size} />
                </motion.a>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: 3D Rubik's Cube (desktop only) ── */}
        <motion.div
          className="hidden md:flex items-center justify-center"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <HeroRubiksCube />
        </motion.div>
      </div>

    </section>
  );
}