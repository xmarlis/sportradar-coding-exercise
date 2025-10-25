// Provider that loads/normalizes seeded events, manages event state, and exposes helpers.
import { useMemo, useState, useEffect } from "react";
import { EventsCtx } from "./eventsContext.jsx";
import seed from "../data/seed.json";

const STORAGE_KEY = "sports-calendar-events";

function normalize(data) {
  return (data || []).map((d, i) => ({
    id: String(i + 1),
    date: d.dateVenue,
    time: (d.timeVenueUTC || "00:00:00").slice(0, 5),
    sport: (d.sport || "unknown").toLowerCase(),
    homeTeam: d.homeTeam?.name ?? "TBA",
    awayTeam: d.awayTeam?.name ?? "TBA",
    title:
      d.homeTeam?.name || d.awayTeam?.name
        ? `${d.homeTeam?.name || "TBA"} vs ${d.awayTeam?.name || "TBA"}`
        : d.originCompetitionName,
    stage: d.stage?.name || null,
    status: d.status,
    result: d.result,
  }));
}

// Load events from localStorage or seed data
function loadInitialEvents() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load events from localStorage:", error);
  }
  return normalize(seed.data);
}

export default function EventsProvider({ children }) {
  const [events, setEvents] = useState(loadInitialEvents);

  // Save to localStorage whenever events change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
      console.error("Failed to save events to localStorage:", error);
    }
  }, [events]);

  const addEvent = (e) =>
    setEvents((prev) => [...prev, { id: String(Date.now()), ...e }]);

  const getEventById = (id) => events.find((e) => e.id === id);

  const resetEvents = () => {
    const fresh = normalize(seed.data);
    setEvents(fresh);
  };

  const eventsByDate = useMemo(() => {
    const map = new Map();
    for (const e of events) {
      if (!map.has(e.date)) map.set(e.date, []);
      map.get(e.date).push(e);
    }
    return map;
  }, [events]);

  return (
    <EventsCtx.Provider value={{ 
      events, 
      addEvent, 
      getEventById, 
      eventsByDate,
      resetEvents
    }}>
      {children}
    </EventsCtx.Provider>
  );
}