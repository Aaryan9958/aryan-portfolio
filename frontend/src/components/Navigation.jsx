import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Elegant handwritten signature with writing animation - "Aryan Bansal"
function NavbarSignature() {
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    setIsAnimated(true);
  }, []);

  // SVG paths for "Aryan Bansal" - elegant cursive handwriting
  // Path traced to match the reference signature style
  const aryanPath = `
    M 8 58 
    C 10 52, 14 25, 22 18
    C 30 11, 36 16, 38 26
    L 42 48
    C 44 56, 48 58, 52 54
    C 54 50, 52 44, 50 40
    C 48 36, 52 32, 58 34
    C 64 36, 66 44, 64 50
    L 62 54
    C 60 58, 66 52, 72 36
    C 76 26, 82 24, 86 32
    C 90 40, 86 54, 80 62
    C 74 70, 66 72, 62 66
    C 58 60, 64 52, 74 50
    L 88 46
    C 94 44, 100 46, 102 52
    C 104 58, 100 62, 94 60
    C 90 58, 94 50, 102 42
    L 114 34
    C 120 30, 128 32, 130 40
    C 132 48, 126 56, 120 56
    L 136 40
  `;
  
  const bansalPath = `
    M 152 24
    L 152 60
    M 152 36
    C 158 30, 170 30, 176 38
    C 182 46, 176 56, 168 58
    C 160 60, 158 52, 166 46
    L 184 42
    C 192 40, 200 44, 200 52
    C 200 60, 192 62, 186 58
    L 204 42
    C 212 34, 222 36, 224 44
    C 226 52, 218 60, 210 58
    L 230 44
    C 238 38, 248 40, 250 48
    C 252 56, 244 62, 236 60
    L 256 46
    C 264 40, 274 42, 276 50
    C 278 58, 270 64, 262 62
  `;

  return (
    <motion.svg
      viewBox="0 0 290 80"
      className="h-10 w-[180px] md:h-11 md:w-[200px]"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* "Aryan" */}
      <motion.path
        d={aryanPath}
        fill="none"
        stroke="#F3F4F6"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isAnimated ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      {/* "Bansal" */}
      <motion.path
        d={bansalPath}
        fill="none"
        stroke="#F3F4F6"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isAnimated ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 1.3 }}
      />
    </motion.svg>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/95 to-transparent backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Signature Logo */}
          <Link to="/" className="relative group flex items-center">
            <NavbarSignature />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl pointer-events-none" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors relative group ${
                  isActive(link.path) ? 'text-[#2DD4BF]' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-[#2DD4BF] to-transparent transition-all ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-[#2DD4BF] transition-colors p-2"
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
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm font-medium tracking-wide transition-colors ${
                    isActive(link.path) ? 'text-[#2DD4BF]' : 'text-white/60 hover:text-white'
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