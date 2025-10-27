// 1. IMPORTS - Getting the tools we need
import { describe, it, expect } from 'vitest';
// describe: Groups related tests together
// it: Defines a single test (also called "test")
// expect: Checks if something is true

import { render, screen } from '@testing-library/react';
// render: Puts your React component into a fake browser for testing
// screen: Lets you find elements on the page (like buttons, text)

import { BrowserRouter } from 'react-router-dom';
// BrowserRouter: Wraps your app so React Router links work in tests

import App from './App';
// Import your actual App component to test it


// 2. HELPER FUNCTION - Makes testing easier
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};
// Why? Your App uses React Router (Link, Route, etc.)
// Without BrowserRouter, React Router crashes
// This function wraps any component in BrowserRouter automatically


// 3. TEST SUITE - Group of related tests
describe('App', () => {
  // "describe" says: "These tests are all about the App component"
  
  
  // 4. FIRST TEST - Does the app render without errors?
  it('renders without crashing', () => {
    // "it" describes what the test does in plain English
    
    renderWithRouter(<App />);
    // Step 1: Render the App component in a fake browser
    // (with router so it doesn't crash)
    
    expect(document.body).toBeInTheDocument();
    // Step 2: Check that something exists on the page
    // If this passes, the app rendered successfully!
  });

  
  // 5. SECOND TEST - Does the navigation bar appear?
  it('displays navigation bar', () => {
    renderWithRouter(<App />);
    // Step 1: Render the App again (each test is independent)
    
    const nav = screen.getByRole('navigation');
    // Step 2: Look for an element with role="navigation"
    // This finds your <nav> element from Navbar.jsx
    
    expect(nav).toBeInTheDocument();
    // Step 3: Verify that the navigation was found
    // If this passes, your navbar is displaying!
  });
});