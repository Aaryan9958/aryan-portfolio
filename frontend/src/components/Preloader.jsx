import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../config/siteConfig';

// Pre-generate random values for keywords
const generateKeywordData = () => keywords.map((text, index) => ({
  text,
  randomX: (index * 17 + 23) % 80 + 10,
  randomY: (index * 31 + 47) % 80 + 10,
  randomDuration: (index * 7 % 10) + 15,
  randomOffsetX: (index * 13 % 20) - 10,
  randomOffsetY: (index * 19 % 20) - 10,
}));

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
        className="absolute text-[#465969]/30 text-sm md:text-base font-medium whitespace-nowrap"
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
      className="absolute text-[#465969]/30 text-sm md:text-base font-medium whitespace-nowrap"
      initial={{ 
        opacity: 0,
        x: `${randomX}vw`,
        y: `${randomY}vh`,
      }}
      animate={{ 
        opacity: [0, 0.4, 0.4, 0],
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

  const keywordData = useMemo(() => generateKeywordData(), []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches && SITE_CONFIG.RESPECT_REDUCED_MOTION);
    
    const handleChange = (e) => {
      setReducedMotion(e.matches && SITE_CONFIG.RESPECT_REDUCED_MOTION);
    };
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
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
            background: 'linear-gradient(180deg, #0A1016 0%, #1C2731 50%, #0A1016 100%)',
          }}
        >
          {/* Metallic ambient glow */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(144, 170, 186, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255, 51, 102, 0.03) 0%, transparent 50%)',
            }}
          />
          
          {/* Floating keywords background */}
          {!reducedMotion && (
            <div className="absolute inset-0 overflow-hidden">
              {keywordData.map((data, index) => (
                <FloatingKeyword 
                  key={index} 
                  data={data}
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
                className="text-4xl md:text-5xl text-[#B7CBD7] mb-2"
                style={{ 
                  fontFamily: "'Great Vibes', cursive",
                  textShadow: '0 0 40px rgba(144, 170, 186, 0.3)'
                }}
              >
                Aryan Bansal
              </h1>
              <p className="text-[#5D7386] text-sm tracking-widest uppercase">
                Business Analytics
              </p>
            </motion.div>
            
            {/* Progress bar container */}
            <div className="w-64 md:w-80">
              {/* Progress bar background */}
              <div className="h-1 bg-[#1C2731] rounded-full overflow-hidden border border-[#303F4C]/30">
                {/* Progress bar fill */}
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #465969, #5D7386, #90AABA, #5D7386, #465969)',
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
                <span className="text-xs text-[#465969]">Loading</span>
                <span className="text-xs text-[#90AABA] font-mono">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>
          
          {/* Glow effects */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#5D7386]/10 blur-[100px] rounded-full" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#90AABA]/5 blur-[80px] rounded-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
