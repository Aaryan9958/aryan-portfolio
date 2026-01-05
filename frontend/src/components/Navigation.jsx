import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import JSON data
import siteData from '../content/site.json';
import homeData from '../content/home.json';

// Elegant signature with metallic styling
function NavbarSignature({ name }) {
  return (
    <div className="flex items-center relative">
      <motion.span
        className="text-[26px] md:text-[30px] text-[#B7CBD7]"
        style={{ 
          fontFamily: "'Great Vibes', cursive",
          letterSpacing: '1px',
          textShadow: '0 0 30px rgba(144, 170, 186, 0.3)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {(name || 'Portfolio').split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.15, 
              delay: i * 0.08,
              ease: "easeOut"
            }}
            style={{ display: 'inline-block' }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </div>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Get navigation data from JSON
  const navLinks = siteData.navigation || [
    { path: '/', label: 'Home' },
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];
  
  // Get name from home.json for signature
  const heroName = homeData.hero?.name || 'Portfolio';

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#0A1016] via-[#0A1016]/95 to-transparent backdrop-blur-xl border-b border-[#303F4C]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Signature Logo */}
          <Link to="/" className="relative group flex items-center">
            <NavbarSignature name={heroName} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#90AABA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl pointer-events-none" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors relative group ${
                  isActive(link.path) ? 'text-[#B7CBD7]' : 'text-[#5D7386] hover:text-[#90AABA]'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-[#5D7386] to-[#90AABA] transition-all ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#90AABA] hover:text-[#B7CBD7] transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A1016]/98 backdrop-blur-xl border-t border-[#303F4C]/30 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm font-medium tracking-wide transition-colors ${
                    isActive(link.path) ? 'text-[#B7CBD7]' : 'text-[#5D7386] hover:text-[#90AABA]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
