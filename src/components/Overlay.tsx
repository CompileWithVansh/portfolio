"use client";

import {
  motion,
  MotionValue,
  useTransform,
} from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {

  const opacity1 = useTransform(scrollYProgress, [0, 0.55, 0.6], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.55, 0.6], [0, -40]);
  const pointerEvents1 = useTransform(scrollYProgress, [0, 0.59, 0.6], ["auto", "auto", "none"]);

  return (
    <div className="absolute inset-0 z-[999] pointer-events-none overflow-hidden">

      <motion.div
        style={{ opacity: opacity1, y: y1, position: 'absolute', inset: 0, pointerEvents: pointerEvents1 as never }}
        className="flex flex-col items-center justify-center w-full px-6"
      >
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-3 text-center mix-blend-difference drop-shadow-2xl leading-tight">
          Vansh Gupta
        </h1>
        <p className="text-sm sm:text-xl md:text-2xl text-gray-300 font-medium tracking-wide text-center mix-blend-difference drop-shadow-2xl mb-8 max-w-xs sm:max-w-lg md:max-w-2xl px-2">
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

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-12 md:bottom-16 inset-x-0 flex flex-col items-center justify-center gap-3 opacity-80"
        >
          <span className="text-white text-xs sm:text-sm uppercase tracking-[0.3em] font-light mix-blend-difference ml-[0.3em]">
            Scroll Down
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/80 to-transparent mix-blend-difference" />
        </motion.div>
      </motion.div>

    </div>
  );
}
