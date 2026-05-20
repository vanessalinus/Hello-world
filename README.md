# Leviva Travel & Tours — Full-Stack Booking Website

Production-ready, high-conversion travel website for **Leviva Travel & Tours** (a division of
**Leviva Investments Ltd.**, Tanzania) — specialising in safaris and beach holidays across
Tanzania, Zanzibar, Botswana, Kenya, Rwanda and Uganda, with a focus on travellers from
China 🇨🇳, the USA 🇺🇸, Europe 🇪🇺, South Korea 🇰🇷, Australia 🇦🇺 and New Zealand 🇳🇿.

- **Email:** info@levivainvestments.co.tz
- **Phone / WhatsApp:** +255 758 996 047

---

## Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 14 (App Router)** + TypeScript | SEO-friendly SSR, fast routing, server actions, mature ecosystem |
| UI | **Tailwind CSS** + Lucide icons | Beautiful, responsive, accessible, low-bundle UI |
| Backend | **Next.js Route Handlers** + Zod validation | Single deploy, type-safe APIs, no extra services |
| Database | **Prisma ORM** (SQLite default → PostgreSQL in prod) | Portable, painless migrations, works on every host |
| Email | **Nodemailer** (any SMTP) | Booking & inquiry notifications |
| SEO | JSON-LD, sitemap, robots, Open Graph | Maximum organic reach |
| Conversion | Sticky WhatsApp/Call CTAs, multi-step inquiry, trust badges, social proof, free quote form, instant pricing, transparent “pay later” promise | Designed for high booking conversion |

---

## High-conversion features baked in

- **Hero with instant trip-planner form** (12-hour quote promise, no payment up front)
- **Sticky WhatsApp & call buttons** — the #1 mobile conversion lever in travel
- **Trust strip** with licensing, IATA, KPAP, Travelife, TTB badges
- **Source-market personalisation** for 🇨🇳 🇺🇸 🇪🇺 🇰🇷 🇦🇺 🇳🇿 (languages, payment methods, dietary needs)
- **Itinerary detail pages** with sticky pricing sidebar, dynamic per-pax total, social proof, “Best price guarantee” chip
- **Multi-step quote form** with country, traveller count, start date — auto-emails customer + sales
- **Reviews with star ratings** and country flags for international social proof
- **SEO-optimised** (sitemap, robots, JSON-LD `TravelAgency` schema, OG images)
- **Newsletter capture** in footer for retargeting
- **Mobile-first responsive** layout with reduced friction on every form

---

## Project structure

```
app/                  # Next.js App Router pages & API routes
  api/                # Route handlers (bookings, inquiries, newsletter)
  destinations/       # Destinations index + dynamic [slug]
  tours/              # Tours index + dynamic [slug]
  book/               # Free-quote / planner page
  about/              # Company story
  contact/            # Multi-channel contact page
  reviews/            # All reviews
components/           # React components (navbar, hero, forms, cards, footer…)
lib/                  # Prisma client, mailer, site config, utils
prisma/
  schema.prisma       # Database schema
  seed.ts             # Demo destinations, tours and reviews
public/               # Static assets
```

---

## Local development

```bash
cp .env.example .env
npm install
npx prisma db push
npm run db:seed
npm run dev
```

Open <http://localhost:3000>.

### Environment variables

```
DATABASE_URL=             # SQLite (file:./dev.db) for dev, PostgreSQL for prod
SMTP_HOST=                # any SMTP server (Zoho / Resend / SendGrid / Mailgun / Office365…)
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM="Leviva Travel <info@levivainvestments.co.tz>"
SALES_INBOX="info@levivainvestments.co.tz"

NEXT_PUBLIC_SITE_URL="https://www.levivatravel.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="255758996047"
NEXT_PUBLIC_PHONE="+255758996047"
NEXT_PUBLIC_EMAIL="info@levivainvestments.co.tz"
```

If SMTP is not configured, emails are skipped and bookings still save to the database.

---

## Switching to PostgreSQL for production

1. Edit `prisma/schema.prisma`:

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Set `DATABASE_URL=postgresql://user:pass@host:5432/leviva?schema=public`
3. Run `npx prisma migrate deploy` (or `npx prisma db push` on first run) and `npm run db:seed`.

---

## Recommended hosting options (ranked)

### 🥇 Best overall — Vercel (frontend + serverless backend) + Neon (PostgreSQL)
- **Why:** Native Next.js host, global edge CDN, automatic HTTPS, preview deploys per branch,
  zero-config for App Router. Neon offers a generous free Postgres tier with branching.
- **Cost:** Free Hobby tier covers most early-stage traffic; ~$20/mo Pro tier for production.
- **Steps:**
  1. Push this repo to GitHub.
  2. Sign in to [vercel.com](https://vercel.com) → *Import* this repo.
  3. Create a free database at [neon.tech](https://neon.tech) → copy `DATABASE_URL`.
  4. In Vercel project settings → *Environment Variables* add `DATABASE_URL`, SMTP vars and
     `NEXT_PUBLIC_*` from `.env.example`.
  5. After first deploy: run `npx prisma db push` against the Neon URL and seed data.
  6. Point `levivatravel.com` (or chosen domain) DNS to Vercel.

### 🥈 Cloudflare Pages + Cloudflare D1 / Hyperdrive
- **Why:** Global edge, generous free tier, excellent China/Asia performance — important for
  WeChat / China market.
- **DB option:** Use Hyperdrive in front of Neon/Supabase Postgres for low-latency Asia access.

### 🥉 Railway — easiest one-platform deploy
- **Why:** Click-and-deploy Postgres + Next.js together. Great for non-technical owners.
- **Cost:** Pay-as-you-go from ~$5/mo.

### Other excellent options
- **Render.com** — managed Postgres + web services + cron jobs; simple pricing
- **Fly.io** — global edge, multi-region Postgres, generous free allowance
- **DigitalOcean App Platform** — predictable pricing, optional managed Postgres
- **AWS Amplify / Lightsail** — enterprise scale; pair with RDS Postgres
- **Self-host on a VPS** (Hetzner / Contabo / DigitalOcean Droplet) using the included `Dockerfile`

### China-focused performance tip
If you expect significant traffic from 🇨🇳 China, place the app behind a CDN with mainland
PoPs (Cloudflare China Network via Baidu, or Tencent EdgeOne) and consider an ICP-licensed
Tencent Cloud / Alibaba Cloud sub-deployment. WhatsApp is blocked in mainland China — the site
also exposes a WeChat ID (`LevivaTravel`) and SMS fall-back so visitors are never stuck.

---

## Going live checklist

- [ ] Purchase domain (e.g. `levivatravel.com`) and point DNS to host
- [ ] Configure `NEXT_PUBLIC_SITE_URL`
- [ ] Configure SMTP credentials (Zoho Mail, Google Workspace, Resend, SES…)
- [ ] Run `prisma db push` & `npm run db:seed` against production DB
- [ ] Replace stock imagery in `prisma/seed.ts` and the `Hero` background with Leviva’s own photography
- [ ] Add Google Analytics 4 / Plausible script (drop in `app/layout.tsx`)
- [ ] Register the business with Google Business Profile and submit `sitemap.xml`
  in Google Search Console + Bing Webmaster Tools + Yandex + Baidu
- [ ] Set up Facebook/Meta Pixel & TikTok Pixel for retargeting in source markets
- [ ] Add SSL (Vercel / Cloudflare provides automatic)
- [ ] Enable a CMS layer (Sanity, Payload, Strapi) on top of Prisma if non-technical staff
  need to publish blog content / new tours
- [ ] Connect Stripe + Alipay + WeChat Pay (Stripe supports all three) for online deposits

---

## Scripts

```
npm run dev      # local dev with hot reload
npm run build    # production build (Prisma generate + Next build)
npm start        # start production server
npm run lint     # ESLint
npm run db:push  # apply schema
npm run db:seed  # seed demo content
```

---

© Leviva Investments Ltd. — Built with ♥ for African travel.
