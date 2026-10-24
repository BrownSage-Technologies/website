# Brown Sage Technologies website

Marketing site for [brownsagetech.com](https://brownsagetech.com). Next.js and React, exported to a plain folder. Framer Motion handles the scroll, tab, and hover movement.

## Change the words

Open [src/content.js](src/content.js). Headings, card text, the WhatsApp number, the office address, the contact email, the Formspree id, and the analytics token all live in that file.

- `whatsappNumber` is the international number without a plus sign: `2349118130439`.
- `phoneDisplay` is the number people read: `0911 813 0439`.
- Change both if the WhatsApp number changes.

Privacy and Terms wording is in [app/privacy/page.js](app/privacy/page.js) and [app/terms/page.js](app/terms/page.js).

## Swap a photo

Replace the file in `public/images/` and keep the same name. Use a real photo, saved as WebP, and update the matching `alt` text in `src/content.js`.

| File | Where it appears |
| --- | --- |
| `hero-bg.webp` | Hero background |
| `tool-paper.webp` | Paper to Digital card |
| `solution-ministries.webp` | Ministries card and automation |
| `solution-business.webp` | Small businesses and email |
| `solution-schools.webp` | Schools |
| `solution-frontdesk.webp` | Front desks |
| `story-team.webp` | Customer story banner |

The logo files are `public/images/logo-mark.png` (brown and sage, light backgrounds) and `public/images/logo-line.png` (sage line, charcoal backgrounds). Replace them with the same filenames if the mark changes. Do not recolour them in CSS.

## Form and analytics

1. Create a form at [formspree.io](https://formspree.io) that delivers to `info@brownsagetech.com`.
2. Paste the form id into `formspreeId` in `src/content.js`. Until that id is set, the form does not send. On a production site it points people to WhatsApp instead.
3. For Cloudflare Web Analytics, paste the token into `analyticsToken`. Leave it empty to keep the beacon off. Delete the token to remove it.

## Build and deploy

```bash
npm install
npx next build
```

Upload the `out` folder.

- **Netlify or Cloudflare Pages:** build command `npx next build`, publish directory `out`.
- **cPanel:** upload the contents of `out` into `public_html`. The export includes `404.html`.

## Photo credits

These are temporary stock photos. Replace them with team photos when you have them. All are free to use under the Unsplash licence.

- Hero background: supplied image (`public/images/hero-bg.webp`)
- Ministries and automation: [Unsplash](https://unsplash.com/photos/1531482615713-2afd69097998)
- Small business and email: [Unsplash](https://unsplash.com/photos/1556740738-b6a63e27c4df)
- Schools: [Unsplash](https://unsplash.com/photos/1580582932707-520aed937b7b)
- Front desk: [Unsplash](https://unsplash.com/photos/1497366216548-37526070297c)
- Paper to Digital: [Unsplash](https://unsplash.com/photos/1454165804606-c3d57bc86b40)
- Customer story: [Unsplash](https://unsplash.com/photos/1522202176988-66273c2fd55f)

## Launch checklist

- [ ] Paste the Formspree id into `src/content.js` so the contact form reaches info@brownsagetech.com
- [ ] Paste the Cloudflare Web Analytics token, or leave it empty
- [ ] Replace the stock photos with team and office photos
- [ ] Add LinkedIn, X, and Instagram only for accounts Brown Sage actually runs
- [ ] Confirm the partner line can say Zoho Partner
- [ ] Remove the Schools "Coming soon" badge when that offer is ready
