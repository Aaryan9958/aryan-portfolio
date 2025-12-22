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
    period: '2022',
    highlights: [
      'Built competitor-based pricing model that increased pilot orders by ~25%',
      'Used TAM/SAM/SOM analysis to focus acquisition, lowering CAC by ~20%',
      'Delivered actionable buyer personas for growth strategy',
    ],
    position: { x: 10, y: 50 },
  },
  {
    id: 2,
    title: 'Market Analyst Intern',
    company: 'Lenskart',
    period: '2023',
    highlights: [
      'Analyzed 5+ digital campaigns, improving post performance by ~15%',
      'Helped drive 500K+ impressions and 10K audience growth',
      'Used dashboards and campaign metrics to refine influencer strategy',
    ],
    position: { x: 22, y: 35 },
  },
  {
    id: 3,
    title: 'Strategy Analyst',
    company: 'Daily Grind (Student Venture)',
    period: '2023–24',
    highlights: [
      'Co-founded 4-flavor on-campus coffee venture',
      'Managed pricing and inventory (JIT/FIFO), maintaining ~20% profit margin',
      'Used A/B tests and customer feedback to optimize product offerings',
    ],
    position: { x: 34, y: 60 },
  },
  {
    id: 4,
    title: 'Marketing Strategy Consultant',
    company: 'iDig2Learn',
    period: '2024',
    highlights: [
      'Non-profit consulting project on engagement and donor patterns',
      'Analyzed social media performance and content strategy',
      'Recommended timing and themes to increase donor conversion',
    ],
    position: { x: 48, y: 40 },
  },
  {
    id: 5,
    title: 'Strategic Analytics Project',
    company: 'Nexus Logistics Solutions',
    period: '2024–25',
    highlights: [
      'Analyzed training enrollment and utilization across locations',
      'Used segmentation and regression for in-person vs online preferences',
      'Delivered recommendations on training format optimization',
    ],
    position: { x: 62, y: 55 },
  },
  {
    id: 6,
    title: 'Data & Operations Analytics',
    company: 'Perry\'s Ice Cream "Project Boost"',
    period: '2025',
    highlights: [
      'Production line analytics capstone project',
      'Measured speed, downtime, and SKU mix to identify hidden capacity',
      'Recommended changes to unlock extra capacity without new machines',
    ],
    position: { x: 76, y: 38 },
  },
  {
    id: 7,
    title: 'Graduate Teaching Assistant',
    company: 'Simon Business School',
    period: '2025–Present',
    highlights: [
      'TA for analytics and big data courses',
      'Help students interpret models and translate technical results',
      'Deliver clear business insights from complex analytical work',
    ],
    position: { x: 90, y: 50 },
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
      <div className="min-h-screen bg-black text-white pt-20 pb-20">
        <BackgroundVideo 
          videoUrl="https://customer-assets.emergentagent.com/job_d6d3bd49-c74e-4d3c-abec-ab44adf6cddc/artifacts/apasc6v1_14683767_3840_2160_30fps.mp4" 
          overlay={true}
          blur={false}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
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

          {/* Roadmap Container */}
          <div className="relative w-full" style={{ minHeight: '600px' }}>
            {/* Curved Road SVG */}
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
              
              {/* The curved road path */}
              <motion.path
                d="M 50 150 Q 200 100, 350 140 T 650 130 Q 800 120, 950 150"
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

            {/* Experience Pins and Cards */}
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="absolute"
                style={{
                  left: `${exp.position.x}%`,
                  top: `${exp.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Pin Marker */}
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * index + 0.5 }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => handlePinClick(exp.id)}
                  className={`relative group cursor-pointer transition-all ${
                    activeId === exp.id ? 'z-30' : 'z-20'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      activeId === exp.id
                        ? 'bg-gradient-to-br from-[#2DD4BF] to-[#22D3EE] shadow-lg shadow-[#2DD4BF]/50'
                        : 'bg-white/10 border-2 border-[#2DD4BF]/50 hover:border-[#2DD4BF] backdrop-blur-sm'
                    }`}
                  >
                    <MapPin 
                      size={20} 
                      className={activeId === exp.id ? 'text-black' : 'text-[#2DD4BF]'}
                    />
                  </div>
                  
                  {/* Pin glow effect */}
                  {activeId === exp.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 rounded-full bg-[#2DD4BF]/30 blur-xl -z-10"
                    />
                  )}
                </motion.button>

                {/* Experience Card */}
                <AnimatePresence>
                  {activeId === exp.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: -180, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-1/2 -translate-x-1/2 w-80 md:w-96"
                      style={{ top: 0 }}
                    >
                      <div className="glass-card rounded-xl p-6 border border-[#2DD4BF]/30 shadow-2xl">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-white mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-[#2DD4BF] font-medium">
                            {exp.company}
                          </p>
                          <p className="text-white/50 text-sm mt-1">
                            {exp.period}
                          </p>
                        </div>
                        
                        <ul className="space-y-2">
                          {exp.highlights.map((highlight, idx) => (
                            <li
                              key={idx}
                              className="text-white/80 text-sm flex items-start gap-2"
                            >
                              <span className="text-[#2DD4BF] mt-1">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Arrow pointing to pin */}
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-[#0a0a0a] border-b border-r border-[#2DD4BF]/30 transform rotate-45" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Timeline Labels */}
          <div className="mt-12 flex justify-between items-center px-4">
            <div className="text-center">
              <p className="text-white/40 text-sm">Start</p>
              <p className="text-white font-semibold mt-1">2022</p>
            </div>
            <div className="text-center">
              <p className="text-white/40 text-sm">Present</p>
              <p className="text-white font-semibold mt-1">2025</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
