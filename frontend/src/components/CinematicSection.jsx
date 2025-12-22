import { motion } from 'framer-motion';

export default function CinematicSection({ children, className = '', parallaxLayers = null }) {
  return (
    <div className={`relative w-full h-screen flex items-center justify-center ${className}`}>
      {/* Background layer with slower parallax */}
      {parallaxLayers?.background && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          {parallaxLayers.background}
        </motion.div>
      )}

      {/* Midground layer */}
      {parallaxLayers?.midground && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="absolute inset-0 z-10"
        >
          {parallaxLayers.midground}
        </motion.div>
      )}

      {/* Foreground content with faster animation */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12"
      >
        {children}
      </motion.div>

      {/* Ambient glow effect */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3FB5B5]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#4B6AFF]/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
