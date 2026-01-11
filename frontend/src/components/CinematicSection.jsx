import { motion } from 'framer-motion';

export default function CinematicSection({ 
  children, 
  className = '', 
  backgroundImage = null,
  isLastSection = false 
}) {
  return (
    <div className={`relative w-full min-h-screen md:h-screen flex items-center justify-center ${className}`}>
      {/* Background image layer (faint, behind metallic glass) */}
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-[0.04] pointer-events-none"
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
              filter: 'blur(2px) grayscale(40%)',
            }}
          />
          {/* Metallic glass overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(28, 39, 49, 0.7) 0%, rgba(10, 16, 22, 0.9) 100%)',
            }}
          />
        </>
      )}
      
      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(10, 16, 22, 0.5) 100%)',
        }}
      />
      
      {/* Ambient metallic glow effects */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#5D7386]/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#90AABA]/[0.03] rounded-full blur-[140px]" />
        {/* Subtle magenta accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#FF3366]/[0.02] rounded-full blur-[150px]" />
      </div>

      {/* Metallic spotlight from top */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(144, 170, 186, 0.03) 0%, transparent 50%)',
        }}
      />

      {/* Foreground content - mobile-friendly with safe area padding */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-20 w-full h-full max-w-7xl mx-auto px-4 md:px-6 lg:px-12 overflow-y-auto card-scroll pt-20 md:pt-24 pb-safe"
        style={{
          paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 2rem))',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
