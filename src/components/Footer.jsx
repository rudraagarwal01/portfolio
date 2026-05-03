import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const links = [
  { icon: <MdEmail size={15} />,    href: "mailto:rudra.agarwal06@gmail.com",            label: "Email" },
  { icon: <FaGithub size={14} />,   href: "https://github.com/rudraagarwal01",            label: "GitHub" },
  { icon: <FaLinkedin size={14} />, href: "https://www.linkedin.com/in/rudra-agarwal01/", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative z-20 w-full border-t border-slate-200 dark:border-white/6 bg-white dark:bg-[#0c0c0e] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-slate-400 dark:text-zinc-600">
          © {new Date().getFullYear()} Rudra Agarwal · Built with React & Tailwind
        </span>

        <div className="flex items-center gap-5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={l.label}
              className="text-slate-400 dark:text-zinc-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              {l.icon}
            </a>
          ))}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[10px] font-mono text-slate-400 dark:text-zinc-600 hover:text-blue-600 dark:hover:text-blue-400 uppercase tracking-widest transition-colors duration-200 cursor-pointer"
          >
            ↑ Top
          </button>
        </div>
      </div>
    </footer>
  );
}
