import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap";
import { FaCalendarAlt, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
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
import Navbari from "./Navbar";
import Footer from "./Footer";

delete (L.Icon.Default.prototype as any)._getIconUrl;
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { FaLocationDot } from "react-icons/fa6";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface EventDetails {
  title: string;
  date: string;
  time: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  hours: string;
  contact: string;
  imageUrl: string;
  tags: string[];
}

const EventDetails: React.FC = () => {
  const [event] = useState<EventDetails>({
    title: "Dream world wide in jakarta",
    date: "Saturday, March 18 2023",
    time: "3:00 PM",
    description: `
      DesignHub organized a 3D Modeling Workshop using Blender on 16th February at 5 PM.
      The workshop taught participants the magic of creating stunning 3D models and animations using Blender.
      It was suitable for both beginners and experienced users. The event was followed by a blender-render competition, 
      which added to the excitement.
    `,
    location: "IIIT Sonepat",
    lat: 28.9124,
    lng: 77.0824,
    hours: "Weekdays hour: 7PM - 10PM, Sunday hour: 7PM - 10PM",
    contact:
      "Please go to www.sneakypeeks.com and refer the FAQ section for more detail",
    tags: ["Indonesia event", "Jakartan event", "UI", "Seminar"],
    imageUrl: "/assets/carousel/baner1.jpg",
  });

  const [showModal, setShowModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSignupClose = () => setShowSignupModal(false);
  const handleSignupShow = () => setShowSignupModal(true);

  const shareUrl = window.location.href;

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
                src="/assets/carousel/baner1.jpg"
                alt="Event Image"
                className="img-fluid"
              />
            </Col>
            <Col md={4}>
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <h5>Date & Time</h5>
                <p>
                  <FaCalendarAlt /> {event.date} at {event.time} <br />
                  <FaLocationDot /> {event.location}
                </p>
                <Button variant="primary" onClick={handleSignupShow}>
                  Book Now
                </Button>
                <Button variant="primary" onClick={handleSignupShow}>
                  Add to Calendar
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
                <h5  style={{ color: "#7848F4" }}>Hours</h5>
                <p>{event.hours}</p>
                <hr />
                <h5  style={{ color: "#7848F4" }}>Organizer Contact</h5>
                <p>
                  <FaPhone /> {event.contact}
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="my-4">
              <Card.Body>
                <h5><FaMapMarkerAlt /> Event Location</h5>
               
                <MapContainer
                  center={[event.lat, event.lng]}
                  zoom={15}
                  style={{ height: "400px", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[event.lat, event.lng]}>
                    <Popup>
                      {event.imageUrl}
                      {event.location}
                    </Popup>
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

        {/* Event Details Modal */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{event.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Date & Time </h5>
            <p>
              <FaCalendarAlt /> {event.date} at {event.time}
            </p>
            <h5>Location</h5>
            <p>
              <FaMapMarkerAlt /> {event.location}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline" style={{ color: "#7848F4" }}>
              Add to Calendar
            </Button>
            <Button variant="primary" className="ml-2">
              Book Now
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Sign-Up Modal */}
        <Modal show={showSignupModal} onHide={handleSignupClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Already a member? <a href="/login">Log in</a>
            </p>
          </Modal.Body>
        </Modal>
      </Container>
      <Footer />
    </>
  );
};

export default EventDetails;