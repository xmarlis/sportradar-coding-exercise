// Import testing tools
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import EventDetailPage from './EventDetailPage';
import EventsProvider from '../hooks/eventsProvider.jsx';

describe('EventDetailPage', () => {
  
  // Helper to render with all providers and routing
  const renderWithProviders = (eventId) => {
    return render(
      <MemoryRouter initialEntries={[`/event/${eventId}`]}>
        <EventsProvider>
          <Routes>
            <Route path="/event/:id" element={<EventDetailPage />} />
          </Routes>
        </EventsProvider>
      </MemoryRouter>
    );
  };

  // Test 1: Page renders
  it('renders event detail page', () => {
    renderWithProviders('any-id');
    expect(screen.getByText(/back to calendar/i)).toBeInTheDocument();
  });

  // Test 2: Back button works
  it('has back to calendar link', () => {
    renderWithProviders('any-id');
    const backLink = screen.getByRole('link', { name: /back to calendar/i });
    expect(backLink).toHaveAttribute('href', '/');
  });

  // Test 3: Shows not found for invalid ID
  it('shows not found message for invalid event', () => {
    renderWithProviders('invalid-999');
    expect(screen.getByText(/event not found/i)).toBeInTheDocument();
  });

});