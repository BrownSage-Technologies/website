import { productPage } from "../../src/content";
import { ProductsPage } from "../../src/components/ProductsPage";

export const metadata = {
  title: productPage.title,
  description: productPage.intro,
  alternates: { canonical: "/products/" },
};

export default function Page() {
  return <ProductsPage />;
}
