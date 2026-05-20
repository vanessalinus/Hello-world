import { statusColor, priorityColor, capitalize } from "../utils/format";

export function StatusBadge({ status }) {
  const color = statusColor(status);
  return (
    <span className="badge" style={{ background: `${color}20`, color }}>
      <span className="dot" style={{ background: color }} />
      {capitalize(status)}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const color = priorityColor(priority);
  return (
    <span className="badge" style={{ background: `${color}20`, color }}>
      {capitalize(priority)}
    </span>
  );
}
