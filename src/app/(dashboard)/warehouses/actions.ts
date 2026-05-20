"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type FormState = { error?: string };

export async function createWarehouse(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  if (!name || !address || !city) {
    return { error: "Name, address, and city are required." };
  }
  await prisma.warehouse.create({ data: { name, address, city } });
  revalidatePath("/warehouses");
  return {};
}

export async function deleteWarehouse(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const count = await prisma.shipment.count({
    where: { originWarehouseId: id },
  });
  if (count > 0) {
    revalidatePath("/warehouses");
    return;
  }
  await prisma.warehouse.delete({ where: { id } });
  revalidatePath("/warehouses");
}
