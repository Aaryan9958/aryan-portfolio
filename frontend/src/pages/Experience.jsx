import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Footer from '../components/Footer';

// Import JSON data
import experienceData from '../content/experience.json';

function ExperienceModal({ experience, onClose }) {
  if (!experience) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 overlay-backdrop" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="experience-modal relative rounded-2xl p-6 md:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto card-scroll z-10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#303F4C] flex items-center justify-center hover:bg-[#465969] transition-colors"
        >
          <X size={16} className="text-[#90AABA]" />
        </button>

        <div className="pr-8">
          <div className="mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-[#B7CBD7] mb-2">
              {experience.role}
            </h3>
            <p className="text-[#90AABA] font-medium">
              {experience.company}
            </p>
            <p className="text-[#5D7386] text-sm mt-1">
              {experience.displayPeriod} {experience.location && `• ${experience.location}`}
            </p>
          </div>
          
          {experience.summary && (
            <p className="text-[#758DA1] text-sm mb-4 italic border-l-2 border-[#465969] pl-3">
              {experience.summary}
            </p>
          )}
          
          {experience.highlights && experience.highlights.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-[#90AABA] uppercase tracking-wider">Key Achievements</h4>
              <ul className="space-y-3">
                {experience.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-[#758DA1] text-sm flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#90AABA] mt-2 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {experience.techStack && experience.techStack.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#303F4C]">
              <h4 className="text-xs font-semibold text-[#5D7386] uppercase tracking-wider mb-2">Skills Used</h4>
              <div className="flex flex-wrap gap-2">
                {experience.techStack.map((tech, idx) => (
                  <span key={idx} className="tag text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function DesktopRoadmap({ experiences, activeId, onPinClick }) {
  return (
    <div className="hidden md:block relative w-full mx-auto" style={{ height: '400px', maxWidth: '1100px' }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 200"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="roadGradientMetal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#465969" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#90AABA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#465969" stopOpacity="0.5" />
          </linearGradient>
          <filter id="glowMetal">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <motion.path
          d="M 50 100 Q 200 70, 350 95 Q 500 120, 650 90 Q 800 65, 950 100"
          stroke="url(#roadGradientMetal)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          filter="url(#glowMetal)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      <div className="absolute top-0 left-0 right-0 flex justify-between px-8">
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            className="text-center"
            style={{ 
              position: 'absolute',
              left: `${exp.position?.x || (10 + index * 25)}%`,
              transform: 'translateX(-50%)'
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.15 }}
              className="text-xs text-[#90AABA]/80 font-medium"
            >
              {exp.displayYear}
            </motion.span>
          </div>
        ))}
      </div>

      {experiences.map((exp, index) => {
        const xPosition = exp.position?.x || (10 + index * 25);
        const yPosition = index % 2 === 0 ? 48 : 52;

        return (
          <div
            key={exp.id}
            className="absolute"
            style={{
              left: `${xPosition}%`,
              top: `${yPosition}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 * index + 0.5 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center w-max max-w-[160px]"
            >
              <p className="text-[#B7CBD7] font-semibold text-sm leading-tight">
                {exp.role}
              </p>
              <p className="text-[#90AABA] text-xs mt-0.5">
                {exp.company}
              </p>
            </motion.div>

            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 * index + 0.5 }}
              whileHover={{ scale: 1.15 }}
              onClick={() => onPinClick(exp.id)}
              className="relative group cursor-pointer transition-all z-20"
            >
              <div
                className={`pin-marker w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  activeId === exp.id ? 'active' : ''
                }`}
              >
                <MapPin 
                  size={24} 
                  className={activeId === exp.id ? 'text-[#0A1016]' : 'text-[#90AABA]'}
                />
              </div>
              
              {activeId === exp.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.8 }}
                  className="absolute inset-0 rounded-full bg-[#90AABA]/30 blur-2xl -z-10"
                />
              )}
            </motion.button>
          </div>
        );
      })}
    </div>
  );
}

function MobileRoadmap({ experiences, activeId, onPinClick }) {
  return (
    <div className="md:hidden relative w-full px-4" style={{ minHeight: '600px' }}>
      <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-full h-full rounded-full"
          style={{
            background: 'linear-gradient(180deg, rgba(70, 89, 105, 0.3) 0%, rgba(144, 170, 186, 0.5) 50%, rgba(70, 89, 105, 0.3) 100%)',
            boxShadow: '0 0 20px rgba(144, 170, 186, 0.3)',
          }}
        />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
        <span className="text-xs text-[#5D7386]">Current</span>
        <p className="text-[#90AABA] font-semibold">{experienceData.timeline?.endYear || 2024}</p>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <span className="text-xs text-[#5D7386]">Start</span>
        <p className="text-[#90AABA] font-semibold">{experienceData.timeline?.startYear || 2022}</p>
      </div>

      <div className="pt-16 pb-16 space-y-16">
        {[...experiences].reverse().map((exp, index) => {
          const isLeft = index % 2 === 0;
          
          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative flex items-center"
            >
              <div className={`w-[45%] ${isLeft ? 'mr-auto pr-4 text-right' : 'ml-auto pl-4 text-left'}`}>
                <p className="text-[#B7CBD7] font-semibold text-sm leading-tight">
                  {exp.role}
                </p>
                <p className="text-[#90AABA] text-xs mt-0.5">
                  {exp.company}
                </p>
                <p className="text-[#5D7386] text-xs mt-0.5">
                  {exp.displayPeriod}
                </p>
              </div>

              <button
                onClick={() => onPinClick(exp.id)}
                className="absolute left-1/2 -translate-x-1/2 z-10"
              >
                <div
                  className={`pin-marker w-10 h-10 rounded-full flex items-center justify-center ${
                    activeId === exp.id ? 'active' : ''
                  }`}
                >
                  <MapPin size={20} className={activeId === exp.id ? 'text-[#0A1016]' : 'text-[#90AABA]'} />
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function Experience() {
  const [activeId, setActiveId] = useState(null);
  const [showHint, setShowHint] = useState(true);
  
  // Get experiences from JSON, sorted by order
  const experiences = (experienceData.experiences || [])
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  
  const timeline = experienceData.timeline || {};
  
  const activeExperience = experiences.find(exp => exp.id === activeId);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Auto-hide hint after 8 seconds
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []);

  const handlePinClick = (id) => {
    setShowHint(false); // Hide hint when user clicks a marker
    setActiveId(activeId === id ? null : id);
  };

  const closeModal = () => {
    setActiveId(null);
  };

  return (
    <PageTransition>
      <div className="min-h-screen text-white relative overflow-x-hidden">
        <div 
          className="fixed inset-0 z-0"
          style={{
            background: 'linear-gradient(180deg, #0A1016 0%, #1C2731 50%, #0A1016 100%)',
          }}
        />
        
        <div 
          className="fixed inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px) grayscale(100%)',
          }}
        />
        
        <div 
          className="fixed inset-0 z-0"
          style={{
            background: 'radial-gradient(ellipse at 30% 30%, rgba(144, 170, 186, 0.04) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(255, 51, 102, 0.02) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6 md:mb-8"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#B7CBD7] mb-2">
                Experience Journey
              </h1>
              <p className="text-base md:text-lg text-[#758DA1]">
                From insights to impact: my professional roadmap
              </p>
            </motion.div>

            {/* Hint popup for clicking markers */}
            <AnimatePresence>
              {showHint && !activeId && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: 1 }}
                  className="flex justify-center mb-4"
                >
                  <div 
                    className="relative px-5 py-3 rounded-xl flex items-center gap-3 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, rgba(28, 39, 49, 0.95) 0%, rgba(48, 63, 76, 0.9) 100%)',
                      border: '1px solid rgba(144, 170, 186, 0.3)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(144, 170, 186, 0.1)',
                    }}
                    onClick={() => setShowHint(false)}
                  >
                    {/* Pulsing pin icon */}
                    <div className="relative">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-[#465969] to-[#5D7386] flex items-center justify-center"
                      >
                        <MapPin size={16} className="text-[#B7CBD7]" />
                      </motion.div>
                      <motion.div
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full border border-[#90AABA]"
                      />
                    </div>
                    
                    {/* Text */}
                    <div className="text-left">
                      <p className="text-sm font-medium text-[#B7CBD7]">
                        Click on markers
                      </p>
                      <p className="text-xs text-[#758DA1]">
                        to explore each experience
                      </p>
                    </div>
                    
                    {/* Close button */}
                    <button 
                      className="ml-2 p-1 rounded-full hover:bg-[#465969]/50 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowHint(false);
                      }}
                    >
                      <X size={14} className="text-[#5D7386]" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <DesktopRoadmap 
              experiences={experiences} 
              activeId={activeId} 
              onPinClick={handlePinClick} 
            />
            <MobileRoadmap 
              experiences={experiences} 
              activeId={activeId} 
              onPinClick={handlePinClick} 
            />

            <div className="hidden md:flex justify-between items-center max-w-[1100px] mx-auto px-8 mt-4">
              <div className="text-left">
                <p className="text-[#5D7386] text-xs">{timeline.startLabel || 'Start'}</p>
                <p className="text-[#90AABA] font-semibold text-sm mt-0.5">{timeline.startYear || 2022}</p>
              </div>
              <div className="text-right">
                <p className="text-[#5D7386] text-xs">{timeline.endLabel || 'Current'}</p>
                <p className="text-[#90AABA] font-semibold text-sm mt-0.5">{timeline.endYear || 2024}</p>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <Footer />
          </div>
        </div>

        <AnimatePresence>
          {activeId && (
            <ExperienceModal 
              experience={activeExperience} 
              onClose={closeModal} 
            />
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
