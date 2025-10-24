export default function EventBadge({ title, sport }) {
  return <span className={`badge sport-${(sport || "").toLowerCase()}`}>{title}</span>;
}
