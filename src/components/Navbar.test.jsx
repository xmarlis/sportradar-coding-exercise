// Import testing tools
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import EventsProvider from '../hooks/eventsProvider.jsx';

describe('Navbar Component', () => {
  
  // Helper function to wrap component with necessary providers
  const renderWithProviders = (component) => {
    return render(
      <BrowserRouter>
        <EventsProvider>
          {component}
        </EventsProvider>
      </BrowserRouter>
    );
  };

  // Test 1: Check if navigation bar renders
  it('renders navigation bar', () => {
    renderWithProviders(<Navbar />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  // Test 2: Check if Calendar link exists
  it('has link to calendar page', () => {
    renderWithProviders(<Navbar />);
    const calendarLink = screen.getByRole('link', { name: 'Calendar' });
    expect(calendarLink).toBeInTheDocument();
  });

  // Test 3: Check if Add Event link exists
  it('has link to add event page', () => {
    renderWithProviders(<Navbar />);
    const addLink = screen.getByRole('link', { name: 'Add Event' });
    expect(addLink).toBeInTheDocument();
  });
  
});