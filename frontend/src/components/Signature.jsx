"use client";

import { motion } from "framer-motion";

export default function Signature() {
  return (
    <div className="inline-block">
      <motion.svg
        viewBox="0 0 420 100"
        className="h-14 w-[280px] md:h-16 md:w-[340px]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Elegant cursive signature: "Aryan Bansal" */}
        <motion.path
          d={`
            M 12 75
            C 14 72, 18 30, 28 22
            C 38 14, 42 28, 44 40
            L 48 62
            C 50 68, 52 72, 56 70
            C 60 68, 58 58, 56 52
            C 54 46, 52 42, 56 38
            C 60 34, 68 36, 72 42
            C 76 48, 74 56, 70 60
            C 66 64, 62 62, 64 56
            L 72 38
            C 74 32, 80 28, 86 32
            C 92 36, 90 46, 88 54
            L 86 62
            C 84 70, 80 78, 76 90
            C 72 102, 62 108, 54 100
            C 46 92, 52 76, 62 70
            L 78 62
            C 84 58, 90 54, 96 52
            C 102 50, 106 52, 108 58
            C 110 64, 106 70, 100 72
            C 94 74, 92 68, 96 62
            L 106 50
            C 110 44, 118 40, 124 44
            C 130 48, 128 58, 126 66
            C 124 74, 120 76, 122 70
            L 130 52
            C 134 44, 142 42, 148 46
            C 154 50, 152 60, 148 66
            L 146 70
          `}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
        {/* "Bansal" part */}
        <motion.path
          d={`
            M 168 32
            L 168 72
            M 168 42
            C 172 36, 182 34, 188 40
            C 194 46, 192 56, 186 60
            C 180 64, 172 60, 172 52
            C 172 44, 180 38, 190 42
            C 200 46, 198 58, 192 64
            C 186 70, 178 68, 176 62
            L 200 62
            C 206 62, 212 56, 214 50
            C 216 44, 218 40, 224 38
            C 230 36, 238 40, 240 48
            C 242 56, 238 64, 232 68
            C 226 72, 220 68, 222 60
            L 232 42
            C 236 36, 244 34, 252 38
            C 260 42, 258 54, 254 62
            C 250 70, 244 72, 246 66
            L 256 50
            C 260 44, 268 40, 276 44
            C 284 48, 282 60, 276 68
            C 270 76, 262 74, 262 66
            L 268 52
            C 272 44, 280 42, 288 46
            C 296 50, 294 62, 288 70
            L 284 76
          `}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 1.2 }}
        />
        {/* Elegant underline flourish */}
        <motion.path
          d={`
            M 20 82
            C 60 86, 140 78, 200 82
            C 260 86, 300 80, 320 76
            C 340 72, 350 74, 340 78
          `}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 2.6 }}
        />
      </motion.svg>
    </div>
  );
}