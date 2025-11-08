export const loaderContainer = {
  initial: { opacity: 1 },
  animate: { opacity: 0, x: -45, y: -45 , transition: { duration: 1, delay: 5 }}
};

export const letters = {
  S: { initial: { x: -1000 }, animate: { x: 0 }, transition: { duration: 2 } },
  U: { initial: { y: -1000 }, animate: { y: 0 }, transition: { duration: 4 } },
  N1: { initial: { y: 1000 }, animate: { y: 0 }, transition: { duration: 2 } },
  N2: { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 2, delay: 2 } },
  Y: { initial: { x: 1000 }, animate: { x: 0 }, transition: { duration: 2 } },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
}