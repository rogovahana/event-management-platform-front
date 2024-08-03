import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage/Homepage';
import CreateEventPage from './pages/CreateEvent/CreateEventPage';
import ManageEventsPage from './pages/ManageEvent/ManageEventsPage';
import EventDetails from './pages/EventDetails/EventDetail';
import BrowseEventsPage from './pages/BrowseEvents/BrowseEventsPage';
import ProfilePage from './pages/Profile/ProfilePage';
import CategoryEvents from './pages/EventCategory/EventsbyCategory';
import TicketBookingForm from './components/TicketBookingForm';
import BookedTicketsPage from './pages/BookTicket/BookedTicketPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentSuccessPage from './components/payment/PaymentSuccesPage';
import { AuthProvider } from './authentication/AuthContext';
import LoginCallback from './authentication/LoginCallBack';
//import ProtectedRoute from './components/ProtectedRoute';
import EventAnalyticsPage from './pages/Analytics/EventAnalyticsPage';

const stripePromise = loadStripe('your-stripe-public-key');

const AppRouter: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="/manage-events" element={<ManageEventsPage />} />
            <Route path="/callback" element={<LoginCallback />} />
            <Route path="/browse-events" element={<BrowseEventsPage />} />
            <Route path="/profile-page" element={<ProfilePage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />}/>
            <Route path="/event/:eventId" element={<EventDetails />} />
            <Route path="/category/:category" element={<CategoryEvents />} />
            <Route 
              path="/book-tickets/:eventId" 
              element={
                <Elements stripe={stripePromise}>
                  <TicketBookingForm />
                </Elements>
              } 
            />
            <Route path="/my-tickets" element={<BookedTicketsPage />} />
            <Route path="/event/:eventId/analytics" element={<EventAnalyticsPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppRouter;
