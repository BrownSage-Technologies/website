"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { tools } from "../content";
import { Button } from "./Button";
import { CardIcon } from "./Icons";
import { Lift } from "./motion";
import { TabPanel, Tabs } from "./Tabs";
import { TextLink } from "./TextLink";

function selection(tab) {
  const byId = Object.fromEntries(tools.cards.map((card) => [card.id, card]));
  if (tab === "email") return { large: byId.email, small: [] };
  if (tab === "workflows") return { large: tools.feature, small: [byId.workflow] };
  if (tab === "products") return { large: byId.axxess, small: [byId.soon] };
  return { large: tools.feature, small: tools.cards };
}

function LargeCard({ item }) {
  return (
    <Lift className="feature-card">
      <div className="feature-copy">
        {item.soon ? <span className="badge">Coming soon</span> : null}
        {item.icon ? <CardIcon name={item.icon} /> : null}
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <Button href={item.href} external={Boolean(item.external)}>
          {item.button}
        </Button>
      </div>
      {item.image ? (
        <div className="feature-visual">
          <img src={item.image} alt={item.alt} width="1100" height="780" loading="lazy" />
        </div>
      ) : null}
    </Lift>
  );
}

export function Tools() {
  const [tab, setTab] = useState("featured");

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash;
      if (hash === "#products") setTab("products");
      if (hash === "#services") setTab("featured");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const view = selection(tab);

  return (
    <section className="section" id="services">
      <div id="products" className="anchor" />
      <div className="wrap">
        <div className="section-head">
          <h2 id="tools-heading">{tools.heading}</h2>
        </div>
        <Tabs
          tabs={tools.tabs}
          active={tab}
          onChange={setTab}
          layoutId="tools-underline"
          labelledBy="tools-heading"
          variant="center"
        />
        <AnimatePresence mode="wait">
          <TabPanel key={tab} layoutId="tools" active={tab}>
            <div className={view.small.length ? "tools-grid has-side" : "tools-grid is-single"}>
              <LargeCard item={view.large} />
              {view.small.length ? (
                <div className={view.small.length === 1 ? "small-grid is-rest" : "small-grid"}>
                  {view.small.map((card, index) => (
                    <Lift key={card.id} className="mini-card" delay={index * 0.08}>
                      {card.soon ? <span className="badge">Coming soon</span> : null}
                      <CardIcon name={card.icon} />
                      <h3>{card.title}</h3>
                      <p>{card.text}</p>
                      <TextLink href={card.href} external={Boolean(card.external)}>
                        {card.button}
                      </TextLink>
                    </Lift>
                  ))}
                </div>
              ) : null}
            </div>
          </TabPanel>
        </AnimatePresence>
        <div className="section-more">
          <TextLink href={tab === "products" ? tools.productsLink.href : tools.allLink.href}>
            {tab === "products" ? tools.productsLink.label : tools.allLink.label}
          </TextLink>
        </div>
      </div>
    </section>
  );
}
