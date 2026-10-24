import { pages, site } from "../../src/content";

export const metadata = {
  title: pages.privacy.title,
  description: pages.privacy.description,
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <article className="wrap prose">
      <h1>{pages.privacy.title}</h1>
      <p className="label">Updated {pages.privacy.updated}</p>
      <p>
        {site.legalName} makes technology simple for Nigerian businesses and government offices. This page says what
        we collect on this website and what we do with it.
      </p>
      <h2>What we collect</h2>
      <p>
        If you use the contact form, we collect your name, phone number, organisation, and what you need. That message
        is sent to {site.email} so we can reply.
      </p>
      <h2>WhatsApp</h2>
      <p>If you message us on WhatsApp, that chat is handled by WhatsApp. We use it to reply to you.</p>
      <h2>How we use it</h2>
      <p>
        We use these details to answer your enquiry and, if you ask, to set up a service. We do not sell your details.
      </p>
      <h2>Analytics</h2>
      <p>
        The site can use Cloudflare Web Analytics, which does not use advertising cookies. It stays off until a token
        is added. You can email us and ask us to delete a message you sent.
      </p>
      <h2>How long we keep it</h2>
      <p>We keep enquiry messages for as long as we need them to do the work you asked for, then we delete them.</p>
      <h2>Ask us</h2>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a> or write to {site.address}.
      </p>
    </article>
  );
}
