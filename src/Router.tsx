import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/Homepage";
import CreateEventPage from './pages/CreateEventPage';
import ManageEventsPage from './pages/ManageEventsPage';
import SignUpPage from './authentication/SignUpPage';
import LoginPage from './authentication/LoginPage';
import EventDetails from './components/EventDetail';
import { AuthProvider } from './authentication/AuthContext';
import BrowseEventsPage from './pages/BrowseEventsPage';

const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/manage-events" element={<ManageEventsPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/browse-events" element={<BrowseEventsPage />} />
        <Route path="/events" element={<EventDetails />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default AppRouter;
