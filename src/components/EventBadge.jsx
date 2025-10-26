export default function EventBadge({ title, sport }) {
  return (
    <span className="badge" data-sport={sport}>
      {title}
    </span>
  );
}