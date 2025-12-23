import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const skillsData = [
  { name: 'SQL', years: 2, futureYears: 3.5 },
  { name: 'Python', years: 2, futureYears: 4 },
  { name: 'Tableau', years: 2, futureYears: 3 },
  { name: 'Analytics', years: 1.5, futureYears: 3.5 },
  { name: 'A/B Testing', years: 1, futureYears: 2.5 },
  { name: 'Strategy', years: 3, futureYears: 5 },
  { name: 'ML/AI', years: 1, futureYears: 3 },
];

const maxYears = 5;

// Momentum chip component
function MomentumChip({ delay }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full momentum-chip"
      initial={{ opacity: 0, scale: 0, y: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0.5],
        y: [0, -30, -60, -90],
        x: [0, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 40]
      }}
      transition={{ 
        duration: 2,
        delay: delay,
        ease: "easeOut"
      }}
    />
  );
}

// Single skill bar component
function SkillBar({ skill, index, isInView, onAnimationComplete }) {
  const [showProjection, setShowProjection] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const [projectionComplete, setProjectionComplete] = useState(false);
  
  const barHeight = (skill.years / maxYears) * 100;
  const projectionHeight = ((skill.futureYears - skill.years) / maxYears) * 100;
  const animationDelay = index * 0.15;

  useEffect(() => {
    if (isInView) {
      // Start projection after bar animation completes
      const projectionTimer = setTimeout(() => {
        setShowProjection(true);
        setShowChips(true);
      }, (animationDelay + 1) * 1000);

      // Mark projection complete
      const completeTimer = setTimeout(() => {
        setProjectionComplete(true);
        if (index === skillsData.length - 1) {
          onAnimationComplete?.();
        }
      }, (animationDelay + 2.5) * 1000);

      return () => {
        clearTimeout(projectionTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isInView, animationDelay, index, onAnimationComplete]);

  return (
    <div className="flex flex-col items-center gap-3 relative">
      {/* Bar container */}
      <div 
        className="relative w-12 md:w-14 rounded-t-lg overflow-visible"
        style={{ height: '200px' }}
      >
        {/* Background track */}
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-[#1C2731] to-[#0A1016] rounded-t-lg border border-[#303F4C]/30" />
        
        {/* Main skill bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 skill-bar rounded-t-lg"
          initial={{ height: 0 }}
          animate={isInView ? { height: `${barHeight}%` } : { height: 0 }}
          transition={{ 
            duration: 1,
            delay: animationDelay,
            ease: [0.4, 0, 0.2, 1]
          }}
        />

        {/* Projection line */}
        <AnimatePresence>
          {showProjection && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-0.5 projection-line rounded-full"
              style={{ bottom: `${barHeight}%` }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: `${projectionHeight}%`,
                opacity: 1
              }}
              transition={{ 
                duration: 1.2,
                ease: "easeOut"
              }}
            />
          )}
        </AnimatePresence>

        {/* Future marker dot */}
        <AnimatePresence>
          {projectionComplete && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#B7CBD7]"
              style={{ bottom: `${(skill.futureYears / maxYears) * 100}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 rounded-full bg-[#90AABA] animate-ping opacity-30" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Momentum chips */}
        {showChips && (
          <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: `${barHeight}%` }}>
            {[0, 0.2, 0.4, 0.6].map((delay, i) => (
              <MomentumChip key={i} delay={delay} />
            ))}
          </div>
        )}

        {/* Years indicator on bar */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 text-xs font-bold text-[#B7CBD7] pointer-events-none"
          style={{ bottom: `calc(${barHeight}% - 24px)` }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: animationDelay + 0.8 }}
        >
          {skill.years}y
        </motion.div>
      </div>

      {/* Skill label */}
      <motion.span
        className="text-xs md:text-sm font-medium text-[#90AABA] text-center whitespace-nowrap"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: animationDelay + 0.5 }}
      >
        {skill.name}
      </motion.span>
    </div>
  );
}

export default function SkillsChart() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [showMessage, setShowMessage] = useState(false);

  const handleAnimationComplete = () => {
    setTimeout(() => setShowMessage(true), 500);
  };

  return (
    <div ref={containerRef} className="w-full">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-10"
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-[#B7CBD7] mb-3">
          Years of Experience
        </h2>
        <p className="text-base text-[#758DA1]">
          Skills developed through hands-on projects and real-world impact
        </p>
      </motion.div>

      {/* Skills chart container */}
      <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-visible">
        {/* Y-axis labels */}
        <div className="absolute left-2 md:left-4 top-8 bottom-20 flex flex-col justify-between text-xs text-[#5D7386]">
          {[5, 4, 3, 2, 1, 0].map((year) => (
            <span key={year}>{year}y</span>
          ))}
        </div>

        {/* Bars container */}
        <div className="flex items-end justify-center gap-4 md:gap-6 lg:gap-8 ml-8 md:ml-12">
          {skillsData.map((skill, index) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              index={index}
              isInView={isInView}
              onAnimationComplete={index === skillsData.length - 1 ? handleAnimationComplete : undefined}
            />
          ))}
        </div>

        {/* Floating message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              className="absolute -top-16 left-1/2 -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="floating-message text-lg md:text-xl font-medium italic whitespace-nowrap">
                "I am not just experienced, I am growing fast."
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <motion.div
          className="flex items-center justify-center gap-6 mt-8 text-xs"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded skill-bar" />
            <span className="text-[#758DA1]">Current Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 projection-line" />
            <span className="text-[#758DA1]">Growth Trajectory</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
