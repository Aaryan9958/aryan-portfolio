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

// Import JSON data
import homeData from '../content/home.json';

// Icon mapping for dynamic icon rendering
const iconMap = {
  Briefcase,
  Target,
  TrendingUp,
  Users,
  Brain,
  Code,
  BarChart3,
  Database,
};

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Destructure data from JSON with defaults
  const { hero, media, kpiCards, skillCategories, slides } = homeData;
  
  // Map KPI cards with icons
  const metricsWithIcons = kpiCards?.map(card => ({
    ...card,
    icon: iconMap[card.icon] || Briefcase,
  })) || [];

  // Map skill categories with icons
  const categoriesWithIcons = skillCategories?.map(category => ({
    ...category,
    icon: iconMap[category.icon] || Brain,
  })) || [];

  return (
    <PageTransition>
      <CinematicScroll>
        {/* Hero Section */}
        <CinematicSection backgroundImage={slides?.backgrounds?.hero}>
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            {/* Hero grid - adjusted for better alignment */}
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-8 items-start w-full max-w-6xl mx-auto">
              {/* Left: Headshot with metallic frame - adjusted positioning */}
              <div className="flex flex-col items-center lg:items-end lg:justify-start order-1 lg:order-1 lg:pr-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative lg:-mt-2"
                >
                  {/* Metallic glow behind image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5D7386]/30 to-[#90AABA]/20 rounded-2xl blur-3xl scale-110" />
                  
                  {/* Metal panel frame - responsive sizing */}
                  <div className="relative p-1 rounded-2xl bg-gradient-to-br from-[#465969] via-[#5D7386] to-[#465969]">
                    <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[340px] md:h-[340px] lg:w-[360px] lg:h-[360px] xl:w-[380px] xl:h-[380px] rounded-xl overflow-hidden bg-[#1C2731]">
                      <img
                        src={media?.headshot || ''}
                        alt={media?.headshotAlt || hero?.name || 'Profile Photo'}
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

              {/* Right: Info - aligned to start */}
              <div className="space-y-5 order-2 lg:order-2 text-center lg:text-left lg:pt-2">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-3"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#B7CBD7] leading-tight">
                    {hero?.name || 'Name'}
                  </h1>
                  <p className="text-lg md:text-xl text-[#90AABA] font-medium">
                    {hero?.subheadline || ''} | {hero?.headline || ''}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="glass-card rounded-xl p-5"
                >
                  <p className="text-base text-[#B7CBD7] leading-relaxed">
                    <span className="font-semibold">{hero?.education?.degree}</span>, {hero?.education?.school} ({hero?.education?.graduationDate})
                  </p>
                  <p className="text-sm text-[#5D7386] mt-1">
                    {hero?.education?.highlights?.join(' | ')}
                  </p>
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-base text-[#758DA1] leading-relaxed"
                >
                  {hero?.bio || ''}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="pt-2"
                >
                  <Link to={hero?.ctaButton?.link || '/contact'}>
                    <Button className="bg-gradient-to-r from-[#303F4C] to-[#465969] hover:from-[#465969] hover:to-[#5D7386] text-[#B7CBD7] font-semibold px-8 py-5 text-base group border border-[#5D7386]/30 shadow-lg shadow-[#0A1016]/50 hover:shadow-[#90AABA]/10">
                      {hero?.ctaButton?.text || 'Get in Touch'}
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
                {metricsWithIcons.map((metric, index) => (
                  <MetricCard
                    key={metric.id || index}
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
        <CinematicSection backgroundImage={slides?.backgrounds?.skills}>
          <div className="flex flex-col items-center justify-center min-h-[70vh] md:min-h-[80vh] py-4 md:py-8">
            <SkillsChart />
          </div>
        </CinematicSection>

        {/* Skill Categories + Footer Section */}
        <CinematicSection backgroundImage={slides?.backgrounds?.categories} isLastSection={true}>
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
                {categoriesWithIcons.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.div
                      key={category.id || index}
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
                        {category.skills?.map((skill, idx) => (
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
