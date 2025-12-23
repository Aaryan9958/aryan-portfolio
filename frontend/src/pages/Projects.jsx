import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import PageTransition from '../components/PageTransition';
import Footer from '../components/Footer';

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
      <div className="min-h-screen text-white relative overflow-x-hidden">
        {/* Metallic background */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            background: 'linear-gradient(180deg, #0A1016 0%, #1C2731 50%, #0A1016 100%)',
          }}
        />
        
        {/* Subtle AI backdrop */}
        <div 
          className="fixed inset-0 z-0 opacity-[0.02]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1920&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(3px) grayscale(100%)',
          }}
        />
        
        {/* Ambient glow */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(144, 170, 186, 0.04) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255, 51, 102, 0.02) 0%, transparent 40%)',
          }}
        />

        <div className="relative z-10 pt-32 pb-12 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#B7CBD7] mb-4">Featured Projects</h1>
              <p className="text-lg md:text-xl text-[#758DA1]">Real-world analytics delivering measurable impact</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -8 }}
                  className="glass-card rounded-xl p-6 lg:p-8 group"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#465969]/0 to-[#303F4C]/0 group-hover:from-[#465969]/10 group-hover:to-[#303F4C]/5 transition-all duration-500 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <h3 className="text-xl lg:text-2xl font-bold text-[#B7CBD7] mb-4 group-hover:text-[#90AABA] transition-colors">{project.title}</h3>
                    <p className="text-[#758DA1] leading-relaxed mb-6 text-sm lg:text-base">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="tag">
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
                        <Button className="bg-gradient-to-r from-[#303F4C] to-[#465969] hover:from-[#465969] hover:to-[#5D7386] text-[#B7CBD7] font-semibold flex items-center gap-2 border border-[#5D7386]/30 shadow-lg shadow-[#0A1016]/50">
                          <Github size={18} />
                          View on GitHub
                        </Button>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="text-center mt-16"
            >
              <p className="text-base lg:text-lg text-[#758DA1] mb-6">
                Want to see more? Check out my GitHub profile for additional projects and code samples.
              </p>
              <a
                href="https://github.com/Aaryan9958"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-transparent hover:bg-[#303F4C]/50 text-[#B7CBD7] font-semibold px-8 py-6 text-lg border border-[#465969]/50 hover:border-[#5D7386] flex items-center gap-2 mx-auto transition-all">
                  <ExternalLink size={20} />
                  Visit GitHub Profile
                </Button>
              </a>
            </motion.div>

            <div className="mt-20">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
