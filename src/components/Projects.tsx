"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";
import Image from "next/image";

const PROJECTS = [
  {
    title: "Servd AI Recipe Hub",
    category: "Full Stack AI App",
    description: "A comprehensive AI-powered platform to generate recipes from pantry ingredients, featuring a Strapi backend, Next.js frontend, Clerk authentication, and Gemini AI integration.",
    github: "https://github.com/CompileWithVansh/Servd-AI-Recipe-Hub",
    link: "https://servdrecipe.vercel.app/",
    image: "/projects/project_5.png",
    fit: "contain"
  },
  {
    title: "Remote Code Runner",
    category: "DevOps & Backend",
    description: "Engineered an architecture to execute code securely in isolated environments using Docker containerization.",
    github: "https://github.com/CompileWithVansh",
    image: "/projects/remote_code_runner.png"
  },
  {
    title: "Smart Parking System",
    category: "IoT & Hardware",
    description: "Designed an automated IoT system using dual Arduino boards and IR sensors for real-time vehicle tracking.",
    github: "https://github.com/CompileWithVansh",
    image: "/projects/smart_parking.png"
  },
  {
    title: "Voice to Text Generator",
    category: "Machine Learning",
    description: "Developed a tool to accurately transcribe spoken audio into text using specialized libraries.",
    github: "https://github.com/CompileWithVansh",
    image: "/projects/voice_to_text.png"
  },
  {
    title: "Cardiovascular Disease Prediction System",
    category: "Data Science",
    description: "Collaborated on a machine learning project using Python, Pandas, and Scikit-learn for health risk evaluation.",
    github: "https://github.com/CompileWithVansh",
    image: "/projects/project_4.png"
  },
  {
    title: "Home Automation",
    category: "Embedded Systems",
    description: "Integrated wireless and sensor-based inputs for lighting control via various microcontrollers.",
    github: "https://github.com/CompileWithVansh",
    image: "/projects/project_1.png"
  },
  // {
  //   title: "Multilingual Translator",
  //   category: "NLP Tooling",
  //   description: "Built a translation application capable of processing and converting text across multiple languages.",
  //   github: "https://github.com/CompileWithVansh",
  //   image: "/projects/project_2.png"
  // }
];

export default function Projects() {
  return (
    <section id="projects" className="relative z-20 w-full bg-[#121212] py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Selected Work.
          </h2>
          <div className="w-24 h-1 bg-white/20 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="group relative flex flex-col p-6 md:p-8 rounded-[2rem] overflow-hidden bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/[0.03] blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 w-full aspect-video rounded-xl overflow-hidden mb-8 border border-white/10">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className={`transition-transform duration-700 group-hover:scale-105 ${project.fit === 'contain' ? 'object-contain bg-white' : 'object-cover'}`} 
                />
              </div>

              <div className="relative z-10 flex flex-col items-start h-full">
                <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-3">
                  {project.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                  {project.description}
                </p>
                
                <div className="mt-auto flex items-center w-full pt-6 border-t border-white/[0.05]">
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                      aria-label="View Live Project"
                    >
                      <ExternalLink className="w-5 h-5 mr-1" />
                      View Project
                    </a>
                  )}
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors ml-auto"
                    aria-label="View Source on GitHub"
                  >
                    <Code2 className="w-5 h-5 mr-1" />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
