import { NavLink, Link } from "react-router-dom";
import useEvents from "../hooks/useEvents.jsx";

export default function Navbar() {
  const { resetEvents } = useEvents();

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all events to original data? This will remove any events you've added.")) {
      resetEvents();
    }
  };

  return (
    <nav className="nav">
      <Link to="/" className="brand">
        <img src="/favicon.svg" alt="" className="logo" />
        <span>Sports Calendar</span>
      </Link>
      <div className="links">
        <NavLink to="/">Calendar</NavLink>
        <NavLink to="/add">Add Event</NavLink>
        <button 
          onClick={handleReset} 
          className="nav-reset" 
          aria-label="Reset to original events"
          title="Reset to original events"
        >
          ↻
        </button>
      </div>
    </nav>
  );
}