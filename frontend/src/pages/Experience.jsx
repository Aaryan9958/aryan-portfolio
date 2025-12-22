import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Footer from '../components/Footer';

const experiences = [
  {
    id: 1,
    title: 'Business Analyst Intern',
    company: 'Foodizo',
    period: 'Jun 2022',
    endYear: '2022',
    description: 'Food-tech startup aggregating home-cooked meals.',
    highlights: [
      'Built competitor-based pricing model that increased pilot orders by ~25%',
      'Used TAM/SAM/SOM segmentation to focus on high-potential segments and reduce acquisition costs',
    ],
    position: { x: 12 },
  },
  {
    id: 2,
    title: 'Market Analyst Intern',
    company: 'Lenskart',
    period: 'Mar 2023',
    endYear: '2023',
    highlights: [
      'Analyzed 5+ digital campaigns and improved post performance by ~15%',
      'Helped drive ~500K impressions and 10K audience growth',
      'Used dashboards and campaign metrics to refine influencer and media strategy',
    ],
    position: { x: 37 },
  },
  {
    id: 3,
    title: 'Strategy Analyst',
    company: 'Daily Grind (Student Venture)',
    period: 'Aug 2023',
    endYear: '2023',
    highlights: [
      'Co-founded a four-flavor on-campus coffee venture',
      'Managed pricing, inventory (JIT/FIFO), and promotions, maintaining ~20% profit margin',
      'Used customer feedback and simple A/B tests to decide flavors and offers',
    ],
    position: { x: 62 },
  },
  {
    id: 4,
    title: 'Marketing Strategy Consultant',
    company: 'iDig2Learn',
    period: 'Feb 2024',
    endYear: '2024',
    highlights: [
      'Consulted for a non-profit focused on environmental education',
      'Analyzed engagement and donor patterns across channels',
      'Recommended content themes and timing to grow reach and improve donor conversion',
    ],
    position: { x: 88 },
  },
];

// Experience Card Modal Component
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
      {/* Backdrop */}
      <div className="absolute inset-0 overlay-backdrop" />
      
      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="experience-modal relative rounded-2xl p-6 md:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto card-scroll z-10"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-rose-500/20 transition-colors"
        >
          <X size={16} className="text-white/60" />
        </button>

        {/* Content */}
        <div className="pr-8">
          <div className="mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              {experience.title}
            </h3>
            <p className="text-rose-400 font-medium">
              {experience.company}
            </p>
            <p className="text-white/40 text-sm mt-1">
              {experience.period}
            </p>
          </div>
          
          {experience.description && (
            <p className="text-white/60 text-sm mb-4 italic border-l-2 border-rose-500/30 pl-3">
              {experience.description}
            </p>
          )}
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Key Achievements</h4>
            <ul className="space-y-3">
              {experience.highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className="text-white/70 text-sm flex items-start gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Desktop Horizontal Roadmap
function DesktopRoadmap({ experiences, activeId, onPinClick }) {
  return (
    <div className="hidden md:block relative w-full mx-auto" style={{ height: '400px', maxWidth: '1100px' }}>
      {/* SVG Roadmap Path */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 200"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="roadGradientRed" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E11D48" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#EC4899" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#E11D48" stopOpacity="0.5" />
          </linearGradient>
          <filter id="glowRed">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Curved path */}
        <motion.path
          d="M 50 100 Q 200 70, 350 95 Q 500 120, 650 90 Q 800 65, 950 100"
          stroke="url(#roadGradientRed)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          filter="url(#glowRed)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      {/* Timeline labels above the roadmap */}
      <div className="absolute top-0 left-0 right-0 flex justify-between px-8">
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            className="text-center"
            style={{ 
              position: 'absolute',
              left: `${exp.position.x}%`,
              transform: 'translateX(-50%)'
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.15 }}
              className="text-xs text-rose-400/80 font-medium"
            >
              {exp.endYear}
            </motion.span>
          </div>
        ))}
      </div>

      {/* Experience Pins */}
      {experiences.map((exp, index) => {
        const xPosition = exp.position.x;
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
            {/* Label Above Pin */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 * index + 0.5 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center w-max max-w-[160px]"
            >
              <p className="text-white font-semibold text-sm leading-tight">
                {exp.title}
              </p>
              <p className="text-rose-400 text-xs mt-0.5">
                {exp.company}
              </p>
            </motion.div>

            {/* Pin Marker */}
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
                  className={activeId === exp.id ? 'text-white' : 'text-rose-400'}
                />
              </div>
              
              {/* Pin glow effect */}
              {activeId === exp.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.8 }}
                  className="absolute inset-0 rounded-full bg-rose-500/30 blur-2xl -z-10"
                />
              )}
            </motion.button>
          </div>
        );
      })}
    </div>
  );
}

// Mobile Vertical Roadmap
function MobileRoadmap({ experiences, activeId, onPinClick }) {
  return (
    <div className="md:hidden relative w-full px-4" style={{ minHeight: '600px' }}>
      {/* Vertical timeline line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-full h-full rounded-full"
          style={{
            background: 'linear-gradient(180deg, rgba(225, 29, 72, 0.3) 0%, rgba(236, 72, 153, 0.5) 50%, rgba(225, 29, 72, 0.3) 100%)',
            boxShadow: '0 0 20px rgba(225, 29, 72, 0.3)',
          }}
        />
      </div>

      {/* Timeline labels at top and bottom */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
        <span className="text-xs text-white/40">Current</span>
        <p className="text-rose-400 font-semibold">2024</p>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <span className="text-xs text-white/40">Start</span>
        <p className="text-rose-400 font-semibold">2022</p>
      </div>

      {/* Experience pins - arranged vertically */}
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
              {/* Content card */}
              <div className={`w-[45%] ${isLeft ? 'mr-auto pr-4 text-right' : 'ml-auto pl-4 text-left'}`}>
                <p className="text-white font-semibold text-sm leading-tight">
                  {exp.title}
                </p>
                <p className="text-rose-400 text-xs mt-0.5">
                  {exp.company}
                </p>
                <p className="text-white/40 text-xs mt-0.5">
                  {exp.period}
                </p>
              </div>

              {/* Center pin */}
              <button
                onClick={() => onPinClick(exp.id)}
                className="absolute left-1/2 -translate-x-1/2 z-10"
              >
                <div
                  className={`pin-marker w-10 h-10 rounded-full flex items-center justify-center ${
                    activeId === exp.id ? 'active' : ''
                  }`}
                >
                  <MapPin size={20} className={activeId === exp.id ? 'text-white' : 'text-rose-400'} />
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
  const activeExperience = experiences.find(exp => exp.id === activeId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePinClick = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const closeModal = () => {
    setActiveId(null);
  };

  return (
    <PageTransition>
      <div className="min-h-screen text-white relative overflow-x-hidden">
        {/* Medieval map + futuristic backdrop */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            background: 'radial-gradient(ellipse at center, #15080D 0%, #0A0A0F 50%, #050508 100%)',
          }}
        />
        
        {/* Background texture (medieval map with circuits overlay) */}
        <div 
          className="fixed inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px) sepia(30%)',
          }}
        />
        
        {/* Dark red glass overlay */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            background: 'radial-gradient(ellipse at 30% 30%, rgba(225, 29, 72, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(236, 72, 153, 0.05) 0%, transparent 50%)',
          }}
        />

        {/* Main content */}
        <div className="relative z-10 pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            {/* Header - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6 md:mb-8"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                Experience Journey
              </h1>
              <p className="text-base md:text-lg text-white/50">
                From insights to impact: my professional roadmap
              </p>
            </motion.div>

            {/* Roadmap */}
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

            {/* Desktop Timeline Labels */}
            <div className="hidden md:flex justify-between items-center max-w-[1100px] mx-auto px-8 mt-4">
              <div className="text-left">
                <p className="text-white/30 text-xs">Start</p>
                <p className="text-rose-400/80 font-semibold text-sm mt-0.5">2022</p>
              </div>
              <div className="text-right">
                <p className="text-white/30 text-xs">Current</p>
                <p className="text-rose-400/80 font-semibold text-sm mt-0.5">2024</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-20">
            <Footer />
          </div>
        </div>

        {/* Experience Modal */}
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
