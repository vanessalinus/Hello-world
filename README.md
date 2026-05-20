# Leviva Travel & Tours — full-stack marketing site

Production-ready marketing and enquiry site for **Leviva Travel & Tours**, highlighting **Tanzania**, **Zanzibar**, **Botswana**, and broader **East Africa**, with copy tuned for guests originating in **China**, the **United States**, **Europe**, **South Korea**, **Australia**, and **New Zealand**.

- **Stack:** [Next.js 16](https://nextjs.org/) (App Router, React 19, TypeScript), [Tailwind CSS](https://tailwindcss.com/), [Zod](https://zod.dev/) on API routes.
- **Contact (live content):** [info@levivainvestments.co.tz](mailto:info@levivainvestments.co.tz) · **+255 758 996 047** · WhatsApp same number.
- **Conversion focus:** repeated primary CTAs, dedicated `/book` brief, WhatsApp floating action button, mobile sticky action bar, trust strip, objection-handling FAQ, and **EN / 中文 / 한국어** language toggle for hero, navigation, and enquiry form labels.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local` and set your canonical URL for metadata and `sitemap.xml`:

```bash
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com
```

## Enquiry API

`POST /api/inquiry` validates JSON with Zod, logs structured payloads to the host console, and appends JSON lines to:

1. `data/inquiries.jsonl` when the filesystem is writable (typical VPS / Docker), or  
2. `/tmp/leviva-inquiries.jsonl` as a fallback (common on ephemeral serverless disks).

**Before going live:** connect a transactional email provider (for example [Resend](https://resend.com/), [Postmark](https://postmarkapp.com/), or [Amazon SES](https://aws.amazon.com/ses/)) or a CRM webhook from the API route so leads are not only on disk or in logs. Never commit `data/inquiries.jsonl` — it is gitignored because it can contain personal data.

## Production build

```bash
npm run build
npm start
```

## Docker (optional)

```bash
docker build -t leviva-travel .
docker run -p 3000:3000 -e NEXT_PUBLIC_SITE_URL=https://www.your-domain.com leviva-travel
```

The image uses Next.js `output: "standalone"` for a compact Node runtime.

---

## Hosting recommendations (best fit first)

| Provider | Why it fits this project |
|----------|---------------------------|
| **[Vercel](https://vercel.com/)** | Native Next.js hosting: global CDN, automatic HTTPS, preview deployments, and zero-config scaling for the App Router and API routes. Lowest friction for teams who want “push to deploy”. |
| **[Netlify](https://www.netlify.com/)** | Solid alternative with good DX, edge functions, and easy environment variable management if you already standardise on Netlify. |
| **[Cloudflare Pages](https://pages.cloudflare.com/)** + Workers | Excellent global performance and pricing; wire API routes through [OpenNext](https://opennext.js.org/) or a small external API if you outgrow simple patterns. |
| **[Railway](https://railway.app/)** or **[Render](https://render.com/)** | Straightforward Docker or Node deploys, simple secrets management, good when you want one container for `next start` and predictable billing. |
| **[DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)** or **[AWS Amplify Hosting](https://aws.amazon.com/amplify/hosting/)** | Enterprise-friendly paths if you already live in those ecosystems. |

**Operational checklist for any host:** custom domain + **HTTPS**, `NEXT_PUBLIC_SITE_URL` set to that domain, email deliverability (SPF/DKIM) for `info@levivainvestments.co.tz`, and a monitored inbox or CRM for `/api/inquiry` follow-up.

---

## Licence

Proprietary — Leviva Investments / Leviva Travel & Tours. Update this section if you release under an open licence.
