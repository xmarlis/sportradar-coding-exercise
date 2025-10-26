import { useState, useMemo } from "react";
import { format, addMonths } from "date-fns";
import CalendarGrid from "../components/CalendarGrid.jsx";
import useEvents from "../hooks/useEvents.jsx";

export default function CalendarPage() {
  const [current, setCurrent] = useState(new Date());
  const [selectedSport, setSelectedSport] = useState("all");
  const { eventsByDate, events } = useEvents();

  // Get unique sports from events
  const availableSports = useMemo(() => {
    const sports = new Set(events.map(e => e.sport));
    return Array.from(sports).sort();
  }, [events]);

  // Filter events by selected sport
  const filteredEventsByDate = useMemo(() => {
    if (selectedSport === "all") return eventsByDate;
    
    const filtered = new Map();
    for (const [date, dateEvents] of eventsByDate) {
      const sportEvents = dateEvents.filter(e => e.sport === selectedSport);
      if (sportEvents.length > 0) {
        filtered.set(date, sportEvents);
      }
    }
    return filtered;
  }, [eventsByDate, selectedSport]);

  return (
    <section>
      <header className="cal-header">
        <button onClick={() => setCurrent(d => addMonths(d, -1))} aria-label="Previous month">‹</button>
        <h2>{format(current, "MMMM yyyy")}</h2>
        <button onClick={() => setCurrent(d => addMonths(d, 1))} aria-label="Next month">›</button>
        
        <select 
          value={selectedSport} 
          onChange={e => setSelectedSport(e.target.value)}
          className="sport-filter"
          aria-label="Filter by sport"
        >
          <option value="all">All Sports</option>
          {availableSports.map(sport => (
            <option key={sport} value={sport}>
              {sport.charAt(0).toUpperCase() + sport.slice(1)}
            </option>
          ))}
        </select>
      </header>
      <CalendarGrid currentDate={current} eventsByDate={filteredEventsByDate} />
    </section>
  );
}