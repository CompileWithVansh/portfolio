"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import SkillsGrid from "@/components/SkillsGrid";
import Navigation from "@/components/Navigation";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="w-full bg-[#121212] text-white font-sans">
      <Navigation />
      <section id="home" ref={containerRef} className="relative h-[300vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <ScrollyCanvas scrollYProgress={scrollYProgress} />
          <Overlay scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* Profile Sections organized logically */}
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <SkillsGrid />
      
      <footer className="w-full py-12 border-t border-white/[0.05] bg-[#121212] relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm tracking-widest uppercase text-gray-500 font-medium mb-4 md:mb-0">
            © {new Date().getFullYear()} Vansh Gupta
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="mailto:vanshgupta7017@gmail.com" className="hover:text-white transition">vanshgupta7017@gmail.com</a>
            <a href="tel:7017225834" className="hover:text-white transition">+91 7017225834</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
