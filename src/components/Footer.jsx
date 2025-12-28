import React from "react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // Added relative and z-20 to ensure clickability over the background
    <footer className="relative z-20 w-full bg-black border-t border-white/10 pt-12 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold tracking-wider m-0">
              <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                RUDRA AGARWAL
              </span>
            </h2>
            
            <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase font-bold text-gray-500">
              <p>© {new Date().getFullYear()} All rights reserved</p>
              <div className="w-1 h-1 rounded-full bg-blue-500/50" />
              <p className="text-gray-400">2025 Edition</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-6 mt-8 md:mt-0">
            <button
              onClick={scrollToTop}
              className="group text-[11px] font-bold text-gray-400 hover:text-blue-500 transition-all duration-300 uppercase tracking-[0.3em] flex items-center gap-2 cursor-pointer"
            >
              Back to top 
              <span className="text-sm group-hover:-translate-y-1 transition-transform duration-300">↑</span>
            </button>
          </div>
          
        </div>
      </div>
    </footer>
  );
}