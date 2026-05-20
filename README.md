# Leviva Travel and Tours Website

Production-ready full-stack website for **Leviva Travel and Tours**, focused on:

- Tanzania safaris: Serengeti, Ngorongoro, Tarangire, Lake Manyara
- Zanzibar beach holidays and honeymoon extensions
- Botswana luxury wilderness: Okavango Delta, Chobe, Moremi
- East Africa add-ons: Kenya, Rwanda, Uganda, Victoria Falls routes
- Source markets: China, USA, Europe, South Korea, Australia, and New Zealand

Contact details included across the site:

- Email: `info@levivainvestments.co.tz`
- Phone / WhatsApp: `+255758996047`

## Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Zod validation
- Server API route for booking inquiries

## Conversion features

- Clear above-the-fold quote and WhatsApp calls to action
- Destination and package cards targeted to high-intent safari travelers
- Short booking inquiry form with backend validation
- Optional CRM/webhook delivery for leads
- Sticky mobile quote/WhatsApp bar
- Trust stats, source-market messaging, testimonials, and local support positioning
- SEO metadata, JSON-LD TravelAgency schema, sitemap, and robots file

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env.local` for local development.

```bash
NEXT_PUBLIC_SITE_URL=https://www.levivatravel.co.tz
LEAD_WEBHOOK_URL=
LEAD_WEBHOOK_TOKEN=
```

`LEAD_WEBHOOK_URL` is optional. When set, validated booking inquiries are sent as JSON to that endpoint. This can be a CRM, Make/Zapier webhook, Google Apps Script endpoint, or custom backend. If it is not set, leads are logged by the server runtime.

## Production build

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

## Best hosting options

1. **Vercel - recommended for this project**
   - Best fit for Next.js.
   - Supports frontend pages and backend API routes without extra server setup.
   - Includes global CDN, SSL, preview deployments, custom domains, and analytics options.

2. **Netlify**
   - Strong for marketing sites and deploy previews.
   - Good serverless function support and simple domain management.

3. **Render**
   - Good if Leviva later adds a persistent backend, database, or private admin dashboard.

4. **AWS Amplify**
   - Best if Leviva wants a broader AWS cloud setup with managed hosting and deeper integrations.

## Launch checklist

- Buy or connect the domain, for example `levivatravel.co.tz`.
- Set `NEXT_PUBLIC_SITE_URL` to the final public domain.
- Connect `LEAD_WEBHOOK_URL` to the preferred lead destination.
- Add a privacy policy page before running paid ads.
- Add real guest photos and verified testimonials when available.
- Connect analytics and conversion tracking for Google Ads, Meta, TikTok, or travel marketplace campaigns.
- Test the booking form, WhatsApp link, email link, sitemap, and mobile layout before publishing.
