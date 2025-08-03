import React from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPython,
  FaReact,
  FaGithub,
  FaNodeJs,
  FaGitAlt,
  FaAws,
  FaSwift,
  FaCloud, // Azure fallback
  FaJava,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiFlask,
  SiFirebase,
  SiMongodb,
  SiPostgresql,
  SiXcode,
  SiPostman,
  SiInsomnia,
  SiPytorch,
  SiFramer, // Framer Motion icon
} from "react-icons/si";

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
    label: "Frameworks and Libraries",
    skills: [
      { name: "React", icon: <FaReact className="text-cyan-400" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
      { name: "Flask", icon: <SiFlask className="text-white" /> },
      { name: "Firebase", icon: <SiFirebase className="text-yellow-400" /> },
      { name: "SwiftUI", icon: <FaSwift className="text-orange-400" /> },
      { name: "PyTorch", icon: <SiPytorch className="text-red-600" /> },
    ],
  },
  {
    label: "Backend & Database",
    skills: [
      { name: "Node.js", icon: <FaNodeJs className="text-green-400" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-500" /> },
      { name: "Framer Motion", icon: <SiFramer className="text-pink-500" /> }, // replaced Neo4j
      { name: "Firebase", icon: <SiFirebase className="text-yellow-400" /> },
      { name: "SadTalker", icon: <span className="text-gray-200 text-xl">🗣️</span> },
    ],
  },
  {
    label: "Developer Tools",
    skills: [
      { name: "Git", icon: <FaGitAlt className="text-red-400" /> },
      { name: "GitHub", icon: <FaGithub className="text-gray-300" /> },
      { name: "Xcode", icon: <SiXcode className="text-blue-300" /> },
      { name: "Terminal", icon: <span className="text-gray-200 text-xl">⌨️</span> },
      { name: "Postman", icon: <SiPostman className="text-orange-400" /> },
      { name: "Insomnia", icon: <SiInsomnia className="text-purple-400" /> },
      { name: "OpenAI API", icon: <span className="text-green-300 text-xl">🤖</span> },
      { name: "AWS", icon: <FaAws className="text-orange-300" /> },
      { name: "Azure", icon: <FaCloud className="text-blue-400" /> },
    ],
  },
];

// ...rest of your component unchanged


const Skills = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-6">My Skills</h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2">
        {skillsCategories.map((category) => (
          <div key={category.label}>
            <h3 className="text-xl font-semibold mb-4">{category.label}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg shadow hover:scale-105 transition"
                >
                  <span className="text-2xl">{skill.icon}</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
