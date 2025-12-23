import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function MetricCard({ value, label, suffix = '', icon: Icon, delay = 0 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      
      const duration = 2000;
      const startTime = Date.now();
      const startValue = 0;
      const endValue = parseFloat(value);
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        
        const current = startValue + (endValue - startValue) * eased;
        setDisplayValue(current);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(endValue);
        }
      };
      
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, delay);
    }
  }, [isInView, value, delay]);

  const formatValue = (val) => {
    if (Number.isInteger(parseFloat(value))) {
      return Math.round(val);
    }
    return val.toFixed(1);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000, ease: "easeOut" }}
      className="metric-card group"
    >
      {/* Metallic reflection overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#465969]/0 to-[#303F4C]/0 group-hover:from-[#465969]/10 group-hover:to-[#303F4C]/5 transition-all duration-500 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          {Icon && (
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#303F4C] to-[#465969] border border-[#5D7386]/30 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#90AABA]/10 transition-all">
              <Icon size={20} className="text-[#90AABA]" />
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl md:text-5xl font-bold text-[#B7CBD7] tracking-tight">
              {formatValue(displayValue)}
            </span>
            {suffix && (
              <span className="text-xl text-[#90AABA] font-medium">{suffix}</span>
            )}
          </div>
          <p className="text-[#5D7386] text-sm mt-2 uppercase tracking-wider">{label}</p>
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#5D7386]/30 to-transparent group-hover:via-[#90AABA]/50 transition-all" />
    </motion.div>
  );
}
