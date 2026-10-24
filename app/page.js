import { About } from "../src/components/About";
import { Contact } from "../src/components/Contact";
import { Help } from "../src/components/Help";
import { Hero } from "../src/components/Hero";
import { HowWeWork } from "../src/components/HowWeWork";
import { Partners } from "../src/components/Partners";
import { QuickLinks } from "../src/components/QuickLinks";
import { Solutions } from "../src/components/Solutions";
import { Story } from "../src/components/Story";
import { Tools } from "../src/components/Tools";
import { hero } from "../src/content";

export default function Page() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={hero.image}
        imageSrcSet={hero.imageSrcSet}
        imageSizes="100vw"
        fetchPriority="high"
      />
      <Hero />
      <QuickLinks />
      <Tools />
      <Solutions />
      <Story />
      <HowWeWork />
      <About />
      <Partners />
      <Help />
      <Contact />
    </>
  );
}
