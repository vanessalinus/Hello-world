import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const url = process.env.DATABASE_URL ?? "file:./dev.db";
const adapter = new PrismaBetterSqlite3({ url });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.shipmentLine.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.stockLevel.deleteMany();
  await prisma.product.deleteMany();
  await prisma.warehouse.deleteMany();

  const east = await prisma.warehouse.create({
    data: {
      name: "East Coast DC",
      address: "1200 Logistics Way",
      city: "Newark, NJ",
    },
  });

  const central = await prisma.warehouse.create({
    data: {
      name: "Central Hub",
      address: "88 Distribution Blvd",
      city: "Dallas, TX",
    },
  });

  const widgets = await prisma.product.create({
    data: {
      sku: "WDG-100",
      name: "Industrial Widget",
      description: "Standard line item for demos",
      unit: "ea",
    },
  });

  const brackets = await prisma.product.create({
    data: {
      sku: "BKT-22",
      name: "Mounting Bracket",
      unit: "ea",
    },
  });

  await prisma.stockLevel.createMany({
    data: [
      { warehouseId: east.id, productId: widgets.id, quantity: 240 },
      { warehouseId: east.id, productId: brackets.id, quantity: 90 },
      { warehouseId: central.id, productId: widgets.id, quantity: 500 },
    ],
  });

  await prisma.shipment.create({
    data: {
      reference: "SH-DEMO-001",
      status: "SCHEDULED",
      originWarehouseId: east.id,
      destinationName: "Acme Retail #42",
      destinationAddress: "500 Commerce St",
      destinationCity: "Philadelphia, PA",
      carrier: "FastLane Freight",
      scheduledDate: new Date(Date.now() + 86400000),
      lines: {
        create: [{ productId: widgets.id, quantity: 48 }],
      },
    },
  });

  console.log("Seed data created: warehouses, products, stock, sample shipment.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
