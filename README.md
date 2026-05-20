# Leviva Travel & Tours

Production-ready full-stack travel website for **Leviva Travel & Tours**, focused on:

- Tanzania safaris
- Zanzibar beach holidays
- Botswana luxury safaris
- Wider East Africa journeys

The site is designed to convert travel interest into qualified booking enquiries from visitors in **China, the USA, Europe, South Korea, Australia, and New Zealand**.

## Tech stack

- **Next.js 16** with App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Prisma ORM**
- **PostgreSQL** (recommended for production)

## Features

- Modern landing page built for booking conversion
- Market-specific messaging for priority source countries
- Lead capture form with validation
- Backend API route for enquiries
- Prisma schema for storing booking/contact leads
- Health endpoint for deployment monitoring
- SEO metadata, sitemap, robots.txt, and schema.org structured data
- Docker support for container-based hosting

## Contact details used on the site

- Email: `info@levivainvestments.co.tz`
- Phone: `+255758996047`

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create an environment file:

   ```bash
   cp .env.example .env
   ```

3. Set `DATABASE_URL` to your PostgreSQL connection string.

4. Generate Prisma client:

   ```bash
   npm run prisma:generate
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

## Production deployment

### Recommended setup

**Best overall option:**  
Deploy the Next.js app on **Vercel** and connect it to a managed PostgreSQL database on **Neon** or **Supabase**.

Why this is the best fit:

- Excellent support for Next.js
- Fast global edge delivery
- Easy custom domain setup
- Simple environment variable management
- Reliable PostgreSQL hosting options

### Other strong hosting choices

1. **Render** - good all-in-one deployment plus managed database
2. **Railway** - great developer experience and quick full-stack setup
3. **Fly.io** - ideal if you want Docker-based deployment control

## Required environment variables

Create these in your hosting platform:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/leviva?schema=public
NEXT_PUBLIC_SITE_URL=https://www.levivatravel.com
```

## Database setup

After connecting a production PostgreSQL database, run:

```bash
npm run prisma:generate
```

Then apply your database schema using Prisma in your chosen workflow. For example, during setup you can use:

```bash
npx prisma db push
```

## Build

```bash
npm run build
```

## Run in production

```bash
npm run start
```

## Health check

The app exposes a health endpoint:

```text
/api/health
```

## Conversion-focused content strategy included

This website was built to increase bookings by using:

- A clear hero section with a direct quote CTA
- Destination-specific landing content
- Market-specific messaging for priority visitor regions
- Visible trust signals and contact options
- A short enquiry flow with the right fields for sales follow-up
- Strong safari + Zanzibar upsell positioning

## Suggested go-live checklist

- Connect your production domain
- Add real destination photography and brand imagery
- Set the production PostgreSQL database
- Test the enquiry form end to end
- Add analytics (Google Analytics or Plausible)
- Add Meta Pixel / Google Ads conversion tracking if running paid campaigns
- Submit sitemap to Google Search Console

## Repository scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run prisma:generate
npm run prisma:migrate
```
