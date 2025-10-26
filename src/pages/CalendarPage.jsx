import { useState, useMemo } from "react";
import { format, addMonths } from "date-fns";
import CalendarGrid from "../components/CalendarGrid.jsx";
import useEvents from "../hooks/useEvents.jsx";

const sportConfig = {
  football: { symbol: '⚽', color: '#10B981', name: 'Football' },
  basketball: { symbol: '🏀', color: '#F97316', name: 'Basketball' },
  hockey: { symbol: '🏒', color: '#3B82F6', name: 'Hockey' },
  volleyball: { symbol: '🏐', color: '#EC4899', name: 'Volleyball' },
  tennis: { symbol: '🎾', color: '#EAB308', name: 'Tennis' }
};

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
        <div className="month-nav">
          <button onClick={() => setCurrent(d => addMonths(d, -1))} aria-label="Previous month">‹</button>
          <h2>{format(current, "MMMM yyyy")}</h2>
          <button onClick={() => setCurrent(d => addMonths(d, 1))} aria-label="Next month">›</button>
        </div>
        
        <div className="sport-filters">
          <button
            className={`sport-pill ${selectedSport === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedSport('all')}
            aria-label="Show all sports"
          >
            All Sports
          </button>
          {availableSports.map(sport => {
            const config = sportConfig[sport];
            if (!config) return null;
            
            return (
              <button
                key={sport}
                className={`sport-pill ${selectedSport === sport ? 'active' : ''}`}
                onClick={() => setSelectedSport(selectedSport === sport ? 'all' : sport)}
                style={{
                  '--sport-color': config.color,
                  backgroundColor: selectedSport === sport ? config.color : 'transparent',
                  color: selectedSport === sport ? '#fff' : config.color,
                  borderColor: config.color
                }}
                aria-label={`Filter by ${config.name}`}
              >
                <span className="sport-symbol">{config.symbol}</span>
                {config.name}
              </button>
            );
          })}
        </div>
      </header>
      <CalendarGrid currentDate={current} eventsByDate={filteredEventsByDate} />
    </section>
  );
}