# Leviva Travel & Tours Website

A ready-to-publish full-stack website for Leviva Travel & Tours focused on:

- Tanzania safari travel
- Zanzibar beach holidays
- Botswana luxury extensions
- Wider East Africa destination planning
- Priority inbound markets from China, USA, Europe, South Korea, Australia, and New Zealand

## Stack

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS 4
- Prisma ORM
- SQLite for local development
- Optional Resend email notifications for new booking leads

## What is included

- High-conversion homepage with destination-led sales messaging
- Dedicated destinations hub
- Dynamic destination detail pages
- Booking planner page with validated lead form
- Backend booking API with persistence
- SEO metadata, sitemap, robots.txt, and structured data
- Contact CTAs for email, phone, and WhatsApp
- Deployment and hosting guidance

## Lead capture backend

The backend is implemented inside the Next.js app:

- `POST /api/bookings` validates and stores booking requests
- `GET /api/bookings` returns leads when a valid admin key is supplied

Admin access example:

```bash
curl "https://your-domain.com/api/bookings?key=YOUR_ADMIN_DASHBOARD_KEY"
```

Or by header:

```bash
curl -H "x-admin-key: YOUR_ADMIN_DASHBOARD_KEY" https://your-domain.com/api/bookings
```

## Local setup

1. Install dependencies

```bash
npm install
```

2. Copy the environment template

```bash
cp .env.example .env
```

3. Create the local database and generate Prisma client

```bash
npx prisma migrate dev --name init
```

4. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Use `.env.example` as the starting point.

Required:

- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_DASHBOARD_KEY`

Optional but recommended:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TO_EMAIL`

## Production deployment

### Recommended hosting setup

Best fit for the codebase exactly as delivered:

1. **Railway** for the Next.js app with persistent disk storage
2. **Resend** for form notification emails
3. **Cloudflare** for DNS, SSL, caching, and security

This project currently uses SQLite in the application layer. That makes Railway,
Render, or a VPS-style host with persistent storage the easiest production path.
If Leviva later wants a more scalable database architecture on Vercel or similar
serverless platforms, the Prisma datasource can be migrated from SQLite to
Postgres.

### Other strong hosting choices

- **Render**: strong option if you want app hosting plus persistent storage
- **DigitalOcean Droplet or App Platform**: solid if you want more operational control
- **Vercel**: best for frontend deployment speed, but use it after switching the booking persistence layer to Postgres or if email-only lead delivery is acceptable
- **AWS Amplify**: suitable for enterprise environments, but usually more operationally heavy

## Publishing checklist

Before going live:

1. Set the real production domain in `NEXT_PUBLIC_SITE_URL`
2. Choose production persistence:
   - keep SQLite and deploy on a host with persistent storage, or
   - migrate Prisma to Postgres before deploying to a serverless host
3. Configure Resend email credentials if you want instant inbox notifications
4. Set a strong `ADMIN_DASHBOARD_KEY`
5. Point the domain DNS to the hosting provider
6. Test booking submission and lead retrieval
7. Add analytics such as Google Analytics 4 or Plausible
8. Connect a CRM or email automation platform if Leviva wants a sales pipeline after inquiry capture

## Conversion notes

This build was structured to improve booking conversion by:

- showing destination clarity early
- reducing decision fatigue with itinerary anchors
- emphasizing trust and responsiveness
- collecting qualified lead data rather than a shallow contact form
- placing strong CTAs above the fold and throughout the site
- tailoring messaging around Leviva's highest-value inbound markets

## Suggested next upgrades

- Add multilingual content, especially Mandarin and Korean landing pages
- Connect analytics, heatmaps, and conversion events
- Add a CRM sync for HubSpot, Zoho, or Salesforce
- Add a real testimonial CMS or admin dashboard
- Add an image library from Leviva's destination portfolio

## Contacts used in the build

- Email: `info@levivainvestments.co.tz`
- Phone: `+255758996047`
