import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import useEvents from "../hooks/useEvents.jsx";

const sportConfig = {
  football: { symbol: '⚽', color: '#10B981', name: 'Football' },
  basketball: { symbol: '🏀', color: '#F97316', name: 'Basketball' },
  hockey: { symbol: '🏒', color: '#3B82F6', name: 'Hockey' },
  volleyball: { symbol: '🏐', color: '#EC4899', name: 'Volleyball' },
  tennis: { symbol: '🎾', color: '#EAB308', name: 'Tennis' }
};

export default function EventDetailPage() {
  const { id } = useParams();
  const { getEventById } = useEvents();
  const event = getEventById(id);

  if (!event) {
    return (
      <div className="event-detail">
        <p style={{ textAlign: 'center', color: 'var(--gray-text)' }}>Event not found.</p>
        <Link to="/" className="back-link">← Back to calendar</Link>
      </div>
    );
  }

  const sportInfo = sportConfig[event.sport] || { symbol: '🏆', color: 'var(--primary)', name: event.sport };
  const isPlayed = event.status === 'played';
  const hasScore = event.result && (event.result.homeGoals !== undefined || event.result.awayGoals !== undefined);

  // Format date nicely
const formattedDate = format(new Date(event.date), 'EEEE, MMMM d, yyyy');

  return (
    <div className="event-detail-page">
      <Link to="/" className="back-link">← Back to calendar</Link>
      
      <div className="event-detail-card" style={{ borderLeftColor: sportInfo.color }}>
        {/* Sport Badge */}
        <div className="sport-badge" style={{ backgroundColor: sportInfo.color }}>
          <span className="sport-symbol-large">{sportInfo.symbol}</span>
          <span className="sport-name">{sportInfo.name}</span>
        </div>

        {/* Status Badge */}
        <div className={`status-badge ${isPlayed ? 'played' : 'scheduled'}`}>
          {isPlayed ? '✓ Played' : '📅 Scheduled'}
        </div>

        {/* Teams Display */}
        <div className="teams-container">
          <div className="team home-team">
            <div className="team-label">Home</div>
            <div className="team-name">{event.homeTeam || 'TBA'}</div>
            {hasScore && <div className="team-score">{event.result.homeGoals}</div>}
          </div>
          
          <div className="vs-divider">VS</div>
          
          <div className="team away-team">
            <div className="team-label">Away</div>
            <div className="team-name">{event.awayTeam || 'TBA'}</div>
            {hasScore && <div className="team-score">{event.result.awayGoals}</div>}
          </div>
        </div>

        {/* Winner Display */}
        {isPlayed && event.result?.winner && (
          <div className="winner-banner" style={{ backgroundColor: `${sportInfo.color}15` }}>
            <span style={{ color: sportInfo.color }}>🏆 Winner: {event.result.winner}</span>
          </div>
        )}

        {/* Event Info Grid */}
        <div className="event-info-grid">
          <div className="info-item">
            <span className="info-label">Date</span>
            <span className="info-value">{formattedDate}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Time</span>
            <span className="info-value">{event.time}</span>
          </div>
          
          {event.stage && (
            <div className="info-item">
              <span className="info-label">Stage</span>
              <span className="info-value">{event.stage}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}