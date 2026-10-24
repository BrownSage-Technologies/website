import { steps } from "../content";
import { Lift, Reveal } from "./motion";

export function HowWeWork() {
  return (
    <section className="section" id="how-we-work">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>{steps.heading}</h2>
        </Reveal>
        <div className="step-grid">
          {steps.items.map((item, index) => (
            <Lift key={item.title} className="step" delay={index * 0.08}>
              <p className="step-num">0{index + 1}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Lift>
          ))}
        </div>
      </div>
    </section>
  );
}
