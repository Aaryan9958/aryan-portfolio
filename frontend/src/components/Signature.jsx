"use client";

import { motion } from "framer-motion";

export default function Signature() {
  // Path for "Aryan Bansal" - elegant cursive handwritten signature
  // Based on reference: tall looping A, flowing r-y-a-n, space, B-a-n-s-a-l
  const signaturePath = `
    M 8 68
    Q 10 58, 14 38
    Q 18 18, 26 12
    Q 34 6, 38 18
    Q 42 30, 44 48
    L 46 62
    Q 48 68, 52 64
    Q 54 60, 52 52
    Q 50 44, 54 40
    Q 60 36, 66 42
    Q 70 48, 68 56
    Q 66 62, 60 62
    L 70 42
    Q 74 34, 82 38
    Q 88 42, 86 52
    Q 84 62, 80 74
    Q 76 86, 68 90
    Q 58 94, 56 84
    Q 54 74, 64 66
    L 78 58
    Q 84 54, 90 54
    Q 96 54, 98 60
    Q 100 66, 94 68
    Q 88 70, 92 62
    L 100 48
    Q 104 40, 112 42
    Q 118 44, 116 54
    Q 114 62, 118 58
    L 126 44
    Q 130 38, 138 42
    Q 144 46, 140 56
    L 138 64
    M 160 28
    L 160 66
    Q 160 72, 166 66
    Q 172 58, 178 56
    Q 186 54, 190 60
    Q 194 66, 188 70
    Q 180 74, 176 68
    Q 172 62, 180 58
    L 192 54
    Q 198 52, 204 56
    Q 210 60, 206 66
    Q 202 72, 196 68
    L 210 52
    Q 216 44, 224 48
    Q 230 52, 228 60
    Q 226 68, 232 64
    L 240 50
    Q 244 44, 252 48
    Q 258 52, 254 62
    Q 250 70, 256 66
    L 264 52
    Q 268 46, 276 50
    Q 282 54, 278 64
    L 276 70
  `;

  return (
    <div className="inline-block">
      <motion.svg
        viewBox="0 0 300 100"
        className="h-12 w-[200px] md:h-14 md:w-[240px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.path
          d={signaturePath}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ 
            pathLength: { duration: 2.5, ease: "easeInOut" },
            opacity: { duration: 0.3 }
          }}
        />
      </motion.svg>
    </div>
  );
}