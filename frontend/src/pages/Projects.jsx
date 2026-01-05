import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, Github, ExternalLink, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import PageTransition from '../components/PageTransition';
import Footer from '../components/Footer';

// Import JSON data
import projectsData from '../content/projects.json';

// Hero image URL - abstract analytics visualization
const HERO_IMAGE = 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=1920&q=80';

// Marker positions (percentage-based for responsiveness)
const MARKER_POSITIONS = [
  { x: 20, y: 32 },   // Left area
  { x: 50, y: 28 },   // Top-center
  { x: 80, y: 38 },   // Right area
  { x: 32, y: 65 },   // Bottom-left
  { x: 68, y: 60 },   // Bottom-right
];

// Interactive Marker Component
const Marker = ({ position, project, isActive, onSelect, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -3, 0, 3, 0], // Gentle float
      }}
      transition={{
        opacity: { delay: 0.3 + index * 0.1, duration: 0.4 },
        scale: { delay: 0.3 + index * 0.1, duration: 0.4 },
        y: { duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut" }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(index)}
    >
      {/* Pulse ring */}
      <motion.div
        className="absolute rounded-full border border-[#90AABA]"
        style={{
          width: 56,
          height: 56,
          left: -16,
          top: -16,
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      {/* Main marker */}
      <motion.div
        className="relative w-12 h-12 rounded-full border-2 flex items-center justify-center"
        style={{
          borderColor: isHovered ? '#B7CBD7' : '#90AABA',
          background: 'radial-gradient(circle, rgba(28, 39, 49, 0.95) 0%, rgba(48, 63, 76, 0.9) 100%)',
          boxShadow: isHovered
            ? '0 0 25px rgba(144, 170, 186, 0.5), 0 0 50px rgba(144, 170, 186, 0.2)'
            : '0 0 15px rgba(144, 170, 186, 0.3)',
        }}
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.25 }}
      >
        <Plus className="w-5 h-5 text-[#B7CBD7]" />
      </motion.div>

      {/* Tooltip on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 whitespace-nowrap px-4 py-2 rounded-lg pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, #1C2731 0%, #303F4C 100%)',
              border: '1px solid rgba(144, 170, 186, 0.3)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
            }}
          >
            <span className="text-sm font-medium text-[#B7CBD7]">{project.title}</span>
            {/* Arrow */}
            <div
              className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
              style={{
                background: '#1C2731',
                borderLeft: '1px solid rgba(144, 170, 186, 0.3)',
                borderTop: '1px solid rgba(144, 170, 186, 0.3)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Project Details Panel Component
const ProjectPanel = ({ project, onClose, isMobile }) => {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 cursor-pointer"
        style={{
          background: 'rgba(10, 16, 22, 0.85)',
          backdropFilter: 'blur(4px)',
          zIndex: 100,
        }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={isMobile ? { y: '100%' } : { scale: 0.9, opacity: 0 }}
        animate={isMobile ? { y: 0 } : { scale: 1, opacity: 1 }}
        exit={isMobile ? { y: '100%' } : { scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed ${
          isMobile
            ? 'bottom-0 left-0 right-0 rounded-t-2xl max-h-[85vh]'
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-2xl'
        }`}
        style={{
          background: 'linear-gradient(145deg, #1C2731 0%, #303F4C 100%)',
          border: '1px solid rgba(144, 170, 186, 0.2)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(144, 170, 186, 0.06)',
          zIndex: 101,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        {isMobile && (
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-[#5D7386] rounded-full" />
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#465969]/50 transition-colors z-10"
          type="button"
        >
          <X className="w-5 h-5 text-[#90AABA]" />
        </button>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto max-h-[75vh]">
          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-bold text-[#B7CBD7] mb-2 pr-8"
          >
            {project.title}
          </motion.h3>

          {/* Problem Statement */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-[#90AABA] text-sm mb-5 leading-relaxed"
          >
            {project.shortDescription}
          </motion.p>

          {/* What I Did */}
          {project.bullets && project.bullets.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-5"
            >
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#758DA1] mb-3">
                What I Did
              </h4>
              <ul className="space-y-2">
                {project.bullets.slice(0, 3).map((bullet, idx) => (
                  <li key={idx} className="text-[#90AABA] text-sm flex items-start gap-2">
                    <span className="text-[#90AABA] mt-1">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Tools / Methods */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-5"
          >
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#758DA1] mb-3">
              Tools & Methods
            </h4>
            <div className="flex flex-wrap gap-2">
              {(project.tags || []).slice(0, 5).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs rounded-full bg-[#303F4C]/60 text-[#90AABA] border border-[#5D7386]/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Outcome */}
          {project.outcome && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#758DA1] mb-2">
                Outcome
              </h4>
              <p className="text-[#758DA1] text-sm">{project.outcome}</p>
            </motion.div>
          )}

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="pt-2"
          >
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-gradient-to-r from-[#303F4C] to-[#465969] hover:from-[#465969] hover:to-[#5D7386] text-[#B7CBD7] font-medium flex items-center gap-2 border border-[#5D7386]/30 px-5 py-2.5 transition-all">
                  <Github size={16} />
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
  const [activeProject, setActiveProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check for mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get exactly 5 projects from JSON
  const projects = (projectsData.projects || [])
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .slice(0, 5);

  // Close panel on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setActiveProject(null);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSelectProject = (index) => {
    setActiveProject(projects[index]);
  };

  const handleClosePanel = () => {
    setActiveProject(null);
  };

  return (
    <PageTransition>
      <div className="min-h-screen text-white relative overflow-x-hidden">
        {/* Background */}
        <div
          className="fixed inset-0 z-0"
          style={{
            background: 'linear-gradient(180deg, #0A1016 0%, #1C2731 50%, #0A1016 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 pt-28 pb-12 px-4 md:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#B7CBD7] mb-3">
                {projectsData.sectionTitle || 'Featured Projects'}
              </h1>
              <p className="text-base md:text-lg text-[#758DA1]">
                Click a marker to explore project details
              </p>
            </motion.div>

            {/* Hero Image with Markers */}
            <motion.div
              ref={sectionRef}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full aspect-[16/9] rounded-xl overflow-hidden"
              style={{
                border: '1px solid rgba(144, 170, 186, 0.15)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Hero Image */}
              <img
                src={HERO_IMAGE}
                alt="Analytics visualization"
                className="w-full h-full object-cover"
                style={{
                  filter: activeProject ? 'brightness(0.4)' : 'brightness(0.7)',
                  transition: 'filter 0.4s ease',
                }}
              />

              {/* Overlay gradient for better marker visibility */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10, 16, 22, 0.5) 100%)',
                }}
              />

              {/* Markers */}
              {isInView && !activeProject && projects.map((project, index) => (
                <Marker
                  key={project.id || index}
                  position={MARKER_POSITIONS[index]}
                  project={project}
                  isActive={false}
                  onSelect={handleSelectProject}
                  index={index}
                />
              ))}

              {/* Hint text */}
              {!activeProject && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full"
                  style={{
                    background: 'rgba(28, 39, 49, 0.8)',
                    border: '1px solid rgba(144, 170, 186, 0.2)',
                  }}
                >
                  <span className="text-xs text-[#758DA1]">
                    Click markers to explore projects
                  </span>
                </motion.div>
              )}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mt-12"
            >
              <p className="text-[#758DA1] mb-5">
                {projectsData.ctaText || 'Want to see more?'}
              </p>
              <a
                href={projectsData.githubProfileUrl || 'https://github.com'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-transparent hover:bg-[#303F4C]/50 text-[#B7CBD7] font-medium px-6 py-5 border border-[#465969]/50 hover:border-[#5D7386] flex items-center gap-2 mx-auto transition-all">
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

        {/* Project Panel Modal */}
        <AnimatePresence>
          {activeProject && (
            <ProjectPanel
              project={activeProject}
              onClose={handleClosePanel}
              isMobile={isMobile}
            />
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
