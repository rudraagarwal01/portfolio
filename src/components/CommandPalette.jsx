import { useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ArrowUpRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PALETTE_ITEMS = [
  { label: "Go to Home", sub: "Hero overview", path: "/" },
  { label: "About Rudra", sub: "Bio & academic info", path: "/about" },
  { label: "Work Experience", sub: "Internships & roles", path: "/experience" },
  { label: "View Certifications", sub: "Credentials section", path: "/certifications" },
  { label: "Explore Projects", sub: "Selected work", path: "/projects" },
  { label: "Technical Skills", sub: "Stack & expertise", path: "/skills" },
  { label: "Leadership Impact", sub: "Community initiatives", path: "/leadership" },
  { label: "Contact Rudra", sub: "Get in touch", path: "/contact" },
];

export default function CommandPalette({ isOpen, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
              key={item.path}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/6 transition-colors duration-150 group text-left"
            >
              <div>
                <p className="text-sm font-mono text-zinc-200 group-hover:text-white transition-colors">
                  {item.label}
                </p>
                <p className="text-[10px] font-mono text-zinc-600 mt-0.5">{item.sub}</p>
              </div>
              <ArrowUpRight
                size={13}
                className="text-zinc-700 group-hover:text-blue-400 transition-colors flex-shrink-0"
              />
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
