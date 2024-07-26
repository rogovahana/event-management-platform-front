import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap";
import { AddToCalendarButton } from 'add-to-calendar-button-react';
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
import Navbari from "../../components/Navbar";
import Footer from "../../components/Footer";
import BookingModal from "../../components/BookingModal";

delete (L.Icon.Default.prototype as any)._getIconUrl;
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import ReviewComponent from "../../components/Review";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface EventDetails {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  categoryId: number;
  cityId: number;
  attendees: number;
}

const EventDetails: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>(); // Get eventId from URL
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false); // State for BookingModal

  useEffect(() => {
    const fetchEventDetails = async () => {
      console.log(`Fetching details for event ID: ${eventId}`);
      try {
        const response = await fetch(`https://localhost:7136/api/Event/${eventId}`);
        const data: EventDetails = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleBookingModalClose = () => setShowBookingModal(false);
  const handleBookingModalShow = () => setShowBookingModal(true);

  const shareUrl = window.location.href;

  if (!event) {
    return <p>Loading...</p>;
  }

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
                  <FaClock />{new Date(event.endDate).toLocaleTimeString()} <br />
                  <FaMapMarkerAlt /> {event.location}
                </p>
                <Button variant="primary" onClick={handleBookingModalShow}>
                  Book Now
                </Button>
                <AddToCalendarButton
                  name={event.title}
                  startDate={event.startDate}
                  endDate={event.endDate}
                  startTime={new Date(event.startDate).toLocaleTimeString()}
                  endTime={new Date(event.endDate).toLocaleTimeString()}
                  location={event.location}
                  description={event.description}
                />
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

            <ReviewComponent />
          </Col>
          
          <Col md={4}>
            <Card className="my-4">
              <Card.Body>
                <h5>
                  <FaMapMarkerAlt /> Event Location
                </h5>

                <MapContainer
                  center={[51.505, -0.09]} 
                  zoom={15}
                  style={{ height: "400px", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[51.505, -0.09]}> 
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

        {/* Booking Modal */}
        <BookingModal show={showBookingModal} handleClose={handleBookingModalClose} />
      </Container>
      <Footer />
    </>
  );
};

export default EventDetails;
