import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import PageTransition from '../components/PageTransition';
import SectionWrapper from '../components/SectionWrapper';

const projects = [
  {
    title: "Perry's Ice Cream — Production Line Optimization",
    description: 'Identified hidden capacity losses via regression and time-series analytics. Quantified speed–weight relationships, downtime effects, and restart penalties. Delivered operational recommendations to increase throughput.',
    tags: ['Regression', 'Time-Series', 'Operations Analytics'],
    githubUrl: 'https://github.com/Aaryan9958',
  },
  {
    title: 'Nexus Logistics — Employee Training Analytics',
    description: 'PCA + clustering to reveal learning preference groups. Built data-driven recommendations to improve training completion.',
    tags: ['PCA', 'K-Means Clustering', 'Employee Analytics'],
    githubUrl: 'https://github.com/Aaryan9958',
  },
  {
    title: 'Social Media Engagement Optimization — Lenskart',
    description: 'Power BI dashboards analyzing influencer campaigns. 500K impressions & improved reach by 15%.',
    tags: ['Power BI', 'Social Media Analytics', 'Dashboard Design'],
    githubUrl: 'https://github.com/Aaryan9958',
  },
  {
    title: 'Pricing Strategy & Market Simulation — Daily Grind',
    description: 'Built pricing model that boosted revenue and optimized margins. Implemented JIT/FIFO inventory management reducing costs by 25%.',
    tags: ['Pricing Strategy', 'Market Simulation', 'Revenue Optimization'],
    githubUrl: 'https://github.com/Aaryan9958',
  },
];

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#05060A] text-white">
        <section className="relative min-h-screen pt-32 pb-20 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-16"
            >
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">Featured Projects</h1>
            <p className="text-xl text-[#9CA3AF]">Real-world analytics delivering measurable impact</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="bg-[#0B0F1A]/80 backdrop-blur-md rounded-xl p-8 border border-[#3FB5B5]/20 hover:border-[#3FB5B5]/50 transition-all hover:shadow-xl hover:shadow-[#3FB5B5]/10"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                <p className="text-[#F5F5F7] leading-relaxed mb-6">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#3FB5B5]/20 text-[#3FB5B5] rounded-full text-sm font-medium border border-[#3FB5B5]/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-[#3FB5B5] hover:bg-[#3FB5B5]/90 text-[#05060A] font-semibold flex items-center gap-2">
                      <Github size={18} />
                      View on GitHub
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* GitHub Profile Link */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-center mt-16"
          >
            <p className="text-lg text-[#9CA3AF] mb-6">
              Want to see more? Check out my GitHub profile for additional projects and code samples.
            </p>
            <a
              href="https://github.com/Aaryan9958"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#0B0F1A] hover:bg-[#0B0F1A]/80 text-white font-semibold px-8 py-6 text-lg border border-[#3FB5B5]/30 hover:border-[#3FB5B5]/60 flex items-center gap-2 mx-auto">
                <ExternalLink size={20} />
                Visit GitHub Profile
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
      </div>
    </PageTransition>
  );
}