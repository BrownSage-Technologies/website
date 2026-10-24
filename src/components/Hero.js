"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "../content";
import { Button } from "./Button";

export function Hero() {
  const fullRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = fullRef.current;
    if (img?.complete && img.naturalWidth > 0) setReady(true);
  }, []);

  return (
    <section className="hero">
      <div className={ready ? "hero-media is-ready" : "hero-media"}>
        <img
          className="hero-bg hero-bg-blur"
          src={hero.imageBlur}
          alt=""
          aria-hidden="true"
          width="64"
          height="31"
        />
        <img
          ref={fullRef}
          className="hero-bg hero-bg-full"
          src={hero.image}
          srcSet={hero.imageSrcSet}
          sizes="100vw"
          alt={hero.alt}
          width="1488"
          height="720"
          fetchPriority="high"
          decoding="async"
          onLoad={() => setReady(true)}
        />
      </div>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1>{hero.title}</h1>
          <p className="lede">{hero.subtext}</p>
          <div>
            <Button href="/#contact">{hero.button}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
