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
import { AnimatePresence, motion } from 'framer-motion'
import './App.css'

// Generate stars
const generateStars = (count = 400) => {
  const stars = []
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      top: Math.random() * 200 + "%",
      left: Math.random() * 100 + "%",
      size: Math.random() * 2 + 1.5, // slightly bigger for depth
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 5
    })
  }
  return stars
}

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [scrollProgress, setScrollProgress] = useState(0)
  const stars = generateStars(400)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(theme)
  }, [theme])

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      setScrollProgress((totalScroll / windowHeight) * 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <div className="gradient-bg min-h-screen font-sans transition-colors duration-300">
      {/* Global Star Background */}
      <div className="hero-bg">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`
            }}
          />
        ))}
      </div>

      <CustomCursor />
      <ScrollProgress progress={scrollProgress} />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
        >
          <section id="about"><Hero /></section>
          <section id="experience"><Experience /></section>
          <section id="projects"><Projects /></section>
          <section id="skills"><Skills /></section>
          <section id="certifications"><Certifications /></section>
          <section id="leadership"><Leadership /></section>
          <section id="footer"><Footer /></section>
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
