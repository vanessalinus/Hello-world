export type ShipmentStatus = "pending" | "in_transit" | "delivered" | "cancelled";
export type OrderStatus =
  | "draft"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";
export type VehicleStatus = "available" | "in_use" | "maintenance";

export interface DashboardStats {
  total_warehouses: number;
  total_inventory_items: number;
  low_stock_items: number;
  total_orders: number;
  pending_orders: number;
  total_shipments: number;
  in_transit_shipments: number;
  delivered_shipments: number;
  total_vehicles: number;
  available_vehicles: number;
  total_customers: number;
  inventory_value: number;
}

export interface Warehouse {
  id: number;
  name: string;
  code: string;
  address: string;
  city: string;
  country: string;
  capacity_sqm: number;
  manager_name?: string;
  phone?: string;
  created_at: string;
}

export interface InventoryItem {
  id: number;
  sku: string;
  name: string;
  description?: string;
  quantity: number;
  unit: string;
  reorder_level: number;
  unit_price: number;
  warehouse_id: number;
  warehouse_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  id: number;
  plate_number: string;
  type: string;
  capacity_kg: number;
  status: VehicleStatus;
  driver_name?: string;
  driver_phone?: string;
  created_at: string;
}

export interface Customer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  created_at: string;
}

export interface OrderItem {
  id: number;
  inventory_item_id: number;
  quantity: number;
  unit_price: number;
  item_name?: string;
  sku?: string;
}

export interface Order {
  id: number;
  order_number: string;
  customer_id: number;
  customer_name?: string;
  status: OrderStatus;
  total_amount: number;
  notes?: string;
  origin_warehouse_id?: number;
  destination_address?: string;
  destination_city?: string;
  destination_country?: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
}

export interface Shipment {
  id: number;
  tracking_number: string;
  order_id?: number;
  vehicle_id?: number;
  status: ShipmentStatus;
  origin: string;
  destination: string;
  weight_kg: number;
  estimated_delivery?: string;
  actual_delivery?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  vehicle_plate?: string;
  order_number?: string;
}
