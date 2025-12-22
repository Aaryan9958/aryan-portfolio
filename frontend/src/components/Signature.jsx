"use client";

import { motion } from "framer-motion";

export default function Signature() {
  return (
    <div className="inline-block">
      <motion.svg
        viewBox="0 0 420 100"
        className="h-16 w-[320px] md:h-20 md:w-[420px]"
        initial={{ strokeDasharray: 1200, strokeDashoffset: 1200 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2.8, ease: "easeInOut" }}
      >
        <motion.path
          // Cursive autograph-style path for "Aryan Bansal" with flourish
          d="M 25 65 
             Q 30 45, 35 55 Q 38 62, 42 55 Q 45 48, 48 60 L 50 65
             M 55 50 Q 58 45, 62 52 Q 65 58, 68 52 L 70 60
             M 75 48 Q 78 42, 82 50 Q 85 58, 88 52 Q 90 48, 92 58 L 94 65
             M 100 55 Q 103 48, 107 55 Q 110 62, 113 55 L 115 58
             M 120 50 Q 123 45, 127 52 Q 130 58, 133 52 Q 135 48, 138 60
             M 150 65 Q 152 58, 155 62 Q 158 68, 160 62
             M 165 50 Q 168 45, 172 52 Q 175 58, 178 52 Q 180 48, 183 58
             M 188 50 Q 191 45, 195 52 Q 198 58, 201 52 L 203 60
             M 208 48 Q 211 42, 215 50 Q 218 58, 221 52 Q 223 48, 226 60
             M 231 55 Q 234 48, 238 55 Q 241 62, 244 55 L 246 58
             M 251 52 Q 254 45, 258 52 Q 261 58, 264 52 Q 266 48, 269 60 L 271 65
             C 280 68, 290 62, 300 58
             Q 310 54, 320 60
             Q 330 66, 340 58
             Q 350 50, 360 55
             Q 370 60, 380 52
             Q 390 44, 400 50"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  );
}