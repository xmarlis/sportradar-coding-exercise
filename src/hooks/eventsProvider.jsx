// Provider that loads/normalizes seeded events, manages event state, and exposes helpers.
import { useMemo, useState } from "react";
import { EventsCtx } from "./eventsContext.jsx";
import seed from "../data/seed.json";

function normalize(data) {
  return (data || []).map((d, i) => ({
    id: String(i + 1),
    date: d.dateVenue,
    time: (d.timeVenueUTC || "00:00:00").slice(0, 5),
    sport: (d.sport || "unknown").toLowerCase(),
    homeTeam: d.homeTeam?.name ?? "",
    awayTeam: d.awayTeam?.name ?? "",
    title:
      d.homeTeam?.name || d.awayTeam?.name
        ? `${d.homeTeam?.name || "TBA"} vs ${d.awayTeam?.name || ""}`.trim()
        : d.originCompetitionName,
    stage: d.stage?.name || null,
    status: d.status,
    result: d.result,
  }));
}

export default function EventsProvider({ children }) {
  const [events, setEvents] = useState(() => normalize(seed.data));

  const addEvent = (e) =>
    setEvents((prev) => [...prev, { id: String(Date.now()), ...e }]);

  const getEventById = (id) => events.find((e) => e.id === id);

  const eventsByDate = useMemo(() => {
    const map = new Map();
    for (const e of events) {
      if (!map.has(e.date)) map.set(e.date, []);
      map.get(e.date).push(e);
    }
    return map;
  }, [events]);

  return (
    <EventsCtx.Provider value={{ events, addEvent, getEventById, eventsByDate }}>
      {children}
    </EventsCtx.Provider>
  );
}