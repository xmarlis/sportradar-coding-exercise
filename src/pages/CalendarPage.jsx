import { useState } from "react";
import { format, addMonths } from "date-fns";
import CalendarGrid from "../components/CalendarGrid.jsx";
import useEvents from "../hooks/useEvents.jsx";

export default function CalendarPage() {
  const [current, setCurrent] = useState(new Date());
  const { eventsByDate } = useEvents();

  return (
    <section>
      <header className="cal-header">
        <button onClick={() => setCurrent(d => addMonths(d, -1))} aria-label="Previous month">‹</button>
        <h2>{format(current, "MMMM yyyy")}</h2>
        <button onClick={() => setCurrent(d => addMonths(d, 1))} aria-label="Next month">›</button>
      </header>
      <CalendarGrid currentDate={current} eventsByDate={eventsByDate} />
    </section>
  );
}