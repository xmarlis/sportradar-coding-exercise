import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="brand">
        <span className="brand-icon">📅</span>
        Sports Calendar
      </Link>
      <div className="links">
        <NavLink to="/">Calendar</NavLink>
        <NavLink to="/add">Add Event</NavLink>
      </div>
    </nav>
  );
}