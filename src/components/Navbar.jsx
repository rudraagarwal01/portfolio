import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";

const NAV_ITEMS = [
  { label: "about", path: "/about" },
  { label: "experience", path: "/experience" },
  { label: "certifications", path: "/certifications" },
  { label: "projects", path: "/projects" },
  { label: "skills", path: "/skills" },
  { label: "leadership", path: "/leadership" },
  { label: "contact", path: "/contact" },
];

const navLinkClass = ({ isActive }) =>
  `relative z-10 text-xs font-mono uppercase tracking-wider transition-colors duration-150 ${
    isActive ? "text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
  }`;

export default function Navbar({ onOpenPalette }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="pointer-events-auto flex items-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-2xl border bg-[#08080f]/90 border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)]"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-2.5 py-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-blue-500/40">
                <img src="/profile.png" alt="Rudra" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-mono text-zinc-400 hidden sm:block">~/rudra</span>
            </NavLink>
          </motion.div>

          <div className="hidden lg:block w-px h-4 bg-white/8 mx-1" />

          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.path} to={item.path} className="relative px-3.5 py-1.5 rounded-full group cursor-pointer">
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/8 rounded-full border border-white/6"
                        transition={{ type: "spring", stiffness: 500, damping: 38 }}
                      />
                    )}
                    <span className={navLinkClass({ isActive })}>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:block w-px h-4 bg-white/8 mx-1" />

          <button
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors group cursor-pointer"
          >
            <Search size={13} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            <span className="text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">⌘K</span>
          </button>

          <button
            className="lg:hidden flex flex-col gap-[4px] w-8 h-8 items-center justify-center ml-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
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
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.035 }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-5 py-3.5 text-xs font-mono uppercase tracking-wider transition-colors border-b border-white/4 last:border-0 cursor-pointer ${
                        isActive
                          ? "text-white bg-white/6 font-bold"
                          : "text-zinc-400 hover:text-white hover:bg-white/4"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
