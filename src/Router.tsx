import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/Homepage";
import CreateEventPage from './pages/CreateEventPage';
import ManageEventsPage from './pages/ManageEventsPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import EventDetails from './components/EventDetail';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/manage-events" element={<ManageEventsPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events" element={<EventDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
