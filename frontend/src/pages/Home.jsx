import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Database, Code, BarChart3, Brain, Briefcase, Target, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import CinematicScroll from '../components/CinematicScroll';
import CinematicSection from '../components/CinematicSection';
import MetricCard from '../components/MetricCard';
import SkillsChart from '../components/SkillsChart';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';

const skillCategories = [
  {
    title: 'Analytics',
    icon: Brain,
    skills: ['Predictive Analytics', 'Causal Inference', 'Segmentation (PCA, K-Means)', 'A/B Testing & Experimentation', 'Time-Series Analysis'],
  },
  {
    title: 'Programming & Tools',
    icon: Code,
    skills: ['Python', 'SQL', 'R', 'Tableau', 'Power BI', 'Excel (Advanced)'],
  },
  {
    title: 'Business & Strategy',
    icon: BarChart3,
    skills: ['Market Analysis', 'Pricing Strategy', 'KPI Reporting', 'Customer Segmentation', 'Dashboarding'],
  },
  {
    title: 'Soft Skills',
    icon: Database,
    skills: ['Client Communication', 'Consulting Storytelling', 'Team Collaboration', 'Leadership (25-member team management)'],
  },
];

const metrics = [
  { value: 4, label: 'Projects Completed', icon: Briefcase, suffix: '+' },
  { value: 500, label: 'Data Points Analyzed', icon: Target, suffix: 'K+' },
  { value: 25, label: 'Revenue Impact', icon: TrendingUp, suffix: '%' },
  { value: 25, label: 'Team Members Led', icon: Users, suffix: '' },
];

const slideBackgrounds = {
  hero: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80',
  skills: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1920&q=80',
  categories: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
};

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <CinematicScroll>
        {/* Hero Section */}
        <CinematicSection backgroundImage={slideBackgrounds.hero}>
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full max-w-6xl mx-auto">
              {/* Left: Headshot with metallic frame */}
              <div className="flex flex-col items-center lg:items-center order-1 lg:order-1">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative"
                >
                  {/* Metallic glow behind image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5D7386]/30 to-[#90AABA]/20 rounded-2xl blur-3xl scale-110" />
                  
                  {/* Metal panel frame */}
                  <div className="relative p-1 rounded-2xl bg-gradient-to-br from-[#465969] via-[#5D7386] to-[#465969]">
                    <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-xl overflow-hidden bg-[#1C2731]">
                      <img
                        src="https://customer-assets.emergentagent.com/job_d6d3bd49-c74e-4d3c-abec-ab44adf6cddc/artifacts/g8lohof5_image.png"
                        alt="Aryan Bansal"
                        className="w-full h-full object-cover"
                      />
                      {/* Metallic overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1016]/30 to-transparent" />
                    </div>
                  </div>
                  
                  {/* Corner accents */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#90AABA]/50" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#90AABA]/50" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#90AABA]/50" />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#90AABA]/50" />
                </motion.div>
              </div>

              {/* Right: Info */}
              <div className="space-y-5 order-2 lg:order-2 text-center lg:text-left">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-3"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#B7CBD7] leading-tight">
                    Aryan Bansal
                  </h1>
                  <p className="text-lg md:text-xl text-[#90AABA] font-medium">
                    Business Analyst | SQL | Python | Tableau | Turning data into decisions.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="glass-card rounded-xl p-5"
                >
                  <p className="text-base text-[#B7CBD7] leading-relaxed">
                    <span className="font-semibold">MS in Business Analytics</span>, Simon Business School (Dec 2025)
                  </p>
                  <p className="text-sm text-[#5D7386] mt-1">
                    Merit Scholarship | Advanced Certificate in AI (In Progress)
                  </p>
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-base text-[#758DA1] leading-relaxed"
                >
                  Ever feel like your data is trying to tell you something? I do. With SQL, Python, and a strong cup of coffee, I dive into messy datasets to find the &apos;aha!&apos; moments that help teams make smarter moves.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="pt-2"
                >
                  <Link to="/contact">
                    <Button className="bg-gradient-to-r from-[#303F4C] to-[#465969] hover:from-[#465969] hover:to-[#5D7386] text-[#B7CBD7] font-semibold px-8 py-5 text-base group border border-[#5D7386]/30 shadow-lg shadow-[#0A1016]/50 hover:shadow-[#90AABA]/10">
                      Get in Touch
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Metric Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full max-w-6xl mx-auto mt-12"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, index) => (
                  <MetricCard
                    key={index}
                    value={metric.value}
                    label={metric.label}
                    suffix={metric.suffix}
                    icon={metric.icon}
                    delay={index * 150 + 800}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </CinematicSection>

        {/* Skills Chart Section */}
        <CinematicSection backgroundImage={slideBackgrounds.skills}>
          <div className="flex flex-col items-center justify-center min-h-[80vh] py-8">
            <SkillsChart />
          </div>
        </CinematicSection>

        {/* Skill Categories + Footer Section */}
        <CinematicSection backgroundImage={slideBackgrounds.categories} isLastSection={true}>
          <div className="flex flex-col min-h-[80vh]">
            <div className="flex-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-[#B7CBD7] mb-3">Skill Categories</h2>
                <p className="text-base text-[#758DA1]">Comprehensive expertise across analytics, tools, and strategy</p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
                {skillCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                      className="glass-card rounded-xl p-6 hover:border-[#5D7386]/50 transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#303F4C] to-[#465969] border border-[#5D7386]/30 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#90AABA]/10 transition-all">
                          <Icon size={24} className="text-[#90AABA]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#B7CBD7]">{category.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {category.skills.map((skill, idx) => (
                          <li key={idx} className="text-[#758DA1] flex items-start gap-2 text-sm">
                            <span className="text-[#90AABA] mt-0.5">•</span>
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-16">
              <Footer />
            </div>
          </div>
        </CinematicSection>
      </CinematicScroll>
    </PageTransition>
  );
}
