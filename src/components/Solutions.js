"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { solutions } from "../content";
import { EASE, Reveal, useCalmMotion } from "./motion";
import { TabPanel, Tabs } from "./Tabs";
import { TextLink } from "./TextLink";

function SolutionCard({ card }) {
  const reduce = useCalmMotion();
  const Tag = card.href ? motion.a : motion.article;
  return (
    <Tag
      className={`solution-card tone-${card.tone}`}
      href={card.href}
      target={card.external ? "_blank" : undefined}
      rel={card.external ? "noopener noreferrer" : undefined}
      aria-label={card.soon ? `${card.title}. Coming soon. Opens WhatsApp.` : undefined}
      initial="rest"
      animate="rest"
      whileHover={reduce ? undefined : "hover"}
      variants={{
        rest: { y: 0 },
        hover: { y: reduce ? 0 : -4 },
      }}
      transition={{ duration: 0.25, ease: EASE }}
    >
      <div className="solution-body">
        {card.soon ? <span className="badge">Coming soon</span> : null}
        <h3>{card.title}</h3>
        <p>{card.text}</p>
      </div>
      <div className="solution-photo">
        <motion.img
          src={card.image}
          alt={card.alt}
          width="900"
          height="720"
          loading="lazy"
          variants={{
            rest: { scale: 1 },
            hover: { scale: reduce ? 1 : 1.04 },
          }}
          transition={{ duration: 0.4, ease: EASE }}
        />
      </div>
    </Tag>
  );
}

export function Solutions() {
  const [tab, setTab] = useState("sector");
  const reduce = useCalmMotion();
  const cards = tab === "need" ? solutions.need : solutions.sector;

  return (
    <section className="section" id="solutions">
      <div className="wrap">
        <Reveal className="section-head">
          <h2 id="solutions-heading">{solutions.heading}</h2>
        </Reveal>
        <Tabs
          tabs={solutions.tabs}
          active={tab}
          onChange={setTab}
          layoutId="solutions-underline"
          labelledBy="solutions-heading"
          variant="center"
        />
        <AnimatePresence mode="wait">
          <TabPanel key={tab} layoutId="solutions" active={tab}>
            {reduce ? (
              <div className="solution-grid">
                {cards.map((card) => (
                  <div key={card.title}>
                    <SolutionCard card={card} />
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                className="solution-grid"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.08 } },
                }}
              >
                {cards.map((card) => (
                  <motion.div
                    key={card.title}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
                    }}
                  >
                    <SolutionCard card={card} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </TabPanel>
        </AnimatePresence>
        <div className="section-more">
          <TextLink href={solutions.link.href}>{solutions.link.label}</TextLink>
        </div>
      </div>
    </section>
  );
}
