import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/Homepage";
import CreateEventPage from './pages/CreateEventPage';
import ManageEventsPage from './pages/ManageEventsPage';
import SignUpPage from './authentication/SignUpPage';
import LoginPage from './authentication/LoginPage';
import EventDetails from './pages/EventDetail';
import { AuthProvider } from './authentication/AuthContext';
import BrowseEventsPage from './pages/BrowseEventsPage';
import CategoryEvents from './pages/Category/EventsbyCategory';
import TicketBookingForm from './components/TicketBookingForm';
import BookedTicketsPage from './pages/BookedTicketPage';

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
        <Route path="/category/:category" element={<CategoryEvents />} />
        <Route path="/book-tickets/:eventId" element={<TicketBookingForm />} />
        <Route path="/my-tickets" element={<BookedTicketsPage />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default AppRouter;
