# Leviva Travel & Tours — East Africa Safari Website

A full-stack travel and tours website for **Leviva Investments Co. Ltd**, specializing in safari tours, mountain treks, and beach retreats across **Tanzania, Zanzibar, Botswana, Kenya, and Rwanda**.

## Tech Stack

- **Framework:** Next.js 16 (React 19) with TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** SQLite via Prisma ORM + LibSQL adapter
- **Backend:** Next.js API Routes
- **Deployment:** Docker + standalone output

## Features

### High-Conversion Booking System
- Multi-step booking form with real-time validation
- WhatsApp integration for instant communication
- Trust badges and social proof throughout
- Clear CTAs on every page
- "No payment required" messaging to reduce friction
- Mobile-first responsive design

### Tour Management
- 8 curated tour packages across 5 East African destinations
- Detailed tour pages with day-by-day itineraries
- Pricing, inclusions/exclusions, difficulty levels
- Dynamic filtering by destination and category

### SEO Optimized
- Server-side rendering and static generation
- OpenGraph and Twitter Card meta tags
- Semantic HTML structure
- Structured data for search engines
- Fast page loads with Next.js optimizations

### Target Markets
Designed for tourists from: China, USA, Europe (UK, Germany, France), South Korea, Australia, and New Zealand.

## Getting Started

### Prerequisites
- Node.js 18+ (recommended: 22+)
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd leviva-travel

# Install dependencies
npm install

# Set up the database
npx prisma db push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
DATABASE_URL="file:./dev.db"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
CONTACT_EMAIL="info@levivainvestments.co.tz"
NEXT_PUBLIC_SITE_URL="https://levivainvestments.co.tz"
NEXT_PUBLIC_WHATSAPP="+255758996047"
NEXT_PUBLIC_PHONE="+255758996047"
NEXT_PUBLIC_EMAIL="info@levivainvestments.co.tz"
```

### Build for Production

```bash
npm run build
npm start
```

### Docker Deployment

```bash
docker compose up -d
```

## Project Structure

```
src/
├── app/
│   ├── api/           # Backend API routes
│   │   ├── bookings/  # Booking submissions
│   │   ├── contact/   # Contact form
│   │   ├── newsletter/# Newsletter subscriptions
│   │   └── tours/     # Tour listings API
│   ├── about/         # About page
│   ├── booking/       # Booking page
│   ├── contact/       # Contact page
│   ├── destinations/  # Destination pages
│   │   └── [slug]/    # Dynamic destination detail
│   ├── tours/         # Tour listing
│   │   └── [slug]/    # Dynamic tour detail
│   ├── layout.tsx     # Root layout with nav/footer
│   └── page.tsx       # Homepage
├── components/        # Reusable UI components
├── data/              # Tour and destination data
└── lib/               # Utilities and database client
```

## Contact

- **Email:** info@levivainvestments.co.tz
- **Phone/WhatsApp:** +255 758 996 047
- **Location:** Dar es Salaam, Tanzania

---

## Recommended Hosting Platforms

### Best Options for This Website:

1. **Vercel** (Recommended - Best for Next.js)
   - Native Next.js support (built by the same team)
   - Automatic CI/CD from GitHub
   - Global CDN with edge functions
   - Free tier available, Pro at $20/month
   - Automatic HTTPS and custom domains
   - Setup: `npm i -g vercel && vercel`

2. **Railway** (Best for full-stack with database)
   - One-click deployments from GitHub
   - Built-in PostgreSQL/SQLite support
   - Automatic HTTPS and custom domains
   - $5/month starter plan
   - Setup: Connect GitHub repo on railway.app

3. **Render** (Great value)
   - Free tier for web services
   - Automatic deploys from GitHub
   - Built-in SSL and custom domains
   - Paid plans from $7/month
   - PostgreSQL add-on available

4. **DigitalOcean App Platform** (Reliable)
   - Docker support with auto-deploy
   - Managed databases available
   - Starts at $5/month
   - Data centers close to target markets

5. **AWS Amplify** (Enterprise-grade)
   - Full AWS infrastructure
   - Global CDN with CloudFront
   - Auto-scaling capabilities
   - Pay-as-you-go pricing

### For the .co.tz Domain:
- Register/manage at [TZ NIC](https://www.tznic.or.tz/) or through registrars like Namecheap/GoDaddy
- Point DNS to your hosting provider

### Quick Deploy to Vercel:
```bash
npm install -g vercel
vercel
# Follow the prompts to deploy
```
