"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Certifications", href: "#certifications" },
  { name: "Skills", href: "#skills" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Custom slow smooth scroll to display the background animation
  const slowScrollTo = (targetId: string, duration: number = 2000) => {
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function (easeInOutCubic) for a very cinematic feel
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Wait for menu exit animation before triggering the slow scroll
    setTimeout(() => {
      slowScrollTo(href, 2200); // 2.2 seconds scroll duration 
    }, 400); 
  };

  return (
    <>
      {/* Floating Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 right-6 md:top-10 md:right-10 z-[1000] p-4 bg-transparent transition-all duration-300 group"
        aria-label="Toggle navigation menu"
      >
        <Menu className="w-8 h-8 text-white group-hover:scale-110 transition-transform drop-shadow-md" />
      </button>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[1001] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={toggleMenu}
              className="absolute top-6 right-6 md:top-10 md:right-10 p-4 bg-transparent hover:bg-white/10 rounded-full transition-all duration-300 group"
              aria-label="Close navigation menu"
            >
              <X className="w-8 h-8 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Navigation Links */}
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { delay: 0 } }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.4, ease: "easeOut" }}
                  className="text-4xl md:text-6xl font-bold tracking-tight text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
            
            {/* Footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-10 flex gap-6 text-sm text-gray-500 uppercase tracking-widest"
            >
               <a href="mailto:vanshgupta7017@gmail.com" className="hover:text-white transition">vanshgupta7017@gmail.com</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
