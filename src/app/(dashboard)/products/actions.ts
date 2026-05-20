"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type ProductFormState = { error?: string };

export async function createProduct(
  _prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const sku = String(formData.get("sku") ?? "").trim().toUpperCase();
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const unit = String(formData.get("unit") ?? "").trim() || "ea";
  if (!sku || !name) {
    return { error: "SKU and name are required." };
  }
  try {
    await prisma.product.create({
      data: { sku, name, description, unit },
    });
  } catch {
    return { error: "SKU must be unique." };
  }
  revalidatePath("/products");
  return {};
}
