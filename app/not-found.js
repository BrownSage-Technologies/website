import { pages, whatsappLink } from "../src/content";
import { Button } from "../src/components/Button";

export const metadata = {
  title: "Page not found",
  description: pages.notFound.text,
};

export default function NotFound() {
  return (
    <article className="wrap prose not-found">
      <h1>{pages.notFound.title}</h1>
      <p>{pages.notFound.text}</p>
      <div className="btn-row">
        <Button href="/">{pages.notFound.home}</Button>
        <Button href={whatsappLink()} external variant="ghost">
          {pages.notFound.talk}
        </Button>
      </div>
    </article>
  );
}
