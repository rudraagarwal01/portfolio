import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = ["about", "experience", "projects", "skills", "certifications", "leadership",];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Profile Section - Now a link to Hero */}
        <a 
          href="#home" 
          className="flex items-center space-x-3 group cursor-pointer"
          onClick={() => setMenuOpen(false)}
        >
          <div className="relative">
            <img
              src="/profile.png"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover transition-transform duration-300 group-hover:scale-110 group-hover:border-blue-400"
            />
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h1 className="text-lg md:text-xl font-semibold text-blue-400 tracking-wide transition-colors duration-300 group-hover:text-blue-300">
            Rudra Agarwal
          </h1>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-gray-200 hover:text-blue-400 transition duration-300 text-sm font-medium uppercase tracking-wide relative group"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-blue-400 mb-1.5 rounded transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-blue-400 mb-1.5 rounded transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-blue-400 rounded transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg flex flex-col items-start p-5 space-y-4 border-t border-blue-900/30 z-40">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-blue-400 transition text-base font-medium uppercase tracking-widest"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}