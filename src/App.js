import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Leadership from "./components/Leadership";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import StarBackground from "./components/StarBackground";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setScrollProgress((totalScroll / windowHeight) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen font-sans bg-black overflow-x-hidden">
      {/* Background Layers */}
      <StarBackground />
      <div className="tech-grid" />

      {/* UI Overlays */}
      <CustomCursor />
      <ScrollProgress progress={scrollProgress} />
      <Navbar theme={theme} toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />

      <AnimatePresence mode="wait">
        <motion.main
          className="relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
        >
          <section id="home"><Hero /></section>
          <section id="about"><About /></section>
          <section id="experience"><Experience /></section>
          <section id="projects"><Projects /></section>
          <section id="skills"><Skills /></section>
          <section id="certifications"><Certifications /></section>
          <section id="leadership"><Leadership /></section>
        </motion.main>
      </AnimatePresence>

      {/* FOOTER MOVED HERE: Outside of main and section wrappers */}
      <Footer />
    </div>
  );
}