import { useState, useEffect } from "react";
import seed from "../data/seed.json";

/**
 * Normalizes the raw JSON event data into a simpler structure
 */
function normalizeSeed(data) {
  return (data || []).map((d, i) => {
    const date = d.dateVenue;
    const time = (d.timeVenueUTC || "00:00:00").slice(0, 5);
    const sport = d.sport || "unknown";

    const home = d.homeTeam?.name ?? "";
    const away = d.awayTeam?.name ?? "";
    const title = home || away ? `${home || "TBA"} vs ${away || ""}`.trim() : d.originCompetitionName;

    return {
      id: String(i + 1),
      date,
      time,
      sport,
      homeTeam: home,
      awayTeam: away,
      title,
      stage: d.stage?.name || null,
      status: d.status,
      result: d.result,
    };
  });
}

/**
 * Custom hook to manage event data (load + add new events)
 */
export function useEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const normalized = normalizeSeed(seed.data);
    setEvents(normalized);
  }, []);

  const addEvent = (newEvent) => {
    setEvents((prev) => [
      ...prev,
      { id: String(prev.length + 1), ...newEvent }
    ]);
  };

  return { events, addEvent };
}
