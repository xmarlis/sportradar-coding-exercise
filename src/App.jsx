// Application shell that wraps pages with EventsProvider and renders Navbar + routed content.
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import EventsProvider from "./hooks/eventsProvider.jsx";

export default function App() {
  return (
    <EventsProvider>
      <div className="app">
        <Navbar />
        <main className="container">
          <Outlet />
        </main>
      </div>
    </EventsProvider>
  );
}
