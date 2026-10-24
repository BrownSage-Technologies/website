"use client";

import { motion } from "framer-motion";
import { useCalmMotion } from "./motion";

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) {
  const reduce = useCalmMotion();
  const classes = `btn btn-${variant}${className ? ` ${className}` : ""}`;
  const motionProps = {
    className: classes,
    whileTap: reduce || disabled ? undefined : { scale: 0.98 },
    transition: { duration: 0.2 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        {...motionProps}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} {...motionProps}>
      {children}
    </motion.button>
  );
}
