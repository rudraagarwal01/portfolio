import React from "react";
import { motion } from "framer-motion"; // Added motion import
import {
  FaHtml5, FaCss3Alt, FaJs, FaPython, FaReact, FaGitAlt, FaGithub, FaNodeJs, FaAws, FaSwift, FaJava, FaCloud
} from "react-icons/fa";
import { SiTailwindcss, SiFlask, SiFirebase, SiMongodb, SiPostgresql, SiXcode, SiPostman, SiInsomnia, SiPytorch, SiFramer, SiDocker } from "react-icons/si";

const skillsCategories = [
  {
    label: "Programming Languages",
    skills: [
      { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
      { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
      { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
      { name: "Python", icon: <FaPython className="text-blue-400" /> },
      { name: "Swift", icon: <FaSwift className="text-orange-400" /> },
      { name: "Java", icon: <FaJava className="text-red-600" /> },
    ],
  },
  {
    label: "Frameworks & Libraries",
    skills: [
      { name: "React", icon: <FaReact className="text-cyan-400" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
      { name: "Flask", icon: <SiFlask className="text-white" /> },
      { name: "Firebase", icon: <SiFirebase className="text-yellow-400" /> },
      { name: "PyTorch", icon: <SiPytorch className="text-red-600" /> },
      { name: "Framer Motion", icon: <SiFramer className="text-pink-500" /> },
    ],
  },
  {
    label: "Backend & Database",
    skills: [
      { name: "Node.js", icon: <FaNodeJs className="text-green-400" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-500" /> },
      { name: "AWS", icon: <FaAws className="text-orange-300" /> },
      { name: "Azure", icon: <FaCloud className="text-blue-400" /> },
      { name: "Docker", icon: <SiDocker className="text-blue-600" /> },
    ],
  },
  {
    label: "Developer Tools",
    skills: [
      { name: "Git", icon: <FaGitAlt className="text-red-400" /> },
      { name: "GitHub", icon: <FaGithub className="text-gray-300" /> },
      { name: "Xcode", icon: <SiXcode className="text-blue-300" /> },
      { name: "Postman", icon: <SiPostman className="text-orange-400" /> },
      { name: "Insomnia", icon: <SiInsomnia className="text-purple-400" /> },
      { name: "OpenAI API", icon: <span className="text-green-300 text-xl">🤖</span> },
    ],
  },
];

export default function Skills() {
  return (
    <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
      {/* Uniform Title Styling */}
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-[#0ff] mb-16 text-center tracking-tight"
        style={{ textShadow: "0 0 10px rgba(0,255,255,0.4)" }}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        My Skills
      </motion.h2>

      <div className="grid gap-12 sm:grid-cols-2">
        {skillsCategories.map((category) => (
          <div 
            key={category.label} 
            className="p-6 rounded-xl border border-white/10 bg-white/5 glass-card"
          >
            <h3 className="text-xl font-semibold mb-6 text-cyan-300">
              {category.label}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-card flex flex-col items-center justify-center p-4 bg-white/5 rounded-xl border border-white/10 transition-all duration-300 cursor-default
                    hover:scale-105 hover:shadow-[inset_0_0_6px_#0ff] hover:border-[#0ff]"
                >
                  <span className="text-3xl mb-2">{skill.icon}</span>
                  <span className="text-sm font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}