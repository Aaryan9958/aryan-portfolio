import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CinematicScroll({ children, className = '' }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState(0);
  const contentRef = useRef(null);
  const touchStartY = useRef(0);

  const sections = Array.isArray(children) ? children : [children];
  const totalSections = sections.length;
  const isLastSection = currentSection === totalSections - 1;

  // Handle wheel events for section transitions
  useEffect(() => {
    let scrollTimeout;
    let accumulatedDelta = 0;
    const DELTA_THRESHOLD = 100;
    
    const handleWheel = (e) => {
      if (isTransitioning) {
        e.preventDefault();
        return;
      }

      const content = contentRef.current;
      if (!content) return;

      const { scrollTop, scrollHeight, clientHeight } = content;
      const isAtTop = scrollTop <= 5;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
      
      accumulatedDelta += e.deltaY;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (accumulatedDelta > DELTA_THRESHOLD && isAtBottom && currentSection < totalSections - 1) {
          e.preventDefault();
          setDirection(1);
          setIsTransitioning(true);
          setCurrentSection(prev => prev + 1);
          setTimeout(() => {
            setIsTransitioning(false);
            if (contentRef.current) contentRef.current.scrollTop = 0;
          }, 800);
        }
        else if (accumulatedDelta < -DELTA_THRESHOLD && isAtTop && currentSection > 0) {
          e.preventDefault();
          setDirection(-1);
          setIsTransitioning(true);
          setCurrentSection(prev => prev - 1);
          setTimeout(() => {
            setIsTransitioning(false);
            if (contentRef.current) contentRef.current.scrollTop = 0;
          }, 800);
        }
        accumulatedDelta = 0;
      }, 100);
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isTransitioning) return;
      
      const content = contentRef.current;
      if (!content) return;

      const touchEndY = e.changedTouches[0].clientY;
      const delta = touchStartY.current - touchEndY;

      const { scrollTop, scrollHeight, clientHeight } = content;
      const isAtTop = scrollTop <= 5;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

      if (Math.abs(delta) > 50) {
        if (delta > 0 && isAtBottom && currentSection < totalSections - 1) {
          setDirection(1);
          setIsTransitioning(true);
          setCurrentSection(prev => prev + 1);
          setTimeout(() => {
            setIsTransitioning(false);
            if (contentRef.current) contentRef.current.scrollTop = 0;
          }, 800);
        } else if (delta < 0 && isAtTop && currentSection > 0) {
          setDirection(-1);
          setIsTransitioning(true);
          setCurrentSection(prev => prev - 1);
          setTimeout(() => {
            setIsTransitioning(false);
            if (contentRef.current) contentRef.current.scrollTop = 0;
          }, 800);
        }
      }
    };

    const handleKeyDown = (e) => {
      if (isTransitioning) return;
      
      const content = contentRef.current;
      if (!content) return;

      const { scrollTop, scrollHeight, clientHeight } = content;
      const isAtTop = scrollTop <= 5;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
      
      if ((e.key === 'ArrowDown' || e.key === 'PageDown') && isAtBottom && currentSection < totalSections - 1) {
        e.preventDefault();
        setDirection(1);
        setIsTransitioning(true);
        setCurrentSection(prev => prev + 1);
        setTimeout(() => {
          setIsTransitioning(false);
          if (contentRef.current) contentRef.current.scrollTop = 0;
        }, 800);
      } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && isAtTop && currentSection > 0) {
        e.preventDefault();
        setDirection(-1);
        setIsTransitioning(true);
        setCurrentSection(prev => prev - 1);
        setTimeout(() => {
          setIsTransitioning(false);
          if (contentRef.current) contentRef.current.scrollTop = 0;
        }, 800);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
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
      x: direction > 0 ? 60 : -60,
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
      scale: 1.02,
      x: direction > 0 ? -60 : 60,
      filter: 'blur(10px)',
    }),
  };

  return (
    <div className={`fixed inset-0 overflow-hidden ${className}`}>
      {/* Metallic background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0A1016 0%, #1C2731 50%, #0A1016 100%)',
        }}
      />
      
      {/* Subtle magenta ambient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 30%, rgba(255, 51, 102, 0.02) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(144, 170, 186, 0.03) 0%, transparent 50%)',
        }}
      />
      
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSection}
          ref={contentRef}
          custom={direction}
          variants={sectionVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className="absolute inset-0 top-20 overflow-y-auto card-scroll"
        >
          {sections[currentSection]}
        </motion.div>
      </AnimatePresence>

      {/* Section indicators - Metallic theme */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning && index !== currentSection) {
                setDirection(index > currentSection ? 1 : -1);
                setIsTransitioning(true);
                setCurrentSection(index);
                setTimeout(() => {
                  setIsTransitioning(false);
                  if (contentRef.current) contentRef.current.scrollTop = 0;
                }, 800);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSection
                ? 'bg-[#B7CBD7] scale-150 shadow-lg shadow-[#90AABA]/50'
                : 'bg-[#465969] hover:bg-[#5D7386]'
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      {!isLastSection && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[#5D7386] uppercase tracking-wider">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-[#465969] flex items-start justify-center p-1"
          >
            <motion.div 
              className="w-1 h-2 bg-[#90AABA]/60 rounded-full"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
