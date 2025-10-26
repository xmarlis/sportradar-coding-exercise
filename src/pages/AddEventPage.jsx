import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEvents from "../hooks/useEvents.jsx";

const sportConfig = {
  football: { symbol: '⚽', color: '#10B981', name: 'Football' },
  basketball: { symbol: '🏀', color: '#F97316', name: 'Basketball' },
  hockey: { symbol: '🏒', color: '#3B82F6', name: 'Hockey' },
  volleyball: { symbol: '🏐', color: '#EC4899', name: 'Volleyball' },
  tennis: { symbol: '🎾', color: '#EAB308', name: 'Tennis' }
};

export default function AddEventPage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sport, setSport] = useState("football");
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [stage, setStage] = useState("");

  const { addEvent } = useEvents();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const title = homeTeam && awayTeam 
      ? `${homeTeam} vs ${awayTeam}`
      : homeTeam || awayTeam || "Untitled Event";

    addEvent({
      date,
      time,
      sport,
      homeTeam,
      awayTeam,
      title,
      stage,
      status: "scheduled"
    });

    navigate("/");
  };

  const selectedSportConfig = sportConfig[sport] || sportConfig.football;

  return (
    <div className="add-event-page">
      <div className="add-event-header">
        <h1>Add New Event</h1>
        <p className="subtitle">Create a new sports event for your calendar</p>
      </div>

      <form onSubmit={handleSubmit} className="add-event-form">
        {/* Sport Selection */}
        <div className="form-section">
          <h3>Sport Type</h3>
          <div className="sport-selector">
            {Object.entries(sportConfig).map(([key, config]) => (
              <button
                key={key}
                type="button"
                className={`sport-option ${sport === key ? 'selected' : ''}`}
                onClick={() => setSport(key)}
                style={{
                  '--sport-color': config.color,
                  backgroundColor: sport === key ? config.color : 'transparent',
                  color: sport === key ? '#fff' : config.color,
                  borderColor: config.color
                }}
              >
                <span className="sport-symbol">{config.symbol}</span>
                <span className="sport-name">{config.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Teams */}
        <div className="form-section">
          <h3>Teams</h3>
          <div className="teams-input-grid">
            <label>
              <span className="label-text">Home Team</span>
              <input
                type="text"
                value={homeTeam}
                onChange={(e) => setHomeTeam(e.target.value)}
                placeholder="e.g., Real Madrid"
                required
              />
            </label>
            
            <div className="vs-separator">VS</div>
            
            <label>
              <span className="label-text">Away Team</span>
              <input
                type="text"
                value={awayTeam}
                onChange={(e) => setAwayTeam(e.target.value)}
                placeholder="e.g., Barcelona"
                required
              />
            </label>
          </div>
        </div>

        {/* Date & Time */}
        <div className="form-section">
          <h3>Date & Time</h3>
          <div className="datetime-grid">
            <label>
              <span className="label-text">Date</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>
            
            <label>
              <span className="label-text">Time</span>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </label>
          </div>
        </div>

        {/* Additional Info */}
        <div className="form-section">
          <h3>Additional Information</h3>
          <label>
            <span className="label-text">Stage / Competition (Optional)</span>
            <input
              type="text"
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              placeholder="e.g., Quarter Finals, Group Stage"
            />
          </label>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button"
            style={{ backgroundColor: selectedSportConfig.color }}
          >
            <span>{selectedSportConfig.symbol}</span>
            Add Event
          </button>
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}