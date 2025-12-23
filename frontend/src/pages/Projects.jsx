import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import PageTransition from '../components/PageTransition';
import Footer from '../components/Footer';

// Import JSON data
import projectsData from '../content/projects.json';

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get projects from JSON, sorted by order
  const projects = (projectsData.projects || [])
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  
  const sectionTitle = projectsData.sectionTitle || 'Featured Projects';
  const sectionSubtitle = projectsData.sectionSubtitle || 'Real-world analytics delivering measurable impact';
  const ctaText = projectsData.ctaText || 'Want to see more?';
  const githubProfileUrl = projectsData.githubProfileUrl || 'https://github.com';
  const githubProfileButtonText = projectsData.githubProfileButtonText || 'Visit GitHub Profile';

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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#B7CBD7] mb-4">{sectionTitle}</h1>
              <p className="text-lg md:text-xl text-[#758DA1]">{sectionSubtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id || index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -8 }}
                  className="glass-card rounded-xl p-6 lg:p-8 group"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#465969]/0 to-[#303F4C]/0 group-hover:from-[#465969]/10 group-hover:to-[#303F4C]/5 transition-all duration-500 pointer-events-none" />
                  
                  <div className="relative z-10">
                    {/* Thumbnail if available */}
                    {project.thumbnail && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={project.thumbnail} 
                          alt={project.title}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    )}
                    
                    <h3 className="text-xl lg:text-2xl font-bold text-[#B7CBD7] mb-2 group-hover:text-[#90AABA] transition-colors">
                      {project.title}
                    </h3>
                    
                    {project.role && (
                      <p className="text-sm text-[#90AABA] mb-2">{project.role} {project.period && `• ${project.period}`}</p>
                    )}
                    
                    <p className="text-[#758DA1] leading-relaxed mb-4 text-sm lg:text-base">
                      {project.shortDescription}
                    </p>
                    
                    {/* Bullets if available */}
                    {project.bullets && project.bullets.length > 0 && (
                      <ul className="mb-4 space-y-1">
                        {project.bullets.map((bullet, idx) => (
                          <li key={idx} className="text-[#5D7386] text-xs flex items-start gap-2">
                            <span className="text-[#90AABA] mt-0.5">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(project.tags || []).map((tag, idx) => (
                        <span key={idx} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button className="bg-gradient-to-r from-[#303F4C] to-[#465969] hover:from-[#465969] hover:to-[#5D7386] text-[#B7CBD7] font-semibold flex items-center gap-2 border border-[#5D7386]/30 shadow-lg shadow-[#0A1016]/50">
                            <Github size={18} />
                            View on GitHub
                          </Button>
                        </a>
                      )}
                      {project.links?.slides && (
                        <a
                          href={project.links.slides}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#90AABA] hover:text-[#B7CBD7] transition-colors text-sm"
                        >
                          View Slides →
                        </a>
                      )}
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
                {ctaText}
              </p>
              <a
                href={githubProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-transparent hover:bg-[#303F4C]/50 text-[#B7CBD7] font-semibold px-8 py-6 text-lg border border-[#465969]/50 hover:border-[#5D7386] flex items-center gap-2 mx-auto transition-all">
                  <ExternalLink size={20} />
                  {githubProfileButtonText}
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
