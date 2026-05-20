export const warehouses = [
  {
    id: "WH-ATL",
    name: "Atlanta Distribution Hub",
    city: "Atlanta",
    region: "Southeast",
    capacity: 12000,
    inventory: [
      { sku: "MED-100", name: "Medical kits", onHand: 900, reorderPoint: 650 },
      { sku: "ELE-220", name: "Electronics pallets", onHand: 360, reorderPoint: 300 },
      { sku: "APP-310", name: "Apparel cartons", onHand: 1500, reorderPoint: 900 }
    ]
  },
  {
    id: "WH-DAL",
    name: "Dallas Cross Dock",
    city: "Dallas",
    region: "Central",
    capacity: 9000,
    inventory: [
      { sku: "MED-100", name: "Medical kits", onHand: 440, reorderPoint: 650 },
      { sku: "GRC-440", name: "Grocery totes", onHand: 1100, reorderPoint: 850 },
      { sku: "IND-520", name: "Industrial spares", onHand: 260, reorderPoint: 350 }
    ]
  },
  {
    id: "WH-LAX",
    name: "Los Angeles Fulfillment Center",
    city: "Los Angeles",
    region: "West",
    capacity: 15000,
    inventory: [
      { sku: "ELE-220", name: "Electronics pallets", onHand: 240, reorderPoint: 300 },
      { sku: "APP-310", name: "Apparel cartons", onHand: 2100, reorderPoint: 900 },
      { sku: "GRC-440", name: "Grocery totes", onHand: 720, reorderPoint: 850 }
    ]
  }
];

export const fleet = [
  {
    id: "TRK-104",
    type: "Dry van",
    homeBase: "WH-ATL",
    driver: "Ava Carter",
    maxWeightKg: 11000,
    maxRouteKm: 1800,
    status: "available"
  },
  {
    id: "TRK-215",
    type: "Refrigerated",
    homeBase: "WH-DAL",
    driver: "Noah Singh",
    maxWeightKg: 9000,
    maxRouteKm: 1300,
    status: "available"
  },
  {
    id: "TRK-330",
    type: "Box truck",
    homeBase: "WH-LAX",
    driver: "Mia Lopez",
    maxWeightKg: 4200,
    maxRouteKm: 800,
    status: "maintenance"
  },
  {
    id: "TRK-418",
    type: "Electric box truck",
    homeBase: "WH-ATL",
    driver: "Ethan Brooks",
    maxWeightKg: 3600,
    maxRouteKm: 420,
    status: "available"
  }
];

export const shipments = [
  {
    id: "SHP-1001",
    customer: "Northstar Clinics",
    origin: "WH-ATL",
    destination: "Charlotte, NC",
    distanceKm: 395,
    weightKg: 2400,
    priority: "expedited",
    status: "in_transit",
    vehicleId: "TRK-418",
    eta: "2026-05-21"
  },
  {
    id: "SHP-1002",
    customer: "Metro Market Group",
    origin: "WH-DAL",
    destination: "Denver, CO",
    distanceKm: 1060,
    weightKg: 7200,
    priority: "standard",
    status: "scheduled",
    vehicleId: "TRK-215",
    eta: "2026-05-24"
  },
  {
    id: "SHP-1003",
    customer: "Pacific Components",
    origin: "WH-LAX",
    destination: "Phoenix, AZ",
    distanceKm: 600,
    weightKg: 3900,
    priority: "standard",
    status: "delayed",
    vehicleId: null,
    eta: "2026-05-22"
  },
  {
    id: "SHP-1004",
    customer: "Summit Outfitters",
    origin: "WH-ATL",
    destination: "Nashville, TN",
    distanceKm: 400,
    weightKg: 3100,
    priority: "economy",
    status: "delivered",
    vehicleId: "TRK-104",
    eta: "2026-05-19"
  }
];
