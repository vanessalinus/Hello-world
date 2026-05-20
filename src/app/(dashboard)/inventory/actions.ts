"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type StockFormState = { error?: string };

export async function adjustStock(
  _prev: StockFormState,
  formData: FormData,
): Promise<StockFormState> {
  const warehouseId = String(formData.get("warehouseId") ?? "");
  const productId = String(formData.get("productId") ?? "");
  const deltaRaw = String(formData.get("delta") ?? "").trim();
  const delta = Number.parseInt(deltaRaw, 10);
  if (!warehouseId || !productId || Number.isNaN(delta) || delta === 0) {
    return {
      error: "Pick warehouse, product, and a non-zero whole number delta.",
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const row = await tx.stockLevel.findUnique({
        where: {
          warehouseId_productId: { warehouseId, productId },
        },
      });
      if (!row) {
        if (delta < 0) {
          throw new Error("NO_ROW");
        }
        await tx.stockLevel.create({
          data: { warehouseId, productId, quantity: delta },
        });
        return;
      }
      const next = row.quantity + delta;
      if (next < 0) {
        throw new Error("NEGATIVE");
      }
      await tx.stockLevel.update({
        where: { id: row.id },
        data: { quantity: next },
      });
    });
  } catch {
    return {
      error:
        "Cannot reduce below zero, or cannot apply negative delta without an existing stock row.",
    };
  }

  revalidatePath("/inventory");
  return {};
}
