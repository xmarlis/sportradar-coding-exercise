# Sports Calendar Application

A responsive sports event calendar application built with React 19 and Vite. Users can view upcoming sports events in a monthly calendar, filter by sport, add custom events, and navigate between months with persistent local storage.

## Features

- 📅 **Monthly Calendar View** - Grid layout displaying all days with navigation between months
- 🏆 **Event Display** - Sports events shown directly on calendar day cells
- 🔍 **Sport Filtering** - Filter events by sport type (football, basketball, hockey, etc.)
- 📝 **Event Details** - Click any event to view complete information (date, time, teams, sport, stage)
- ➕ **Add Events** - Create custom events through a dedicated form
- 💾 **Persistent Storage** - Events saved to localStorage and persist across browser sessions
- 🔄 **Reset Functionality** - Icon button in navbar to restore original seeded events
- 📱 **Fully Responsive** - Optimized layout for mobile, tablet, and desktop devices
- 🎨 **Modern UI** - Professional design with topographic background pattern and smooth transitions
- 🛠️ **Event Generation** - Script to generate test data with 70+ realistic events

## Tech Stack

- **React** 19.1.1 - UI library
- **React Router DOM** 7.9.4 - Client-side routing
- **Vite** 7.1.7 - Build tool and dev server
- **date-fns** 4.1.0 - Date manipulation and formatting
- **CSS3** - Custom properties for theming and responsive design

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/xmarlis/sportradar-coding-exercise.git
cd sportradar-coding-exercise
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open your browser to http://localhost:5173

### Other Commands
```bash
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Generating Test Events

To generate additional test events for development:
```bash
node scripts/generateEvents.js
```

This creates `src/data/generated-events.json` with 70+ events across October-December 2025.

To load generated events into your app:
1. Open browser console (F12)
2. Run:
```javascript
fetch('/src/data/generated-events.json')
  .then(r => r.json())
  .then(data => {
    const current = JSON.parse(localStorage.getItem('sports-calendar-events') || '[]');
    const combined = [...current, ...data.events];
    localStorage.setItem('sports-calendar-events', JSON.stringify(combined));
    window.location.reload();
  });
```

## Project Structure
```
src/
├── components/              # Reusable UI components
│   ├── CalendarGrid.jsx    # Calendar grid with weeks and day cells
│   ├── DayCell.jsx         # Individual day cell with events
│   ├── EventBadge.jsx      # Event badge display component
│   └── Navbar.jsx          # Top navigation bar with reset button
├── pages/                   # Route page components
│   ├── CalendarPage.jsx    # Main calendar view with filter and month navigation
│   ├── AddEventPage.jsx    # Event creation form
│   └── EventDetailPage.jsx # Event detail view
├── hooks/                   # Custom hooks and context
│   ├── eventsContext.jsx   # Events context definition
│   ├── eventsProvider.jsx  # State management, localStorage, normalization
│   └── useEvents.jsx       # Hook to consume events context
├── data/
│   ├── seed.json           # Original sports events data from Sportradar
│   └── generated-events.json # Generated test events (created by script)
├── styles/
│   └── globals.css         # Global styles, CSS variables, responsive design
├── scripts/
│   └── generateEvents.js   # Event generation script for testing
├── App.jsx                 # Application shell with routing
└── main.jsx                # Entry point
```

## How It Works

### Data Flow

1. **Initial Load** - EventsProvider loads events from localStorage, or falls back to seed.json
2. **Normalization** - Raw JSON data is normalized into a consistent format
3. **State Management** - Events stored in React Context, accessible via useEvents hook
4. **Calendar Rendering** - CalendarGrid uses date-fns to calculate weeks/days and maps events by date
5. **Persistence** - Every state change triggers localStorage update via useEffect

### Key Features Implementation

**Calendar Grid**
- Uses date-fns to calculate start/end of month and surrounding weeks
- Week starts on Monday (European convention)
- Events grouped by ISO date string (yyyy-MM-dd) in a Map for O(1) lookup
- Shows up to 1 event per day on mobile, 3 on desktop with overflow indicator
- Responsive cell heights maintain consistent grid layout

**Sport Filter**
- Dynamically populated dropdown with all available sports from events
- Real-time filtering when sport is selected
- Shows "All Sports" option to display everything
- Only displays dates that have events for the selected sport
- Responsive: full-width on mobile, inline on desktop

**Event Management**
- Add events via form with date, time, sport, teams, and title
- Events assigned unique ID based on timestamp
- Reset button (↻) in navbar restores original seed data with confirmation
- Generated events can be loaded separately without affecting seed.json

**Routing**
- `/` - Calendar view with sport filter
- `/add` - Add event form
- `/event/:id` - Event detail page

## Design Decisions

### Architecture Choices

**Context API for State Management**
- Lightweight solution appropriate for app size
- No need for Redux/Zustand complexity
- Events, addEvent, getEventById, eventsByDate, resetEvents all accessible globally

**localStorage for Persistence**
- Simple client-side persistence without backend
- Events survive page refreshes and browser restarts
- Graceful error handling if localStorage unavailable

**Component Composition**
- Small, focused components with single responsibilities
- CalendarGrid → DayCell → EventBadge hierarchy
- Pages consume hooks, components handle presentation

### Data & Date Handling

**date-fns Library**
- Chosen over Moment.js (smaller bundle size, tree-shakeable, immutable)
- Used for month calculations, formatting, date arithmetic
- Week configuration set to Monday start

**Event Normalization**
- Seed data transformed to consistent structure on load
- Handles missing fields with fallbacks (homeTeam/awayTeam → "TBA")
- Creates readable titles from team names or competition names

**ISO Date Strings as Keys**
- Format: yyyy-MM-dd for consistent lookups
- Timezone-agnostic for simple date matching

### Styling Approach

**No CSS Framework**
- Keeps bundle size minimal
- Full control over design
- Uses CSS custom properties for theming
- Custom sport filter styling with focus states

**Responsive Design**
- Mobile-first approach with media queries
- Breakpoint at 768px for tablet/desktop enhancements
- Flexible grid layout adapts to screen width
- Navigation elements stack appropriately on small screens
- Sport filter goes full-width on mobile for better usability

**Visual Design**
- Topographic pattern background for depth
- Indigo primary color (#6366F1) with pink accent (#EC4899)
- Subtle shadows and hover effects
- Reset button styled as minimal icon (↻) with divider
- Event badges with 2-line text wrapping and ellipsis

## Assumptions Made

- Events are single-day only (no multi-day or recurring events)
- No authentication or multi-user support needed
- localStorage is available in target browsers
- Users don't need to edit or delete events after creation (add + reset only)
- Time format is 24-hour (HH:mm)
- Calendar can navigate to any month (no date range restrictions)
- Seed data format matches provided JSON structure
- Multiple sports types supported (football, basketball, hockey, volleyball, tennis)

## Known Limitations

- **No Backend** - Data only persists in browser's localStorage (not shared between devices)
- **No Event Editing** - Can add events and reset to defaults, but not edit individual events
- **No Delete** - Cannot delete individual events (only reset all)
- **Limited Validation** - Form only uses HTML5 required attribute
- **No Tests** - No unit or integration tests implemented
- **Single Filter** - Can only filter by one sport at a time
- **No Date Range Filter** - Cannot filter by custom date ranges

## Implemented Optional Features

✅ **Sport Filtering** - Dropdown to view events by specific sport type  
✅ **Enhanced Styling** - Professional design with pattern background, custom colors, responsive layout  
✅ **Persistent Storage** - localStorage implementation for data persistence  
✅ **Event Generation Script** - Tool to generate realistic test data

## Future Improvements

If I had more time, I would implement:

1. **Advanced Filtering** - Multiple filters (sport + date range + team name search)
2. **Full CRUD Operations** - Edit and delete individual events
3. **Day Detail View** - Click a day to see all events in a modal or expanded view
4. **Enhanced Form** - Dropdowns for sport selection, team name autocomplete, better validation
5. **Keyboard Navigation** - Arrow keys to navigate calendar, Enter to select
6. **Accessibility** - Enhanced ARIA labels, screen reader support, focus management
7. **Testing** - Vitest + React Testing Library for component and integration tests
8. **TypeScript** - Type safety for event structures and component props
9. **Backend Integration** - API for multi-user event sharing and synchronization
10. **Additional Calendar Features** - Week view, day view, jump to date, "Today" button
11. **Event Categories/Tags** - Organize events beyond just sport type
12. **Dark Mode** - Theme toggle for better viewing in different lighting conditions

## License

This project was created as a coding exercise for Sportradar Coding Academy.

## Author

Marlis Sonnlechner

GitHub: @xmarlis