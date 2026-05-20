export function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value || 0);
}

export function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric", month: "short", day: "numeric",
  }).format(new Date(dateStr));
}

export function formatDateTime(dateStr) {
  if (!dateStr) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  }).format(new Date(dateStr));
}

export function capitalize(str) {
  if (!str) return "";
  return str.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function statusColor(status) {
  const map = {
    pending: "#f59e0b",
    picked_up: "#8b5cf6",
    in_transit: "#3b82f6",
    out_for_delivery: "#6366f1",
    delivered: "#10b981",
    cancelled: "#ef4444",
    returned: "#f97316",
    active: "#10b981",
    inactive: "#6b7280",
    maintenance: "#f59e0b",
    full: "#ef4444",
    available: "#10b981",
    out_of_service: "#ef4444",
  };
  return map[status] || "#6b7280";
}

export function priorityColor(priority) {
  const map = {
    low: "#6b7280",
    medium: "#3b82f6",
    high: "#f59e0b",
    urgent: "#ef4444",
  };
  return map[priority] || "#6b7280";
}
