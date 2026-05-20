import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { packages, testimonials } from "./data.js";
import { appendLeadRecord } from "./storage.js";
import { sourceMarkets } from "./types.js";
import { bookingSchema, inquirySchema } from "./validation.js";

dotenv.config();

const port = Number(process.env.PORT ?? 4000);
const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";

const app = express();

app.use(
  cors({
    origin: frontendUrl,
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "leviva-backend" });
});

app.get("/api/source-markets", (_req, res) => {
  res.json({ sourceMarkets });
});

app.get("/api/packages", (req, res) => {
  const destination = `${req.query.destination ?? ""}`.trim().toLowerCase();
  if (!destination) {
    res.json({ packages });
    return;
  }

  const filtered = packages.filter((tourPackage) =>
    tourPackage.destination.toLowerCase().includes(destination),
  );
  res.json({ packages: filtered });
});

app.get("/api/testimonials", (_req, res) => {
  res.json({ testimonials });
});

app.post("/api/inquiries", async (req, res) => {
  const parsed = inquirySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid inquiry payload.",
      issues: parsed.error.issues,
    });
    return;
  }

  const record = await appendLeadRecord("inquiry", parsed.data);
  res.status(201).json({
    message: "Inquiry captured. Leviva team will contact you shortly.",
    reference: record.id,
  });
});

app.post("/api/bookings", async (req, res) => {
  const parsed = bookingSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid booking payload.",
      issues: parsed.error.issues,
    });
    return;
  }

  const selectedPackage = packages.find(
    (tourPackage) => tourPackage.id === parsed.data.packageId,
  );
  if (!selectedPackage) {
    res.status(404).json({ message: "Selected package was not found." });
    return;
  }

  const record = await appendLeadRecord("booking", {
    ...parsed.data,
    packageTitle: selectedPackage.title,
  });

  res.status(201).json({
    message: "Booking request received. A travel advisor will confirm within 24 hours.",
    reference: record.id,
  });
});

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found." });
});

app.listen(port, () => {
  console.log(`Leviva backend API listening on port ${port}`);
});
