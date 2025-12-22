"use client";

import { motion } from "framer-motion";

export default function Signature() {
  return (
    <div className="inline-block">
      <motion.svg
        viewBox="0 0 500 120"
        className="h-16 w-[340px] md:h-20 md:w-[500px]"
        initial={{ strokeDasharray: 1500, strokeDashoffset: 1500 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2.8, ease: "easeInOut" }}
      >
        <motion.path
          // Realistic cursive autograph for "Aryan Bansal" with flowing flourish
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
    </div>
  );
}