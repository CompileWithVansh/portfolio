"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

const CERTIFICATIONS = [
  {
    title: "LLM For Young Developers",
    issuer: "India AI & Meta",
    date: "Feb 2026",
    description: "Completed the Generative AI foundational course focusing on Large Language Models."
  },
  {
    title: "National AI Hackathon Participant",
    issuer: "Hi Labs",
    date: "2026",
    description: "Participated in the AI Hackathon and workshop series organized by Hi Labs."
  },
  {
    title: "IoT Cloud Engineer Certification",
    issuer: "EduSkills",
    date: "2025",
    description: "Completed comprehensive training on IoT cloud architecture."
  },
  {
    title: "Academic Presenter & Researcher",
    issuer: "4th International Conf. on Computational Techniques",
    date: "2026",
    description: "Delivered 'AI and the Future of Coding' presentation at Invertis University and authored the research abstract: 'The Perceived Threat: AI's Impact on the Future of Software Development'."
  }
];

export default function Certifications() {
  return (
    <section className="relative z-20 w-full bg-[#121212] py-24 px-6 md:px-12 lg:px-24 border-t border-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Certifications & Honors.
          </h2>
          <div className="w-16 h-1 bg-yellow-500/50 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors"
            >
              <div className="p-3 rounded-full bg-yellow-500/10 text-yellow-500 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{cert.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <span className="font-medium text-emerald-400/80">{cert.issuer}</span>
                  <span>•</span>
                  <span>{cert.date}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
