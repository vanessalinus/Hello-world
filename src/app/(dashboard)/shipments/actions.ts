"use server";

import { revalidatePath } from "next/cache";
import type { ShipmentStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export type ShipmentFormState = { error?: string };

function parseScheduled(value: FormDataEntryValue | null): Date | null {
  const s = value == null ? "" : String(value).trim();
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function createShipment(
  _prev: ShipmentFormState,
  formData: FormData,
): Promise<ShipmentFormState> {
  const originWarehouseId = String(formData.get("originWarehouseId") ?? "");
  const destinationName = String(formData.get("destinationName") ?? "").trim();
  const destinationAddress = String(formData.get("destinationAddress") ?? "").trim();
  const destinationCity = String(formData.get("destinationCity") ?? "").trim();
  const carrier = String(formData.get("carrier") ?? "").trim() || null;
  const scheduledDate = parseScheduled(formData.get("scheduledDate"));
  const productId = String(formData.get("productId") ?? "");
  const qtyRaw = String(formData.get("quantity") ?? "").trim();
  const quantity = Number.parseInt(qtyRaw, 10);

  if (
    !originWarehouseId ||
    !destinationName ||
    !destinationAddress ||
    !destinationCity ||
    !productId ||
    Number.isNaN(quantity) ||
    quantity <= 0
  ) {
    return { error: "Fill all required destination fields, product, and a positive quantity." };
  }

  const reference = `SH-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 999)}`;

  try {
    await prisma.shipment.create({
      data: {
        reference,
        status: "DRAFT",
        originWarehouseId,
        destinationName,
        destinationAddress,
        destinationCity,
        carrier,
        scheduledDate,
        lines: {
          create: [{ productId, quantity }],
        },
      },
    });
  } catch {
    return { error: "Could not create shipment (check product and warehouse)." };
  }

  revalidatePath("/shipments");
  return {};
}

export async function updateShipmentStatus(
  _prev: ShipmentFormState,
  formData: FormData,
): Promise<ShipmentFormState> {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as ShipmentStatus;
  if (!id || !status) {
    return { error: "Missing shipment or status." };
  }

  const allowed: ShipmentStatus[] = [
    "DRAFT",
    "SCHEDULED",
    "IN_TRANSIT",
    "DELIVERED",
    "CANCELLED",
  ];
  if (!allowed.includes(status)) {
    return { error: "Invalid status." };
  }

  const shipment = await prisma.shipment.findUnique({
    where: { id },
    include: { lines: true },
  });
  if (!shipment) {
    return { error: "Shipment not found." };
  }

  if (shipment.status === "DELIVERED" && status !== "DELIVERED") {
    return {
      error:
        "Delivered shipments cannot change status in this version (prevents stock drift).",
    };
  }

  if (status === "DELIVERED" && shipment.status !== "DELIVERED") {
    try {
      await prisma.$transaction(async (tx) => {
        for (const line of shipment.lines) {
          const stock = await tx.stockLevel.findUnique({
            where: {
              warehouseId_productId: {
                warehouseId: shipment.originWarehouseId,
                productId: line.productId,
              },
            },
          });
          if (!stock || stock.quantity < line.quantity) {
            throw new Error("STOCK");
          }
          await tx.stockLevel.update({
            where: { id: stock.id },
            data: { quantity: stock.quantity - line.quantity },
          });
        }
        await tx.shipment.update({
          where: { id },
          data: {
            status: "DELIVERED",
            deliveredAt: new Date(),
          },
        });
      });
    } catch {
      return {
        error:
          "Not enough on-hand stock at the origin warehouse to mark this shipment delivered.",
      };
    }
    revalidatePath("/shipments");
    revalidatePath(`/shipments/${id}`);
    revalidatePath("/inventory");
    return {};
  }

  await prisma.shipment.update({
    where: { id },
    data: {
      status,
      ...(status === "DELIVERED"
        ? { deliveredAt: new Date() }
        : { deliveredAt: null }),
    },
  });

  revalidatePath("/shipments");
  revalidatePath(`/shipments/${id}`);
  return {};
}
