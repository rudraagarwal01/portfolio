import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const ThemeToggleButton = (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-900 text-cyan-400 hover:bg-cyan-600 hover:text-white transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Profile Section */}
        <div className="flex items-center space-x-3">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-cyan-400 object-cover"
          />
          <h1 className="text-lg md:text-xl font-semibold text-cyan-400 tracking-wide">
            Rudra Agarwal
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {["about", "experience", "projects", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-gray-200 hover:text-cyan-400 transition duration-300 text-sm font-medium uppercase tracking-wide"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
          {ThemeToggleButton}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-cyan-400 mb-1 rounded transition-all ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-cyan-400 mb-1 rounded transition-all ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-cyan-400 rounded transition-all ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-lg flex flex-col items-start p-5 space-y-4 border-t border-gray-700 z-40">
          {["about", "experience", "projects", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-cyan-400 transition text-base font-medium"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
          <div className="w-full flex justify-center">{ThemeToggleButton}</div>
        </div>
      )}
    </nav>
  );
}
