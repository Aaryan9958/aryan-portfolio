import { motion } from 'framer-motion';

export default function Signature() {
  return (
    <div className="relative inline-block">
      {/* Animated stroke */}
      <motion.svg
        viewBox="0 0 300 80"
        className="absolute left-0 top-0 h-20 w-[300px]"
        initial={{ strokeDasharray: 600, strokeDashoffset: 600 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <motion.path
          d="M10 60 
             C 40 20, 80 20, 110 55
             S 170 90, 200 45
             S 260 20, 290 55"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>

      {/* Static signature text */}
      <svg viewBox="0 0 300 80" className="h-20 w-[300px]">
        <text
          x="10"
          y="55"
          className="signature-text"
          fontSize="32"
          fill="white"
        >
          Aryan Bansal
        </text>
      </svg>
    </div>
  );
}