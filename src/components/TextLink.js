import { ArrowIcon } from "./Icons";

export function TextLink({ href, children, external = false }) {
  return (
    <a
      className="text-link"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span>{children}</span>
      <span className="arrow" aria-hidden="true">
        <ArrowIcon />
      </span>
    </a>
  );
}
