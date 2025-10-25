# Sports Calendar Application

A responsive sports event calendar application built with React 19 and Vite. Users can view upcoming sports events in a monthly calendar, add custom events, and navigate between months with persistent local storage.

## Features

- 📅 **Monthly Calendar View** - Grid layout displaying all days with navigation between months
- 🏆 **Event Display** - Sports events shown directly on calendar day cells
- 📝 **Event Details** - Click any event to view complete information (date, time, teams, sport, stage)
- ➕ **Add Events** - Create custom events through a dedicated form
- 💾 **Persistent Storage** - Events saved to localStorage and persist across browser sessions
- 🔄 **Reset Functionality** - Option to restore original seeded events
- 📱 **Fully Responsive** - Optimized layout for mobile, tablet, and desktop devices
- 🎨 **Modern UI** - Professional design with topographic background pattern and smooth transitions

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
Install dependencies
npm install
Run development server
npm run dev
Open your browser to http://localhost:5173
Other Commands
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
Project Structure
src/
├── components/              # Reusable UI components
│   ├── CalendarGrid.jsx    # Calendar grid with weeks and day cells
│   ├── DayCell.jsx         # Individual day cell with events
│   ├── EventBadge.jsx      # Event badge display component
│   └── Navbar.jsx          # Top navigation bar
├── pages/                   # Route page components
│   ├── CalendarPage.jsx    # Main calendar view with month navigation
│   ├── AddEventPage.jsx    # Event creation form
│   └── EventDetailPage.jsx # Event detail view
├── hooks/                   # Custom hooks and context
│   ├── eventsContext.jsx   # Events context definition
│   ├── eventsProvider.jsx  # State management, localStorage, normalization
│   └── useEvents.jsx       # Hook to consume events context
├── data/
│   └── seed.json           # Initial sports events data from Sportradar
├── styles/
│   └── globals.css         # Global styles, CSS variables, responsive design
├── App.jsx                 # Application shell with Outlet
└── main.jsx                # Entry point and router configuration
How It Works
Data Flow
Initial Load - EventsProvider loads events from localStorage, or falls back to seed.json
Normalization - Raw JSON data is normalized into a consistent format
State Management - Events stored in React Context, accessible via useEvents hook
Calendar Rendering - CalendarGrid uses date-fns to calculate weeks/days and maps events by date
Persistence - Every state change triggers localStorage update via useEffect
Key Features Implementation
Calendar Grid

Uses date-fns to calculate start/end of month and surrounding weeks
Week starts on Monday (European convention)
Events grouped by ISO date string (yyyy-MM-dd) in a Map for O(1) lookup
Shows up to 3 events per day with overflow indicator
Event Management

Add events via form with date, time, sport, and title
Events assigned unique ID based on timestamp
Reset functionality restores original seed data with confirmation
Routing

/ - Calendar view
/add - Add event form
/event/:id - Event detail page
Design Decisions
Architecture Choices
Context API for State Management

Lightweight solution appropriate for app size
No need for Redux/Zustand complexity
Events, addEvent, getEventById, eventsByDate, resetEvents all accessible globally
localStorage for Persistence

Simple client-side persistence without backend
Events survive page refreshes and browser restarts
Graceful error handling if localStorage unavailable
Component Composition

Small, focused components with single responsibilities
CalendarGrid → DayCell → EventBadge hierarchy
Pages consume hooks, components handle presentation
Data & Date Handling
date-fns Library

Chosen over Moment.js (smaller bundle size, tree-shakeable, immutable)
Used for month calculations, formatting, date arithmetic
Week configuration set to Monday start
Event Normalization

Seed data transformed to consistent structure on load
Handles missing fields with fallbacks (homeTeam/awayTeam → "TBA")
Creates readable titles from team names or competition names
ISO Date Strings as Keys

Format: yyyy-MM-dd for consistent lookups
Timezone-agnostic for simple date matching
Styling Approach
No CSS Framework

Keeps bundle size minimal
Full control over design
Uses CSS custom properties for theming
Responsive Design

Mobile-first approach with media queries
Breakpoint at 768px for tablet/desktop enhancements
Flexible grid layout adapts to screen width
Assumptions Made
Events are single-day only (no multi-day or recurring events)
No authentication or multi-user support needed
localStorage is available in target browsers
Users don't need to edit or delete events after creation (add + reset only)
Time format is 24-hour (HH:mm)
Calendar can navigate to any month (no date range restrictions)
Seed data format matches provided JSON structure
Known Limitations
No Backend - Data only persists in browser's localStorage (not shared between devices)
No Event Editing - Can add events and reset to defaults, but not edit individual events
No Filtering - Cannot filter by sport type or date range
Limited Validation - Form only uses HTML5 required attribute
Sport Colors Incomplete - CSS has sport-specific color classes but not all sports styled
No Tests - No unit or integration tests implemented
Future Improvements
If I had more time, I would implement:

Filtering System - Filter events by sport, date range, or team name
Full CRUD Operations - Edit and delete individual events
Day Detail View - Click a day to see all events in a modal or expanded view
Enhanced Form - Dropdowns for sport selection, team name autocomplete, better validation
Keyboard Navigation - Arrow keys to navigate calendar, Enter to select
Accessibility - ARIA labels, screen reader support, focus management
Testing - Vitest + React Testing Library for component and integration tests
TypeScript - Type safety for event structures and component props
Backend Integration - API for multi-user event sharing and synchronization
Additional Calendar Features - Week view, jump to date, "Today" button, event categories
Browser Support
Tested on:

Chrome 120+
Firefox 120+
Safari 17+
Edge 120+
Modern browser features required: ES6+, CSS Grid, CSS Custom Properties, localStorage API

License
This project was created as a coding exercise for Sportradar Coding Academy.

Author
Marlis Sonnlechner

GitHub: @xmarlis