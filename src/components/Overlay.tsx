"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: 0% to 15% (Extremely clean fade out before anything else starts)
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.15], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -100]); // Parallax UP

  // Section 2: 25% to 50%
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.5], [100, -100]); // Parallax UP

  // Section 3: 60% to 85%
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.85], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.85], [100, -100]); // Parallax UP

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
      
      {/* SECTION 1 - CENTER */}
      <motion.div
        style={{ opacity: opacity1, y: y1, position: 'absolute', inset: 0, pointerEvents: useTransform(opacity1, v => v > 0 ? "auto" : "none" ) as any }}
        className="flex flex-col items-center justify-center w-full px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 text-center mix-blend-difference drop-shadow-2xl">
          Vansh Gupta
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-medium tracking-wide text-center mix-blend-difference drop-shadow-2xl mb-8">
          Full Stack Developer | Embedded Software Engineer
        </p>
        <a 
          href="https://www.linkedin.com/in/vansh-gupta-cse" 
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto px-8 relative py-3 bg-white/[0.05] border border-white/20 rounded-full text-white font-medium hover:bg-white/10 transition backdrop-blur-md overflow-hidden group inline-block text-center"
        >
          <span className="relative z-10">Connect on LinkedIn</span>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition duration-500" />
        </a>
      </motion.div>

      {/* SECTION 2 - LEFT SAFE */}
      <motion.div
        style={{ opacity: opacity2, y: y2, position: 'absolute', inset: 0, pointerEvents: useTransform(opacity2, v => v > 0 ? "auto" : "none" ) as any }}
        className="flex flex-col items-start justify-center w-full px-6 md:px-24"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 mix-blend-difference leading-tight">
          I build efficient, <br className="hidden md:block"/> scalable solutions.
        </h2>
      </motion.div>

      {/* SECTION 3 - RIGHT SAFE */}
      <motion.div
        style={{ opacity: opacity3, y: y3, position: 'absolute', inset: 0, pointerEvents: useTransform(opacity3, v => v > 0 ? "auto" : "none" ) as any }}
        className="flex flex-col items-end justify-center text-right w-full px-6 md:px-24"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 mix-blend-difference leading-tight">
          Bridging software <br className="hidden md:block"/> and hardware.
        </h2>
      </motion.div>
      
    </div>
  );
}
