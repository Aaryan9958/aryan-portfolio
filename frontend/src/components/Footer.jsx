import { motion } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
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
              Aryan Bansal
            </h3>
            <p className="text-sm text-[#5D7386]">Business Analytics Professional</p>
          </motion.div>
          
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <a
              href="https://www.linkedin.com/in/aryan-bansal9/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1C2731] border border-[#303F4C]/50 flex items-center justify-center hover:bg-[#303F4C] hover:border-[#5D7386] transition-all group"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} className="text-[#758DA1] group-hover:text-[#B7CBD7] transition-colors" />
            </a>
            <a
              href="https://github.com/Aaryan9958"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1C2731] border border-[#303F4C]/50 flex items-center justify-center hover:bg-[#303F4C] hover:border-[#5D7386] transition-all group"
              aria-label="GitHub"
            >
              <Github size={18} className="text-[#758DA1] group-hover:text-[#B7CBD7] transition-colors" />
            </a>
            <a
              href="mailto:aryan.bansal@simon.rochester.edu"
              className="w-10 h-10 rounded-full bg-[#1C2731] border border-[#303F4C]/50 flex items-center justify-center hover:bg-[#303F4C] hover:border-[#5D7386] transition-all group"
              aria-label="Email"
            >
              <Mail size={18} className="text-[#758DA1] group-hover:text-[#B7CBD7] transition-colors" />
            </a>
          </motion.div>
          
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-[#465969]"
          >
            © {currentYear} Aryan Bansal. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
