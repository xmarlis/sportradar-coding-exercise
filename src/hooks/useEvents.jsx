// Hook to access the Events context; throws if used outside the provider.
import { useContext } from "react";
import { EventsCtx } from "./eventsContext.jsx";

export default function useEvents() {
  const ctx = useContext(EventsCtx);
  if (!ctx) throw new Error("useEvents must be used within <EventsProvider>");
  return ctx;
}
