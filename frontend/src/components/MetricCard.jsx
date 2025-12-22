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
      
      const duration = 2000; // 2 seconds
      const startTime = Date.now();
      const startValue = 0;
      const endValue = parseFloat(value);
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease out cubic)
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
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500/0 to-pink-500/0 group-hover:from-rose-500/10 group-hover:to-pink-500/5 transition-all duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          {Icon && (
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500/20 to-pink-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon size={20} className="text-rose-400" />
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              {formatValue(displayValue)}
            </span>
            {suffix && (
              <span className="text-xl text-rose-400 font-medium">{suffix}</span>
            )}
          </div>
          <p className="text-white/50 text-sm mt-2 uppercase tracking-wider">{label}</p>
        </div>
      </div>
      
      {/* Subtle bottom accent line */}
      <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent group-hover:via-rose-500/50 transition-all" />
    </motion.div>
  );
}
