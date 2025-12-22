"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Signature() {
  const textRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);

  return (
    <div className="inline-block">
      <motion.svg
        viewBox="0 0 280 80"
        className="h-10 w-[160px] md:h-12 md:w-[200px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <style>
            {`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');`}
          </style>
        </defs>
        
        {/* Text rendered as stroke for signature writing effect */}
        <motion.text
          x="10"
          y="55"
          fill="none"
          stroke="#F3F4F6"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "42px",
            fontWeight: 400,
          }}
          initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        >
          Aryan Bansal
        </motion.text>
        
        {/* Fill animation comes after stroke */}
        <motion.text
          x="10"
          y="55"
          fill="#F3F4F6"
          stroke="none"
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "42px",
            fontWeight: 400,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.3, ease: "easeOut" }}
        >
          Aryan Bansal
        </motion.text>
      </motion.svg>
    </div>
  );
}