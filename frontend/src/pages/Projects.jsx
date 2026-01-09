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

// Helper function to split title into 2 lines
const splitTitleToLines = (title) => {
  // Check for em dash, hyphen, or colon separators
  const separators = [' — ', ' - ', ': '];
  for (const sep of separators) {
    if (title.includes(sep)) {
      const parts = title.split(sep);
      return {
        line1: parts[0].trim(),
        line2: parts.slice(1).join(sep).trim()
      };
    }
  }
  
  // No separator found - split by first 2 words
  const words = title.split(' ');
  if (words.length <= 2) {
    return { line1: title, line2: '' };
  }
  return {
    line1: words.slice(0, 2).join(' '),
    line2: words.slice(2).join(' ')
  };
};

// Interactive Marker Component
const Marker = ({ position, project, isActive, onSelect, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get split title for 2-line tooltip
  const titleLines = splitTitleToLines(project.title);

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

      {/* Tooltip on hover - 2 line format */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 px-4 py-2.5 rounded-lg pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, #1C2731 0%, #303F4C 100%)',
              border: '1px solid rgba(144, 170, 186, 0.3)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
              maxWidth: '200px',
              minWidth: '120px',
              textAlign: 'center',
              whiteSpace: 'normal',
            }}
          >
            <div className="text-sm font-medium text-[#B7CBD7] leading-snug">
              {titleLines.line1}
            </div>
            {titleLines.line2 && (
              <div className="text-xs font-medium text-[#90AABA] leading-snug mt-1">
                {titleLines.line2}
              </div>
            )}
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

// Project Details Panel Component - matches Experience modal style
const ProjectPanel = ({ project, onClose }) => {
  // Handle close button click explicitly
  const handleCloseClick = (e) => {
    e.stopPropagation();
    onClose();
  };

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

      {/* Modal Panel - centered like Experience */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="experience-modal relative rounded-2xl p-6 md:p-8 w-full max-w-lg max-h-[80vh] overflow-y-auto card-scroll z-10"
      >
        {/* Close button - explicit handler like Experience page */}
        <button
          onClick={handleCloseClick}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#303F4C] flex items-center justify-center hover:bg-[#465969] transition-colors z-20"
        >
          <X size={16} className="text-[#90AABA]" />
        </button>

        {/* Content */}
        <div className="pr-8">
          {/* Title */}
          <div className="mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-[#B7CBD7] mb-2">
              {project.title}
            </h3>
          </div>

          {/* Problem Statement */}
          <p className="text-[#758DA1] text-sm mb-4 italic border-l-2 border-[#465969] pl-3">
            {project.shortDescription}
          </p>

          {/* What I Did */}
          {project.bullets && project.bullets.length > 0 && (
            <div className="space-y-3 mb-4">
              <h4 className="text-sm font-semibold text-[#90AABA] uppercase tracking-wider">What I Did</h4>
              <ul className="space-y-3">
                {project.bullets.slice(0, 3).map((bullet, idx) => (
                  <li key={idx} className="text-[#758DA1] text-sm flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#90AABA] mt-2 flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tools / Methods */}
          {(project.tags && project.tags.length > 0) && (
            <div className="mt-4 pt-4 border-t border-[#303F4C]">
              <h4 className="text-xs font-semibold text-[#5D7386] uppercase tracking-wider mb-2">Tools & Methods</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 5).map((tag, idx) => (
                  <span key={idx} className="tag text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Outcome */}
          {project.outcome && (
            <div className="mt-4 pt-4 border-t border-[#303F4C]">
              <h4 className="text-xs font-semibold text-[#5D7386] uppercase tracking-wider mb-2">Outcome</h4>
              <p className="text-[#90AABA] text-sm">{project.outcome}</p>
            </div>
          )}

          {/* Action Button */}
          {project.links?.github && (
            <div className="mt-6">
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
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0);
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

            {/* Hero Image with Markers - scaled down for subtle backdrop effect */}
            <motion.div
              ref={sectionRef}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-4xl mx-auto aspect-[16/10] rounded-xl overflow-hidden"
              style={{
                border: '1px solid rgba(144, 170, 186, 0.12)',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Hero Image - more compact/zoomed out to show full pattern */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={HERO_IMAGE}
                  alt="Analytics visualization"
                  className="w-full h-full object-cover"
                  style={{
                    filter: activeProject ? 'brightness(0.3)' : 'brightness(0.5)',
                    opacity: 0.75,
                    transition: 'filter 0.4s ease',
                    transform: 'scale(0.85)',
                    transformOrigin: 'center center',
                  }}
                />
              </div>

              {/* Vignette overlay for subtle/hazy effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 20%, rgba(10, 16, 22, 0.6) 80%, rgba(10, 16, 22, 0.85) 100%)',
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
            />
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
