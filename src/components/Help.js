import { help } from "../content";
import { Lift } from "./motion";
import { TextLink } from "./TextLink";

export function Help() {
  return (
    <section className="section" aria-label="Help">
      <div className="wrap help-grid">
        {help.map((card, index) => (
          <Lift key={card.title} className="help-card" delay={index * 0.08}>
            {card.soon ? <span className="badge">Coming soon</span> : null}
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <TextLink href={card.href} external={Boolean(card.external)}>
              {card.button}
            </TextLink>
          </Lift>
        ))}
      </div>
    </section>
  );
}
