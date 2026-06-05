import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Leadership from "./components/Leadership";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import StarBackground from "./components/StarBackground";
import { motion } from "framer-motion";
import "./App.css";

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollBarVisible, setScrollBarVisible] = useState(false);
  const [cursor, setCursor] = useState({ x: -1000, y: -1000 });
  const rafRef = useRef(null);
  const hideTimerRef = useRef(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const pct = (document.documentElement.scrollTop / total) * 100;

      // Update thumb position directly — bypasses React render cycle, zero lag
      if (thumbRef.current) {
        thumbRef.current.style.top       = `${pct}%`;
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

      {/* Ambient gradient orbs */}
      <div className="fixed top-[-20vh] right-[-10vw] w-[55vw] h-[55vw] max-w-[680px] max-h-[680px] rounded-full bg-blue-600/[0.07] blur-[110px] pointer-events-none z-[1]" />
      <div className="fixed bottom-[5vh] left-[-12vw] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-violet-700/[0.07] blur-[110px] pointer-events-none z-[1]" />

      {/* Cursor spotlight — blue+violet blend */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          background: `radial-gradient(700px circle at ${cursor.x}px ${cursor.y}px, rgba(59,130,246,0.07), rgba(124,58,237,0.03) 50%, transparent 65%)`,
        }}
      />

      <ScrollProgress progress={scrollProgress} />
      <Navbar />

      <motion.main
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="experience"><Experience /></section>
        <section id="certifications"><Certifications /></section>
        <section id="projects"><Projects /></section>
        <section id="skills"><Skills /></section>
        <section id="leadership"><Leadership /></section>
        <section id="contact"><Contact /></section>
      </motion.main>

      <Footer />

      {/* Disappearing scroll indicator */}
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
