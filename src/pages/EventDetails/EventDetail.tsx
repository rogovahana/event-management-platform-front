import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Navbari from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import RecommendedEvents from "../../components/RecommendedEvents";
import ReviewComponent from "../../components/ReviewEvents/Review";

// Leaflet icons for the map markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
//  default Leaflet icon optionssss withhh custom icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
// structure of event details
interface EventDetails {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  categoryId: number;
  cityId: number;
  attendees: number;
}

interface RecommendedEvent {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  categoryId: number;
  cityId: number;
}

const EventDetails: React.FC = () => {
  // Retrieve the event ID from the URL parameters
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [recommendedEvents, setRecommendedEvents] = useState<
    RecommendedEvent[]
  >([]);
  const navigate = useNavigate();

  //nees to change with auth0, user ID  // Placeholder user ID
  const userId = 1;

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `https://localhost:7136/api/Event/${eventId}`
        );
        if (response.ok) {
          const data: EventDetails = await response.json();
          setEvent(data);
        } else {
          console.error("Failed to fetch event details");
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    const fetchRecommendedEvents = async () => {
      try {
        const response = await fetch(
          `https://localhost:7136/api/Recommendation?userId=${userId}`
        );
        if (response.ok) {
          const data: RecommendedEvent[] = await response.json();
          setRecommendedEvents(data);
        } else {
          console.error("Failed to fetch recommended events");
        }
      } catch (error) {
        console.error("Error fetching recommended events:", error);
      }
    };

    fetchEventDetails();
    fetchRecommendedEvents();
  }, [eventId, userId]);

  const shareUrl = window.location.href;

  if (!event) {
    return <p>Loading...</p>;
  }

  // Format dates for Google Calendar URL
  const formatDate = (date: string) =>
    new Date(date)
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");

  // Google Calendar link
  const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.title
  )}&dates=${formatDate(event.startDate)}/${formatDate(
    event.endDate
  )}&location=${encodeURIComponent(
    event.location
  )}&details=${encodeURIComponent(event.description)}`;

  return (
    <>
      <Navbari />
      <Container fluid className="px-5">
        <Button variant="primary" href="/">
          &lt; Back
        </Button>
        <Card className="my-4">
          <Row noGutters>
            <Col md={8}>
              <Card.Img
                src="https://via.placeholder.com/800x400.png?text=Event+Image"
                alt="Event Image"
                className="img-fluid"
              />
            </Col>
            <Col md={4}>
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <h5>Date & Time</h5>
                <p>
                  <FaCalendarAlt />{" "}
                  {new Date(event.startDate).toLocaleDateString()} -{" "}
                  {new Date(event.endDate).toLocaleDateString()} <br />
                  <FaClock />
                  {new Date(event.endDate).toLocaleTimeString()} <br />
                  <FaMapMarkerAlt /> {event.location}
                </p>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/book-tickets/${event.id}`)}
                  className="me-2"
                >
                  Book Now
                </Button>
                <Button
                  variant="outline-primary"
                  href={googleCalendarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Add to Google Calendar
                </Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>

        <Row>
          <Col md={8}>
            <Card className="my-4">
              <Card.Body>
                <h5 style={{ color: "#7848F4" }}>Description</h5>
                <p>{event.description}</p>
                <hr />
                <h5 style={{ color: "#7848F4" }}>Attendees</h5>
                <p>{event.attendees}</p>
              </Card.Body>
            </Card>
            <RecommendedEvents />
            {/* needs to change when auth0 is ready  */}
            <ReviewComponent eventId={event.id} />
          </Col>

          <Col md={4}>
            <Card className="my-4">
              <Card.Body>
                <h5>
                  <FaMapMarkerAlt /> Event Location
                </h5>

                <MapContainer
                  center={[51.505, -0.09]} // Dummy coordinates for testing
                  zoom={15}
                  style={{ height: "400px", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[51.505, -0.09]}>
                    {" "}
                    {/* Dummy coordinates for testing */}
                    <Popup>{event.location}</Popup>
                  </Marker>
                </MapContainer>
                <hr />
                <h5>Share on Social Media</h5>
                <p>
                  <FacebookShareButton url={shareUrl} title={event.title}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={event.title}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <WhatsappShareButton url={shareUrl} title={event.title}>
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default EventDetails;
