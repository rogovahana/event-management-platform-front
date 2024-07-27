import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/Homepage";
import CreateEventPage from './pages/CreateEvent/CreateEventPage';
import ManageEventsPage from './pages/ManageEvent/ManageEventsPage';
import SignUpPage from './authentication/SignUpPage';
import LoginPage from './authentication/LoginPage';
import EventDetails from './pages/EventDetails/EventDetail';
import { Auth0Provider } from '@auth0/auth0-react';
import BrowseEventsPage from './pages/BrowseEvents/BrowseEventsPage';
import ProfilePage from './pages/Profile/ProfilePage';
import CategoryEvents from './pages/EventCategory/EventsbyCategory';
import TicketBookingForm from './components/TicketBookingForm';
import BookedTicketsPage from './pages/BookedTicketPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentSuccessPage from './components/payment/PaymentSuccesPage';

const stripePromise = loadStripe('pk_test_51Pg6AGRoUDy3c6g6o4DExb5E8NfDGIqRgx7KxuvnZquzQ8YFqUGGedRlF5x1y1YJQ8SBdLEOOvDzzlQyevesXsYS00xuVTYJ38');

const AppRouter: React.FC = () => {
  const domain = 'dev-0h3u7joort3gf2lb.us.auth0.com';
  const clientId = '2xjbnRuzFmlk2RUBeG89LVSVaWkhOo7A';

  return (
    <ThemeProvider>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{ redirect_uri: window.location.origin }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="/manage-events" element={<ManageEventsPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/browse-events" element={<BrowseEventsPage />} />
            <Route path="/profile-page" element={<ProfilePage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
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
          </Routes>
        </Router>
      </Auth0Provider>
    </ThemeProvider>
  );
};

export default AppRouter;
