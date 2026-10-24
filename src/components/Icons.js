export function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M4 10h12M12 6l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.04 3.5A8.2 8.2 0 0 0 4.6 15.9L3.5 20.2l4.4-1.1A8.2 8.2 0 1 0 12.04 3.5zm0 1.6a6.6 6.6 0 0 1 5.6 10.1l-.2.3.3 2.2-2.1-.6-.3.2a6.6 6.6 0 1 1-3.3-12.2zm3.6 8.5c-.2-.1-1.1-.5-1.3-.6-.2-.1-.3-.1-.5.1l-.5.6c-.1.2-.3.2-.5.1a5.4 5.4 0 0 1-1.6-1 6 6 0 0 1-1.1-1.4c-.1-.2 0-.3.1-.4l.3-.4.1-.2a.4.4 0 0 0 0-.4c0-.1-.5-1.1-.6-1.5s-.3-.4-.5-.4h-.4a.8.8 0 0 0-.6.3 2.4 2.4 0 0 0-.7 1.8 4.2 4.2 0 0 0 .9 2.2 9.4 9.4 0 0 0 3.5 3.1c.5.2.9.3 1.2.4.5.1.9.1 1.2 0 .4-.1.8-.5 1-.9.1-.3.1-.6 0-.7-.1-.1-.2-.2-.4-.3z"
      />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function DeskIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 10h16v8H4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10V6h8v4M4 14h16" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function FlowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="4" width="6" height="6" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="14.5" y="14" width="6" height="6" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.5 10v3a3 3 0 0 0 3 3H14" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19V10M12 19V5M19 19v-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function PeopleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="9" r="1.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 18.5c.6-2.4 2.4-3.5 4.5-3.5s3.9 1.1 4.5 3.5M14 15.2c1.4-.2 2.8.4 3.6 1.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function AutoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 15.5l1.4-4.2A2 2 0 0 1 7.3 10h9.4a2 2 0 0 1 1.9 1.3L20 15.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M3.5 15.5h17V18a1 1 0 0 1-1 1h-1.2a1 1 0 0 1-1-1v-.5H6.7V18a1 1 0 0 1-1 1H4.5a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="7.5" cy="16.2" r="0.8" fill="currentColor" />
      <circle cx="16.5" cy="16.2" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const ICONS = {
  mail: MailIcon,
  desk: DeskIcon,
  flow: FlowIcon,
  plus: PlusIcon,
  chart: ChartIcon,
  people: PeopleIcon,
  auto: AutoIcon,
};

export function CardIcon({ name }) {
  const Icon = ICONS[name] || PlusIcon;
  return (
    <span className="icon-blob">
      <Icon />
    </span>
  );
}
