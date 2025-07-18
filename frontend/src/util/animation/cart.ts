export const FRAMER_CART_ITEM = {
  initial: {
    opacity: 0.2,
  },
  whileInView: {
    opacity: 1,
    transition: {
      duration: 0.2,
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
  exit: {
    scale: 1,
    x: '-20%',
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};
