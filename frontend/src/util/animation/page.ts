export const FRAMER_PAGE_TRANSITION = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
  },
  transition: {
    duration: 0.35,
    ease: 'easeOut',
  },
};

export const FRAMER_PRODUCT_FADE = {
  initial: {
    opacity: 0.3,
    scale: 0.95,
  },
  whileInView: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    duration: 0.2,
    type: 'spring',
    damping: 12,
    stiffness: 150,
  },
};
