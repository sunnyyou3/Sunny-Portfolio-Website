// Common/shared animation variants used across multiple components

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const fadeOut = {
  initial: { opacity: 1 },
  animate: { opacity: 0 },
};

export const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 },
  },
};
