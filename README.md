# Logistics Management

Web app for **warehouses**, **product catalog**, **inventory by location**, and **outbound shipments** with status workflow. Built with [Next.js](https://nextjs.org/) (App Router), [Prisma ORM](https://www.prisma.io/) 7, and SQLite via `better-sqlite3`.

## Features

- **Dashboard** — counts for sites, SKUs, shipments, and total units on hand.
- **Warehouses** — create distribution centers; delete only when no outbound shipments reference them.
- **Products** — SKU catalog with optional description and unit of measure.
- **Inventory** — view balances per warehouse/SKU; post positive or negative adjustments (with guardrails so quantity cannot go negative).
- **Shipments** — draft loads with one line item; update lifecycle (`DRAFT` → `SCHEDULED` → `IN_TRANSIT` → `DELIVERED` / `CANCELLED`). Moving to **`DELIVERED`** deducts stock at the **origin** warehouse for each line; insufficient stock blocks the transition. Delivered shipments are **locked** (no status regression in this version).

## Setup

```bash
cp .env.example .env
npm install
npx prisma migrate deploy
npx prisma db seed   # optional demo data
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The SQLite file path is controlled by `DATABASE_URL` (default `file:./dev.db` at the project root). The database file is gitignored.

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Apply migrations, generate Prisma client, production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |
| `npm run db:migrate` | Create/apply a new migration in development |
| `npm run db:seed` | Reseed demo warehouses, products, stock, and a sample shipment |

## Stack

- Next.js 15, React 19, TypeScript, Tailwind CSS 4
- Prisma 7 (Rust-free client) with `@prisma/adapter-better-sqlite3`
