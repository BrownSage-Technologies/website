import { partners } from "../content";

export function Partners() {
  return (
    <section className="section partners" aria-labelledby="partners-heading">
      <div className="wrap">
        <h2 id="partners-heading" className="sr-only">
          Partners
        </h2>
        <ul className="partner-row">
          {partners.map((partner) => (
            <li key={partner.name}>
              <img src={partner.logo} alt={partner.name} width="280" height="120" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
