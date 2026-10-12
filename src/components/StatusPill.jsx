import { LOW_STOCK } from "../data/seed";

export function stockClass(qty) {
  if (qty <= 0) return "pill-danger";
  if (qty < LOW_STOCK) return "pill-warn";
  return "pill-ok";
}

export default function StatusPill({ qty, label }) {
  const text = label || (qty <= 0 ? "Out of stock" : qty < LOW_STOCK ? "Low stock" : "In stock");
  return <span className={`pill ${stockClass(qty)}`}>{text}</span>;
}
