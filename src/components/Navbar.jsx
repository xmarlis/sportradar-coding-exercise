import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="brand">Sports Calendar</div>
      <div className="links">
        <NavLink to="/">Calendar</NavLink>
        <NavLink to="/add">Add Event</NavLink>
      </div>
    </nav>
  );
}
