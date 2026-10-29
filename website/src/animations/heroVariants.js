// Hero section animation variants
// Extracted from src/features/hero/Hero.js

export const imageVariants = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.2, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

export const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.12 + 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};
