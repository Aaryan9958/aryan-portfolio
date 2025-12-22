import { motion } from 'framer-motion';

export default function CinematicSection({ 
  children, 
  className = '', 
  backgroundImage = null,
  isLastSection = false 
}) {
  return (
    <div className={`relative w-full h-screen flex items-center justify-center ${className}`}>
      {/* Background image layer (faint, behind dark glass effect) */}
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-[0.06] pointer-events-none"
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
              filter: 'blur(2px) grayscale(30%)',
            }}
          />
          {/* Red-tinted glass overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(30, 10, 20, 0.7) 0%, rgba(10, 10, 15, 0.9) 100%)',
            }}
          />
        </>
      )}
      
      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(5, 5, 8, 0.5) 100%)',
        }}
      />
      
      {/* Ambient glow effects - Red/Magenta theme */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-rose-500/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-pink-500/[0.04] rounded-full blur-[140px]" />
      </div>

      {/* Subtle spotlight from top */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(225, 29, 72, 0.03) 0%, transparent 50%)',
        }}
      />

      {/* Foreground content */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 lg:px-12 overflow-y-auto card-scroll pt-24 pb-8"
      >
        {children}
      </motion.div>
    </div>
  );
}
