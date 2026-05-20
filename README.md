# Leviva Travel & Tours - Full-Stack Website

Production-ready full-stack website for **Leviva Travel & Tours**, focused on:

- Tanzania
- Zanzibar
- Botswana
- Other East Africa destinations

Primary tourist source markets covered in UX and messaging:

- China
- USA
- Europe
- South Korea
- Australia
- New Zealand

Business contacts used on the site:

- Email: `info@levivainvestments.co.tz`
- Phone/WhatsApp: `+255758996047`

## Tech Stack (Modern)

- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express + TypeScript + Zod validation
- **Lead Storage:** JSON persistence (easy start), API-ready for managed database migration

## Project Structure

```bash
.
├── backend
│   ├── src
│   ├── .env.example
│   └── package.json
├── frontend
│   ├── src
│   ├── .env.example
│   └── package.json
└── README.md
```

## Key Conversion Features Implemented

- High-intent booking form (package-first conversion flow)
- Custom itinerary inquiry form (captures undecided users)
- Clear trust elements (24/7 support, visa/flight support, secure confirmation)
- Destination-focused package cards with pricing anchor
- Social proof section (testimonials)
- Source-market specific positioning copy
- Prominent CTA buttons and contact touchpoints above the fold

## Local Development

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend default URL: `http://localhost:4000`

### 2) Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend default URL: `http://localhost:5173`

## Production Build

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

## API Endpoints

- `GET /api/health`
- `GET /api/source-markets`
- `GET /api/packages`
- `GET /api/testimonials`
- `POST /api/inquiries`
- `POST /api/bookings`

## Best Hosting Recommendations

For best reliability and conversion performance:

1. **Vercel (Frontend) + Render or Railway (Backend) + Supabase/Neon (Database)**
   - Fast global CDN
   - Easy CI/CD from GitHub
   - Great DX and autoscaling

2. **Cloudflare Pages (Frontend) + Fly.io (Backend) + Supabase (Database)**
   - Excellent global performance
   - Strong edge networking
   - Cost-efficient at early growth stages

3. **DigitalOcean App Platform (Both frontend + backend)**
   - Simpler single-vendor setup
   - Easy managed deployment for teams wanting one dashboard

## Publish/Host Checklist

1. Push repository to GitHub.
2. Deploy backend first; set:
   - `PORT`
   - `FRONTEND_URL` (your frontend production URL)
3. Deploy frontend; set:
   - `VITE_API_BASE_URL` (backend production `/api` URL)
4. Configure custom domain.
5. Enable HTTPS, analytics, and form notification workflows.
6. Migrate lead storage to managed DB before heavy traffic.

## Conversion Optimization Next Steps

- Add multilingual landing pages (EN + ZH + KO)
- Add WhatsApp floating CTA for instant conversation
- Add analytics events (CTA clicks, package selection, form completion)
- Add abandoned inquiry follow-up automation (email/CRM)
- Add A/B tests on hero copy and package ordering
