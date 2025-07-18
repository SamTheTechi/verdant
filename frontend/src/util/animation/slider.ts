export const FRAMER_SLIDER = {
  initial: {
    opacity: 0.1,
    scale: 0.95,
    x: '100%',
  },
  animate: {
    opacity: 1,
    scale: 1,
    x: '0%',
    transition: {
      duration: 0.25,
      ease: 'easeIn',
    },
  },
  exit: {
    opacity: 0.1,
    scale: 0.95,
    x: '100%',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

export const FRAMER_SLIDER_ITEM = {
  initial: {
    opacity: 0.1,
    scale: 0.6,
  },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
};
