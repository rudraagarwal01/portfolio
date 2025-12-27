import React from "react"
import Experience from "./Experience"
import Leadership from "./Leadership"
import Projects from "./Projects"
import Skills from "./Skills"

export default function PortfolioSections() {
  return (
    <div className="bg-black text-white">
      
      {/* EXPERIENCE */}
      <section id="experience" className="py-16 px-6 md:px-16">
        <Experience />
      </section>

      {/* LEADERSHIP & COMMUNITY */}
      <section id="leadership" className="py-16 px-6 md:px-16">
        <Leadership />
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-16 px-6 md:px-16">
        <Projects />
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-16 px-6 md:px-16">
        <Skills />
      </section>

    </div>
  )
}
