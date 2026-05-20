# Leviva Travel & Tours — Full Stack Website

A modern, high-conversion travel and tours website for **Leviva Travel & Tours**, specializing in Tanzania, Zanzibar, Botswana, and East African destinations. Built with Next.js 16, TypeScript, and Tailwind CSS.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React + custom SVG social icons
- **Forms**: React Hook Form patterns with built-in validation
- **Animations**: CSS animations + Framer Motion
- **Backend**: Next.js API Routes (booking & inquiry endpoints)
- **SEO**: Full metadata, sitemap.xml, robots.txt, Open Graph tags

## Features

### Pages
- **Homepage** — Hero with search bar, featured destinations, popular tours, testimonials, trust signals, CTA
- **Destinations** — Tanzania, Zanzibar, Botswana, East Africa (dynamic routes)
- **Tours** — All tour packages with filtering by category
- **Tour Detail** — Full itinerary, highlights, inclusions, sticky booking sidebar
- **Book** — Conversion-optimized booking form with step-by-step process
- **About** — Company story, values, multilingual team, stats
- **Contact** — Contact info, WhatsApp, response times, inquiry form
- **404** — Custom not-found page

### Conversion Optimization
- Sticky "Book Now" button in navigation
- Pulsing CTA buttons with visual urgency
- WhatsApp floating button for instant chat
- "No payment required" messaging to reduce friction
- Social proof (15,000+ travelers, 4.9/5 rating)
- Discount badges on tour cards
- "Responds within 2 hours" promise
- Trust signals (Licensed, Insured, Award-winning)
- Multi-language support indicators (EN, 中文, 한국어, FR, DE)
- Country-targeted testimonials (China, USA, Europe, South Korea, Australia, NZ)

### Backend API
- `POST /api/booking` — Handles tour booking requests with validation
- `POST /api/inquiry` — Handles general inquiries
- `GET /api/booking` — Health check endpoint

### SEO
- Dynamic metadata for every page
- Auto-generated `sitemap.xml` covering all routes
- `robots.txt` configuration
- Open Graph tags for social sharing
- Semantic HTML structure

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── booking/route.ts     # Booking API endpoint
│   │   └── inquiry/route.ts     # Inquiry API endpoint
│   ├── about/page.tsx           # About page
│   ├── book/page.tsx            # Booking page
│   ├── contact/page.tsx         # Contact page
│   ├── destinations/[slug]/     # Dynamic destination pages
│   ├── tours/
│   │   ├── page.tsx             # All tours listing
│   │   └── [id]/page.tsx        # Individual tour detail
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout with nav & footer
│   ├── not-found.tsx            # Custom 404 page
│   ├── page.tsx                 # Homepage
│   ├── robots.ts                # SEO robots.txt
│   └── sitemap.ts               # SEO sitemap
├── components/
│   ├── BookingForm.tsx          # Reusable booking form
│   ├── Footer.tsx               # Site footer
│   ├── Navbar.tsx               # Navigation bar
│   ├── TestimonialCard.tsx      # Testimonial display card
│   ├── TourCard.tsx             # Tour package card
│   └── WhatsAppButton.tsx       # Floating WhatsApp CTA
└── lib/
    └── data.ts                  # Tour, destination & testimonial data
```

## Recommended Hosting Platforms

### Best Options (Recommended)

1. **Vercel** (Best for Next.js) — https://vercel.com
   - Built by the creators of Next.js
   - Zero-config deployment, automatic HTTPS
   - Edge network for global performance
   - Free tier available, Pro from $20/month
   - **Deploy**: Connect GitHub repo → automatic deployments

2. **Netlify** — https://netlify.com
   - Excellent Next.js support
   - Form handling built-in
   - Free tier available, Pro from $19/month
   - **Deploy**: Connect GitHub repo → automatic deployments

3. **Railway** — https://railway.app
   - Full-stack hosting with database support
   - Easy PostgreSQL/MongoDB integration for bookings
   - From $5/month
   - **Deploy**: Connect GitHub repo → automatic deployments

### Other Solid Options

4. **DigitalOcean App Platform** — https://digitalocean.com
   - $5/month, good for custom domain setup
   - Managed databases available

5. **AWS Amplify** — https://aws.amazon.com/amplify
   - Enterprise-grade, global CDN
   - Pay-as-you-go pricing

6. **Render** — https://render.com
   - Simple deployment, free tier
   - Good for adding databases later

### Custom Domain Setup

After deploying, configure your domain `levivainvestments.co.tz`:
1. Add your custom domain in your hosting platform
2. Update DNS records (A record or CNAME) at your domain registrar
3. SSL certificate is typically auto-provisioned

## Production Checklist

Before going live, integrate:

- [ ] **Email Service** (SendGrid, Resend, or Mailgun) — for booking confirmations
- [ ] **Database** (PostgreSQL via Supabase/Neon, or MongoDB Atlas) — to store bookings
- [ ] **Payment Gateway** (Stripe or Flutterwave for Africa) — for deposit collection
- [ ] **Analytics** (Google Analytics 4, Plausible, or Vercel Analytics) — for tracking
- [ ] **CRM Integration** (HubSpot or Salesforce) — for lead management
- [ ] **Real images** — Replace Unsplash URLs with your own high-quality photos
- [ ] **Social media links** — Update with actual Leviva social profiles
- [ ] **Google Business Profile** — Set up for local SEO

## Contact

- **Email**: info@levivainvestments.co.tz
- **Phone**: +255 758 996 047
- **Location**: Arusha, Tanzania
