"use client";

import { motion } from "framer-motion";

const EXPERIENCES = [
  {
    role: "Campus Ambassador",
    company: "Cognizance 2026, IIT Roorkee",
    date: "March 2026",
    description: "Led student outreach, event promotion, and coordination for the national technical festival.",
  },
  {
    role: "IoT Cloud Engineer Virtual Intern",
    company: "EduSkills (Supported by AICTE)",
    date: "Oct 2025 – Dec 2025",
    description: "Completed a 10-week internship on AWS IoT, device-to-cloud communication, and cloud architecture.",
  }
];

export default function Experience() {
  return (
    <section id="experience" className="relative z-20 w-full bg-[#121212] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Experience.
          </h2>
          <div className="w-16 h-1 bg-indigo-500 rounded-full" />
        </motion.div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-[#121212] text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 transition-colors duration-300 group-hover:border-indigo-400 group-hover:bg-indigo-900/20">
                <div className="w-2 h-2 bg-indigo-500 rounded-full" />
              </div>
              
              {/* Card content */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/[0.1] transition-all">
                <div className="flex flex-col mb-2">
                  <span className="text-indigo-400 font-bold tracking-widest text-xs uppercase mb-1">{exp.date}</span>
                  <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                  <h4 className="text-sm font-medium text-gray-400 mb-4">{exp.company}</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
