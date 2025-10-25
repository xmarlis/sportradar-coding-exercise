import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import EventBadge from "./EventBadge.jsx";

export default function DayCell({ dateObj, isoDate, inMonth, events }) {
  const [maxVisible, setMaxVisible] = useState(3);

  useEffect(() => {
    const updateMaxVisible = () => {
      setMaxVisible(window.innerWidth < 768 ? 1 : 3);
    };
    
    // Set initial value
    updateMaxVisible();
    
    // Update on resize
    window.addEventListener('resize', updateMaxVisible);
    return () => window.removeEventListener('resize', updateMaxVisible);
  }, []);

  const visibleEvents = events.slice(0, maxVisible);
  const remainingCount = events.length - maxVisible;

  return (
    <div className={`day ${inMonth ? "" : "muted"}`}>
      <div className="date-num" aria-label={isoDate}>
        {format(dateObj, "d")}
      </div>
      <div className="events">
        {visibleEvents.map(e => (
          <Link key={e.id} to={`/event/${e.id}`} className="event-link">
            <EventBadge title={e.title} sport={e.sport} />
          </Link>
        ))}
        {remainingCount > 0 && (
          <div className="more">+{remainingCount} more</div>
        )}
      </div>
    </div>
  );
}