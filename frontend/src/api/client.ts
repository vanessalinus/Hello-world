const API_BASE = "/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Request failed");
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  dashboard: {
    stats: () => request<import("../types").DashboardStats>("/dashboard/stats"),
  },
  warehouses: {
    list: () => request<import("../types").Warehouse[]>("/warehouses"),
    create: (data: Omit<import("../types").Warehouse, "id" | "created_at">) =>
      request<import("../types").Warehouse>("/warehouses", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    delete: (id: number) =>
      request<void>(`/warehouses/${id}`, { method: "DELETE" }),
  },
  inventory: {
    list: (params?: { warehouse_id?: number; low_stock?: boolean; search?: string }) => {
      const q = new URLSearchParams();
      if (params?.warehouse_id) q.set("warehouse_id", String(params.warehouse_id));
      if (params?.low_stock) q.set("low_stock", "true");
      if (params?.search) q.set("search", params.search);
      const qs = q.toString();
      return request<import("../types").InventoryItem[]>(
        `/inventory${qs ? `?${qs}` : ""}`
      );
    },
    create: (data: object) =>
      request<import("../types").InventoryItem>("/inventory", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: number, data: object) =>
      request<import("../types").InventoryItem>(`/inventory/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    delete: (id: number) =>
      request<void>(`/inventory/${id}`, { method: "DELETE" }),
  },
  vehicles: {
    list: () => request<import("../types").Vehicle[]>("/vehicles"),
    create: (data: object) =>
      request<import("../types").Vehicle>("/vehicles", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: number, data: object) =>
      request<import("../types").Vehicle>(`/vehicles/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    delete: (id: number) =>
      request<void>(`/vehicles/${id}`, { method: "DELETE" }),
  },
  customers: {
    list: () => request<import("../types").Customer[]>("/customers"),
    create: (data: object) =>
      request<import("../types").Customer>("/customers", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    delete: (id: number) =>
      request<void>(`/customers/${id}`, { method: "DELETE" }),
  },
  orders: {
    list: () => request<import("../types").Order[]>("/orders"),
    create: (data: object) =>
      request<import("../types").Order>("/orders", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: number, data: object) =>
      request<import("../types").Order>(`/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    delete: (id: number) =>
      request<void>(`/orders/${id}`, { method: "DELETE" }),
  },
  shipments: {
    list: () => request<import("../types").Shipment[]>("/shipments"),
    create: (data: object) =>
      request<import("../types").Shipment>("/shipments", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: number, data: object) =>
      request<import("../types").Shipment>(`/shipments/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    delete: (id: number) =>
      request<void>(`/shipments/${id}`, { method: "DELETE" }),
    track: (tracking: string) =>
      request<import("../types").Shipment>(`/shipments/track/${tracking}`),
  },
};
