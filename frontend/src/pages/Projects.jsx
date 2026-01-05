import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, Github, ExternalLink, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import PageTransition from '../components/PageTransition';
import Footer from '../components/Footer';

// Import JSON data
import projectsData from '../content/projects.json';

// Analytics Hero Visual Component - Abstract SVG
const AnalyticsHeroVisual = ({ dimmed }) => {
  return (
    <svg
      viewBox="0 0 1200 700"
      className={`w-full h-full transition-opacity duration-700 ${dimmed ? 'opacity-30' : 'opacity-100'}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1C2731" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#303F4C" stopOpacity="0.4" />
        </linearGradient>
        
        <linearGradient id="barGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#465969" />
          <stop offset="50%" stopColor="#5D7386" />
          <stop offset="100%" stopColor="#758DA1" />
        </linearGradient>
        
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5D7386" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#90AABA" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#5D7386" stopOpacity="0.2" />
        </linearGradient>
        
        <linearGradient id="nodeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#90AABA" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#B7CBD7" stopOpacity="0.2" />
        </linearGradient>

        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Background Grid - Subtle data grid pattern */}
      <g opacity="0.3">
        {/* Horizontal lines */}
        {[...Array(15)].map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 50}
            x2="1200"
            y2={i * 50}
            stroke="#303F4C"
            strokeWidth="0.5"
            strokeDasharray={i % 3 === 0 ? "none" : "4,8"}
          />
        ))}
        {/* Vertical lines */}
        {[...Array(25)].map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 50}
            y1="0"
            x2={i * 50}
            y2="700"
            stroke="#303F4C"
            strokeWidth="0.5"
            strokeDasharray={i % 4 === 0 ? "none" : "4,8"}
          />
        ))}
      </g>

      {/* Abstract Bar Chart - Left side */}
      <g transform="translate(80, 380)">
        {/* Axis */}
        <line x1="0" y1="0" x2="0" y2="220" stroke="#465969" strokeWidth="1" />
        <line x1="0" y1="220" x2="280" y2="220" stroke="#465969" strokeWidth="1" />
        
        {/* Bars */}
        {[40, 120, 80, 160, 100, 180, 140].map((height, i) => (
          <g key={`bar-${i}`}>
            <rect
              x={i * 38 + 15}
              y={220 - height}
              width="24"
              height={height}
              fill="url(#barGradient)"
              opacity="0.7"
              rx="2"
            />
            <rect
              x={i * 38 + 15}
              y={220 - height}
              width="24"
              height="2"
              fill="#B7CBD7"
              opacity="0.5"
            />
          </g>
        ))}
        
        {/* Axis ticks */}
        {[0, 1, 2, 3, 4].map((_, i) => (
          <line key={`tick-${i}`} x1="-5" y1={i * 55} x2="0" y2={i * 55} stroke="#5D7386" strokeWidth="1" />
        ))}
      </g>

      {/* Abstract Line Chart - Center */}
      <g transform="translate(420, 120)">
        {/* Background panel */}
        <rect x="0" y="0" width="360" height="200" fill="url(#gridGradient)" rx="8" stroke="#465969" strokeWidth="0.5" />
        
        {/* Mini grid inside */}
        {[...Array(5)].map((_, i) => (
          <line key={`mg-${i}`} x1="20" y1={40 + i * 35} x2="340" y2={40 + i * 35} stroke="#465969" strokeWidth="0.3" strokeDasharray="2,4" />
        ))}
        
        {/* Trend line */}
        <path
          d="M 30 160 Q 80 140, 120 120 T 180 100 T 240 70 T 300 90 T 340 50"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          filter="url(#glow)"
        />
        
        {/* Data points */}
        {[[30, 160], [120, 120], [180, 100], [240, 70], [300, 90], [340, 50]].map(([x, y], i) => (
          <circle key={`dp-${i}`} cx={x} cy={y} r="4" fill="#90AABA" opacity="0.8" />
        ))}
        
        {/* Area fill */}
        <path
          d="M 30 160 Q 80 140, 120 120 T 180 100 T 240 70 T 300 90 T 340 50 L 340 180 L 30 180 Z"
          fill="#5D7386"
          opacity="0.1"
        />
      </g>

      {/* Distribution Curves - Right side */}
      <g transform="translate(850, 150)">
        {/* Bell curve 1 */}
        <path
          d="M 0 150 Q 50 150, 80 120 Q 110 60, 150 60 Q 190 60, 220 120 Q 250 150, 300 150"
          fill="none"
          stroke="#758DA1"
          strokeWidth="1.5"
          opacity="0.6"
        />
        {/* Bell curve 2 - offset */}
        <path
          d="M 20 150 Q 70 150, 100 100 Q 130 30, 170 30 Q 210 30, 240 100 Q 270 150, 320 150"
          fill="none"
          stroke="#90AABA"
          strokeWidth="1"
          opacity="0.4"
        />
        {/* Area under curve */}
        <path
          d="M 0 150 Q 50 150, 80 120 Q 110 60, 150 60 Q 190 60, 220 120 Q 250 150, 300 150 L 300 180 L 0 180 Z"
          fill="#5D7386"
          opacity="0.08"
        />
      </g>

      {/* Network Nodes & Connections - Bottom right */}
      <g transform="translate(800, 400)">
        {/* Connections */}
        <line x1="100" y1="80" x2="200" y2="40" stroke="#5D7386" strokeWidth="1" opacity="0.5" />
        <line x1="100" y1="80" x2="50" y2="140" stroke="#5D7386" strokeWidth="1" opacity="0.5" />
        <line x1="100" y1="80" x2="180" y2="150" stroke="#5D7386" strokeWidth="1" opacity="0.5" />
        <line x1="200" y1="40" x2="280" y2="80" stroke="#5D7386" strokeWidth="1" opacity="0.5" />
        <line x1="200" y1="40" x2="180" y2="150" stroke="#5D7386" strokeWidth="1" opacity="0.5" />
        <line x1="50" y1="140" x2="180" y2="150" stroke="#5D7386" strokeWidth="1" opacity="0.5" />
        <line x1="280" y1="80" x2="320" y2="160" stroke="#5D7386" strokeWidth="1" opacity="0.5" />
        <line x1="180" y1="150" x2="320" y2="160" stroke="#5D7386" strokeWidth="1" opacity="0.5" />
        
        {/* Nodes */}
        {[[100, 80, 12], [200, 40, 10], [50, 140, 8], [180, 150, 14], [280, 80, 9], [320, 160, 7]].map(([x, y, r], i) => (
          <g key={`node-${i}`}>
            <circle cx={x} cy={y} r={r + 8} fill="#90AABA" opacity="0.1" filter="url(#softGlow)" />
            <circle cx={x} cy={y} r={r} fill="url(#nodeGlow)" stroke="#90AABA" strokeWidth="1" />
            <circle cx={x} cy={y} r={r * 0.4} fill="#B7CBD7" opacity="0.6" />
          </g>
        ))}
      </g>

      {/* KPI Blocks - Scattered */}
      <g>
        {/* KPI Block 1 */}
        <g transform="translate(100, 80)">
          <rect x="0" y="0" width="120" height="60" fill="#1C2731" stroke="#465969" strokeWidth="0.5" rx="4" opacity="0.8" />
          <rect x="10" y="35" width="60" height="4" fill="#5D7386" rx="2" opacity="0.6" />
          <rect x="10" y="45" width="40" height="4" fill="#465969" rx="2" opacity="0.4" />
          <circle cx="100" cy="30" r="12" fill="none" stroke="#758DA1" strokeWidth="2" strokeDasharray="50,25" />
        </g>
        
        {/* KPI Block 2 */}
        <g transform="translate(950, 80)">
          <rect x="0" y="0" width="140" height="50" fill="#1C2731" stroke="#465969" strokeWidth="0.5" rx="4" opacity="0.8" />
          <rect x="10" y="30" width="80" height="4" fill="#5D7386" rx="2" opacity="0.6" />
          <rect x="10" y="38" width="50" height="3" fill="#465969" rx="1" opacity="0.4" />
        </g>
        
        {/* KPI Block 3 - Bottom */}
        <g transform="translate(500, 550)">
          <rect x="0" y="0" width="200" height="70" fill="#1C2731" stroke="#465969" strokeWidth="0.5" rx="4" opacity="0.7" />
          {/* Mini sparkline */}
          <path d="M 20 50 L 40 40 L 60 45 L 80 30 L 100 35 L 120 25 L 140 30 L 160 20 L 180 25" fill="none" stroke="#758DA1" strokeWidth="1.5" />
        </g>
      </g>

      {/* Scatter Plot - Upper middle */}
      <g transform="translate(250, 50)">
        {[[20, 40], [45, 25], [70, 55], [95, 30], [120, 45], [145, 20], [170, 50], [195, 35]].map(([x, y], i) => (
          <circle key={`scatter-${i}`} cx={x} cy={y} r="3" fill="#90AABA" opacity={0.3 + (i * 0.08)} />
        ))}
      </g>

      {/* Depth layers - Foreground elements */}
      <g opacity="0.15">
        {/* Floating data fragments */}
        <rect x="50" y="300" width="30" height="30" fill="none" stroke="#5D7386" strokeWidth="0.5" transform="rotate(15, 65, 315)" />
        <rect x="1100" y="250" width="40" height="40" fill="none" stroke="#5D7386" strokeWidth="0.5" transform="rotate(-10, 1120, 270)" />
        <circle cx="1150" y="500" r="25" fill="none" stroke="#465969" strokeWidth="0.5" />
      </g>
    </svg>
  );
};

// Interactive Marker Component
const InteractiveMarker = ({ 
  position, 
  project, 
  isSelected, 
  isAnySelected,
  onSelect,
  index 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Floating animation offset
  const floatVariants = {
    animate: {
      y: [0, -4, 0, 4, 0],
      transition: {
        duration: 4 + index * 0.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.6, 0, 0.6],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      variants={floatVariants}
      animate="animate"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(project.id)}
    >
      <AnimatePresence>
        {isAnySelected && !isSelected && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="relative"
        animate={{ 
          opacity: isAnySelected && !isSelected ? 0 : 1,
          scale: isAnySelected && !isSelected ? 0.5 : 1
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#90AABA]"
          style={{ width: 48, height: 48, left: -12, top: -12 }}
          variants={pulseVariants}
          animate="animate"
        />

        {/* Main marker */}
        <motion.div
          className="relative w-12 h-12 rounded-full border-2 border-[#90AABA] flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(28, 39, 49, 0.9) 0%, rgba(48, 63, 76, 0.8) 100%)',
            boxShadow: isHovered 
              ? '0 0 30px rgba(144, 170, 186, 0.5), 0 0 60px rgba(144, 170, 186, 0.2)' 
              : '0 0 15px rgba(144, 170, 186, 0.3)'
          }}
          animate={{
            scale: isHovered ? 1.15 : 1,
            borderColor: isHovered ? '#B7CBD7' : '#90AABA'
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Plus className="w-5 h-5 text-[#B7CBD7]" />
        </motion.div>

        {/* Tooltip on hover */}
        <AnimatePresence>
          {isHovered && !isSelected && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute left-1/2 -translate-x-1/2 top-full mt-3 whitespace-nowrap px-4 py-2 rounded-lg z-50"
              style={{
                background: 'linear-gradient(135deg, #1C2731 0%, #303F4C 100%)',
                border: '1px solid rgba(144, 170, 186, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
              }}
            >
              <span className="text-sm font-medium text-[#B7CBD7]">{project.title}</span>
              <div 
                className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                style={{
                  background: '#1C2731',
                  borderLeft: '1px solid rgba(144, 170, 186, 0.3)',
                  borderTop: '1px solid rgba(144, 170, 186, 0.3)'
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// Expanded Project Panel Component
const ProjectPanel = ({ project, position, onClose }) => {
  const panelRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  // Handle close button click
  const handleCloseClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <>
      {/* Backdrop - Fixed positioned with high z-index */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 cursor-pointer"
        style={{ 
          background: 'rgba(10, 16, 22, 0.85)', 
          backdropFilter: 'blur(4px)',
          zIndex: 9998
        }}
        onClick={handleBackdropClick}
      />

      {/* Panel - Fixed positioned with highest z-index */}
      <motion.div
        ref={panelRef}
        initial={isMobile 
          ? { y: '100%', opacity: 0 }
          : { scale: 0.8, opacity: 0 }
        }
        animate={isMobile 
          ? { y: 0, opacity: 1 }
          : { scale: 1, opacity: 1 }
        }
        exit={isMobile 
          ? { y: '100%', opacity: 0 }
          : { scale: 0.8, opacity: 0 }
        }
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed ${isMobile ? 'bottom-0 left-0 right-0 rounded-t-2xl max-h-[80vh]' : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg rounded-2xl'}`}
        style={{
          background: 'linear-gradient(145deg, #1C2731 0%, #303F4C 100%)',
          border: '1px solid rgba(144, 170, 186, 0.25)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(144, 170, 186, 0.08)',
          zIndex: 9999
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        {isMobile && (
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-[#5D7386] rounded-full" />
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full transition-all hover:bg-[#465969]/50"
        >
          <X className="w-5 h-5 text-[#90AABA]" />
        </button>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto max-h-[70vh] md:max-h-none">
          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-xl md:text-2xl font-bold text-[#B7CBD7] mb-3 pr-8"
          >
            {project.title}
          </motion.h3>

          {/* Problem Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-[#90AABA] text-sm mb-5 leading-relaxed"
          >
            {project.shortDescription}
          </motion.p>

          {/* Methods Used */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mb-5"
          >
            <span className="text-xs uppercase tracking-wider text-[#5D7386] mb-2 block">Analytics Methods</span>
            <div className="flex flex-wrap gap-2">
              {(project.tags || project.techStack || []).slice(0, 5).map((method, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 text-xs rounded-full bg-[#303F4C]/60 text-[#90AABA] border border-[#5D7386]/30"
                >
                  {method}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Outcome / Impact */}
          {project.bullets && project.bullets.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mb-6"
            >
              <span className="text-xs uppercase tracking-wider text-[#5D7386] mb-2 block">Impact & Outcome</span>
              <ul className="space-y-2">
                {project.bullets.map((bullet, idx) => (
                  <li key={idx} className="text-[#758DA1] text-sm flex items-start gap-2">
                    <span className="text-[#90AABA] mt-0.5">→</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex items-center gap-3 pt-2"
          >
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  className="bg-gradient-to-r from-[#303F4C] to-[#465969] hover:from-[#465969] hover:to-[#5D7386] text-[#B7CBD7] font-medium flex items-center gap-2 border border-[#5D7386]/30 px-5 py-2.5 transition-all duration-300"
                >
                  <Github size={16} />
                  View GitHub
                </Button>
              </a>
            )}
            {project.links?.slides && (
              <a
                href={project.links.slides}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  variant="ghost"
                  className="text-[#90AABA] hover:text-[#B7CBD7] hover:bg-[#303F4C]/50 flex items-center gap-2 px-4 py-2.5 transition-all duration-300"
                >
                  <ExternalLink size={16} />
                  View Project
                </Button>
              </a>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get projects from JSON - we need exactly 5
  const allProjects = (projectsData.projects || [])
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .slice(0, 5);

  // If less than 5, we add placeholder projects
  const projects = allProjects.length >= 5 ? allProjects : [
    ...allProjects,
    ...Array(5 - allProjects.length).fill(null).map((_, i) => ({
      id: `placeholder-${i}`,
      title: `Upcoming Project ${i + 1}`,
      shortDescription: 'Details coming soon...',
      tags: ['Analytics'],
      bullets: [],
      links: {}
    }))
  ];

  // Define marker positions on the analytics visual (percentage-based)
  const markerPositions = [
    { x: 15, y: 35 },    // Near bar chart
    { x: 50, y: 32 },    // Near line chart center
    { x: 85, y: 25 },    // Near distribution curves
    { x: 78, y: 70 },    // Near network nodes
    { x: 42, y: 78 },    // Near bottom KPI block
  ];

  const handleSelectProject = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    setSelectedProject(project);
  };

  const handleClosePanel = () => {
    setSelectedProject(null);
  };

  // Close panel on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClosePanel();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen text-white relative overflow-x-hidden">
        {/* Metallic background */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            background: 'linear-gradient(180deg, #0A1016 0%, #1C2731 50%, #0A1016 100%)',
          }}
        />
        
        {/* Ambient glow */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            background: 'radial-gradient(circle at 30% 40%, rgba(144, 170, 186, 0.03) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(93, 115, 134, 0.03) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 pt-28 pb-12 px-4 md:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-8 md:mb-12"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#B7CBD7] mb-3">
                {projectsData.sectionTitle || 'Featured Projects'}
              </h1>
              <p className="text-base md:text-lg text-[#758DA1] max-w-2xl mx-auto">
                Explore insights through an analytics lens
              </p>
            </motion.div>

            {/* Interactive Analytics Visual Section */}
            <motion.div
              ref={sectionRef}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative w-full aspect-[16/9] md:aspect-[16/8] lg:aspect-[16/7] rounded-2xl overflow-hidden mb-12"
              style={{
                background: 'linear-gradient(145deg, #0A1016 0%, #1C2731 50%, #0A1016 100%)',
                border: '1px solid rgba(144, 170, 186, 0.15)',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(183, 203, 215, 0.05)'
              }}
            >
              {/* The SVG Analytics Visual */}
              <div className="absolute inset-0">
                <AnalyticsHeroVisual dimmed={!!selectedProject} />
              </div>

              {/* Interactive Markers */}
              {isInView && projects.map((project, index) => (
                <InteractiveMarker
                  key={project.id}
                  position={markerPositions[index]}
                  project={project}
                  isSelected={selectedProject?.id === project.id}
                  isAnySelected={!!selectedProject}
                  onSelect={handleSelectProject}
                  index={index}
                />
              ))}

              {/* Expanded Project Panel */}
              <AnimatePresence>
                {selectedProject && (
                  <ProjectPanel
                    project={selectedProject}
                    position={markerPositions[projects.findIndex(p => p.id === selectedProject.id)]}
                    onClose={handleClosePanel}
                  />
                )}
              </AnimatePresence>

              {/* Instruction hint */}
              <AnimatePresence>
                {!selectedProject && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full"
                    style={{
                      background: 'rgba(28, 39, 49, 0.8)',
                      border: '1px solid rgba(144, 170, 186, 0.2)'
                    }}
                  >
                    <span className="text-xs text-[#758DA1]">Click a marker to explore projects</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="text-center"
            >
              <p className="text-[#758DA1] mb-5">
                {projectsData.ctaText || 'Want to see more?'}
              </p>
              <a
                href={projectsData.githubProfileUrl || 'https://github.com'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  className="bg-transparent hover:bg-[#303F4C]/50 text-[#B7CBD7] font-medium px-6 py-5 border border-[#465969]/50 hover:border-[#5D7386] flex items-center gap-2 mx-auto transition-all duration-300"
                >
                  <ExternalLink size={18} />
                  {projectsData.githubProfileButtonText || 'Visit GitHub Profile'}
                </Button>
              </a>
            </motion.div>

            {/* Footer */}
            <div className="mt-16">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
