import { seo, site } from "../src/content";
import { SiteShell } from "../src/components/SiteShell";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seo.title,
    template: "%s · Brown Sage Technologies",
  },
  description: seo.description,
  applicationName: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: seo.title,
    description: seo.description,
    siteName: site.legalName,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Brown Sage Technologies. If you can use WhatsApp, you can use this.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
        {site.analyticsToken ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: site.analyticsToken })}
          />
        ) : null}
      </body>
    </html>
  );
}
