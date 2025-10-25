import { useParams, Link } from "react-router-dom";
import useEvents from "../hooks/useEvents.jsx";

export default function EventDetailPage() {
  const { id } = useParams();
  const { getEventById } = useEvents();
  const event = getEventById(id);

  if (!event) {
    return (
      <div>
        <p>Event not found.</p>
        <Link to="/">Back to calendar</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Time:</strong> {event.time}</p>
      <p><strong>Sport:</strong> {event.sport}</p>
      {event.homeTeam && <p><strong>Home:</strong> {event.homeTeam}</p>}
      {event.awayTeam && <p><strong>Away:</strong> {event.awayTeam}</p>}
      {event.stage && <p><strong>Stage:</strong> {event.stage}</p>}
      <Link to="/">← Back to calendar</Link>
    </div>
  );
}
