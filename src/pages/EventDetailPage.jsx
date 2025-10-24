import { useParams } from "react-router-dom";

export default function EventDetailPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>Event Detail Page</h1>
      <p>Showing details for event ID: {id}</p>
    </div>
  );
}
