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
  const [selectedSports, setSelectedSports] = useState(new Set()); // Changed to Set
  const { eventsByDate, events } = useEvents();

  // Get unique sports from events
  const availableSports = useMemo(() => {
    const sports = new Set(events.map(e => e.sport));
    return Array.from(sports).sort();
  }, [events]);

  // Filter events by selected sports (multiple)
  const filteredEventsByDate = useMemo(() => {
    if (selectedSports.size === 0) return eventsByDate; // Show all if none selected
    
    const filtered = new Map();
    for (const [date, dateEvents] of eventsByDate) {
      const sportEvents = dateEvents.filter(e => selectedSports.has(e.sport));
      if (sportEvents.length > 0) {
        filtered.set(date, sportEvents);
      }
    }
    return filtered;
  }, [eventsByDate, selectedSports]);

  // Toggle sport selection
  const toggleSport = (sport) => {
    setSelectedSports(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sport)) {
        newSet.delete(sport); // Remove if already selected
      } else {
        newSet.add(sport); // Add if not selected
      }
      return newSet;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedSports(new Set());
  };

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
            className={`sport-pill ${selectedSports.size === 0 ? 'active' : ''}`}
            onClick={clearFilters}
            aria-label="Show all sports"
          >
            All Sports
          </button>
          {availableSports.map(sport => {
            const config = sportConfig[sport];
            if (!config) return null;
            
            const isSelected = selectedSports.has(sport);
            
            return (
              <button
                key={sport}
                className={`sport-pill ${isSelected ? 'active' : ''}`}
                onClick={() => toggleSport(sport)}
                style={{
                  '--sport-color': config.color,
                  backgroundColor: isSelected ? config.color : 'transparent',
                  color: isSelected ? '#fff' : config.color,
                  borderColor: config.color
                }}
                aria-label={`${isSelected ? 'Hide' : 'Show'} ${config.name}`}
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