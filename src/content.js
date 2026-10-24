/**
 * Edit this file to change the words on the site, the WhatsApp number,
 * the office address, the contact email, the Formspree id, and analytics.
 * Italic notes from the content map are not included. They were instructions.
 */

export const site = {
  name: "Brown Sage",
  legalName: "Brown Sage Technologies",
  url: "https://brownsagetech.com",
  email: "info@brownsagetech.com",
  phoneDisplay: "0911 813 0439",
  whatsappNumber: "2349118130439",
  whatsappText: "Hi Brown Sage, I'd like to make my work simpler.",
  address: "12 Presbyterian Church Road, Karu, Abuja",
  /** Replace YOUR_FORM_ID with the id from a Formspree form that delivers to info@brownsagetech.com. */
  formspreeId: "YOUR_FORM_ID",
  /**
   * Paste a Cloudflare Web Analytics token to load the beacon.
   * Leave this empty to keep analytics off. Delete the token to remove it.
   */
  analyticsToken: "",
};

export function whatsappLink(extra) {
  const text = extra ? `${site.whatsappText} ${extra}` : site.whatsappText;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Products", href: "/products/" },
  { label: "How We Work", href: "/#how-we-work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  title: "If you can use WhatsApp, you can use this.",
  subtext:
    "Simple technology for Nigerian businesses and offices — built around how you already work.",
  button: "Talk to Us",
  image: "/images/hero-bg.webp?v=2",
  imageSrcSet: "/images/hero-bg.webp?v=2 1488w, /images/hero-bg-2x.webp?v=2 2976w",
  imageBlur:
    "data:image/webp;base64,UklGRtwAAABXRUJQVlA4INAAAAAQBgCdASpAAB8APtFaqU6oJKQiLBVZmQAaCWMAyFx5uJ8Z5jn3BD8kLZt/t1Eq3o0z07XGyUSd2EAA/vmNXdh0xXrku0dtVZj8RT5gZE03/CVzTG1Mt7bjjG78wzqwxqEHp803YVm6DTzwkgZPH1QVcgvszZEZuLOcGklGVrr96nG8zLzErdxe+xktbKTZeUtfwP6AEw73iy2wjnoX7NnJ6K/Iy3/YTGd/hPk9Kf2TmhNao/F3vNTcTUdy7lLOCn/1ZBI4lPGAQzMEssmlZeAA",
  alt: "A glass cube with circuit internals and prismatic light",
};

export const quickLinks = [
  {
    id: "services",
    label: "Our Services",
    subline: "Email, systems and automation, done for you",
    items: [
      {
        title: "Zoho Business Email",
        text: "Professional email on your own domain. Live in 7 days, priced in naira.",
        href: "/#services",
      },
      {
        title: "Paper to Digital",
        text: "We study how your office works today, then build a simple system for approvals, requests and documents.",
        href: "/#services",
      },
      {
        title: "Workflow Automation",
        text: "Repetitive tasks handled automatically, so your team focuses on real work.",
        href: "/#services",
      },
    ],
  },
  {
    id: "products",
    label: "Our Products",
    subline: "Ready-made tools like Axxess Me",
    items: [
      {
        title: "Axxess Me",
        text: "Visitor management that replaces the paper logbook at your front desk.",
        href: whatsappLink("I'd like a demo of Axxess Me."),
        external: true,
        link: "Request a Demo",
      },
      {
        title: "Coming Soon",
        text: "New tools in development. Tell us what your office needs.",
        href: whatsappLink("I'd like to suggest a tool."),
        external: true,
        link: "Suggest a Tool",
        soon: true,
      },
    ],
  },
  {
    id: "work",
    label: "How We Work",
    subline: "Talk, set up, support — in plain language",
    items: [
      { title: "Talk to us", text: "A short chat about how you work today." },
      {
        title: "We set it up",
        text: "We build, configure and train your team in plain language.",
      },
      {
        title: "We stay with you",
        text: "Support on WhatsApp, and we celebrate your wins along the way.",
      },
    ],
    link: { label: "See How It Works", href: "/#how-we-work" },
  },
  {
    id: "talk",
    label: "Talk to Us",
    subline: "Same-day reply on WhatsApp",
    intro: "Same-day reply on WhatsApp.",
    link: { label: "Talk to Us", href: "/#contact" },
    whatsapp: { label: "WhatsApp", href: whatsappLink() },
  },
];

export const tools = {
  heading: "Simple Tools. Real Results.",
  tabs: [
    { id: "featured", label: "Featured" },
    { id: "email", label: "Business Email" },
    { id: "workflows", label: "Digital Workflows" },
    { id: "products", label: "Products" },
  ],
  feature: {
    id: "paper",
    title: "Paper to Digital in 30 Days",
    text: "We study how your office works today, then build a simple system for approvals, requests and documents. Act from your phone, wherever you are.",
    button: "Book a Free Assessment",
    href: "/#contact",
    image: "/images/tool-paper.webp",
    alt: "People marking printed plans beside open laptops on a desk",
  },
  cards: [
    {
      id: "email",
      title: "Zoho Business Email",
      text: "Professional email on your own domain. Live in 7 days, priced in naira.",
      button: "See Packages",
      href: whatsappLink("I'd like to see the business email packages."),
      external: true,
      image: "/images/solution-business.webp",
      alt: "A small-business owner taking a card payment at the counter",
      icon: "mail",
    },
    {
      id: "axxess",
      title: "Axxess Me",
      text: "Visitor management that replaces the paper logbook at your front desk.",
      button: "Request a Demo",
      href: whatsappLink("I'd like a demo of Axxess Me."),
      external: true,
      image: "/images/solution-frontdesk.webp",
      alt: "An office lobby with seating along a bright hallway",
      icon: "desk",
    },
    {
      id: "workflow",
      title: "Workflow Automation",
      text: "Repetitive tasks handled automatically, so your team focuses on real work.",
      button: "Learn More",
      href: "/#how-we-work",
      image: "/images/solution-ministries.webp",
      alt: "Two colleagues working together at a laptop in an office",
      icon: "flow",
    },
    {
      id: "soon",
      title: "Coming Soon",
      text: "New tools in development. Tell us what your office needs.",
      button: "Suggest a Tool",
      href: whatsappLink("I'd like to suggest a tool."),
      external: true,
      soon: true,
      icon: "plus",
    },
  ],
  allLink: { label: "View all services", href: "/#solutions" },
  productsLink: { label: "View all products", href: "/products/" },
};

export const productPage = {
  title: "All Products",
  intro: "Ready-made tools for Nigerian offices, grouped by what they do.",
  button: "Talk to Us",
  buttonHref: "/#contact",
  categories: [
    {
      id: "visitor-management",
      label: "Visitor management",
      products: [
        {
          id: "axxess",
          title: "Axxess Me",
          tone: "brown",
          kind: "Visitor management system",
          text: "Replaces the paper logbook at your front desk. Know who is in the building.",
          icon: "desk",
          button: "Request a Demo",
          href: whatsappLink("I'd like a demo of Axxess Me."),
          external: true,
        },
      ],
    },
    {
      id: "people",
      label: "People",
      products: [
        {
          id: "performance",
          title: "Performance Management System",
          tone: "sage",
          text: "Set goals, follow progress and record reviews without a pile of forms.",
          icon: "chart",
          soon: true,
          button: "Ask about this",
          href: whatsappLink("I'd like to hear when the performance management system is ready."),
          external: true,
        },
        {
          id: "promotion",
          title: "Employee and Promotion Management System",
          tone: "sage-deep",
          text: "Staff records and promotion decisions in one place, in plain language.",
          icon: "people",
          soon: true,
          button: "Ask about this",
          href: whatsappLink("I'd like to hear when the employee and promotion system is ready."),
          external: true,
        },
      ],
    },
    {
      id: "fleet",
      label: "Fleet",
      products: [
        {
          id: "auto",
          title: "Auto Management System",
          tone: "charcoal",
          text: "Track office vehicles, who has them, and when they are due for service.",
          icon: "auto",
          soon: true,
          button: "Ask about this",
          href: whatsappLink("I'd like to hear when the auto management system is ready."),
          external: true,
        },
      ],
    },
  ],
};

export const solutions = {
  heading: "Built for How Nigeria Works.",
  tabs: [
    { id: "sector", label: "By Sector" },
    { id: "need", label: "By Need" },
  ],
  sector: [
    {
      title: "Ministries & Agencies",
      text: "Move memos and approvals off paper. Files keep moving even when an officer is away.",
      image: "/images/solution-ministries.webp",
      alt: "Two colleagues working together at a laptop in an office",
      tone: "brown",
    },
    {
      title: "Small Businesses",
      text: "Professional email, invoicing and customer records in one place, set up in a week.",
      image: "/images/solution-business.webp",
      alt: "A small-business owner taking a card payment at the counter",
      tone: "sage-deep",
    },
    {
      title: "Schools",
      text: "Simple systems for records, staff communication and parent updates.",
      image: "/images/solution-schools.webp",
      alt: "An empty classroom with rows of desks and a chalkboard",
      tone: "charcoal",
      soon: true,
      href: whatsappLink("I'd like to hear when school systems are ready."),
      external: true,
    },
    {
      title: "Front Desks & Estates",
      text: "Axxess Me logs every visitor digitally. Know who's in your building, instantly.",
      image: "/images/solution-frontdesk.webp",
      alt: "An office lobby with seating along a bright hallway",
      tone: "sage",
    },
  ],
  need: [
    {
      title: "Email",
      text: "Professional email on your own domain. Live in 7 days, priced in naira.",
      image: "/images/solution-business.webp",
      alt: "A small-business owner taking a card payment at the counter",
      tone: "sage-deep",
    },
    {
      title: "Paper to Digital",
      text: "We study how your office works today, then build a simple system for approvals, requests and documents. Act from your phone, wherever you are.",
      image: "/images/tool-paper.webp",
      alt: "People marking printed plans beside open laptops on a desk",
      tone: "brown",
    },
    {
      title: "Automation",
      text: "Repetitive tasks handled automatically, so your team focuses on real work.",
      image: "/images/solution-ministries.webp",
      alt: "Two colleagues working together at a laptop in an office",
      tone: "charcoal",
    },
    {
      title: "Visitor logs",
      text: "Axxess Me logs every visitor digitally. Know who's in your building, instantly.",
      image: "/images/solution-frontdesk.webp",
      alt: "An office lobby with seating along a bright hallway",
      tone: "sage",
    },
  ],
  link: { label: "Talk to us about your sector", href: "/#contact" },
};

export const story = {
  heading: "From Seven Days to Three.",
  title: "How Going Digital Halved Approval Times",
  text: "In our team's previous projects with public and private organisations, document approvals that once took a week were completed in three days or less. Officers who moved to new ministries asked for the same system to follow them.",
  stats: [
    {
      id: "turnaround",
      display: "7 → 3 days",
      note: "approval turnaround in our team's past projects",
    },
    {
      id: "reply",
      display: "Same day",
      note: "our response time on WhatsApp",
    },
  ],
  button: "See How It Works",
  href: "/#how-we-work",
  image: "/images/story-team.webp",
  alt: "Three colleagues laughing around laptops at a wooden table",
};

export const steps = {
  heading: "Three Steps. No Jargon.",
  items: [
    { title: "Talk to us", text: "A short chat about how you work today." },
    {
      title: "We set it up",
      text: "We build, configure and train your team in plain language.",
    },
    {
      title: "We stay with you",
      text: "Support on WhatsApp, and we celebrate your wins along the way.",
    },
  ],
};

export const about = {
  heading: "About Us",
  text: "Brown Sage Technologies makes technology simple for Nigerian businesses and government offices.",
};

export const partners = [
  { name: "Zoho Partner", logo: "/images/zoho-partner.png" },
];

export const help = [
  {
    title: "We Cheer You On",
    text: "Most tech firms only show up when things break. We celebrate your wins too.",
    button: "Our Approach",
    href: "/#how-we-work",
  },
  {
    title: "Talk to Sales",
    text: "Tell us what's slowing you down. We'll reply the same day.",
    button: "Contact Us",
    href: "/#contact",
  },
  {
    title: "Help & Training",
    text: "Plain-language guides and short videos for your team.",
    button: "Learn More",
    href: whatsappLink("I'd like the plain-language guides when they are ready."),
    external: true,
    soon: true,
  },
];

export const contactForm = {
  heading: "Talk to Us",
  intro: "Tell us what's slowing you down. We'll reply the same day.",
  submit: "Send message",
  sending: "Sending…",
  thanks: "Thank you. We will reply the same day.",
  previewNote:
    "Add your Formspree id in src/content.js before launch. This preview only shows the thank-you message.",
  unconfigured:
    "We could not send that from this page yet. Message us on WhatsApp and we will reply the same day.",
  error:
    "Something went wrong. Message us on WhatsApp and we will reply the same day.",
  another: "Send another message",
  fields: [
    { name: "name", label: "Name", type: "text", autoComplete: "name" },
    { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
    {
      name: "organisation",
      label: "Organisation",
      type: "text",
      autoComplete: "organization",
    },
    { name: "need", label: "What do you need?", type: "textarea" },
  ],
};

export const footer = {
  services: [
    { label: "Business Email", href: "/#services" },
    { label: "Paper to Digital", href: "/#services" },
    { label: "Automation", href: "/#services" },
  ],
  products: [
    { label: "Axxess Me", href: "/products/#visitor-management" },
    { label: "Performance", href: "/products/#people" },
    { label: "Employee and Promotion", href: "/products/#people" },
    { label: "Auto Management", href: "/products/#fleet" },
  ],
  company: [
    { label: "About Us", href: "/#about" },
    { label: "How We Work", href: "/#how-we-work" },
    { label: "Contact", href: "/#contact" },
  ],
  line: "© 2026 Brown Sage Technologies. Making technology simple.",
};

export const pages = {
  privacy: {
    title: "Privacy Policy",
    description:
      "What Brown Sage Technologies collects on this website, and what we do with it.",
    updated: "22 October 2026",
  },
  terms: {
    title: "Terms",
    description: "The terms for using the Brown Sage Technologies website.",
    updated: "22 October 2026",
  },
  notFound: {
    title: "This page isn't here.",
    text: "The link may be old, or the page may have moved.",
    home: "Back to the homepage",
    talk: "Talk to Us",
  },
};

export const seo = {
  title: "Brown Sage Technologies | Simple technology for Nigerian offices",
  description:
    "If you can use WhatsApp, you can use this. Simple technology for Nigerian businesses and offices — built around how you already work.",
};
