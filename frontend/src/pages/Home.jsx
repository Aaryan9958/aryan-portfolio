import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Database, Code, BarChart3, Brain, Briefcase, Target, TrendingUp, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import CinematicScroll from '../components/CinematicScroll';
import CinematicSection from '../components/CinematicSection';
import MetricCard from '../components/MetricCard';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';

const skillsData = [
  { name: 'SQL', years: 2 },
  { name: 'Python', years: 2 },
  { name: 'Tableau/Power BI', years: 2 },
  { name: 'Predictive & Causal Analytics', years: 1.5 },
  { name: 'A/B Testing', years: 1 },
  { name: 'Market & Strategy Analytics', years: 3 },
  { name: 'Segmentation (PCA, K-means)', years: 1 },
];

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

// Metric data for the cards
const metrics = [
  { value: 4, label: 'Projects Completed', icon: Briefcase, suffix: '+' },
  { value: 500, label: 'Data Points Analyzed', icon: Target, suffix: 'K+' },
  { value: 25, label: 'Revenue Impact', icon: TrendingUp, suffix: '%' },
  { value: 25, label: 'Team Members Led', icon: Users, suffix: '' },
];

// Background images for slides (analytics-themed, faint)
const slideBackgrounds = {
  hero: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80', // Dashboard
  skills: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1920&q=80', // Data charts
  categories: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80', // Code/analytics
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
            {/* Hero Grid - Centered */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full max-w-6xl mx-auto">
              {/* Left: Headshot - Moved higher and centered */}
              <div className="flex flex-col items-center lg:items-center order-1 lg:order-1">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative"
                >
                  {/* Glow behind image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/30 to-pink-500/20 rounded-2xl blur-3xl scale-110" />
                  
                  <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border border-rose-500/20 shadow-2xl shadow-rose-500/10">
                    <img
                      src="https://customer-assets.emergentagent.com/job_d6d3bd49-c74e-4d3c-abec-ab44adf6cddc/artifacts/g8lohof5_image.png"
                      alt="Aryan Bansal"
                      className="w-full h-full object-cover"
                    />
                    {/* Subtle overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-rose-950/20 to-transparent" />
                  </div>
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
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Aryan Bansal
                  </h1>
                  <p className="text-lg md:text-xl text-rose-400 font-medium">
                    Business Analyst | SQL | Python | Tableau | Turning data into decisions.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="glass-card rounded-xl p-5"
                >
                  <p className="text-base text-white/90 leading-relaxed">
                    <span className="font-semibold text-white">MS in Business Analytics</span>, Simon Business School (Dec 2025)
                  </p>
                  <p className="text-sm text-white/50 mt-1">
                    Merit Scholarship | Advanced Certificate in AI (In Progress)
                  </p>
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-base text-white/70 leading-relaxed"
                >
                  Ever feel like your data is trying to tell you something? I do. With SQL, Python, and a strong cup of coffee, I dive into messy datasets to find the 'aha!' moments that help teams make smarter moves.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="pt-2"
                >
                  <Link to="/contact">
                    <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold px-8 py-5 text-base group border-0 shadow-lg shadow-rose-500/20">
                      Get in Touch
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Metric Cards - Below Hero */}
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
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Years of Experience</h2>
              <p className="text-base text-white/50">Skills developed through hands-on projects and real-world impact</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6 w-full max-w-4xl"
            >
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={skillsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" stroke="rgba(255,255,255,0.4)" style={{ fontSize: '12px' }} />
                  <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.4)" width={180} style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(15, 10, 20, 0.95)', 
                      border: '1px solid rgba(225, 29, 72, 0.3)', 
                      borderRadius: '12px',
                      color: '#ffffff',
                      backdropFilter: 'blur(20px)'
                    }} 
                  />
                  <Bar dataKey="years" fill="url(#redGradient)" radius={[0, 8, 8, 0]} />
                  <defs>
                    <linearGradient id="redGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#E11D48" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </CinematicSection>

        {/* Skill Categories + Footer Section (Last slide) */}
        <CinematicSection backgroundImage={slideBackgrounds.categories} isLastSection={true}>
          <div className="flex flex-col min-h-[80vh]">
            <div className="flex-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Skill Categories</h2>
                <p className="text-base text-white/50">Comprehensive expertise across analytics, tools, and strategy</p>
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
                      className="glass-card rounded-xl p-6 hover:border-rose-500/30 transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon size={24} className="text-rose-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{category.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {category.skills.map((skill, idx) => (
                          <li key={idx} className="text-white/70 flex items-start gap-2 text-sm">
                            <span className="text-rose-400 mt-0.5">•</span>
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            {/* Footer embedded in last slide */}
            <div className="mt-16">
              <Footer />
            </div>
          </div>
        </CinematicSection>
      </CinematicScroll>
    </PageTransition>
  );
}
