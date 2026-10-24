import { about, site } from "../content";
import { Reveal } from "./motion";

export function About() {
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;
  return (
    <section className="section about" id="about">
      <div className="wrap">
        <Reveal className="about-inner">
          <h2>{about.heading}</h2>
          <p>{about.text}</p>
          <p>
            <a href={maps} target="_blank" rel="noopener noreferrer">
              {site.address}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
