/**
 * Main application component
 * Handles routing, layout, and shared state management
 */
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import CustomerList from './components/customers/CustomerList';
import TrainingList from './components/trainings/TrainingList';
import TrainingCalendar from './components/calendar/TrainingCalendar';
import TrainingStats from './components/stats/TrainingStats';
import { initialCustomers, initialTrainings } from './data/mockData';

// Determine basename for GitHub Pages deployment
// This ensures correct URL paths when deployed to a subdirectory
const basename = process.env.NODE_ENV === 'production'
  ? '/personalTrainerApp' // Production path - should match repo name
  : '/'; // Local development path

function App() {
  // Shared state for customers and trainings
  // Using React useState hook to manage application data
  const [customers, setCustomers] = useState(initialCustomers);
  const [trainings, setTrainings] = useState(initialTrainings);

  return (
    <BrowserRouter basename={basename}>
      {/* Navigation bar */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* App title/logo with link to home */}
          <Link to="/" className="navbar-brand">
            Personal Trainer App
          </Link>

          {/* Main navigation links */}
          <div className="navbar-nav">
            <NavLink to="/customers" className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"}>
              Customers
            </NavLink>
            <NavLink to="/trainings" className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"}>
              Trainings
            </NavLink>
            <NavLink to="/calendar" className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"}>
              Calendar
            </NavLink>
            <NavLink to="/stats" className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"}>
              Statistics
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Main content container */}
      <div className="container">
        {/* Route configuration */}
        <Routes>
          {/* Home route - shows customer list */}
          <Route path="/" element={<CustomerList
            customers={customers}
            setCustomers={setCustomers}
          />} />

          {/* Customer management route */}
          <Route path="/customers" element={<CustomerList
            customers={customers}
            setCustomers={setCustomers}
          />} />

          {/* Training management route */}
          <Route path="/trainings" element={<TrainingList
            trainings={trainings}
            setTrainings={setTrainings}
            customers={customers}
          />} />

          {/* Calendar view route */}
          <Route path="/calendar" element={<TrainingCalendar
            trainings={trainings}
            customers={customers}
          />} />

          {/* Statistics route */}
          <Route path="/stats" element={<TrainingStats
            trainings={trainings}
          />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
