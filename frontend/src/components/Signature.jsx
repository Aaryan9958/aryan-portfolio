"use client";

import { motion } from "framer-motion";

export default function Signature() {
  // Elegant cursive "Aryan Bansal" signature
  // Inspired by the reference: tall A with loop, fluid connected letters
  
  return (
    <div className="inline-block">
      <motion.svg
        viewBox="0 0 320 90"
        className="h-12 w-[180px] md:h-14 md:w-[220px]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Capital A - tall elegant loop going up then down */}
        <motion.path
          d={`
            M 25 72
            C 22 65, 20 50, 28 30
            C 36 10, 48 5, 52 15
            C 56 25, 50 40, 48 55
            C 46 65, 48 70, 55 68
          `}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {/* Cross stroke on A */}
        <motion.path
          d={`M 30 48 C 35 46, 45 45, 52 48`}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
        />
        {/* ryan - flowing cursive lowercase */}
        <motion.path
          d={`
            M 55 68
            C 58 60, 60 55, 64 55
            C 68 55, 70 60, 68 65
            C 66 70, 62 70, 65 62
            C 68 54, 75 52, 82 56
            C 89 60, 86 70, 82 78
            C 78 86, 70 90, 65 85
            C 60 80, 65 72, 75 68
            C 82 65, 90 62, 95 60
            C 100 58, 105 58, 108 62
            C 111 66, 108 72, 102 72
            C 96 72, 98 65, 105 58
            C 112 51, 120 50, 128 55
            C 134 60, 130 70, 125 72
          `}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeInOut", delay: 0.6 }}
        />
        {/* Bansal */}
        <motion.path
          d={`
            M 145 35
            L 145 72
            M 145 50
            C 150 45, 160 44, 166 50
            C 172 56, 168 65, 160 68
            C 152 71, 148 65, 155 58
            C 162 51, 175 50, 182 55
            C 189 60, 185 70, 178 72
            C 171 74, 175 65, 185 55
            C 192 48, 202 48, 208 54
            C 214 60, 210 70, 203 72
            C 196 74, 200 65, 210 56
            C 218 49, 228 48, 235 54
            C 242 60, 238 72, 230 74
            C 222 76, 225 66, 235 58
            C 243 52, 253 50, 260 56
            C 267 62, 263 72, 255 75
            L 252 78
          `}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 1.5 }}
        />
        {/* Subtle flourish underline */}
        <motion.path
          d={`M 30 80 C 80 82, 150 78, 220 80 C 250 81, 265 79, 270 76`}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 2.6 }}
        />
      </motion.svg>
    </div>
  );
}