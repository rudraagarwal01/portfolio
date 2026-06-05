import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpRight, X } from "lucide-react";

const NAV_ITEMS = ["about", "experience", "certifications", "projects", "skills", "leadership", "contact"];

// ─── Precise scroll-position tracker ─────────────────────────────────────────
function useActiveSection() {
  const [active, setActive] = useState("home");
  const rafRef = useRef(null);

  useEffect(() => {
    const ids = ["home", ...NAV_ITEMS];

    const compute = () => {
      const threshold = window.innerHeight * 0.38;
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    compute();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return active;
}

// ─── Command Palette ──────────────────────────────────────────────────────────
const PALETTE_ITEMS = [
  { label: "Jump to AI EchoMail",      sub: "Featured project",        target: "projects"        },
  { label: "View AWS Certifications",  sub: "Credentials section",     target: "certifications"  },
  { label: "Work Experience",          sub: "Internships & roles",     target: "experience"       },
  { label: "About Rudra",              sub: "Bio & academic info",     target: "about"            },
  { label: "Contact Rudra",            sub: "Get in touch",            target: "contact"          },
];

function CommandPalette({ onClose }) {
  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    onClose();
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[18vh] px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: -8 }}
        transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-lg bg-[#141418] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8">
          <Search size={20} className="text-zinc-500 flex-shrink-0" />
          <span className="text-sm font-mono text-zinc-500 flex-1">Search commands...</span>
          <button
            onClick={onClose}
            className="text-zinc-700 hover:text-zinc-400 transition-colors"
            aria-label="Close palette"
          >
            <X size={14} />
          </button>
          <span className="text-[9px] font-mono text-zinc-700 bg-white/5 border border-white/8 px-1.5 py-0.5 rounded">
            ESC
          </span>
        </div>

        <div className="py-2">
          <p className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest px-4 py-2">
            Quick Jump
          </p>
          {PALETTE_ITEMS.map((item, i) => (
            <motion.button
              key={item.target}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => scrollTo(item.target)}
              className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/6 transition-colors duration-150 group text-left"
            >
              <div>
                <p className="text-sm font-mono text-zinc-200 group-hover:text-white transition-colors">
                  {item.label}
                </p>
                <p className="text-[10px] font-mono text-zinc-600 mt-0.5">{item.sub}</p>
              </div>
              <ArrowUpRight size={13} className="text-zinc-700 group-hover:text-blue-400 transition-colors flex-shrink-0" />
            </motion.button>
          ))}
        </div>

        <div className="px-4 py-2.5 border-t border-white/6 flex items-center gap-4">
          <span className="text-[9px] font-mono text-zinc-700">
            <span className="text-zinc-600">↵</span> select
          </span>
          <span className="text-[9px] font-mono text-zinc-700">
            <span className="text-zinc-600">↑↓</span> navigate
          </span>
          <span className="text-[9px] font-mono text-zinc-700 ml-auto">
            <span className="text-zinc-600">ESC</span> close
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ── Floating pill wrapper ── */}
      <div className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`pointer-events-auto flex items-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-2xl border transition-all duration-500 ${
            scrolled
              ? "bg-[#08080f]/95 border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)]"
              : "bg-[#08080f]/75 border-white/8 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          }`}
        >
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 px-2.5 py-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-blue-500/40">
              <img src="/profile.png" alt="Rudra" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-mono text-zinc-400 hidden sm:block">~/rudra</span>
          </motion.a>

          {/* Divider */}
          <div className="hidden lg:block w-px h-4 bg-white/8 mx-1" />

          {/* Desktop nav items */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="relative px-3.5 py-1.5 rounded-full group cursor-pointer"
              >
                {active === item && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/8 rounded-full border border-white/6"
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  />
                )}
                <span className={`relative z-10 text-xs font-mono uppercase tracking-wider transition-colors duration-150 ${
                  active === item ? "text-white font-bold" : "text-zinc-400 group-hover:text-zinc-200"
                }`}>{item}</span>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-4 bg-white/8 mx-1" />

          {/* ⌘K button */}
          <button
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command palette"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors group cursor-pointer"
          >
            <Search size={13} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            <span className="text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">⌘K</span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[4px] w-8 h-8 items-center justify-center ml-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="h-px w-4 bg-zinc-400 rounded block"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="h-px w-4 bg-zinc-400 rounded block"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="h-px w-4 bg-zinc-400 rounded block"
            />
          </button>
        </motion.nav>
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-[72px] left-4 right-4 z-50 lg:hidden"
          >
            <div className="bg-[#08080f]/98 backdrop-blur-2xl border border-white/8 rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.035 }}
                  className={`flex items-center justify-between px-5 py-3.5 text-xs font-mono uppercase tracking-wider transition-colors border-b border-white/4 last:border-0 cursor-pointer ${
                    active === item
                      ? "text-white bg-white/6 font-bold"
                      : "text-zinc-400 hover:text-white hover:bg-white/4"
                  }`}
                >
                  {item}
                  {active === item && <span className="w-1 h-1 rounded-full bg-blue-400" />}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Command Palette ── */}
      <AnimatePresence>
        {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} />}
      </AnimatePresence>
    </>
  );
}