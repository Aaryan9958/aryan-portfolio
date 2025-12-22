import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import BackgroundVideo from '../components/BackgroundVideo';
import PageTransition from '../components/PageTransition';
import SectionWrapper from '../components/SectionWrapper';

const experiences = [
  {
    title: 'Graduate Teaching Assistant',
    company: 'Simon Business School',
    period: '2025 – Present',
    description: 'Tutored students on analytics and statistical methods. Evaluated assignments and delivered personalized insights.',
    details: [
      'Tutored students on analytics and statistical methods',
      'Evaluated assignments and delivered personalized insights',
      'Provided guidance on complex analytical concepts',
    ],
  },
  {
    title: 'Marketing Strategy Consultant',
    company: 'iDig2Learn',
    period: '2025',
    description: 'Analyzed engagement metrics and donor patterns. Delivered content strategies and cost optimization recommendations.',
    details: [
      'Analyzed engagement metrics and donor patterns',
      'Delivered content strategies and cost optimization recommendations',
      'Improved marketing ROI through data-driven insights',
    ],
  },
  {
    title: 'Strategy Analyst',
    company: 'Daily Grind',
    period: '2024',
    description: 'Launched a four-flavor coffee venture using pricing and segmentation models. Increased revenue by 40%, achieved 20% profit margin.',
    details: [
      'Launched a four-flavor coffee venture using pricing and segmentation models',
      'Increased revenue by 40%, achieved 20% profit margin',
      'Used JIT/FIFO to reduce costs by 25% and spoilage by 30%',
      'Ran A/B tested marketing campaigns boosting acquisition by 200+',
    ],
  },
  {
    title: 'Market Analyst Intern',
    company: 'Lenskart',
    period: '2023',
    description: 'Analyzed engagement across 5 campaigns, improving post performance by 15%. Drove 500K+ impressions and 10K audience growth.',
    details: [
      'Analyzed engagement across 5 campaigns, improving post performance by 15%',
      'Drove 500K+ impressions and 10K audience growth',
      'Conducted sentiment analysis on 500+ reviews to uncover UX issues',
      'Created data-driven recommendations for campaign optimization',
    ],
  },
  {
    title: 'Business Analyst Intern',
    company: 'Foodizo',
    period: '2022',
    description: 'Built pricing models using competitor benchmarking, resulting in 25% rise in pilot orders. Performed TAM/SAM/SOM segmentation.',
    details: [
      'Built pricing models using competitor benchmarking → 25% rise in pilot orders',
      'Performed TAM/SAM/SOM segmentation → reduced acquisition cost by 20%',
      'Delivered actionable insights for business growth',
    ],
  },
  {
    title: 'Strategic Analytics Case',
    company: 'Nexus Logistics',
    period: '2024',
    description: 'Conducted PCA + K-means employee segmentation. Built insights to optimize in-person vs virtual training outcomes.',
    details: [
      'Conducted PCA + K-means employee segmentation',
      'Built insights to optimize in-person vs virtual training outcomes',
      'Identified key learning preference groups',
    ],
  },
];

export default function Experience() {
  const [openIndex, setOpenIndex] = useState(null);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleCard = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <PageTransition>
      <div className="page-container bg-[#05060A] text-white">
        <BackgroundVideo 
          videoUrl="https://customer-assets.emergentagent.com/job_d6d3bd49-c74e-4d3c-abec-ab44adf6cddc/artifacts/apasc6v1_14683767_3840_2160_30fps.mp4" 
          overlay={true}
          blur={false}
        />

        <SectionWrapper className="relative pt-32 pb-16 px-6 lg:px-12" isHero={true}>
          <div className="max-w-5xl mx-auto">
            <motion.div
              style={{ opacity: headerOpacity }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">Experience Journey</h1>
              <p className="text-xl text-[#9CA3AF]">From insights to impact: my professional timeline</p>
            </motion.div>

            {/* Curved Timeline */}
            <div className="relative space-y-6">
              {/* SVG Curved Path */}
              <svg
                className="absolute left-8 top-0 h-full w-1 hidden lg:block"
                style={{ zIndex: 0 }}
              >
                <motion.path
                  d="M 20 0 Q 20 200, 40 400 T 20 800 Q 20 1000, 40 1200 T 20 1600"
                  stroke="#3FB5B5"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>

              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 top-8 w-8 h-8 rounded-full bg-gradient-to-br from-[#3FB5B5] to-[#4B6AFF] border-4 border-[#05060A] z-10 hidden lg:block" />

                  {/* Card */}
                  <div className="lg:ml-20 bg-[#0B0F1A]/80 backdrop-blur-md rounded-xl border border-[#3FB5B5]/20 hover:border-[#3FB5B5]/50 transition-all overflow-hidden">
                    <button
                      onClick={() => toggleCard(index)}
                      className="w-full text-left p-6 focus:outline-none"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                          <p className="text-lg text-[#3FB5B5] font-medium">{exp.company}</p>
                          <p className="text-sm text-[#9CA3AF] mt-2">{exp.period}</p>
                          <p className="text-[#F5F5F7] mt-4">{exp.description}</p>
                        </div>
                        <div className="text-[#3FB5B5]">
                          {openIndex === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                        </div>
                      </div>
                    </button>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 border-t border-[#3FB5B5]/20">
                            <ul className="space-y-2 mt-4">
                              {exp.details.map((detail, idx) => (
                                <li key={idx} className="text-[#F5F5F7] flex items-start gap-2">
                                  <span className="text-[#3FB5B5] mt-1">→</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </PageTransition>
  );
}
