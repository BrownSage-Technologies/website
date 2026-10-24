"use client";

import { useEffect, useState } from "react";
import { productPage } from "../content";
import { Button } from "./Button";
import { ArrowIcon, CardIcon } from "./Icons";
import { Lift, useCalmMotion } from "./motion";

const stage = [
  { icon: "desk", tone: "sage", place: "one" },
  { icon: "people", tone: "brown", place: "two" },
  { icon: "chart", tone: "deep", place: "three" },
  { icon: "auto", tone: "charcoal", place: "four" },
  { icon: "flow", tone: "sage", place: "five" },
];

export function ProductsPage() {
  const reduce = useCalmMotion();
  const [active, setActive] = useState(productPage.categories[0].id);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("[data-category]"));
    if (!sections.length) return undefined;

    const fromHash = window.location.hash.replace("#", "");
    if (sections.some((section) => section.id === fromHash)) setActive(fromHash);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.15, 0.4, 0.7] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function showCategory(id) {
    setActive(id);
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  return (
    <article className="product-page">
      <header className="product-hero">
        <div className="wrap product-hero-grid">
          <div className="product-hero-copy">
            <h1>{productPage.title}</h1>
            <p>{productPage.intro}</p>
            <Button href={productPage.buttonHref}>{productPage.button}</Button>
          </div>
          <div className="product-stage" aria-hidden="true">
            {stage.map((item) => (
              <div key={item.place} className={`pedestal pedestal-${item.place} tone-${item.tone}`}>
                <CardIcon name={item.icon} />
                <span className="stand" />
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="wrap product-body">
        <div className="product-layout">
          <nav className="product-nav" aria-label="Product categories">
            <p className="product-nav-label">Category</p>
            {productPage.categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={active === category.id ? "is-active" : undefined}
                aria-current={active === category.id ? "true" : undefined}
                onClick={() => showCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </nav>

          <div className="product-groups">
            {productPage.categories.map((category) => (
              <section key={category.id} id={category.id} className="product-group" data-category="">
                <h2>{category.label}</h2>
                <div className="product-grid">
                  {category.products.map((product, index) => (
                    <Lift key={product.id} className={`product-card tone-${product.tone}`} delay={index * 0.06}>
                      <a
                        className="product-hit"
                        href={product.href}
                        target={product.external ? "_blank" : undefined}
                        rel={product.external ? "noopener noreferrer" : undefined}
                      >
                        {product.soon ? <span className="badge">Coming soon</span> : null}
                        <CardIcon name={product.icon} />
                        <h3>{product.title}</h3>
                        {product.kind ? <p className="product-kind">{product.kind}</p> : null}
                        <p>{product.text}</p>
                        <span className="text-link">
                          <span>{product.button}</span>
                          <span className="arrow" aria-hidden="true">
                            <ArrowIcon />
                          </span>
                        </span>
                      </a>
                    </Lift>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
