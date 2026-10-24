"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { quickLinks, site } from "../content";
import { Button } from "./Button";
import { TabPanel, Tabs } from "./Tabs";
import { TextLink } from "./TextLink";

export function QuickLinks() {
  const [active, setActive] = useState(quickLinks[0].id);
  const current = quickLinks.find((tab) => tab.id === active) || quickLinks[0];

  return (
    <section className="quick" aria-label="Highlights">
      <div className="wrap">
        <Tabs
          tabs={quickLinks}
          active={active}
          onChange={setActive}
          layoutId="quick-underline"
          label="Highlights"
          variant="quick"
        />
        <AnimatePresence mode="wait">
          <TabPanel key={current.id} layoutId="quick" active={current.id}>
            {current.id === "talk" ? (
              <div className="quick-talk">
                <p>{current.intro}</p>
                <p>{site.address}</p>
                <p>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
                <div className="btn-row">
                  <Button href={current.link.href}>{current.link.label}</Button>
                  <Button href={current.whatsapp.href} external variant="ghost">
                    {current.whatsapp.label}
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className={`quick-list cols-${Math.min(current.items.length, 3)}`}>
                  {current.items.map((item) => (
                    <article key={item.title} className="quick-item">
                      {item.soon ? <span className="badge">Coming soon</span> : null}
                      <p className="quick-title">{item.title}</p>
                      <p>{item.text}</p>
                      {item.href && item.link ? (
                        <TextLink href={item.href} external={item.external}>
                          {item.link}
                        </TextLink>
                      ) : null}
                    </article>
                  ))}
                </div>
                {current.link ? (
                  <div className="section-more">
                    <TextLink href={current.link.href}>{current.link.label}</TextLink>
                  </div>
                ) : null}
              </>
            )}
          </TabPanel>
        </AnimatePresence>
      </div>
    </section>
  );
}
