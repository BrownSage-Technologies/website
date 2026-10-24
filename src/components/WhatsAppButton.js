"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { whatsappLink } from "../content";
import { WhatsAppIcon } from "./Icons";
import { EASE, useCalmMotion } from "./motion";

export function WhatsAppButton() {
  const pathname = usePathname();
  const reduce = useCalmMotion();
  const [scrolled, setScrolled] = useState(false);
  const home = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const show = !home || scrolled;
  const linkProps = {
    className: "wa-float",
    href: whatsappLink(),
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": "Chat with Brown Sage on WhatsApp",
  };

  if (reduce) {
    return show ? (
      <a {...linkProps}>
        <WhatsAppIcon />
      </a>
    ) : null;
  }

  return (
    <AnimatePresence>
      {show ? (
        <motion.a
          {...linkProps}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <WhatsAppIcon />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
