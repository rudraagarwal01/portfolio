import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StarBackground from "./components/StarBackground";
import ScrollProgress from "./components/ScrollProgress";
import CommandPalette from "./components/CommandPalette";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Certifications from "./pages/Certifications";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Leadership from "./pages/Leadership";
import Contact from "./pages/Contact";
import "./App.css";

function AppShell() {
  const location = useLocation();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollBarVisible, setScrollBarVisible] = useState(false);
  const [cursor, setCursor] = useState({ x: -1000, y: -1000 });
  const rafRef = useRef(null);
  const hideTimerRef = useRef(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const pct = total > 0 ? (document.documentElement.scrollTop / total) * 100 : 0;

      if (thumbRef.current) {
        thumbRef.current.style.top = `${pct}%`;
        thumbRef.current.style.transform = `translateY(-${pct}%)`;
      }

      setScrollProgress(pct);
      setScrollBarVisible(true);
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => setScrollBarVisible(false), 1500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(hideTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() =>
        setCursor({ x: e.clientX, y: e.clientY })
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#06060e]">
      <StarBackground />
      <div className="tech-grid" />

      <div className="fixed top-[-20vh] right-[-10vw] w-[55vw] h-[55vw] max-w-[680px] max-h-[680px] rounded-full bg-blue-600/[0.07] blur-[110px] pointer-events-none z-[1]" />
      <div className="fixed bottom-[5vh] left-[-12vw] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-violet-700/[0.07] blur-[110px] pointer-events-none z-[1]" />

      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          background: `radial-gradient(700px circle at ${cursor.x}px ${cursor.y}px, rgba(59,130,246,0.07), rgba(124,58,237,0.03) 50%, transparent 65%)`,
        }}
      />

      <ScrollProgress progress={scrollProgress} />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <main className="pt-32 pb-16 min-h-screen relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />

      <div
        className="fixed right-2 top-3 bottom-3 z-50 w-[5px] pointer-events-none transition-opacity duration-500"
        style={{ opacity: scrollBarVisible ? 1 : 0 }}
      >
        <div className="absolute inset-0 rounded-full bg-white/8" />
        <div
          ref={thumbRef}
          className="absolute w-full rounded-full bg-white/40"
          style={{ height: "64px" }}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
