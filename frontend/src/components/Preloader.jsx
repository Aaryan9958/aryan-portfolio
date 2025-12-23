import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../config/siteConfig';

// Pre-generate random values for keywords
const generateKeywordData = () => keywords.map((text, index) => ({
  text,
  randomX: (index * 17 + 23) % 80 + 10, // Deterministic but varied
  randomY: (index * 31 + 47) % 80 + 10,
  randomDuration: (index * 7 % 10) + 15,
  randomOffsetX: (index * 13 % 20) - 10,
  randomOffsetY: (index * 19 % 20) - 10,
}));

// Floating keywords for the loading animation
const keywords = [
  'SQL', 'Python', 'R', 'Analytics', 'A/B Testing', 
  'Causal Inference', 'Dashboards', 'Tableau', 'Power BI',
  'Machine Learning', 'Data Science', 'Segmentation', 
  'KPI', 'ROI', 'Regression', 'Forecasting', 'ETL',
  'Business Intelligence', 'Statistics', 'Visualization'
];

function FloatingKeyword({ data, delay, reducedMotion }) {
  const { text, randomX, randomY, randomDuration, randomOffsetX, randomOffsetY } = data;
  
  if (reducedMotion) {
    return (
      <div
        className="absolute text-rose-500/20 text-sm md:text-base font-medium whitespace-nowrap"
        style={{
          left: `${randomX}%`,
          top: `${randomY}%`,
        }}
      >
        {text}
      </div>
    );
  }
  
  return (
    <motion.div
      className="absolute text-rose-500/20 text-sm md:text-base font-medium whitespace-nowrap"
      initial={{ 
        opacity: 0,
        x: `${randomX}vw`,
        y: `${randomY}vh`,
      }}
      animate={{ 
        opacity: [0, 0.3, 0.3, 0],
        x: [`${randomX}vw`, `${randomX + randomOffsetX}vw`],
        y: [`${randomY}vh`, `${randomY + randomOffsetY}vh`],
      }}
      transition={{
        duration: randomDuration,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {text}
    </motion.div>
  );
}

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches && SITE_CONFIG.RESPECT_REDUCED_MOTION);
    
    const handleChange = (e) => {
      setReducedMotion(e.matches && SITE_CONFIG.RESPECT_REDUCED_MOTION);
    };
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Shorter duration for reduced motion
    const duration = reducedMotion ? 1500 : SITE_CONFIG.PRELOADER_DURATION;
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 500);
        }, 300);
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, [onComplete, reducedMotion]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at center, #1a0a15 0%, #0a0a0f 50%, #050508 100%)',
          }}
        >
          {/* Red/magenta vignette overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(225, 29, 72, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)',
            }}
          />
          
          {/* Floating keywords background */}
          {!reducedMotion && (
            <div className="absolute inset-0 overflow-hidden">
              {keywords.map((keyword, index) => (
                <FloatingKeyword 
                  key={index} 
                  text={keyword} 
                  delay={index * 0.3}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          )}
          
          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-8 px-6">
            {/* Logo/Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 
                className="text-4xl md:text-5xl text-white/90 mb-2"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                Aryan Bansal
              </h1>
              <p className="text-rose-400/60 text-sm tracking-widest uppercase">
                Business Analytics
              </p>
            </motion.div>
            
            {/* Progress bar container */}
            <div className="w-64 md:w-80">
              {/* Progress bar background */}
              <div className="h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                {/* Progress bar fill */}
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #E11D48, #EC4899, #E11D48)',
                    backgroundSize: '200% 100%',
                  }}
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${progress}%`,
                    backgroundPosition: ['0% 0%', '100% 0%'],
                  }}
                  transition={{
                    width: { duration: 0.1 },
                    backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" }
                  }}
                />
              </div>
              
              {/* Progress percentage */}
              <div className="flex justify-between mt-3">
                <span className="text-xs text-white/40">Loading</span>
                <span className="text-xs text-rose-400/80 font-mono">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>
          
          {/* Glow effects */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-rose-500/10 blur-[100px] rounded-full" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/5 blur-[80px] rounded-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
