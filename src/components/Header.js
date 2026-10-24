"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { nav, whatsappLink } from "../content";
import { Button } from "./Button";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./Icons";
import { EASE, useCalmMotion } from "./motion";

export function Header() {
  const pathname = usePathname();
  const reduce = useCalmMotion();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function onNavClick(href) {
    setOpen(false);
    if (pathname === "/" && href.startsWith("/#") && window.location.hash === href.slice(1)) {
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  }

  function isCurrent(href) {
    return href.startsWith("/products") && (pathname === "/products" || pathname === "/products/");
  }

  return (
    <header id="top" className={solid || open ? "header is-solid" : "header"}>
      <div className="header-bar wrap">
        <a className="brand" href="/" aria-label="Brown Sage, home">
          <img src="/images/logo-mark.png" alt="" width="28" height="36" />
          <span className="brand-name">BrownSage</span>
        </a>

        <nav className="desk-nav" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              onClick={() => onNavClick(item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="icon-btn" href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Brown Sage">
            <WhatsAppIcon />
          </a>
          <Button className="header-cta" href="/#contact">
            Talk to Us
          </Button>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          reduce ? (
            <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  onClick={() => onNavClick(item.href)}
                >
                  {item.label}
                </a>
              ))}
              <Button href="/#contact" onClick={() => setOpen(false)}>
                Talk to Us
              </Button>
            </nav>
          ) : (
            <motion.nav
              id="mobile-nav"
              className="mobile-nav"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  onClick={() => onNavClick(item.href)}
                >
                  {item.label}
                </a>
              ))}
              <Button href="/#contact" onClick={() => setOpen(false)}>
                Talk to Us
              </Button>
            </motion.nav>
          )
        ) : null}
      </AnimatePresence>
    </header>
  );
}
