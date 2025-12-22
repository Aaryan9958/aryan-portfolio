import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Database, Code, BarChart3, Brain } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import BackgroundVideo from '../components/BackgroundVideo';
import Signature from '../components/Signature';
import PageTransition from '../components/PageTransition';
import SectionWrapper from '../components/SectionWrapper';
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
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.98]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.7]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="page-container">
        <BackgroundVideo 
          videoUrl="https://customer-assets.emergentagent.com/job_d6d3bd49-c74e-4d3c-abec-ab44adf6cddc/artifacts/apasc6v1_14683767_3840_2160_30fps.mp4" 
          overlay={true}
          blur={false}
        />

        {/* Hero Section with Parallax */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="hero-section relative flex items-center justify-center pt-20 pb-16 px-6 lg:px-12"
        >
          <SectionWrapper className="w-full" isHero={true}>
            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headshot + Signature */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center lg:items-start gap-6"
            >
              <div className="relative">
                <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border-2 border-[#3FB5B5] shadow-2xl shadow-[#3FB5B5]/20">
                  <img
                    src="https://customer-assets.emergentagent.com/job_d6d3bd49-c74e-4d3c-abec-ab44adf6cddc/artifacts/g8lohof5_image.png"
                    alt="Aryan Bansal"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Signature overlay */}
                <div className="absolute -bottom-6 left-0 right-0 flex justify-center lg:justify-start">
                  <Signature />
                </div>
              </div>
            </motion.div>

            {/* Right: Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Aryan Bansal
                </h1>
                <p className="text-xl lg:text-2xl text-[#3FB5B5] font-medium">
                  Business Analyst | SQL | Python | Tableau | Turning data into decisions.
                </p>
              </div>

              <div className="bg-[#0B0F1A]/80 backdrop-blur-md rounded-lg p-6 border border-[#3FB5B5]/30">
                <p className="text-lg text-[#F5F5F7] leading-relaxed">
                  <span className="font-semibold text-white">MS in Business Analytics</span>, Simon Business School (Dec 2025)
                </p>
                <p className="text-md text-[#9CA3AF] mt-2">
                  Merit Scholarship | Advanced Certificate in AI (In Progress)
                </p>
              </div>

              <p className="text-lg text-[#F5F5F7] leading-relaxed">
                Ever feel like your data is trying to tell you something? I do. With SQL, Python, and a strong cup of coffee, I dive into messy datasets to find the 'aha!' moments that help teams make smarter moves. From A/B tests to segmentation models, I turn numbers into stories teams can use.
              </p>

              <div className="pt-4">
                <div className="bg-gradient-to-r from-[#3FB5B5]/20 to-[#4B6AFF]/20 rounded-lg p-6 border border-[#3FB5B5]/40">
                  <p className="text-xl font-semibold text-white mb-4">
                    If your business needs clarity, speed, and data that finally makes sense — let's talk.
                  </p>
                  <Link to="/contact">
                    <Button className="bg-[#3FB5B5] hover:bg-[#3FB5B5]/90 text-[#05060A] font-semibold px-8 py-6 text-lg group">
                      Get in Touch
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
          </SectionWrapper>
        </motion.div>

        {/* Skills Chart Section */}
        <SectionWrapper className="relative py-20 px-6 lg:px-12 bg-[#0B0F1A]/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Years of Experience</h2>
              <p className="text-lg text-[#9CA3AF]">Skills developed through hands-on projects and real-world impact</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="bg-[#05060A]/80 backdrop-blur-md rounded-xl p-8 border border-[#3FB5B5]/20"
            >
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={skillsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#0B0F1A" />
                  <XAxis type="number" stroke="#9CA3AF" />
                  <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={200} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0B0F1A', 
                      border: '1px solid #3FB5B5', 
                      borderRadius: '8px',
                      color: '#F5F5F7'
                    }} 
                  />
                  <Bar dataKey="years" fill="#3FB5B5" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </SectionWrapper>

        {/* Skill Categories */}
        <SectionWrapper className="relative py-20 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Skill Categories</h2>
              <p className="text-lg text-[#9CA3AF]">Comprehensive expertise across analytics, tools, and strategy</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {skillCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    className="bg-[#0B0F1A]/80 backdrop-blur-md rounded-xl p-8 border border-[#3FB5B5]/20 hover:border-[#3FB5B5]/50 transition-all hover:shadow-lg hover:shadow-[#3FB5B5]/10"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#3FB5B5] to-[#4B6AFF] flex items-center justify-center">
                        <Icon size={28} className="text-[#05060A]" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {category.skills.map((skill, idx) => (
                        <li key={idx} className="text-[#F5F5F7] flex items-start gap-2">
                          <span className="text-[#3FB5B5] mt-1">•</span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </PageTransition>
  );
}