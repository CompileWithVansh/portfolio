"use client";

import { motion } from "framer-motion";

const SKILL_CATEGORIES = [
  {
    title: "Programming Languages",
    skills: ["Python", "Java (DSA)", "C/C++", "JavaScript"]
  },
  {
    title: "Web Technologies",
    skills: ["HTML", "CSS", "JavaScript"]
  },
  {
    title: "Tools & DevOps",
    skills: ["Docker", "Git", "GitHub", "VS Code"]
  },
  {
    title: "IoT & Hardware",
    skills: ["Arduino", "ESP32", "Embedded Systems", "AWS IoT", "IR Sensors"]
  },
  {
    title: "Databases",
    skills: ["MySQL", "MongoDB"]
  },
  {
    title: "Personal Attributes",
    skills: ["Solution Oriented", "Active Learner", "Problem Solving", "Adaptability"]
  }
];

export default function SkillsGrid() {
  return (
    <section className="relative z-20 w-full bg-[#121212] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Technical Skills.
          </h2>
          <div className="w-16 h-1 bg-purple-500 rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.015] border border-white/[0.05] hover:border-white/10 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-200 mb-6 flex items-center border-b border-white/[0.05] pb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.03] text-sm text-gray-300 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
