//Page component that displays the calendar header and grid for the selected month.

import { useState } from "react";
import { format, addMonths } from "date-fns";
import CalendarGrid from "../components/CalendarGrid.jsx";
import useEvents from "../hooks/useEvents.jsx";

export default function CalendarPage() {
  const [current, setCurrent] = useState(new Date());
  const { eventsByDate, resetEvents } = useEvents();

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all events to original data? This will remove any events you've added.")) {
      resetEvents();
    }
  };

  return (
    <section>
      <header className="cal-header">
        <button onClick={() => setCurrent(d => addMonths(d, -1))} aria-label="Previous month">‹</button>
        <h2>{format(current, "MMMM yyyy")}</h2>
        <button onClick={() => setCurrent(d => addMonths(d, 1))} aria-label="Next month">›</button>
        <button onClick={handleReset} className="reset-btn" aria-label="Reset to original events">
          Reset Events
        </button>
      </header>
      <CalendarGrid currentDate={current} eventsByDate={eventsByDate} />
    </section>
  );
}