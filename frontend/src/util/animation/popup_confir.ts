export const FRAMER_CONFIR = {
  initial: {
    y: '100%',
    scale: 0.95,
  },
  animate: {
    y: '0%',
    scale: 1,
  },
  exit: {
    y: '-100%',
    scale: 0.95,
  },
  transition: {
    duration: 0.35,
    ease: 'easeOut',
  },
};

export const FRAMER_CONFIR_BACKGROUND = {
  initial: {
    opacity: 0.8,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0.8,
  },
  transition: {
    duration: 0.35,
    ease: 'easeOut',
  },
};

export const FRAMER_POPUP = {
  initial: {
    opacity: 0,
    y: '50px',
  },
  animate: {
    opacity: 1,
    y: '0',
  },
  exit: {
    opacity: 0,
  },
  transition: {
    duration: 0.35,
    type: 'spring',
    stiffness: 150,
    damping: 10,
  },
};
