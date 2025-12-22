import { motion } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative py-12 px-6">
      {/* Gradient top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
      
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
              className="text-2xl text-white/90 mb-1"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              Aryan Bansal
            </h3>
            <p className="text-sm text-white/40">Business Analytics Professional</p>
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
              className="w-10 h-10 rounded-full bg-white/5 border border-rose-500/20 flex items-center justify-center hover:bg-rose-500/20 hover:border-rose-500/40 transition-all group"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} className="text-white/60 group-hover:text-rose-400 transition-colors" />
            </a>
            <a
              href="https://github.com/Aaryan9958"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-rose-500/20 flex items-center justify-center hover:bg-rose-500/20 hover:border-rose-500/40 transition-all group"
              aria-label="GitHub"
            >
              <Github size={18} className="text-white/60 group-hover:text-rose-400 transition-colors" />
            </a>
            <a
              href="mailto:aryan.bansal@simon.rochester.edu"
              className="w-10 h-10 rounded-full bg-white/5 border border-rose-500/20 flex items-center justify-center hover:bg-rose-500/20 hover:border-rose-500/40 transition-all group"
              aria-label="Email"
            >
              <Mail size={18} className="text-white/60 group-hover:text-rose-400 transition-colors" />
            </a>
          </motion.div>
          
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-white/30"
          >
            © {currentYear} Aryan Bansal. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
