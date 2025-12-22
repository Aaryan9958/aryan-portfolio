import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import BackgroundVideo from '../components/BackgroundVideo';

const experiences = [
  {
    id: 1,
    title: 'Business Analyst Intern',
    company: 'Foodizo',
    period: 'Jun 2022',
    description: 'Food-tech startup aggregating home-cooked meals.',
    highlights: [
      'Built competitor-based pricing model that increased pilot orders by ~25%',
      'Used TAM/SAM/SOM segmentation to focus on high-potential segments and reduce acquisition costs',
    ],
    position: { x: 15 },
  },
  {
    id: 2,
    title: 'Market Analyst Intern',
    company: 'Lenskart',
    period: 'Mar 2023',
    highlights: [
      'Analyzed 5+ digital campaigns and improved post performance by ~15%',
      'Helped drive ~500K impressions and 10K audience growth',
      'Used dashboards and campaign metrics to refine influencer and media strategy',
    ],
    position: { x: 38 },
  },
  {
    id: 3,
    title: 'Strategy Analyst',
    company: 'Daily Grind (Student Venture)',
    period: 'Aug 2023',
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
    highlights: [
      'Consulted for a non-profit focused on environmental education',
      'Analyzed engagement and donor patterns across channels',
      'Recommended content themes and timing to grow reach and improve donor conversion',
    ],
    position: { x: 85 },
  },
];

export default function Experience() {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePinClick = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white pt-24 pb-20">
        <BackgroundVideo 
          videoUrl="https://customer-assets.emergentagent.com/job_d6d3bd49-c74e-4d3c-abec-ab44adf6cddc/artifacts/apasc6v1_14683767_3840_2160_30fps.mp4" 
          overlay={true}
          blur={false}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-3">
              Experience Journey
            </h1>
            <p className="text-xl text-white/60">
              From insights to impact: my professional roadmap
            </p>
          </motion.div>

          {/* Horizontal Roadmap Container */}
          <div className="relative w-full mx-auto" style={{ height: '500px', maxWidth: '1200px' }}>
            {/* Horizontal Curved Road SVG */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 300"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.6" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Horizontal curved path */}
              <motion.path
                d="M 50 150 Q 200 120, 350 145 Q 500 170, 650 140 Q 800 115, 950 150"
                stroke="url(#roadGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>

            {/* Experience Pins with Labels and Cards */}
            {experiences.map((exp, index) => {
              const xPosition = exp.position.x;
              // Calculate y position along the curve
              const yPosition = index % 2 === 0 ? 50 : 48;

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
                    transition={{ duration: 0.4, delay: 0.15 * index + 0.5 }}
                    className="absolute bottom-14 left-1/2 -translate-x-1/2 text-center w-max max-w-[180px]"
                  >
                    <p className="text-white font-semibold text-sm leading-tight">
                      {exp.title}
                    </p>
                    <p className="text-[#2DD4BF] text-xs mt-0.5">
                      {exp.company}
                    </p>
                    <p className="text-white/50 text-xs mt-0.5">
                      {exp.period}
                    </p>
                  </motion.div>

                  {/* Pin Marker */}
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.15 * index + 0.5 }}
                    whileHover={{ scale: 1.15 }}
                    onClick={() => handlePinClick(exp.id)}
                    className="relative group cursor-pointer transition-all z-20"
                  >
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                        activeId === exp.id
                          ? 'bg-gradient-to-br from-[#2DD4BF] to-[#22D3EE] shadow-xl shadow-[#2DD4BF]/50 scale-110'
                          : 'bg-white/10 border-2 border-[#2DD4BF]/50 hover:border-[#2DD4BF] backdrop-blur-sm'
                      }`}
                    >
                      <MapPin 
                        size={22} 
                        className={activeId === exp.id ? 'text-black' : 'text-[#2DD4BF]'}
                      />
                    </div>
                    
                    {/* Pin glow effect */}
                    {activeId === exp.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.5 }}
                        className="absolute inset-0 rounded-full bg-[#2DD4BF]/30 blur-2xl -z-10"
                      />
                    )}
                  </motion.button>

                  {/* Expanded Card */}
                  <AnimatePresence>
                    {activeId === exp.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-16 left-1/2 -translate-x-1/2 w-80 z-30"
                      >
                        <div className="glass-card rounded-xl p-5 border border-[#2DD4BF]/40 shadow-2xl">
                          <div className="mb-3">
                            <h3 className="text-lg font-bold text-white mb-1">
                              {exp.title}
                            </h3>
                            <p className="text-[#2DD4BF] font-medium text-sm">
                              {exp.company}
                            </p>
                            <p className="text-white/50 text-xs mt-0.5">
                              {exp.period}
                            </p>
                          </div>
                          
                          {exp.description && (
                            <p className="text-white/70 text-xs mb-3 italic">
                              {exp.description}
                            </p>
                          )}
                          
                          <ul className="space-y-2">
                            {exp.highlights.map((highlight, idx) => (
                              <li
                                key={idx}
                                className="text-white/80 text-xs flex items-start gap-2"
                              >
                                <span className="text-[#2DD4BF] mt-1 flex-shrink-0">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Arrow pointing to pin */}
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0a0a0a] border-t border-l border-[#2DD4BF]/40 transform rotate-45" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Timeline Labels */}
          <div className="mt-8 flex justify-between items-center max-w-[1200px] mx-auto px-4">
            <div className="text-left">
              <p className="text-white/40 text-sm">Start</p>
              <p className="text-white font-semibold mt-1">2022</p>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-sm">Current</p>
              <p className="text-white font-semibold mt-1">2024</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
