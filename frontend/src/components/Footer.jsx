import { motion } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';

// Import JSON data
import homeData from '../content/home.json';

// Icon mapping
const iconMap = {
  Linkedin,
  Github,
  Mail,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Get footer data from JSON with defaults
  const footerData = homeData.footer || {};
  const name = footerData.name || 'Aryan Bansal';
  const title = footerData.title || 'Business Analytics Professional';
  const socialLinks = footerData.socialLinks || [];
  
  return (
    <footer className="relative py-12 px-6">
      {/* Metallic gradient top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#5D7386]/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo/Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 
              className="text-2xl text-[#B7CBD7] mb-1"
              style={{ 
                fontFamily: "'Great Vibes', cursive",
                textShadow: '0 0 20px rgba(144, 170, 186, 0.2)'
              }}
            >
              {name}
            </h3>
            <p className="text-sm text-[#5D7386]">{title}</p>
          </motion.div>
          
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link, index) => {
              const Icon = iconMap[link.icon] || Mail;
              return (
                <a
                  key={index}
                  href={link.url}
                  target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1C2731] border border-[#303F4C]/50 flex items-center justify-center hover:bg-[#303F4C] hover:border-[#5D7386] transition-all group"
                  aria-label={link.platform}
                >
                  <Icon size={18} className="text-[#758DA1] group-hover:text-[#B7CBD7] transition-colors" />
                </a>
              );
            })}
          </motion.div>
          
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-[#465969]"
          >
            © {currentYear} {name}. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
