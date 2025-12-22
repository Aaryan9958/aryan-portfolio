import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CinematicScroll({ children, className = '' }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState(0);
  const sectionsRef = useRef([]);
  const touchStartY = useRef(0);

  const sections = Array.isArray(children) ? children : [children];
  const totalSections = sections.length;

  useEffect(() => {
    let scrollTimeout;
    
    const handleWheel = (e) => {
      if (isTransitioning) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (delta > 0 && currentSection < totalSections - 1) {
          // Scroll down
          setDirection(1);
          setIsTransitioning(true);
          setCurrentSection(prev => prev + 1);
          setTimeout(() => setIsTransitioning(false), 800);
        } else if (delta < 0 && currentSection > 0) {
          // Scroll up
          setDirection(-1);
          setIsTransitioning(true);
          setCurrentSection(prev => prev - 1);
          setTimeout(() => setIsTransitioning(false), 800);
        }
      }, 50);
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isTransitioning) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const delta = touchStartY.current - touchEndY;

      if (Math.abs(delta) > 50) {
        if (delta > 0 && currentSection < totalSections - 1) {
          setDirection(1);
          setIsTransitioning(true);
          setCurrentSection(prev => prev + 1);
          setTimeout(() => setIsTransitioning(false), 800);
        } else if (delta < 0 && currentSection > 0) {
          setDirection(-1);
          setIsTransitioning(true);
          setCurrentSection(prev => prev - 1);
          setTimeout(() => setIsTransitioning(false), 800);
        }
      }
    };

    const handleKeyDown = (e) => {
      if (isTransitioning) return;
      
      if ((e.key === 'ArrowDown' || e.key === 'PageDown') && currentSection < totalSections - 1) {
        setDirection(1);
        setIsTransitioning(true);
        setCurrentSection(prev => prev + 1);
        setTimeout(() => setIsTransitioning(false), 800);
      } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && currentSection > 0) {
        setDirection(-1);
        setIsTransitioning(true);
        setCurrentSection(prev => prev - 1);
        setTimeout(() => setIsTransitioning(false), 800);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(scrollTimeout);
    };
  }, [currentSection, isTransitioning, totalSections]);

  const sectionVariants = {
    enter: (direction) => ({
      opacity: 0,
      scale: 0.95,
      x: direction > 0 ? 100 : -100,
      filter: 'blur(10px)',
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      filter: 'blur(0px)',
    },
    exit: (direction) => ({
      opacity: 0,
      scale: 1.05,
      x: direction > 0 ? -100 : 100,
      filter: 'blur(10px)',
    }),
  };

  return (
    <div className={`fixed inset-0 overflow-hidden ${className}`}>
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSection}
          custom={direction}
          variants={sectionVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className="absolute inset-0"
        >
          {sections[currentSection]}
        </motion.div>
      </AnimatePresence>

      {/* Section indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning && index !== currentSection) {
                setDirection(index > currentSection ? 1 : -1);
                setIsTransitioning(true);
                setCurrentSection(index);
                setTimeout(() => setIsTransitioning(false), 800);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSection
                ? 'bg-[#3FB5B5] scale-150'
                : 'bg-[#9CA3AF] hover:bg-[#F5F5F7]'
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
