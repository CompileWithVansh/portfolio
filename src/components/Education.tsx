"use client";

import { motion } from "framer-motion";

const EDUCATION = [
  {
    degree: "Bachelor of Technology (Computer Science)",
    school: "Invertis University, Bareilly",
    year: "2023 – 2027",
    score: null
  },
  {
    degree: "Senior Secondary (12th)",
    school: "Sacred Hearts Public School",
    year: "2023",
    score: "85.5%"
  },
  {
    degree: "Higher Secondary (10th)",
    school: "Sacred Hearts Public School",
    year: "2021",
    score: "92.8%"
  }
];

export default function Education() {
  return (
    <section id="education" className="relative z-20 w-full bg-[#121212] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Education.
          </h2>
          <div className="w-16 h-1 bg-white/20 rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATION.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl hover:bg-white/[0.05] transition-all"
            >
              <span className="text-indigo-400 font-bold tracking-widest text-xs uppercase mb-4">{edu.year}</span>
              <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
              <p className="text-gray-400 mb-6">{edu.school}</p>
              
              {edu.score && (
                <div className="mt-auto inline-flex items-center justify-center px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 font-semibold text-sm">
                  Score: {edu.score}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
