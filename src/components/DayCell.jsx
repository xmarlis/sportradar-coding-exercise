import { format } from "date-fns";
import { Link } from "react-router-dom";
import EventBadge from "./EventBadge.jsx";

export default function DayCell({ dateObj, isoDate, inMonth, events }) {
  return (
    <div className={`day ${inMonth ? "" : "muted"}`}>
      <div className="date-num" aria-label={isoDate}>{format(dateObj, "d")}</div>
      <div className="events">
        {events.slice(0, 3).map(e => (
          <Link key={e.id} to={`/event/${e.id}`} className="event-link">
            <EventBadge title={e.title} sport={e.sport} />
          </Link>
        ))}
        {events.length > 3 && <div className="more">+{events.length - 3}</div>}
      </div>
    </div>
  );
}
