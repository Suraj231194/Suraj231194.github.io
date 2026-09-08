export const EASE = [0.22, 1, 0.36, 1];
export const EASE_OUT = EASE;

export const DURATION = {
  fast: 0.25,
  base: 0.5,
  slow: 0.8,
};

export const VIEWPORT = {
  once: true,
  amount: 0.01,
  margin: "0px 0px 25% 0px",
};

export const GRID_VARIANTS = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: EASE },
  },
};

export const revealMotion = (reduceMotion, delay = 0, distance = 24) => ({
  initial: reduceMotion ? false : { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: {
    duration: reduceMotion ? 0 : DURATION.base,
    delay: reduceMotion ? 0 : delay,
    ease: EASE_OUT,
  },
});

export const enterMotion = (reduceMotion, delay = 0, distance = 24) => ({
  initial: reduceMotion ? false : { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: reduceMotion ? 0 : DURATION.base,
    delay: reduceMotion ? 0 : delay,
    ease: EASE_OUT,
  },
});
