import { motion } from 'framer-motion';

export default function CinematicSection({ children, className = '', parallaxLayers = null }) {
  return (
    <div className={`relative w-full h-screen flex items-center justify-center pt-20 ${className}`}>
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/60 pointer-events-none z-5" />
      
      {/* Background layer with slower parallax */}
      {parallaxLayers?.background && (
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          {parallaxLayers.background}
        </motion.div>
      )}

      {/* Midground layer */}
      {parallaxLayers?.midground && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="absolute inset-0 z-10"
        >
          {parallaxLayers.midground}
        </motion.div>
      )}

      {/* Foreground content with faster animation */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12"
      >
        {children}
      </motion.div>

      {/* Refined ambient glow effects */}
      <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#2DD4BF]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#22D3EE]/6 rounded-full blur-[140px]" />
      </div>

      {/* Subtle spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-white/[0.02] via-transparent to-transparent pointer-events-none z-5" />
    </div>
  );
}
