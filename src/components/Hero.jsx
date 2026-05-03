import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaAws } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const socials = [
  { Icon: MdEmail,    size: 22, href: "mailto:rudra.agarwal06@gmail.com",                                              label: "Email Me",      color: "#f87171" },
  { Icon: FaGithub,   size: 20, href: "https://github.com/rudraagarwal01",                                             label: "GitHub",        color: "#e4e4e7" },
  { Icon: FaLinkedin, size: 20, href: "https://www.linkedin.com/in/rudra-agarwal01/",                                  label: "LinkedIn",      color: "#0077B5" },
  { Icon: FaAws,      size: 20, href: "https://www.credly.com/badges/1239a737-51c7-46bf-aa56-eed2c2a0ebb2/public_url", label: "AWS Certified", color: "#FF9900" },
];

// ─── System Status Terminal ───────────────────────────────────────────────────
// Lines cycle through the core stack: React, FastAPI, Neo4j, PyTorch.
const LOG_LINES = [
  { body: "Checking React renderer...",         ok: true },
  { body: "Verifying FastAPI endpoints...",     ok: true },
  { body: "Connecting to Neo4j graph DB...",   ok: true },
  { body: "Loading PyTorch model weights...",  ok: true },
  { body: "Mounting Leaflet map tiles...",      ok: true },
  { body: "Compiling Tailwind styles...",       ok: true },
  { stack: "React · FastAPI · Neo4j · PyTorch · Leaflet · Tailwind" },
];

function SystemStatus() {
  const [gen, setGen]         = useState(0);   // increments to restart loop
  const [done, setDone]       = useState(0);
  const [partial, setPartial] = useState("");
  const [blink, setBlink]     = useState(true);
  const lineIdx = useRef(0);
  const charIdx = useRef(0);

  // Cursor blink — always running
  useEffect(() => {
    const id = setInterval(() => setBlink((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Typing loop — re-runs on every `gen` increment.
  // Never empty: cursor is always visible from the first render.
  useEffect(() => {
    lineIdx.current = 0;
    charIdx.current = 0;
    setDone(0);
    setPartial("");

    const strings = LOG_LINES.map((l) =>
      l.stack ? `> Stack: ${l.stack}` : `> ${l.body} [OK]`
    );

    let timer;
    function tick() {
      const li = lineIdx.current;

      if (li >= strings.length) {
        // All lines done — pause 3 s then restart
        timer = setTimeout(() => setGen((g) => g + 1), 3000);
        return;
      }

      const str = strings[li];
      const ci  = charIdx.current;

      if (ci < str.length) {
        setPartial(str.slice(0, ci + 1));
        charIdx.current++;
        timer = setTimeout(tick, 26);
      } else {
        setDone((d) => d + 1);
        lineIdx.current++;
        charIdx.current = 0;
        setPartial("");
        timer = setTimeout(tick, 260);
      }
    }

    // Start immediately — no leading delay so the terminal is never blank
    timer = setTimeout(tick, 0);
    return () => clearTimeout(timer);
  }, [gen]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative w-full max-w-md mx-auto"
    >
      <div className="rounded-xl overflow-hidden shadow-2xl border border-white/8 bg-[#0d0d10]">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#161619] border-b border-white/6">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-[11px] font-mono text-zinc-500">system_status.sh</span>
        </div>

        {/* Log area */}
        <div className="p-5 space-y-2.5 min-h-[260px]">
          {/* Completed lines */}
          {LOG_LINES.slice(0, done).map((line, i) => (
            <div key={i} className="flex items-center gap-2 font-mono text-[12px] leading-5 w-full">
              <span className="text-emerald-400 select-none flex-shrink-0">&gt;</span>
              {line.stack ? (
                <>
                  <span className="text-zinc-500 flex-shrink-0">Stack:</span>
                  <span className="text-blue-400">{line.stack}</span>
                </>
              ) : (
                <>
                  <span className="text-zinc-400 flex-1">{line.body}</span>
                  <span className="text-emerald-400 flex-shrink-0">[OK]</span>
                </>
              )}
            </div>
          ))}

          {/* Currently-typing line */}
          {done < LOG_LINES.length && (
            <div className="flex items-center font-mono text-[12px] leading-5">
              <span className="text-zinc-400">{partial}</span>
              <span
                className="inline-block w-[7px] h-[13px] bg-blue-400 ml-px align-middle"
                style={{ opacity: blink ? 1 : 0 }}
              />
            </div>
          )}

          {/* Idle cursor after all lines done */}
          {done >= LOG_LINES.length && (
            <div className="flex items-center gap-2 font-mono text-[12px] leading-5">
              <span className="text-emerald-400">&gt;</span>
              <span
                className="inline-block w-[7px] h-[13px] bg-blue-400"
                style={{ opacity: blink ? 1 : 0 }}
              />
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-blue-600 text-[10px] font-mono text-white">
          <span>system · online</span>
          <span className="opacity-60">stack v2.0</span>
        </div>
      </div>

      {/* Ambient glow behind terminal */}
      <div className="absolute -inset-4 bg-blue-600/10 blur-2xl rounded-2xl -z-10 pointer-events-none" />
    </motion.div>
  );
}

// ─── Animation helper ─────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-16 px-6"
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">

        {/* ── Left: Text content ── */}
        <div className="flex flex-col items-start">

          {/* Availability badge with photo */}
          <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-blue-500/50">
              <img src="/profile.png" alt="Rudra Agarwal" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-mono text-blue-600 dark:text-blue-400 tracking-widest uppercase">
                Open to opportunities
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-slate-500 dark:text-zinc-500 font-medium">
                  Available for Summer 2027
                </span>
              </div>
            </div>
          </motion.div>

          {/* Name — font-mono, uppercase */}
          <motion.h1
            {...fadeUp(0.1)}
            className="font-mono font-black text-5xl md:text-6xl lg:text-7xl tracking-tighter text-slate-900 dark:text-zinc-50 leading-[0.95] mb-4 uppercase"
          >
            Rudra
            <br />
            <span className="text-blue-600 dark:text-blue-400">Agarwal</span>
          </motion.h1>

          {/* Degree / focus line */}
          <motion.p
            {...fadeUp(0.17)}
            className="text-sm md:text-base font-medium text-slate-500 dark:text-zinc-500 mb-3 leading-snug"
          >
            Junior Computer Science @ University of Maryland · Machine Learning
          </motion.p>

          {/* Fannie Mae badge */}
          <motion.div {...fadeUp(0.22)} className="mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/25 text-xs font-mono font-semibold text-blue-700 dark:text-blue-400 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />
              Incoming SWE Intern @ Fannie Mae
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            {...fadeUp(0.28)}
            className="text-base text-slate-500 dark:text-zinc-500 max-w-md mb-10 leading-relaxed"
          >
            Building intelligent, scalable systems at the intersection of AI and
            software engineering.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.34)} className="flex flex-wrap gap-3 mb-10">
            <a
              href="#projects"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-blue-500/25 hover:shadow-lg"
            >
              Explore My Work
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 bg-transparent border border-slate-300 dark:border-white/12 hover:border-blue-500 dark:hover:border-blue-500/60 text-slate-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-semibold rounded-lg transition-all duration-200"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Social dock */}
          <motion.div
            {...fadeUp(0.4)}
            className="inline-flex items-center gap-1 px-4 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10"
          >
            {socials.map((s) => (
              <div key={s.label} className="relative group">
                {/* Tooltip */}
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-150 bg-[#1e1e26] border border-white/10 text-zinc-300 text-[10px] font-mono px-2 py-1 rounded-md whitespace-nowrap"
                  >
                    {s.label}
                  </motion.div>
                </div>

                <motion.a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200"
                  style={{ color: s.color }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <s.Icon size={s.size} />
                </motion.a>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: System Status terminal (desktop only) ── */}
        <div className="hidden md:flex items-center justify-center">
          <SystemStatus />
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5 text-slate-400 dark:text-zinc-600"
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-current" />
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
