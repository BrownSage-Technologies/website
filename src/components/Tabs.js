"use client";

import { motion } from "framer-motion";
import { EASE, useCalmMotion } from "./motion";

export function Tabs({ tabs, active, onChange, layoutId, label, labelledBy, variant = "text" }) {
  const reduce = useCalmMotion();

  function move(direction) {
    const index = tabs.findIndex((tab) => tab.id === active);
    const next = tabs[(index + direction + tabs.length) % tabs.length];
    onChange(next.id);
    requestAnimationFrame(() => {
      document.getElementById(`tab-${layoutId}-${next.id}`)?.focus();
    });
  }

  return (
    <div
      className={`tabs tabs-${variant}`}
      role="tablist"
      aria-label={label}
      aria-labelledby={labelledBy}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          move(1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          move(-1);
        }
      }}
    >
      {tabs.map((tab) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${layoutId}-${tab.id}`}
            aria-selected={selected}
            aria-controls={`panel-${layoutId}-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            className={selected ? "tab is-active" : "tab"}
            onClick={() => onChange(tab.id)}
          >
            <span className="tab-label">{tab.label}</span>
            {tab.subline ? <span className="tab-sub">{tab.subline}</span> : null}
            {selected ? (
              <motion.span
                layoutId={layoutId}
                className="tab-line"
                transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE }}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({ layoutId, active, children }) {
  const reduce = useCalmMotion();
  if (reduce) {
    return (
      <div
        role="tabpanel"
        id={`panel-${layoutId}-${active}`}
        aria-labelledby={`tab-${layoutId}-${active}`}
        className="tab-panel"
      >
        {children}
      </div>
    );
  }
  return (
    <motion.div
      key={active}
      role="tabpanel"
      id={`panel-${layoutId}-${active}`}
      aria-labelledby={`tab-${layoutId}-${active}`}
      className="tab-panel"
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
      transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
