import { pages, site } from "../../src/content";

export const metadata = {
  title: pages.terms.title,
  description: pages.terms.description,
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <article className="wrap prose">
      <h1>{pages.terms.title}</h1>
      <p className="label">Updated {pages.terms.updated}</p>
      <p>These terms cover your use of {site.url.replace("https://", "")}.</p>
      <h2>The site</h2>
      <p>
        The pages describe our services. An enquiry, a demo request, or a WhatsApp message is not a contract. Work
        starts only when we both agree.
      </p>
      <h2>Coming soon</h2>
      <p>
        Items marked Coming soon are not available yet. A message about them reaches us, and we will tell you when
        they are ready.
      </p>
      <h2>Your messages</h2>
      <p>Please send accurate contact details so we can reply. Do not send passwords or bank details through the form.</p>
      <h2>Our content</h2>
      <p>The words, logo, and layout of this site belong to {site.legalName}. Please ask before you copy them.</p>
      <h2>Care</h2>
      <p>
        We take care to keep the site accurate. We are not liable for decisions you make before we have agreed a piece
        of work with you.
      </p>
      <h2>Law</h2>
      <p>These terms follow the laws of the Federal Republic of Nigeria. Our office is in Abuja.</p>
      <h2>Contact</h2>
      <p>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <br />
        {site.address}
      </p>
    </article>
  );
}
