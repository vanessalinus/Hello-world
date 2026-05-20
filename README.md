# Leviva Travel & Tours – Full-Stack Website

East Africa's premier safari and travel website built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and PostgreSQL.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | PostgreSQL + Prisma ORM |
| Email | Resend (transactional email) |
| Styling | Tailwind CSS + custom design system |
| Deployment | Vercel (recommended) |

## Features

- 🌍 **8 Tour packages** across Tanzania, Zanzibar, Botswana, Rwanda
- 🗺️ **6 Destination pages** with rich content
- 📅 **Multi-step booking system** with guest/date selection
- 💬 **WhatsApp chat widget** for instant customer contact
- 🌐 **Multi-language ready** (English, Chinese, Korean, German, French)
- 📊 **SEO optimized** with metadata, sitemap, robots.txt, schema.org JSON-LD
- 📱 **Mobile-first responsive** design
- 🔐 **Contact form** with email notifications via Resend
- 🔄 **Booking API** with database storage and email confirmations

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your DATABASE_URL and RESEND_API_KEY

# Set up database
npx prisma generate
npx prisma migrate dev

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/leviva_travel"
RESEND_API_KEY="re_your_resend_api_key"
NEXT_PUBLIC_SITE_URL="https://levivainvestments.co.tz"
NEXT_PUBLIC_WHATSAPP_NUMBER="+255758996047"
CONTACT_EMAIL="info@levivainvestments.co.tz"
```

## Deployment

### Option 1: Vercel (Recommended – Best for Next.js)

1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Set up PostgreSQL via [Vercel Postgres](https://vercel.com/storage/postgres) or [Neon](https://neon.tech)
5. Deploy!

```bash
npm i -g vercel
vercel --prod
```

**Pricing:** Free tier available. Pro plan ~$20/mo for custom domain + more bandwidth.

### Option 2: Railway (Full-stack – includes PostgreSQL)

1. Create account at [railway.app](https://railway.app)
2. New project → Deploy from GitHub repo
3. Add PostgreSQL service
4. Set environment variables
5. Deploy automatically on push

**Pricing:** Hobby plan $5/mo. Starter ~$20/mo.

### Option 3: Render

1. Create account at [render.com](https://render.com)
2. New Web Service → Connect GitHub
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`
5. Add PostgreSQL database service
6. Set environment variables

**Pricing:** Free tier (spins down). Starter $7/mo.

### Option 4: AWS / DigitalOcean (Advanced)

For high traffic or custom infrastructure requirements:
- AWS Amplify + RDS PostgreSQL
- DigitalOcean App Platform + Managed Database

## Recommended Hosting: Vercel + Neon

For the best combination of performance, ease of use, and East Africa page-load speeds:

**Vercel** (hosting) + **Neon** (serverless PostgreSQL) + **Cloudflare** (CDN/DNS)

Cost: ~$20-30/month for a production-grade setup serving thousands of visitors.

## Custom Domain Setup

1. Purchase domain at Namecheap, GoDaddy, or Google Domains
2. Point nameservers to Cloudflare (free CDN + SSL)
3. Add CNAME/A record pointing to Vercel deployment URL
4. Enable SSL in Vercel (automatic with Let's Encrypt)

## Email Setup (Resend)

1. Create account at [resend.com](https://resend.com)
2. Verify your domain `levivainvestments.co.tz`
3. Copy API key to `.env` as `RESEND_API_KEY`
4. Update `from` email addresses in `/src/app/api/bookings/route.ts`

## Adding More Tours

Edit `/src/data/tours.ts` to add new tour packages. No database required for static data.

For database-driven tours:
```bash
npx prisma studio  # Visual database editor
```

## SEO Optimization

The site is pre-configured for:
- Server-side metadata for all pages
- JSON-LD structured data (TravelAgency schema)
- Auto-generated XML sitemap at `/sitemap.xml`
- Robots.txt at `/robots.txt`
- Open Graph + Twitter Card images
- Canonical URLs

## Contact

- Email: info@levivainvestments.co.tz
- Phone/WhatsApp: +255 758 996 047
