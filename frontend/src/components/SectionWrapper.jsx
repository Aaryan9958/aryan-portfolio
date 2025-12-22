import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const sectionTransition = {
  duration: 0.6,
  ease: 'easeOut',
};

export default function SectionWrapper({ children, className = '', delay = 0 }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      transition={{ ...sectionTransition, delay }}
      className={`scroll-snap-section ${className}`}
    >
      {children}
    </motion.section>
  );
}
