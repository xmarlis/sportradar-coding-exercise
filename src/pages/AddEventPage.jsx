import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEvents from "../hooks/useEvents.jsx";

export default function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    date: "",
    time: "",
    sport: "",
    title: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(form);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Event</h1>
      <label>
        Date:
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
      </label>
      <label>
        Time:
        <input type="time" name="time" value={form.time} onChange={handleChange} required />
      </label>
      <label>
        Sport:
        <input type="text" name="sport" value={form.sport} onChange={handleChange} required />
      </label>
      <label>
        Title:
        <input type="text" name="title" value={form.title} onChange={handleChange} required />
      </label>
      <button type="submit">Add</button>
    </form>
  );
}
