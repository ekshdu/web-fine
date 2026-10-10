interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  const normalized = status.toLowerCase();
  let className = "badge badge-neutral";

  if (normalized.includes("оплач") && !normalized.includes("не")) className = "badge badge-success";
  else if (normalized.includes("просроч")) className = "badge badge-danger";
  else if (normalized.includes("не оплач")) className = "badge badge-warning";

  return <span className={className}>{status}</span>;
}