# Leviva Travel & Tours — Full-Stack Website

Production-ready travel booking website for **Leviva Travel & Tours**, specializing in Tanzania, Zanzibar, Botswana, and East Africa safaris for international travelers from China, USA, Europe, South Korea, Australia, and New Zealand.

## Contact

- **Email:** info@levivainvestments.co.tz
- **Phone / WhatsApp:** +255758996047

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS 4 |
| Backend | Next.js API Routes (REST) |
| Database | Prisma ORM + SQLite (dev) / PostgreSQL (production) |
| Validation | Zod |
| i18n | English, 中文, 한국어 (conversion-focused markets) |

## Features (Booking Conversion)

- **3-step booking funnel** — no credit card required, reduces friction
- **Sticky mobile CTA** — WhatsApp + Book Now always visible
- **Multi-language** — EN / ZH / KO for key source markets
- **Social proof** — testimonials from all 6 target regions
- **Trust signals** — licensed operator, 24h quote, ratings
- **WhatsApp integration** — one-tap chat for high-intent leads
- **SEO** — sitemap, robots.txt, JSON-LD TravelAgency schema
- **Tour detail sticky booking card** — persistent CTA on scroll

## Quick Start (Local)

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Create database & seed tours
npx prisma db push
npm run db:seed

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tours` | List all tours (`?featured=true`, `?destination=Tanzania`) |
| GET | `/api/tours/[slug]` | Single tour details |
| POST | `/api/bookings` | Create booking inquiry |
| POST | `/api/contact` | Contact form submission |
| POST | `/api/newsletter` | Newsletter subscription |

## Production Database (PostgreSQL)

For production hosting, switch Prisma to PostgreSQL:

1. In `prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Set `DATABASE_URL` to your PostgreSQL connection string (Neon, Supabase, Railway Postgres).
3. Run `npx prisma db push && npm run db:seed`

## Deployment

### Recommended Hosting (Best Options)

| Platform | Best For | Why |
|----------|----------|-----|
| **[Vercel](https://vercel.com)** | Next.js frontend + API | Zero-config Next.js deploy, global CDN, free tier. Pair with **Neon PostgreSQL** for database. |
| **[Railway](https://railway.app)** | Full-stack + PostgreSQL | One-click Postgres, persistent DB, Docker support. **Top pick for this project.** |
| **[Render](https://render.com)** | Docker + managed Postgres | Free tier, easy Docker deploy, background workers. |
| **[DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)** | Production scale | Managed apps + managed PostgreSQL in one account. |
| **[Netlify](https://www.netlify.com)** | Static + serverless | Good for frontend; use external API/DB for bookings. |
| **[AWS Amplify](https://aws.amazon.com/amplify/)** | Enterprise / AWS ecosystem | CI/CD, custom domains, integrates with RDS. |

**Domain tip:** Register `levivatravel.com` or `leviva-safaris.com` via Namecheap or Cloudflare Registrar, then point DNS to your host.

### Deploy to Vercel (Fastest)

```bash
npm i -g vercel
vercel
```

Set environment variables in Vercel dashboard:
- `DATABASE_URL` — Neon/Supabase PostgreSQL URL
- `NEXT_PUBLIC_SITE_URL` — your production URL
- `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `BOOKING_WEBHOOK_URL` (optional) — Slack/Discord/Zapier for instant booking alerts

### Deploy with Docker (Railway / Render / VPS)

```bash
docker compose up --build
```

### Environment Variables

See `.env.example` for all variables.

## Project Structure

```
src/
├── app/              # Pages & API routes
│   ├── api/          # Backend REST API
│   ├── book/         # Conversion booking funnel
│   ├── tours/        # Tour listing & detail
│   └── ...
├── components/       # UI components
└── lib/              # Prisma, i18n, validations
prisma/
├── schema.prisma     # Database models
└── seed.ts           # Sample safari tours
```

## Post-Launch Checklist

- [ ] Connect custom domain + SSL
- [ ] Switch to PostgreSQL for persistent bookings
- [ ] Set `BOOKING_WEBHOOK_URL` for instant Slack/email alerts on new bookings
- [ ] Add Google Analytics 4 + Meta Pixel for conversion tracking
- [ ] Submit sitemap to Google Search Console
- [ ] Replace Unsplash images with licensed tour photos
- [ ] Connect payment gateway (Stripe/PayPal) when ready for deposits

## License

Proprietary — Leviva Travel & Tours / Leviva Investments.
