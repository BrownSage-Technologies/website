"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import { story } from "../content";
import { Button } from "./Button";
import { EASE, useCalmMotion } from "./motion";

function Turnaround() {
  const reduce = useCalmMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(3);

  useEffect(() => {
    if (!inView || reduce) return undefined;
    const controls = animate(7, 3, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (next) => setValue(Math.round(next)),
    });
    return () => controls.stop();
  }, [inView, reduce]);

  const label = inView && !reduce ? `7 → ${value} days` : "7 → 3 days";
  return (
    <p className="stat-value" ref={ref}>
      {label}
    </p>
  );
}

export function Story() {
  const reduce = useCalmMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="story" ref={ref} aria-labelledby="story-heading">
      {reduce ? (
        <img
          className="story-photo"
          src={story.image}
          alt={story.alt}
          width="1600"
          height="1000"
          loading="lazy"
        />
      ) : (
        <motion.img
          className="story-photo"
          src={story.image}
          alt={story.alt}
          width="1600"
          height="1000"
          loading="lazy"
          style={{ y }}
        />
      )}
      <div className="story-shade" />
      <div className="wrap story-inner">
        {reduce ? (
        <div>
          <h2 id="story-heading">{story.heading}</h2>
          <h3>{story.title}</h3>
          <p>{story.text}</p>
          <div className="stat-row">
            <div>
              <Turnaround />
              <p className="stat-note">{story.stats[0].note}</p>
            </div>
            <div>
              <p className="stat-value">{story.stats[1].display}</p>
              <p className="stat-note">{story.stats[1].note}</p>
            </div>
          </div>
          <Button href={story.href} variant="on-dark">
            {story.button}
          </Button>
        </div>
        ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <h2 id="story-heading">{story.heading}</h2>
          <h3>{story.title}</h3>
          <p>{story.text}</p>
          <div className="stat-row">
            <div>
              <Turnaround />
              <p className="stat-note">{story.stats[0].note}</p>
            </div>
            <div>
              <p className="stat-value">{story.stats[1].display}</p>
              <p className="stat-note">{story.stats[1].note}</p>
            </div>
          </div>
          <Button href={story.href} variant="on-dark">
            {story.button}
          </Button>
        </motion.div>
        )}
      </div>
    </section>
  );
}
