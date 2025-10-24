import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
