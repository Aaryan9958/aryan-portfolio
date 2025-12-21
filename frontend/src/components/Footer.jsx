import { Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05060A] border-t border-[#0B0F1A] py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Quick Links */}
          <div className="flex items-center gap-6">
            <a href="/" className="text-[#9CA3AF] hover:text-white transition-colors">
              Home
            </a>
            <a href="/experience" className="text-[#9CA3AF] hover:text-white transition-colors">
              Experience
            </a>
            <a href="/projects" className="text-[#9CA3AF] hover:text-white transition-colors">
              Projects
            </a>
            <a href="/contact" className="text-[#9CA3AF] hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/aryan-bansal9/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-[#0B0F1A] hover:bg-[#3FB5B5] text-[#9CA3AF] hover:text-[#05060A] flex items-center justify-center transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/Aaryan9958"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-[#0B0F1A] hover:bg-[#3FB5B5] text-[#9CA3AF] hover:text-[#05060A] flex items-center justify-center transition-all"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="mailto:aryan.bansal@simon.rochester.edu"
              className="w-10 h-10 rounded-lg bg-[#0B0F1A] hover:bg-[#3FB5B5] text-[#9CA3AF] hover:text-[#05060A] flex items-center justify-center transition-all"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-[#9CA3AF] text-sm">
          © {currentYear} Aryan Bansal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}