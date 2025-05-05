import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import CustomerList from './components/customers/CustomerList';
import TrainingList from './components/trainings/TrainingList';
import TrainingCalendar from './components/calendar/TrainingCalendar';
import TrainingStats from './components/stats/TrainingStats';
import { initialCustomers, initialTrainings } from './data/mockData';

// Determine basename for GitHub Pages deployment
const basename = process.env.NODE_ENV === 'production'
  ? '/personal-trainer-app' // Change this to match your repo name
  : '/';

function App() {
  // Shared state for customers and trainings
  const [customers, setCustomers] = useState(initialCustomers);
  const [trainings, setTrainings] = useState(initialTrainings);

  return (
    <BrowserRouter basename={basename}>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            Personal Trainer App
          </Link>
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

      <div className="container">
        <Routes>
          <Route path="/" element={<CustomerList
            customers={customers}
            setCustomers={setCustomers}
          />} />
          <Route path="/customers" element={<CustomerList
            customers={customers}
            setCustomers={setCustomers}
          />} />
          <Route path="/trainings" element={<TrainingList
            trainings={trainings}
            setTrainings={setTrainings}
            customers={customers}
          />} />
          <Route path="/calendar" element={<TrainingCalendar
            trainings={trainings}
            customers={customers}
          />} />
          <Route path="/stats" element={<TrainingStats
            trainings={trainings}
          />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
