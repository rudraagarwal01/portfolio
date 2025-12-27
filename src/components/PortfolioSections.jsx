import React from "react"
import About from "./About" // 1. Import the new component
import Experience from "./Experience"
import Leadership from "./Leadership"
import Projects from "./Projects"
import Skills from "./Skills"
import Certifications from "./Certifications"

export default function PortfolioSections() {
  return (
    <div className="text-white relative z-10">
      
      {/* ABOUT - Place this first so it follows the Hero */}
      <div id="about">
        <About />
      </div>

      {/* EXPERIENCE */}
      <div id="experience">
        <Experience />
      </div>

      {/* LEADERSHIP & COMMUNITY */}
      <div id="leadership">
        <Leadership />
      </div>

      {/* PROJECTS */}
      <div id="projects">
        <Projects />
      </div>

      {/* SKILLS */}
      <div id="skills">
        <Skills />
      </div>

      {/* CERTIFICATIONS */}
      <div id="certifications">
        <Certifications />
      </div>

    </div>
  )
}