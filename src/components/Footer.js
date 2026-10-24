import { footer, site, whatsappLink } from "../content";

function Column({ title, links }) {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;
  return (
    <footer className="footer">
      <div className="wrap">
        <a className="brand brand-on-dark" href="/" aria-label="Brown Sage, home">
          <img src="/images/logo-line.png" alt="" width="48" height="64" />
          <span className="brand-name">BrownSage</span>
        </a>
        <div className="footer-grid">
          <Column title="Services" links={footer.services} />
          <Column title="Products" links={footer.products} />
          <Column title="Company" links={footer.company} />
          <div>
            <h2>Get in Touch</h2>
            <ul>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  WhatsApp {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={maps} target="_blank" rel="noopener noreferrer">
                  {site.address}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{footer.line}</p>
          <p className="footer-meta">
            <a href="/privacy/">Privacy</a>
            <span aria-hidden="true"> · </span>
            <a href="/terms/">Terms</a>
          </p>
          <a className="to-top" href="#top">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
