"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

/** Tracks the real reduced-motion setting. Framer's hook reads it once and can leave fades stuck at opacity 0. */
export function useCalmMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return reduce;
}

export function Reveal({ children, className, delay = 0 }) {
  const reduce = useCalmMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Lift({ children, className, delay = 0 }) {
  const reduce = useCalmMotion();
  const classes = className ? `lift ${className}` : "lift";
  if (reduce) return <div className={classes}>{children}</div>;
  return (
    <motion.div
      className={classes}
      initial="hidden"
      whileInView="show"
      whileHover="hover"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE, delay } },
        hover: { opacity: 1, y: -4, transition: { duration: 0.25, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
