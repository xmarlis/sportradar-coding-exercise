// Import testing tools
import { describe, it, expect } from 'vitest';
import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import AddEventPage from './AddEventPage';
import EventsProvider from '../hooks/eventsProvider.jsx';

describe('AddEventPage', () => {
  
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

  // Test 1: Page renders
  it('renders add event page', () => {
    renderWithProviders(<AddEventPage />);
    expect(screen.getByText(/add new event/i)).toBeInTheDocument();
  });

  // Test 2: Form has all required fields
  it('has all required form fields', () => {
    renderWithProviders(<AddEventPage />);
    
    // Check for input fields by placeholder
    expect(screen.getByPlaceholderText(/real madrid/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/barcelona/i)).toBeInTheDocument();
    
    // Check for date and time inputs by type
    const inputs = screen.getAllByDisplayValue('');
    const dateInput = inputs.find(input => input.type === 'date');
    const timeInput = inputs.find(input => input.type === 'time');
    expect(dateInput).toBeInTheDocument();
    expect(timeInput).toBeInTheDocument();
  });

  // Test 3: Form has submit button
  it('has a submit button', () => {
    renderWithProviders(<AddEventPage />);
    expect(screen.getByRole('button', { name: /add event/i })).toBeInTheDocument();
  });

  // Test 4: Sport selector buttons are displayed
  it('displays sport selector buttons', () => {
    renderWithProviders(<AddEventPage />);
    
    expect(screen.getByText('Football')).toBeInTheDocument();
    expect(screen.getByText('Basketball')).toBeInTheDocument();
    expect(screen.getByText('Hockey')).toBeInTheDocument();
    expect(screen.getByText('Volleyball')).toBeInTheDocument();
    expect(screen.getByText('Tennis')).toBeInTheDocument();
  });

  // Test 5: User can type in home team field
  it('allows user to input home team', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AddEventPage />);
    
    const homeTeamInput = screen.getByPlaceholderText(/real madrid/i);
    await user.type(homeTeamInput, 'Arsenal');
    
    expect(homeTeamInput).toHaveValue('Arsenal');
  });

  // Test 6: User can type in away team field
  it('allows user to input away team', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AddEventPage />);
    
    const awayTeamInput = screen.getByPlaceholderText(/barcelona/i);
    await user.type(awayTeamInput, 'Chelsea');
    
    expect(awayTeamInput).toHaveValue('Chelsea');
  });

  // Test 7: User can select date
  it('allows user to input date', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AddEventPage />);
    
    const dateInputs = screen.getAllByDisplayValue('');
    const dateInput = dateInputs.find(input => input.type === 'date');
    await user.type(dateInput, '2025-10-30');
    
    expect(dateInput).toHaveValue('2025-10-30');
  });

  // Test 8: User can select time
  it('allows user to input time', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AddEventPage />);
    
    const timeInputs = screen.getAllByDisplayValue('');
    const timeInput = timeInputs.find(input => input.type === 'time');
    await user.type(timeInput, '15:00');
    
    expect(timeInput).toHaveValue('15:00');
  });

});