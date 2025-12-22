import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Compact signature for navbar
function NavbarSignature() {
  return (
    <motion.svg
      viewBox="0 0 500 120"
      className="h-10 w-auto"
      initial={{ strokeDasharray: 1500, strokeDashoffset: 1500 }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 2.8, ease: "easeInOut" }}
    >
      <motion.path
        d="M 30 70 
           Q 32 50, 35 60 L 38 72 L 40 68
           M 45 55 Q 47 48, 50 58 Q 52 65, 54 60 L 56 70
           M 60 68 Q 62 58, 65 68 L 67 75 Q 68 70, 70 65 L 72 72
           M 78 55 Q 80 48, 83 58 Q 85 68, 87 60 L 89 68
           M 94 52 Q 96 45, 99 55 Q 101 65, 103 58 L 105 68 L 106 72
           M 115 70 Q 117 62, 120 68 L 122 75 Q 124 68, 126 62
           M 132 55 Q 134 48, 137 58 Q 139 68, 141 60 L 143 70
           M 148 50 Q 150 42, 153 52 Q 155 62, 157 55 L 159 65 L 160 70
           M 166 55 Q 168 48, 171 58 Q 173 68, 175 60 L 177 68
           M 182 52 Q 184 45, 187 55 Q 189 65, 191 58 L 193 68
           M 198 50 Q 200 43, 203 53 Q 205 63, 207 56 L 209 66 L 210 72
           M 216 55 Q 218 48, 221 58 Q 223 68, 225 60 L 227 70
           C 235 72, 245 68, 255 65
           Q 265 62, 275 68
           C 285 74, 295 70, 305 65
           Q 315 60, 325 66
           C 335 72, 345 68, 355 62
           Q 365 56, 375 62
           C 385 68, 395 64, 405 58
           Q 415 52, 425 58
           C 435 64, 445 60, 455 55
           Q 465 50, 475 54
           L 485 56"
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
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