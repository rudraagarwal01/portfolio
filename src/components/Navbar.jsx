import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpRight, X } from "lucide-react";

const NAV_ITEMS = ["about", "experience", "certifications", "projects", "skills", "leadership", "contact"];

// ─── Precise scroll-position tracker ─────────────────────────────────────────
// Checks each section's getBoundingClientRect on every scroll event.
// The active section is the last one whose top edge is above 38% of viewport height.
// Zero IntersectionObserver lag — updates synchronously on the scroll RAF.
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
    compute(); // run once on mount
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

  // Close on ESC
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: -8 }}
        transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-lg bg-[#141418] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search row */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8">
          <Search size={14} className="text-zinc-500 flex-shrink-0" />
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

        {/* Items */}
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

        {/* Footer */}
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

  // Scrolled shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ⌘K / Ctrl+K global shortcut
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
      <nav className={`fixed top-0 left-0 w-full z-50 bg-[#141418] border-b border-white/5 transition-shadow duration-300 ${scrolled ? "shadow-[0_4px_32px_rgba(0,0,0,0.6)]" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 h-14 grid grid-cols-[auto_1fr_auto] items-center gap-4">

          {/* ── Logo ── */}
          <motion.a
            href="#home"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2.5 group flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-blue-500/40 group-hover:ring-blue-500 transition-all duration-200">
              <img src="/profile.png" alt="Rudra" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-mono font-semibold text-zinc-300 group-hover:text-blue-400 transition-colors duration-200 hidden sm:block">
              ~/rudra
            </span>
          </motion.a>

          {/* ── Desktop nav — centered ── */}
          <div className="hidden lg:flex items-center justify-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="relative px-2.5 py-1.5 rounded-lg group"
              >
                {active === item && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-lg border border-white/8"
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  />
                )}
                <span className={`relative z-10 text-[10px] font-mono uppercase tracking-widest transition-all duration-150 ${
                  active === item
                    ? "text-white font-semibold"
                    : "text-slate-400 group-hover:text-white group-hover:font-semibold"
                }`}>
                  {item}
                </span>
              </a>
            ))}
          </div>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-3">
            {/* ⌘K Command palette trigger */}
            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
              className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/8 border border-white/8 hover:border-white/14 rounded-lg transition-all duration-200 group flex-shrink-0 w-48"
            >
              <Search size={13} className="text-zinc-500 group-hover:text-zinc-300 transition-colors flex-shrink-0" />
              <span className="text-[11px] font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors flex-1 text-left">
                Search...
              </span>
              <span className="text-xs font-mono text-white flex-shrink-0">
                ⌘K
              </span>
            </button>

            {/* Mobile hamburger */}
            <div className="lg:hidden">
              <button
                className="flex flex-col gap-[5px] w-5 p-0.5"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-px w-full bg-zinc-400 rounded block"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="h-px w-full bg-zinc-400 rounded block"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-px w-full bg-zinc-400 rounded block"
                />
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden bg-[#141418] border-t border-white/5 px-6"
            >
              <div className="py-3 flex flex-col gap-0.5">
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item}`}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`block px-3 py-2.5 rounded-lg text-[11px] font-mono uppercase tracking-widest transition-all duration-150 ${
                      active === item
                        ? "text-white font-semibold bg-white/10"
                        : "text-slate-400 hover:text-white hover:bg-white/6"
                    }`}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Command Palette Modal ── */}
      <AnimatePresence>
        {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
