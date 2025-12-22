import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Database, Code, BarChart3, Brain } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import BackgroundVideo from '../components/BackgroundVideo';
import PageTransition from '../components/PageTransition';
import CinematicScroll from '../components/CinematicScroll';
import CinematicSection from '../components/CinematicSection';
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

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <BackgroundVideo 
        videoUrl="https://customer-assets.emergentagent.com/job_d6d3bd49-c74e-4d3c-abec-ab44adf6cddc/artifacts/apasc6v1_14683767_3840_2160_30fps.mp4" 
        overlay={true}
        blur={false}
      />
      
      <CinematicScroll>
        {/* Hero Section */}
        <CinematicSection>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headshot */}
            <div className="flex flex-col items-center lg:items-start gap-6">
              <div className="relative">
                <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#2DD4BF]/10">
                  <img
                    src="https://customer-assets.emergentagent.com/job_d6d3bd49-c74e-4d3c-abec-ab44adf6cddc/artifacts/g8lohof5_image.png"
                    alt="Aryan Bansal"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Aryan Bansal
                </h1>
                <p className="text-xl lg:text-2xl text-[#2DD4BF] font-medium">
                  Business Analyst | SQL | Python | Tableau | Turning data into decisions.
                </p>
              </div>

              <div className="glass-card rounded-xl p-6">
                <p className="text-lg text-white/90 leading-relaxed">
                  <span className="font-semibold text-white">MS in Business Analytics</span>, Simon Business School (Dec 2025)
                </p>
                <p className="text-md text-white/60 mt-2">
                  Merit Scholarship | Advanced Certificate in AI (In Progress)
                </p>
              </div>

              <p className="text-lg text-white/80 leading-relaxed">
                Ever feel like your data is trying to tell you something? I do. With SQL, Python, and a strong cup of coffee, I dive into messy datasets to find the 'aha!' moments that help teams make smarter moves.
              </p>

              <div className="pt-4">
                <div className="glass-card rounded-xl p-6">
                  <p className="text-xl font-semibold text-white mb-4">
                    If your business needs clarity, speed, and data that finally makes sense — let's talk.
                  </p>
                  <Link to="/contact">
                    <Button className="bg-gradient-to-r from-[#2DD4BF] to-[#22D3EE] hover:opacity-90 text-black font-semibold px-8 py-6 text-lg group border-0">
                      Get in Touch
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CinematicSection>

        {/* Skills Chart Section */}
        <CinematicSection>
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Years of Experience</h2>
            <p className="text-lg text-white/60">Skills developed through hands-on projects and real-world impact</p>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={skillsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.4)" style={{ fontSize: '14px' }} />
                <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.4)" width={220} style={{ fontSize: '14px' }} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(0, 0, 0, 0.9)', 
                    border: '1px solid rgba(45, 212, 191, 0.2)', 
                    borderRadius: '12px',
                    color: '#ffffff',
                    backdropFilter: 'blur(20px)'
                  }} 
                />
                <Bar dataKey="years" fill="url(#colorGradient)" radius={[0, 8, 8, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2DD4BF" />
                    <stop offset="100%" stopColor="#22D3EE" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CinematicSection>

        {/* Skill Categories */}
        <CinematicSection>
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Skill Categories</h2>
            <p className="text-lg text-white/60">Comprehensive expertise across analytics, tools, and strategy</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.4, ease: "easeOut" }}
                  className="glass-card rounded-xl p-8 hover:border-white/20 transition-all group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2DD4BF]/20 to-[#22D3EE]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={28} className="text-[#2DD4BF]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {category.skills.map((skill, idx) => (
                      <li key={idx} className="text-white/80 flex items-start gap-2 text-sm">
                        <span className="text-[#2DD4BF] mt-1">•</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </CinematicSection>
      </CinematicScroll>
    </PageTransition>
  );
}
