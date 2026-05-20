# Leviva Travel and Tours

Production-ready full-stack website for Leviva Travel and Tours, focused on high-conversion bookings for Tanzania, Zanzibar, Botswana, and other East Africa destinations.

## Stack

- Next.js with the App Router
- React
- TypeScript
- Zod validation
- Serverless API routes for booking and contact leads
- Responsive CSS with SEO metadata and structured travel-agency data

## Features

- Conversion-focused landing page with clear calls to action
- Destination sections for Tanzania, Zanzibar, Botswana, and East Africa extensions
- Source-market messaging for China, USA, Europe, South Korea, Australia, and New Zealand
- Booking inquiry form that captures destination interest, budget, travel month, market, trip style, and traveler count
- Contact form for general inquiries
- Backend lead delivery through:
  - `LEAD_WEBHOOK_URL` for Zapier, Make, Google Sheets, HubSpot, Pipedrive, or a custom CRM
  - `RESEND_API_KEY` for direct email notifications
- Anti-spam honeypot fields
- SEO metadata and schema.org `TravelAgency` structured data

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Production environment variables

Set these in your hosting dashboard:

```bash
NEXT_PUBLIC_SITE_URL=https://www.levivatravel.com
LEAD_TO_EMAIL=info@levivainvestments.co.tz
```

Choose at least one lead delivery option:

```bash
LEAD_WEBHOOK_URL=https://your-automation-or-crm-webhook
```

or:

```bash
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=Leviva Website <leads@your-verified-domain.com>
```

If no webhook or email provider is configured, the API will return a clear setup error so booking inquiries are not silently lost.

## Build and run

```bash
npm run typecheck
npm run build
npm run start
```

## Recommended hosting

1. **Vercel** - Best fit for this project because it is built for Next.js, supports serverless API routes, previews, custom domains, SSL, and environment variables with minimal setup.
2. **Netlify** - Strong alternative with good Next.js support, forms/edge features, previews, custom domains, and simple deployment.
3. **Render** - Good if Leviva later wants a persistent backend, database, queues, or worker services alongside the website.
4. **Cloudflare Pages** - Excellent CDN performance, but confirm the selected Next.js serverless features match the deployment adapter before launch.

Recommended launch path: deploy to Vercel, connect the Leviva domain, add the environment variables above, configure Resend or a CRM webhook, then test both forms before public marketing campaigns begin.

## Contact details used on the site

- Email: `info@levivainvestments.co.tz`
- Phone and WhatsApp: `+255758996047`
