import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Leadership from './components/Leadership'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import FloatingContact from './components/FloatingContact'
import { AnimatePresence, motion } from 'framer-motion'
import Contact from "./components/Contact";

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      setScrollProgress((totalScroll / windowHeight) * 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <div className={`${theme} transition-colors duration-300 min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} font-sans`}>
      <CustomCursor />
      <ScrollProgress progress={scrollProgress} />
      <FloatingContact />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
        >
          {/* Intro/About Section */}
          <section id="about">
            <Hero />
          </section>

          {/* Experience First */}
          <section id="experience">
            <Experience />
          </section>

          {/* Then Projects */}
          <section id="projects">
            <Projects />
          </section>

          {/* Then Technical Skills */}
          <section id="skills">
            <Skills />
          </section>

          {/* Then Certifications */}
          <section id="certifications">
            <Certifications />
          </section>

          {/* Then Leadership */}
          <section id="leadership">
            <Leadership />
          </section>

          {/* Contact and Footer */}
          <section id="contact">
            <Contact />
            <Footer />
          </section>
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
