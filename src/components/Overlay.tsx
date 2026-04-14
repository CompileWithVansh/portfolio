"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // === SECTION 1: Vansh Gupta ===
  // Fades out and physically shoots off the top of the monitor by 20% scroll.
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], ["0vh", "-150vh"]); 
  const pointerEvents1 = useTransform(opacity1, v => (v > 0 ? "auto" : "none"));

  // === SECTION 2: Efficient Scalable Solutions ===
  // Drops in physically from the far LEFT side of the screen (-100%), 
  // gracefully scales into full definition, and then slides back out left.
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
  const x2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], ["-50%", "0%", "0%", "-50%"]);

  // === SECTION 3: Bridging Software and Hardware ===
  // Drops in physically from the far RIGHT side of the screen (+100%),
  // gracefully scales into full definition, and then slides back out right.
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.85, 0.95], [0, 1, 1, 0]);
  const x3 = useTransform(scrollYProgress, [0.6, 0.7, 0.85, 0.95], ["50%", "0%", "0%", "50%"]);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 overflow-hidden">
      
      {/* SECTION 1 - CENTER */}
      <motion.div
        style={{ opacity: opacity1, y: y1, position: 'absolute', inset: 0, pointerEvents: pointerEvents1 as never }}
        className="flex flex-col items-center justify-center w-full px-4"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 text-center mix-blend-difference drop-shadow-2xl">
          Vansh Gupta
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-medium tracking-wide text-center mix-blend-difference drop-shadow-2xl mb-8 max-w-2xl">
          Full Stack Developer | Embedded Software Engineer
        </p>
        <a 
          href="https://www.linkedin.com/in/vansh-gupta-cse" 
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto px-6 py-2 sm:px-8 sm:py-3 relative bg-white/[0.05] border border-white/20 rounded-full text-white font-medium hover:bg-white/10 transition backdrop-blur-md overflow-hidden group inline-block text-center"
        >
          <span className="relative z-10">Connect on LinkedIn</span>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition duration-500" />
        </a>
      </motion.div>

      {/* SECTION 2 - SCROLLS IN FROM LEFT */}
      <motion.div
        style={{ opacity: opacity2, x: x2 }}
        className="absolute inset-0 flex flex-col items-center md:items-start justify-center w-full px-6 md:px-[10%]"
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 mix-blend-difference leading-tight text-center md:text-left drop-shadow-xl max-w-3xl">
          I build efficient, <br className="hidden md:block"/> scalable solutions.
        </h2>
      </motion.div>

      {/* SECTION 3 - SCROLLS IN FROM RIGHT */}
      <motion.div
        style={{ opacity: opacity3, x: x3 }}
        className="absolute inset-0 flex flex-col items-center md:items-end justify-center w-full px-6 md:px-[10%]"
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 mix-blend-difference leading-tight text-center md:text-right drop-shadow-xl max-w-3xl">
          Bridging software <br className="hidden md:block"/> and hardware.
        </h2>
      </motion.div>
      
    </div>
  );
}
