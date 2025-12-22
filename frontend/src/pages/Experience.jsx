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
    highlights: [
      'Built competitor-based pricing model that increased pilot orders by ~25%',
      'Used TAM/SAM/SOM analysis to focus acquisition, lowering CAC by ~20%',
      'Delivered actionable buyer personas for growth strategy',
    ],
    position: { y: 8, side: 'right' },
  },
  {
    id: 2,
    title: 'Market Analyst Intern',
    company: 'Lenskart',
    period: 'Mar 2023',
    highlights: [
      'Analyzed 5+ digital campaigns, improving post performance by ~15%',
      'Helped drive 500K+ impressions and 10K audience growth',
      'Used dashboards and campaign metrics to refine influencer strategy',
    ],
    position: { y: 20, side: 'left' },
  },
  {
    id: 3,
    title: 'Strategy Analyst',
    company: 'Daily Grind',
    period: 'Aug 2023',
    highlights: [
      'Co-founded 4-flavor on-campus coffee venture',
      'Managed pricing and inventory (JIT/FIFO), maintaining ~20% profit margin',
      'Used A/B tests and customer feedback to optimize product offerings',
    ],
    position: { y: 32, side: 'right' },
  },
  {
    id: 4,
    title: 'Marketing Strategy Consultant',
    company: 'iDig2Learn',
    period: 'Feb 2024',
    highlights: [
      'Non-profit consulting project on engagement and donor patterns',
      'Analyzed social media performance and content strategy',
      'Recommended timing and themes to increase donor conversion',
    ],
    position: { y: 44, side: 'left' },
  },
  {
    id: 5,
    title: 'Strategic Analytics Project',
    company: 'Nexus Logistics',
    period: 'Jun 2024',
    highlights: [
      'Analyzed training enrollment and utilization across locations',
      'Used segmentation and regression for in-person vs online preferences',
      'Delivered recommendations on training format optimization',
    ],
    position: { y: 56, side: 'right' },
  },
  {
    id: 6,
    title: 'Data & Operations Analytics',
    company: 'Perry\'s Ice Cream',
    period: 'Jan 2025',
    highlights: [
      'Production line analytics capstone project',
      'Measured speed, downtime, and SKU mix to identify hidden capacity',
      'Recommended changes to unlock extra capacity without new machines',
    ],
    position: { y: 68, side: 'left' },
  },
  {
    id: 7,
    title: 'Graduate Teaching Assistant',
    company: 'Simon Business School',
    period: 'Feb 2025',
    highlights: [
      'TA for analytics and big data courses',
      'Help students interpret models and translate technical results',
      'Deliver clear business insights from complex analytical work',
    ],
    position: { y: 80, side: 'right' },
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
      <div className="min-h-screen bg-black text-white pt-32 pb-32">
        <BackgroundVideo 
          videoUrl="https://customer-assets.emergentagent.com/job_d6d3bd49-c74e-4d3c-abec-ab44adf6cddc/artifacts/apasc6v1_14683767_3840_2160_30fps.mp4" 
          overlay={true}
          blur={false}
        />

        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
              Experience Journey
            </h1>
            <p className="text-xl text-white/60">
              From insights to impact: my professional roadmap
            </p>
          </motion.div>

          {/* Vertical Roadmap Container */}
          <div className="relative mx-auto" style={{ maxWidth: '900px' }}>
            {/* Vertical Curved Road SVG */}
            <svg
              className="absolute left-1/2 -translate-x-1/2 w-full"
              style={{ height: '2000px' }}
              viewBox="0 0 200 2000"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
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
              
              {/* Vertical curved path */}
              <motion.path
                d="M 100 50 Q 120 300, 100 550 Q 80 800, 100 1050 Q 120 1300, 100 1550 Q 90 1750, 100 1950"
                stroke="url(#roadGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>

            {/* Experience Pins with Labels and Cards */}
            <div className="relative" style={{ height: '2000px' }}>
              {experiences.map((exp, index) => {
                const yPosition = (exp.position.y / 100) * 2000;
                const isLeft = exp.position.side === 'left';

                return (
                  <div
                    key={exp.id}
                    className="absolute w-full"
                    style={{
                      top: `${yPosition}px`,
                      transform: 'translateY(-50%)',
                    }}
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Left Label */}
                      {isLeft && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * index + 0.5 }}
                          className="absolute right-1/2 pr-12 text-right"
                        >
                          <p className="text-white font-semibold text-sm md:text-base whitespace-nowrap">
                            {exp.title}
                          </p>
                          <p className="text-[#2DD4BF] text-xs md:text-sm whitespace-nowrap">
                            {exp.company}
                          </p>
                          <p className="text-white/50 text-xs mt-1 whitespace-nowrap">
                            {exp.period}
                          </p>
                        </motion.div>
                      )}

                      {/* Pin Marker */}
                      <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 * index + 0.5 }}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => handlePinClick(exp.id)}
                        className={`relative group cursor-pointer transition-all z-20`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                            activeId === exp.id
                              ? 'bg-gradient-to-br from-[#2DD4BF] to-[#22D3EE] shadow-xl shadow-[#2DD4BF]/50 scale-110'
                              : 'bg-white/10 border-2 border-[#2DD4BF]/50 hover:border-[#2DD4BF] backdrop-blur-sm hover:scale-105'
                          }`}
                        >
                          <MapPin 
                            size={24} 
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

                      {/* Right Label */}
                      {!isLeft && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * index + 0.5 }}
                          className="absolute left-1/2 pl-12 text-left"
                        >
                          <p className="text-white font-semibold text-sm md:text-base whitespace-nowrap">
                            {exp.title}
                          </p>
                          <p className="text-[#2DD4BF] text-xs md:text-sm whitespace-nowrap">
                            {exp.company}
                          </p>
                          <p className="text-white/50 text-xs mt-1 whitespace-nowrap">
                            {exp.period}
                          </p>
                        </motion.div>
                      )}

                      {/* Expanded Card */}
                      <AnimatePresence>
                        {activeId === exp.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={`absolute top-16 ${
                              isLeft ? 'right-1/2 mr-16' : 'left-1/2 ml-16'
                            } w-80 md:w-96 z-30`}
                          >
                            <div className="glass-card rounded-xl p-6 border border-[#2DD4BF]/40 shadow-2xl">
                              <div className="mb-4">
                                <h3 className="text-xl font-bold text-white mb-2">
                                  {exp.title}
                                </h3>
                                <p className="text-[#2DD4BF] font-medium text-base">
                                  {exp.company}
                                </p>
                                <p className="text-white/50 text-sm mt-1">
                                  {exp.period}
                                </p>
                              </div>
                              
                              <ul className="space-y-3">
                                {exp.highlights.map((highlight, idx) => (
                                  <li
                                    key={idx}
                                    className="text-white/80 text-sm flex items-start gap-2"
                                  >
                                    <span className="text-[#2DD4BF] mt-1 flex-shrink-0">•</span>
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>

                              {/* Arrow pointing to pin */}
                              <div 
                                className={`absolute top-6 ${
                                  isLeft ? '-right-2' : '-left-2'
                                } w-4 h-4 bg-[#0a0a0a] border ${
                                  isLeft ? 'border-t border-r' : 'border-t border-l'
                                } border-[#2DD4BF]/40 transform ${
                                  isLeft ? '-rotate-45' : 'rotate-45'
                                }`} 
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline Markers */}
          <div className="mt-16 flex justify-center">
            <div className="text-center">
              <p className="text-white/40 text-sm">Career Timeline</p>
              <p className="text-white font-semibold mt-2">2022 → 2025</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
