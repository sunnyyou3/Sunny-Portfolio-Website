// Portfolio section animation variants
// Extracted from:
//   - src/features/portfolio/PortfolioMenu.js (itemVariants)
//   - src/features/portfolio/ProjectsSection.js (fadeUp, cardVariants)
//   - src/features/portfolio/AboutSection.js (containerVariants, itemVariants)
//   - src/features/portfolio/CareerSection.js (containerVariants, itemVariants)

import { ease } from './easings';

export { ease };

// PortfolioMenu item variants
export const menuItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      delay: 0.2 + i * 0.08,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

// ProjectsSection variants
export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease,
      delay: Math.min(index * 0.08, 0.4),
    },
  }),
};

// AboutSection / CareerSection container variants
export const sectionContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 },
  },
};

// AboutSection / CareerSection item variants
export const sectionItemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};
