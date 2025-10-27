// Import testing tools
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CalendarGrid from './CalendarGrid';
import EventsProvider from '../hooks/eventsProvider.jsx';

describe('CalendarGrid Component', () => {
  
  // Create mock eventsByDate Map (matching your component's prop structure)
  const mockEventsByDate = new Map([
    ['2025-10-23', [
      { id: 1, date: '2025-10-23', time: '09:45', sport: 'Ice Hockey', teams: 'KAC vs. Capitals' }
    ]],
    ['2025-10-18', [
      { id: 2, date: '2025-10-18', time: '18:30', sport: 'Football', teams: 'Salzburg vs. Sturm' }
    ]]
  ]);

  // Helper to wrap component with providers
  const renderWithProviders = (component) => {
    return render(
      <BrowserRouter>
        <EventsProvider>
          {component}
        </EventsProvider>
      </BrowserRouter>
    );
  };

  // Test 1: Calendar renders without crashing
  it('renders calendar', () => {
    renderWithProviders(
      <CalendarGrid currentDate={new Date(2025, 9, 1)} eventsByDate={mockEventsByDate} />
    );
    // Check if weekday header exists (proves calendar rendered)
    expect(screen.getByText('Mon')).toBeInTheDocument();
  });

  // Test 2: Weekday headers are displayed
  it('displays weekday headers', () => {
    renderWithProviders(
      <CalendarGrid currentDate={new Date(2025, 9, 1)} eventsByDate={mockEventsByDate} />
    );
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Tue')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
    expect(screen.getByText('Thu')).toBeInTheDocument();
    expect(screen.getByText('Fri')).toBeInTheDocument();
    expect(screen.getByText('Sat')).toBeInTheDocument();
    expect(screen.getByText('Sun')).toBeInTheDocument();
  });

  // Test 3: Days of the month are displayed
  it('displays days of the month', () => {
    renderWithProviders(
      <CalendarGrid currentDate={new Date(2025, 9, 1)} eventsByDate={mockEventsByDate} />
    );
    // Check for unique days in October (avoid "1" which appears twice)
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('31')).toBeInTheDocument();
  });

  // Test 4: Handles empty eventsByDate Map
  it('renders without events', () => {
    const emptyMap = new Map();
    renderWithProviders(
      <CalendarGrid currentDate={new Date(2025, 9, 1)} eventsByDate={emptyMap} />
    );
    // Should still show weekday headers
    expect(screen.getByText('Mon')).toBeInTheDocument();
  });

  // Test 5: Renders day cells with aria-labels
  it('renders day cells with correct dates', () => {
    renderWithProviders(
      <CalendarGrid currentDate={new Date(2025, 9, 1)} eventsByDate={mockEventsByDate} />
    );
    // Check for specific date labels (aria-label from your component)
    expect(screen.getByLabelText('2025-10-15')).toBeInTheDocument();
    expect(screen.getByLabelText('2025-10-31')).toBeInTheDocument();
  });

});